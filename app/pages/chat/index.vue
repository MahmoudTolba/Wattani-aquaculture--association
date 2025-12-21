<template>
  <div class="min-h-screen bg-white flex justify-center p-4 md:p-10">
    <div class="w-full max-w-[95%] xl:max-w-[1600px] h-full flex gap-8">
      <!-- Sidebar - Contacts List -->
      <div class="w-1/3 hidden md:flex flex-col">
        <h1 class="text-3xl font-bold mb-6 text-gray-800">الرسائل</h1>
        <div class="flex-1 overflow-y-auto space-y-4 pl-2 custom-scrollbar">
          <!-- Loading State -->
          <div v-if="isLoadingContacts" class="flex justify-center items-center py-8">
            <div class="text-gray-500">جاري التحميل...</div>
          </div>
          <!-- Error State -->
          <div v-else-if="error && contactsData.length === 0" class="flex flex-col justify-center items-center py-8 px-4">
            <div class="text-red-500 text-center mb-4">{{ error }}</div>
            <button
              @click="fetchConversations"
              class="px-4 py-2 bg-[#148E84] text-white rounded-lg hover:bg-[#0f7a70] transition"
            >
              إعادة المحاولة
            </button>
          </div>
          <!-- Empty State -->
          <div v-else-if="contactsData.length === 0" class="flex justify-center items-center py-8">
            <div class="text-gray-500 text-center">لا توجد محادثات</div>
          </div>
          <!-- Contacts List -->
          <div
            v-for="contact in contactsData"
            :key="contact.id"
            @click="switchChat(contact.id)"
            :class="[
              'rounded-xl p-4 flex items-center cursor-pointer transition-all duration-200',
              contact.id === activeContactId
                ? 'bg-[#148E84] text-white shadow-md transform scale-[1.02]'
                : 'bg-white hover:bg-gray-50 text-gray-800 border border-transparent hover:border-gray-200',
            ]"
          >
            <div class="relative">
              <img
                :src="contact.avatar"
                :class="[
                  'w-12 h-12 rounded-full border-2 object-cover',
                  contact.id === activeContactId
                    ? 'border-white'
                    : 'border-gray-200',
                ]"
                :alt="contact.name"
              />
            </div>
            <div class="mr-3 flex-1 overflow-hidden">
              <div class="flex justify-between items-center mb-1">
                <h3 class="font-bold text-sm truncate">{{ contact.name }}</h3>
                <span
                  :class="[
                    'text-[10px]',
                    contact.id === activeContactId
                      ? 'text-gray-200'
                      : 'text-gray-400',
                  ]"
                >
                  {{ contact.time }}
                </span>
              </div>
              <p
                :class="[
                  'text-xs truncate w-full opacity-90',
                  contact.id === activeContactId
                    ? 'text-gray-100'
                    : 'text-gray-500',
                ]"
              >
                {{ contact.lastMessage }}
              </p>
            </div>
            <div
              v-if="contact.unread > 0 && contact.id !== activeContactId"
              class="w-5 h-5 bg-[#FF5A5F] rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm"
            >
              {{ contact.unread }}
            </div>
          </div>
        </div>
      </div>

      <!-- Main Chat Window -->
      <div
        class="flex-1 bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden relative"
      >
        <!-- Header -->
        <div
          class="p-6 border-b border-gray-50 flex justify-between items-center bg-white z-10"
        >
          <div v-if="activeContact" class="flex items-center">
            <img
              :src="activeContact.avatar || 'https://i.pravatar.cc/150?img=11'"
              :alt="activeContact.name"
              class="w-10 h-10 rounded-full border border-gray-200 object-cover"
            />
            <div class="mr-3">
              <h2 class="font-bold text-gray-800 text-lg leading-none">
                {{ activeContact.name }}
              </h2>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs text-green-500 flex items-center gap-1">
                  <span
                    class="w-2 h-2 bg-green-500 rounded-full inline-block"
                  ></span>
                  متصل الآن
                </span>
                <!-- Connection Status Indicator -->
                <span
                  v-if="useWebSocket"
                  :class="[
                    'text-[10px] px-2 py-0.5 rounded-full',
                    isConnected
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700',
                  ]"
                  :title="isConnected ? 'متصل عبر WebSocket' : 'استخدام Polling'"
                >
                  {{ isConnected ? '⚡ مباشر' : '🔄 Polling' }}
                </span>
              </div>
            </div>
          </div>
          <div v-else class="flex items-center">
            <div class="w-10 h-10 rounded-full border border-gray-200 bg-gray-200"></div>
            <div class="mr-3">
              <h2 class="font-bold text-gray-800 text-lg leading-none">
                اختر محادثة
              </h2>
            </div>
          </div>
          <!-- <div
            class="h-12 w-1.5 bg-gray-200 rounded-full opacity-50 absolute left-4 top-20 hidden md:block"
          ></div> -->
        </div>

        <!-- Messages Container -->
        <div
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-white"
        >
          <!-- Loading Messages -->
          <div v-if="isLoadingMessages" class="flex justify-center items-center py-8">
            <div class="text-gray-500">جاري تحميل الرسائل...</div>
          </div>
          <!-- Empty Messages -->
          <div v-else-if="!activeContact || activeContact.messages.length === 0" class="flex justify-center items-center py-8">
            <div class="text-gray-500 text-center">لا توجد رسائل بعد</div>
          </div>
          <!-- Messages List -->
          <div
            v-for="(msg, index) in activeContact?.messages"
            :key="msg.id || index"
            :class="[
              'flex items-start',
              msg.type === 'outgoing' ? 'justify-end' : '',
            ]"
          >
            <!-- Incoming Message -->
            <template v-if="msg.type === 'incoming'">
              <div class="flex items-start">
                <img
                  :src="activeContact?.avatar || 'https://i.pravatar.cc/150?img=11'"
                  class="w-8 h-8 rounded-full ml-3 mt-1 object-cover"
                  :alt="activeContact?.name || 'مستخدم'"
                />
                <div class="flex flex-col items-start max-w-[75%]">
                  <div
                    class="bg-[#EEEEEE] text-gray-800 px-4 py-3 rounded-2xl rounded-tr-none text-sm leading-relaxed shadow-sm"
                  >
                    {{ msg.text }}
                  </div>
                </div>
              </div>
            </template>

            <!-- Outgoing Message -->
            <template v-else>
              <div class="flex items-end justify-end">
                <div class="flex flex-col items-end max-w-[75%]">
                  <div
                    class="bg-[#F7F7F7] text-gray-800 px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed text-right border border-gray-100 shadow-sm"
                  >
                    {{ msg.text }}
                  </div>
                  <span class="text-[10px] text-gray-300 mt-1 mr-1">الآن</span>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="px-6 py-2 bg-red-50 border-t border-red-200">
          <div class="text-red-600 text-sm">{{ error }}</div>
        </div>
        <!-- Input Area -->
        <div class="p-6 bg-white">
          <div
            class="relative border-t border-gray-100 pt-4 flex items-center gap-4"
          >
            <input
              v-model="messageInput"
              type="text"
              @keypress.enter="sendMessage"
              :disabled="!activeContact || isSendingMessage"
              class="flex-1 bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-full focus:ring-[#148E84] focus:border-[#148E84] block p-4 pr-5 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="اكتب رسالتك هنا..."
              autocomplete="off"
            />
            <button
              @click="sendMessage"
              :disabled="isSendingMessage || !messageInput.trim()"
              class="bg-[#009688] hover:bg-[#00796b] disabled:bg-gray-400 disabled:cursor-not-allowed text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition transform active:scale-95 shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transform -rotate-45 translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";

