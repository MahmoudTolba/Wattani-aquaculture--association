import {defineStore} from 'pinia';
export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        isLoggedIn: false,
        isVisitor: false,

        user: {
            id: null,
            name: "",
            email: "",
            phone: "",
            avatar: "",
        },
    }),
    actions: {
        //login user
        login( payload ) {
            this.token = payload.token;
            this.isLoggedIn = true;
            this.isVisitor = false;
            this.user = {
                id: payload.id,
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                avatar: payload.avatar || "",
            };
        },
        //register user
        register( payload ) {
            this.token = payload.token;
            this.isLoggedIn = true;
            this.isVisitor = false;
            this.user = {
                id: payload.id,
                name: payload.name,
                email: payload.email,
                phone: payload.phone,
                avatar: payload.avatar || "",
                
            };
        },
         // Visitor Mode
    loginAsVisitor() {
        this.token = null;
        this.isLoggedIn = false;
        this.isVisitor = true;
  
        // CLEAR user data completely
        this.user = {
          id: null,
          name: "",
          email: "",
          phone: "",
          avatar: "",
        };
      },
         // Update profile
    updateProfile(payload) {
        this.user = { ...this.user, ...payload };
      },
  
      // Logout
      logout() {
        this.token = null;
        this.isLoggedIn = false;
        this.isVisitor = false;
  
        this.user = {
          id: null,
          name: "",
          email: "",
          phone: "",
          avatar: "",
        };
      },
    },
  
    persist: true,
  });