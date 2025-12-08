// Composable to manage authentication state
// TODO: When API is ready, replace localStorage with API calls and token management

import { nextTick } from 'vue';

export const useAuth = () => {
  // Shared state across all instances - must be called inside setup function
  // Always initialize as null to prevent hydration mismatches
  // Server and client will both start with null, then client hydrates after mount
  const user = useState<any>('auth.user', () => null);
  
  // Track if we've hydrated from localStorage (client-side only)
  const isHydrated = useState<boolean>('auth.hydrated', () => false);

  // Hydrate from localStorage on client side only, after initial render
  // This prevents hydration mismatches by ensuring server and client start with the same state
  if (process.client && !isHydrated.value) {
    // Use nextTick to ensure this runs after initial render/hydration
    nextTick(() => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          user.value = parsedUser;
        }
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user');
      }
      isHydrated.value = true;
    });
  }

  const isAuthenticated = computed(() => !!user.value);

  // Login function - sets user data
  const login = (userData: any) => {
    user.value = userData;
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(userData));
    }
  };

  // Register function - registers and logs in user
  const register = (userData: any) => {
    // Register and immediately log in the user
    login(userData);
  };

  // Logout function - clears user data
  const logout = () => {
    user.value = null;
    if (process.client) {
      localStorage.removeItem('user');
    }
  };

  // Get user name
  const getUserName = computed(() => {
    if (!user.value) return '';
    return user.value.name || user.value.username || user.value.fullName || '';
  });

  // Get user avatar
  const getUserAvatar = computed(() => {
    if (!user.value) return '/images/profile-avatar.png';
    return user.value.avatar || user.value.profilePicture || '/images/profile-avatar.png';
  });

  return {
    user: readonly(user),
    isAuthenticated,
    login,
    register,
    logout,
    getUserName,
    getUserAvatar,
  };
};

