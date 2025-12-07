// Composable to manage authentication state
// TODO: When API is ready, replace localStorage with API calls and token management

export const useAuth = () => {
  // Shared state across all instances - must be called inside setup function
  const user = useState<any>('auth.user', () => {
    // Initialize from localStorage on client side
    if (process.client) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (e) {
          console.error('Error parsing user data:', e);
          localStorage.removeItem('user');
        }
      }
    }
    return null;
  });

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

