/* eslint-disable @typescript-eslint/no-unused-vars */


import axiosInstance from "../service/api";
import { create } from "zustand";
import Cookies from "js-cookie";
import { Registerresponse, User } from "../../components/types/type";
import handleAsync from "../utils/handlingError";
import { promises } from "dns";
import { ParamValue } from "next/dist/server/request/params";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isSucces: boolean;

  registeruser: (newuser: User) => Promise<Registerresponse | null>;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<Registerresponse | null>;
  logoutUser: () => Promise<Registerresponse | null>;
  setUser: (user: User | null) => void;

}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  isSucces: false,
  setUser: (user: User | null) => set({ user }),



  registeruser: async (newuser: User) => {
    set({ loading: true, error: null });

    const result = await handleAsync(async () => {
      const response = await axiosInstance.post('/auth/signup', newuser);
      return response.data;

    });
    if (result) {
  
      return result
    } else {
      set({ error: "Registration failed", loading: false, isSucces: false });
      return null
    }

  },
  setLoading: (loading: boolean) => set({ loading }),



  loginUser: async ({ email, password }) => {
    set({ loading: true, error: null });

    try {
      const result = await handleAsync(async () => {
        const response = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        return response.data

      });
      if (result) {

        const { user, token, refreshtoken } = result;


        localStorage.setItem("user", JSON.stringify(user))

        Cookies.set("token", token, { expires: 7 });
        Cookies.set("refreshtoken", refreshtoken, { expires: 7 });
        Cookies.set("user", JSON.stringify(user), { expires: 7 });
        set({ user, loading: false, isSucces: true });
        const as = Cookies.get("user") ? JSON.parse(Cookies.get("user") || "null") : null
        console.log("as", as);

        return result
      } else {
        set({ error: "login failed", loading: false, isSucces: false });
        return null
      }

    } catch (error) {
      console.error("Error logging in:", error);
      set({
        error: "Login failed. Please check your credentials.",
        loading: false,
        isSucces: false,
      });
    }
  },
  logoutUser: async () => {
    set({ loading: true, error: null });
    const result = await handleAsync(async () => {
      const response = await axiosInstance.post("/auth/logout")
      return response.data;

    });
    if (result) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("refreshtoken");
      set({ user: null, loading: false, isSucces: true });
      return result
    } else {
      set({ error: "Registration failed", loading: false, isSucces: false });
      return null
    }

  },



}))