const contactsData = ref([]);
const activeContactId = ref(null);
const messageInput = ref("");
const messagesContainer = ref(null);
const isLoadingContacts = ref(false);
const isLoadingMessages = ref(false);
const isSendingMessage = ref(false);
const error = ref(null);
const pollingInterval = ref(null);
const conversationsRefreshInterval = ref(null);
const lastMessageIds = ref({}); // Track last message ID per room to detect new messages

// Socket.io setup
const { socket, isConnected, connectionError, connect, disconnect, emit, on, off } = useSocket();
const useWebSocket = ref(true); // Flag to enable/disable WebSocket
const socketInitialized = ref(false);

// Get user token
const getAuthToken = () => {
  if (process.client) {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser?.token || parsedUser?.access_token;
      }
    } catch (e) {
      console.error("Error getting token from localStorage:", e);
    }
  }
  return null;
};

// Get API headers
const getHeaders = (includeContentType = true) => {
  const token = getAuthToken();
  const headers = {
    "X-API-KEY": "5f43766dcd92b8c3e7639d2a8791063c",
    lang: "ar",
  };
  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

// API 1: GET Get Rooms
const fetchConversations = async () => {
  isLoadingContacts.value = true;
  error.value = null;
  try {
    const token = getAuthToken();
    console.log("🔑 Token exists:", !!token);
    
    if (!token) {
      error.value = "يرجى تسجيل الدخول للوصول إلى المحادثات";
      isLoadingContacts.value = false;
      return;
    }

    console.log("📡 Fetching rooms from API...");
    const response = await $fetch(
      "https://backend.wattani-sa.com/api/v1/get-rooms",
      {
        method: "GET",
        headers: getHeaders(),
      }
    );

    console.log("📥 API Response:", response);

    // Handle unauthenticated response
    if (response && response.key === "unauthenticated") {
      error.value = response.msg || "يرجى إعادة تسجيل الدخول";
      console.error("❌ Unauthenticated:", response.msg);
      // Optionally redirect to login
      if (process.client) {
        setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      }
      return;
    }

    // Handle success response
    if (response && response.key === "success") {
      // Check if data exists
      if (!response.data) {
        console.log("⚠️ Response success but no data");
        contactsData.value = [];
        return;
      }

      const conversations = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      console.log("💬 Conversations found:", conversations.length);

      if (conversations.length === 0) {
        console.log("ℹ️ No conversations available");
        contactsData.value = [];
        return;
      }

      contactsData.value = conversations.map((room) => ({
        id: room.id || room.room_id,
        name: room.name || room.user_name || "مستخدم",
        avatar:
          room.avatar ||
          room.user_avatar ||
          "https://i.pravatar.cc/150?img=11",
        time: room.last_message_time || room.updated_at || "الآن",
        unread: room.unread_count || 0,
        lastMessage: room.last_message || "",
        messages: [],
        roomId: room.id || room.room_id,
      }));

      console.log("✅ Loaded contacts:", contactsData.value.length);

      // Set first room as active if available
      if (contactsData.value.length > 0 && !activeContactId.value) {
        activeContactId.value = contactsData.value[0].id;
        await fetchMessages(contactsData.value[0].roomId);
      }
    } else {
      // Handle other response types
      console.error("❌ Unexpected response:", response);
      throw new Error(response?.msg || "فشل في تحميل المحادثات");
    }
  } catch (err) {
    console.error("❌ Error fetching conversations:", err);
    console.error("Error details:", {
      message: err?.message,
      data: err?.data,
      status: err?.status,
      statusText: err?.statusText,
    });
    
    // Handle unauthenticated error from catch block
    if (err?.data?.key === "unauthenticated" || err?.response?.key === "unauthenticated") {
      error.value = err?.data?.msg || err?.response?.msg || err?.message || "يرجى إعادة تسجيل الدخول";
      if (process.client) {
        setTimeout(() => {
          navigateTo("/login");
        }, 2000);
      }
    } else {
      error.value =
        err?.data?.msg ||
        err?.data?.message ||
        err?.response?.msg ||
        err?.message ||
        "حدث خطأ أثناء تحميل المحادثات. يرجى المحاولة مرة أخرى.";
    }
  } finally {
    isLoadingContacts.value = false;
  }
};

// API 2: POST Get Room Messages
const fetchMessages = async (roomId, silent = false) => {
  if (!roomId) return;

  // Don't show loading indicator during polling (silent mode)
  if (!silent) {
    isLoadingMessages.value = true;
  }
  try {
    const token = getAuthToken();
    if (!token) {
      if (!silent) {
        error.value = "يرجى تسجيل الدخول";
        isLoadingMessages.value = false;
      }
      return;
    }

    const response = await $fetch(
      "https://backend.wattani-sa.com/api/v1/get-room-messages",
      {
        method: "POST",
        headers: getHeaders(),
        body: {
          room_id: roomId,
        },
      }
    );

    // Handle unauthenticated response
    if (response && response.key === "unauthenticated") {
      if (!silent) {
        error.value = response.msg || "يرجى إعادة تسجيل الدخول";
      }
      return;
    }

    if (response && response.key === "success" && response.data) {
      const messages = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      const contact = contactsData.value.find(
        (c) => c.roomId === roomId
      );
      if (contact) {
        // Get the last message ID before updating
        const previousLastId = lastMessageIds.value[roomId];
        
        // Transform API messages to match component structure
        const transformedMessages = messages.map((msg) => ({
          type: msg.type === "sent" || msg.sender_id === getCurrentUserId() ? "outgoing" : "incoming",
          text: msg.message || msg.content || "",
          id: msg.id,
          timestamp: msg.created_at || msg.timestamp,
        }));

        // Check if there are new messages
        const hasNewMessages = messages.length > 0 && 
          (!previousLastId || messages[messages.length - 1].id !== previousLastId);
        
        // Update messages
        contact.messages = transformedMessages;
        
        // Update last message ID
        if (messages.length > 0) {
          lastMessageIds.value[roomId] = messages[messages.length - 1].id;
        }

        // Only scroll if there are new messages or it's not a silent poll
        if (hasNewMessages || !silent) {
          scrollToBottom();
        }
      }
    }
  } catch (err) {
    console.error("Error fetching messages:", err);
    if (!silent && err?.data?.key === "unauthenticated") {
      error.value = err?.data?.msg || "يرجى إعادة تسجيل الدخول";
    }
  } finally {
    if (!silent) {
      isLoadingMessages.value = false;
    }
  }
};

// Get current user ID (you may need to adjust this based on your auth structure)
const getCurrentUserId = () => {
  if (process.client) {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser?.id || parsedUser?.user_id;
      }
    } catch (e) {
      console.error("Error getting user ID:", e);
    }
  }
  return null;
};

