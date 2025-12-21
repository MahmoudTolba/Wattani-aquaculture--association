// composables/useSocket.js
import { ref, readonly, onBeforeUnmount } from 'vue';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const socket = ref(null);
  const isConnected = ref(false);
  const connectionError = ref(null);
  const reconnectAttempts = ref(0);
  const maxReconnectAttempts = 5;

  // Try different WebSocket endpoints
  const possibleEndpoints = [
    'wss://backend.wattani-sa.com',
    'ws://backend.wattani-sa.com',
    'wss://backend.wattani-sa.com:6001', // Common Laravel Echo port
    'ws://backend.wattani-sa.com:6001',
    'https://backend.wattani-sa.com', // Socket.io can work over HTTP
  ];

  const connect = (token) => {
    if (!process.client) return;

    // Get token if not provided
    if (!token) {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser?.token || parsedUser?.access_token;
        }
      } catch (e) {
        console.error('Error getting token:', e);
      }
    }

    if (!token) {
      console.warn('⚠️ No token available for WebSocket connection');
      return;
    }

    // Try to connect to the first endpoint
    const endpoint = possibleEndpoints[0];
    
    console.log('🔌 Attempting WebSocket connection to:', endpoint);

    try {
      socket.value = io(endpoint, {
        transports: ['websocket', 'polling'], // Try WebSocket first, fallback to polling
        reconnection: true,
        reconnectionAttempts: maxReconnectAttempts,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        auth: {
          token: token,
        },
        query: {
          token: token,
        },
        extraHeaders: {
          'Authorization': `Bearer ${token}`,
          'X-API-KEY': '5f43766dcd92b8c3e7639d2a8791063c',
        },
      });

      // Connection events
      socket.value.on('connect', () => {
        console.log('✅ WebSocket connected!');
        isConnected.value = true;
        connectionError.value = null;
        reconnectAttempts.value = 0;
      });

      socket.value.on('disconnect', (reason) => {
        console.log('❌ WebSocket disconnected:', reason);
        isConnected.value = false;
        
        if (reason === 'io server disconnect') {
          // Server disconnected, need to reconnect manually
          socket.value.connect();
        }
      });

      socket.value.on('connect_error', (error) => {
        console.error('❌ WebSocket connection error:', error.message);
        connectionError.value = error.message;
        isConnected.value = false;
        reconnectAttempts.value++;
        
        if (reconnectAttempts.value >= maxReconnectAttempts) {
          console.warn('⚠️ Max reconnection attempts reached. Falling back to polling.');
        }
      });

      socket.value.on('reconnect_attempt', (attemptNumber) => {
        console.log(`🔄 Reconnection attempt ${attemptNumber}/${maxReconnectAttempts}`);
      });

      socket.value.on('reconnect_failed', () => {
        console.error('❌ WebSocket reconnection failed');
        connectionError.value = 'Failed to reconnect';
      });

    } catch (error) {
      console.error('❌ Error creating WebSocket connection:', error);
      connectionError.value = error.message;
    }
  };

  const disconnect = () => {
    if (socket.value) {
      console.log('🔌 Disconnecting WebSocket...');
      socket.value.disconnect();
      socket.value = null;
      isConnected.value = false;
    }
  };

  const emit = (event, data) => {
    if (socket.value && isConnected.value) {
      socket.value.emit(event, data);
    } else {
      console.warn('⚠️ Cannot emit: WebSocket not connected');
    }
  };

  const on = (event, callback) => {
    if (socket.value) {
      socket.value.on(event, callback);
    }
  };

  const off = (event, callback) => {
    if (socket.value) {
      socket.value.off(event, callback);
    }
  };

  // Cleanup on unmount
  if (process.client) {
    onBeforeUnmount(() => {
      disconnect();
    });
  }

  return {
    socket: readonly(socket),
    isConnected: readonly(isConnected),
    connectionError: readonly(connectionError),
    connect,
    disconnect,
    emit,
    on,
    off,
  };
};

