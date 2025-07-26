import axios from "axios";
import  toast from "react-hot-toast";


type AsyncFunction<T> = (...args: unknown[]) => Promise<T>;

const handleAsync = async <T>(fn: AsyncFunction<T>): Promise<T | null> => {
  try {
    return await fn();
  } catch (error: unknown) {
    console.error("API Error:", error);


    if (axios.isAxiosError(error)) {
      
        
      const status = error.response?.status;
 console.log("error.response?",error.response)
 console.log("status",status)

      if (status) {
        const message = error.response?.data?.message || `Request failed with status ${status}`;
        console.log("message",message);
        toast.error(message);
      } else {
        toast.error("Network error, please check your connection.");
      }
    } else if (error instanceof Error) {
      toast.error(error.message || "Unexpected error occurred");
    } else {
      toast.error("An unknown error occurred");
    }

    return null;
  }
};

export default handleAsync;