// API: POST Create Private Room
const createPrivateRoom = async (memberableId, memberableType = "User") => {
  try {
    const token = getAuthToken();
    if (!token) {
      error.value = "يرجى تسجيل الدخول لإنشاء محادثة";
      return null;
    }

    const response = await $fetch(
      `https://backend.wattani-sa.com/api/v1/create-private-room?memberable_id=${memberableId}&memberable_type=${memberableType}`,
      {
        method: "POST",
        headers: getHeaders(),
      }
    );

    // Handle unauthenticated response
    if (response && response.key === "unauthenticated") {
      error.value = response.msg || "يرجى إعادة تسجيل الدخول";
      return null;
    }

    if (response && response.key === "success") {
      const roomData = response.data || {};
      const roomId = roomData.id || roomData.room_id;

      // Add the new room to contacts list if it doesn't exist
      const existingRoom = contactsData.value.find(
        (c) => c.roomId === roomId
      );
      if (!existingRoom && roomId) {
        const newRoom = {
          id: roomId,
          roomId: roomId,
          name: roomData.name || roomData.user_name || "مستخدم",
          avatar:
            roomData.avatar ||
            roomData.user_avatar ||
            "https://i.pravatar.cc/150?img=11",
          time: "الآن",
          unread: 0,
          lastMessage: "",
          messages: [],
        };
        contactsData.value.unshift(newRoom);
        return roomId;
      }

      return roomId;
    } else {
      throw new Error(response?.msg || "فشل في إنشاء المحادثة");
    }
  } catch (err) {
    console.error("Error creating private room:", err);
    
    // Handle unauthenticated error
    if (err?.data?.key === "unauthenticated") {
      error.value = err?.data?.msg || "يرجى إعادة تسجيل الدخول";
    } else {
      error.value =
        err?.data?.message ||
        err?.message ||
        err?.data?.msg ||
        "حدث خطأ أثناء إنشاء المحادثة";
    }
    return null;
  }
};

