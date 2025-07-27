import { create } from "zustand";
import axiosInstance from "../service/api";
import handleAsync from "../utils/handlingError";

interface FileState {
  file: File | null;
  loading: boolean;
  error: string | null;
  isSucces: boolean;

  uploadFile: (file: File) => Promise<any>;
  reset: () => void;
}

export const useFileStore = create<FileState>((set) => ({
  file: null,
  loading: false,
  error: null,
  isSucces: false,

  uploadFile: async (file:File) => {
    set({ loading: true, error: null });

    const formData = new FormData();
    formData.append("image", file); 

    const result = await handleAsync(async () => {
      const response = await axiosInstance.post("/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    });

    if (result) {
      set({ file, loading: false, isSucces: true });
      return result;
    } else {
      set({ loading: false, error: "File upload failed", isSucces: false });
      return null;
    }
  },

  reset: () => {
    set({
      file: null,
      loading: false,
      error: null,
      isSucces: false,
    });
  },
}));
