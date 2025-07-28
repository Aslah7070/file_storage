import { create } from "zustand";
import axiosInstance from "../service/api";
import handleAsync from "../utils/handlingError";
import { FileResponse, IFile } from "@/components/types/type";

interface FileState {
  file: IFile[]
  loading: boolean;
  error: string | null;
  isSucces: boolean;
 
  uploadFile: (file: File) => Promise<FileResponse|null>;
  findFileByType: (contentType: string) => Promise<FileResponse|null>;
  reset: () => void;
}

export const useFileStore = create<FileState>((set) => ({
  file: [],
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
      set({  loading: false, isSucces: true });
      return result;
    } else {
      set({ loading: false, error: "File upload failed", isSucces: false });
      return null;
    }
  },

  reset: () => {
    set({
      
      loading: false,
      error: null,
      isSucces: false,
    });
  },
  findFileByType:async(contentType:string)=>{
    set({
      loading: false,
      error: null,
      isSucces: false,
    });
    const resutlt=await handleAsync(async()=>{
         const response=await axiosInstance.get(`/file/find?contentType=${contentType}`)
         return response.data
    })

    if(resutlt){
      console.log("erre",resutlt.result.data);
      
set({
      file: resutlt.result.data,
      loading: false,
      error: null,
      isSucces: true,
    });

    return resutlt.data
    }
    else{
set({
      loading: false,
      isSucces: false,
    });

    return null
    }
  }
}));