// Computed
const activeContact = computed(() => {
  return contactsData.value.find((c) => c.id === activeContactId.value);
});

// Methods
async function switchChat(id) {
  activeContactId.value = id;
  const contact = contactsData.value.find((c) => c.id === id);
  if (contact) {
    contact.unread = 0;
    // Fetch messages for this room
    if (contact.roomId) {
      await fetchMessages(contact.roomId);
    }
  }
  scrollToBottom();
}

// API 3: POST Send Message
async function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "" || !activeContact.value || isSendingMessage.value) return;

  isSendingMessage.value = true;
  const roomId = activeContact.value.roomId;

  try {
    const token = getAuthToken();
    if (!token) {
      error.value = "يرجى تسجيل الدخول لإرسال الرسائل";
      isSendingMessage.value = false;
      return;
    }

    // Create FormData for form-data request
    const formData = new FormData();
    formData.append("message", text);

    // Don't set Content-Type header for FormData, browser will set it automatically with boundary
    const headers = getHeaders(false);

    const response = await $fetch(
      `https://backend.wattani-sa.com/api/v1/send-message/${roomId}`,
      {
        method: "POST",
        headers: headers,
        body: formData,
      }
    );

    // Handle unauthenticated response
    if (response && response.key === "unauthenticated") {
      error.value = response.msg || "يرجى إعادة تسجيل الدخول";
      isSendingMessage.value = false;
      return;
    }

    if (response && response.key === "success") {
      // Add message to local state
      const newMessage = {
        type: "outgoing",
        text: text,
        id: response.data?.id || Date.now(),
        timestamp: new Date().toISOString(),
      };

      activeContact.value.messages.push(newMessage);
      activeContact.value.lastMessage = text;
      messageInput.value = "";
      scrollToBottom();

      // If WebSocket is connected, message will come via socket
      // Otherwise, refresh messages after a short delay
      if (!isConnected.value) {
        setTimeout(() => {
          fetchMessages(roomId);
        }, 500);
      }
    } else {
      throw new Error(response?.msg || "فشل في إرسال الرسالة");
    }
  } catch (err) {
    console.error("Error sending message:", err);
    
    // Handle unauthenticated error
    if (err?.data?.key === "unauthenticated") {
      error.value = err?.data?.msg || "يرجى إعادة تسجيل الدخول";
    } else {
      error.value =
        err?.data?.message ||
        err?.message ||
        err?.data?.msg ||
        "حدث خطأ أثناء إرسال الرسالة";
    }
  } finally {
    isSendingMessage.value = false;
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

// Watch for message changes to auto-scroll
watch(
  () => activeContact.value?.messages,
  () => {
    scrollToBottom();
  },
  { deep: true }
);

// Initialize WebSocket connection
const initializeSocket = () => {
  if (!useWebSocket.value || socketInitialized.value) return;

  const token = getAuthToken();
  if (!token) {
    console.log('⚠️ No token, skipping WebSocket initialization');
    return;
  }

  console.log('🔌 Initializing WebSocket connection...');
  socketInitialized.value = true;
  connect(token);

  // Listen for new messages via socket
  on('new-message', (data) => {
    console.log('📨 New message received via WebSocket:', data);
    handleNewMessage(data);
  });

  // Listen for message sent confirmation
  on('message-sent', (data) => {
    console.log('✅ Message sent confirmation:', data);
  });

  // Listen for room updates
  on('room-updated', (data) => {
    console.log('🔄 Room updated:', data);
    // Refresh conversations list
    fetchConversations();
  });

  // Watch socket connection status
  watch(isConnected, (connected) => {
    if (connected) {
      console.log('✅ WebSocket connected, stopping polling');
      stopPolling();
      
      // Join active room if available
      if (activeContact.value?.roomId) {
        joinRoom(activeContact.value.roomId);
      }
    } else {
      console.log('⚠️ WebSocket disconnected, starting polling fallback');
      startPolling();
    }
  });
};

// Join a room channel
const joinRoom = (roomId) => {
  if (isConnected.value && roomId) {
    console.log('🚪 Joining room:', roomId);
    emit('join-room', { room_id: roomId });
  }
};

// Leave a room channel
const leaveRoom = (roomId) => {
  if (isConnected.value && roomId) {
    console.log('🚪 Leaving room:', roomId);
    emit('leave-room', { room_id: roomId });
  }
};

// Handle new message from socket
const handleNewMessage = (data) => {
  const { room_id, message } = data;
  
  const contact = contactsData.value.find((c) => c.roomId === room_id);
  if (contact) {
    // Check if message already exists
    const messageExists = contact.messages.some((msg) => msg.id === message.id);
    if (!messageExists) {
      const newMessage = {
        type: message.sender_id === getCurrentUserId() ? 'outgoing' : 'incoming',
        text: message.message || message.content || '',
        id: message.id,
        timestamp: message.created_at || message.timestamp,
      };
      
      contact.messages.push(newMessage);
      contact.lastMessage = newMessage.text;
      
      // Update unread count if not active
      if (contact.id !== activeContactId.value) {
        contact.unread = (contact.unread || 0) + 1;
      }
      
      scrollToBottom();
    }
  }
};

// Polling function to check for new messages (fallback when WebSocket is not available)
const startPolling = () => {
  // Only start polling if WebSocket is not connected
  if (isConnected.value) {
    console.log('⏭️ Skipping polling, WebSocket is connected');
    return;
  }

  // Clear existing intervals if any
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value);
  }
  if (conversationsRefreshInterval.value) {
    clearInterval(conversationsRefreshInterval.value);
  }

  console.log('🔄 Starting polling fallback...');

  // Poll every 3 seconds for new messages in active chat
  pollingInterval.value = setInterval(() => {
    // Only poll if there's an active contact and WebSocket is not connected
    if (activeContact.value?.roomId && !isConnected.value) {
      // Fetch messages silently (without loading indicator)
      fetchMessages(activeContact.value.roomId, true);
    }
  }, 3000); // Poll every 3 seconds

  // Refresh conversations list every 30 seconds
  // This updates unread counts and last messages in the sidebar
  conversationsRefreshInterval.value = setInterval(() => {
    if (!isConnected.value) {
      fetchConversations();
    }
  }, 30000); // Refresh every 30 seconds
};

