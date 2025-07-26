"use client";

import { useAuthStore } from "../lib/stores/useAuthStore";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ReactNode } from "react";
import { Spinner } from "../components/ui/spinner";
interface AuthloadProps {
  children: ReactNode;
}

export const AuthLoader = ({ children }: AuthloadProps) => {
  const { setUser } = useAuthStore();
  const [hasMounted, setHasMounted] = useState(false); 

  useEffect(() => {
    const cookie = Cookies.get("user");
console.log("cookies",cookie);

    if (cookie) {
    
        
      try {
        setUser(JSON.parse(cookie));
      } catch {
        setUser(null);  
      }
    }
    setHasMounted(true);
  }, [setUser]);

  if (!hasMounted) {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Spinner/>
        </div>
    )
  }

  return <>{children}</>;
};
