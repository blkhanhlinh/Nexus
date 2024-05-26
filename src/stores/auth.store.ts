import { defineStore } from "pinia";
import axios from "axios";
import { baseURL } from "@/constants/api";
import router from "@/router";
import { useAlertStore } from "./alert.store";
import { RegisterResponse, User } from "@/interfaces/User";
import { ref, watch } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(sessionStorage.getItem('user') || 'null'));
  const returnUrl = ref<string | null>(null);
  const isAuthenticated = ref(!!sessionStorage.getItem('user'));
  const registerResponse = ref<RegisterResponse>({} as RegisterResponse);

  watch(user, (newUser) => {
    if (newUser) {
      sessionStorage.setItem('user', JSON.stringify(newUser));
    } else {
      sessionStorage.removeItem('user');
    }
  }, { deep: true });

  const saveUserData = async (userData: Partial<User>) => {
    user.value = { ...user.value, ...userData } as User;
  };

  const setFavoriteGenres = async (favoriteGenres: string[]) => {
    if (user.value) {
      user.value.favoriteGenres = favoriteGenres;
      console.log(user.value);
      await register();
    }
  };

  const register = async () => {
    try {
      if (!user.value) return;
      const response = await axios.post<RegisterResponse>(`${baseURL}users/register`, user.value, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { otpId, token, errorMessage } = response.data;
      registerResponse.value = { otpId, token, errorMessage };
      if (errorMessage) {
        console.error('Registration error:', errorMessage);
        return;
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
    }
  };

  const verifyOtp = async (otp: string) => {
    try {
      if (!registerResponse.value.token || !registerResponse.value.otpId) return;
      const response = await axios.patch(`${baseURL}users/verify_otp`, {
        otpId: registerResponse.value.otpId,
        otp,
      }, {
        headers: {
          'Authorization': `Bearer ${registerResponse.value.token}`,
          'Content-Type': 'application/json'
        },
      });
      if (response.data) {
        console.log('OTP verification successful:', response.data);
        isAuthenticated.value = true;
      } else {
        console.error('OTP verification failed:', response.data.message);
      }
    } catch (error: any) {
      console.error('OTP verification failed:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${baseURL}users/login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      user.value = response.data;
      isAuthenticated.value = true;
      router.push(returnUrl.value || '/');
    } catch (error: any) {
      const alertStore = useAlertStore();
      alertStore.error(error);
    }
  };

  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
    router.push('/');
  };

  return {
    user,
    returnUrl,
    isAuthenticated,
    registerResponse,
    saveUserData,
    setFavoriteGenres,
    register,
    verifyOtp,
    login,
    logout,
  };
});