// Stop polling
const stopPolling = () => {
  if (pollingInterval.value) {
    clearInterval(pollingInterval.value);
    pollingInterval.value = null;
  }
  if (conversationsRefreshInterval.value) {
    clearInterval(conversationsRefreshInterval.value);
    conversationsRefreshInterval.value = null;
  }
};

// Watch active contact to join/leave rooms when switching chats
watch(
  () => activeContactId.value,
  (newId, oldId) => {
    // Leave old room
    if (oldId) {
      const oldContact = contactsData.value.find((c) => c.id === oldId);
      if (oldContact?.roomId) {
        leaveRoom(oldContact.roomId);
      }
    }

    // Join new room
    if (newId) {
      const contact = contactsData.value.find((c) => c.id === newId);
      if (contact?.roomId) {
        // Reset last message ID for the new room
        lastMessageIds.value[contact.roomId] = null;
        
        // Join room via socket if connected
        if (isConnected.value) {
          joinRoom(contact.roomId);
        } else {
          // Fallback to polling
          startPolling();
        }
      }
    }
  }
);

// Load conversations on mount
onMounted(() => {
  fetchConversations();
  
  // Try to initialize WebSocket first
  if (useWebSocket.value) {
    initializeSocket();
    
    // Fallback to polling after 5 seconds if WebSocket doesn't connect
    setTimeout(() => {
      if (!isConnected.value) {
        console.log('⚠️ WebSocket connection timeout, using polling fallback');
        startPolling();
      }
    }, 5000);
  } else {
    // Start polling immediately if WebSocket is disabled
    setTimeout(() => {
      startPolling();
    }, 1000);
  }
});

// Clean up on unmount
onUnmounted(() => {
  stopPolling();
  disconnect();
  
  // Remove socket listeners
  if (socket.value) {
    off('new-message');
    off('message-sent');
    off('room-updated');
  }
});
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

/* Animation for new messages */
.fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
