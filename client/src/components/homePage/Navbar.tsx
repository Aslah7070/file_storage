"use client";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { HardDrive, Upload, User } from "lucide-react";

import Signup from "../auth/Signup";
import { ReusableDialog } from "../ui/modal";
import Login from "../auth/Login";
import ReusableMenu from "../ui/dropdown";
import { FileUpload } from "../ui/file-upload";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFileStore } from "@/lib/stores/useFileStore";
import { AuthDialogue } from "../ui/authdialogue";

const Navbar = () => {
  const { user,logoutUser } = useAuthStore();
  const {uploadFile}=useFileStore()
const [file, setFile] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

 const [open, setOpen] = useState(false);


  const handleSubmitFiles = async() => {
  // upload logic or form submission
  console.log("Submitting files:", file);
    const result= await uploadFile(file[0])
    console.log("re",result);
   
    if(result.success){
      console.log("workking");
      
       setOpen(false);
    }
    


};
const handleFileUpload = (files: File[]) => {
  setFile(files);

  console.log(files)

  const newPreviews: string[] = [];
  let loadedCount = 0;

  files.forEach((f, idx) => {
    const reader = new FileReader(); 

    reader.onloadend = () => {
      newPreviews[idx] = reader.result as string;
      loadedCount++;

      if (loadedCount === files.length) {
        setPreviews(newPreviews); // only set when all loaded
      }
    };

    reader.readAsDataURL(f);
  });
};
  

  return (
    <div>
      <header className="bg-gray-200  border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">File Storage</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <HardDrive className="w-4 h-4" />
              <span>2.4 GB used of 15 GB</span>
            </div>
          </div>
          {user && (
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                
              
                <ReusableDialog
      open={open}
      setOpen={setOpen}
      triggerText={<Upload className="w-4 h-4" />}
    >
      <FileUpload onChange={handleFileUpload} />

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {previews.map((src, index) => {
            const fileType = file[index]?.type;
            return (
              <div key={index} className="p-2 border rounded relative h-32">
                {fileType?.startsWith("image/") ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={src}
                      alt={file[index]?.name || "Preview image"}
                      layout="fill"
                      objectFit="cover"
                      unoptimized
                    />
                  </div>
                ) : fileType?.includes("pdf") ? (
                  <iframe
                    src={src}
                    title={`pdf-${index}`}
                    className="w-full h-full"
                  />
                ) : (
                  <p className="text-sm text-gray-300">{file[index]?.name}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {previews.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmitFiles}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      )}
    </ReusableDialog>

              </button>
          

              <ReusableMenu
                buttonLabel={<User />}
                menuItems={[
                  {
                    label: "Profile",
                    onClick: () => console.log("Profile clicked"),
                  },
                  {
                    label: "My account",
                    onClick: () => console.log("Account clicked"),
                  },
                  {
                    label: "Logout",
                    onClick: () => logoutUser(),
                  },
                ]}
              />
            </div>
          )}
          {!user && (
            <div className="space-x-4">
              <AuthDialogue triggerText="Login">
                <Login />
              </AuthDialogue>
              <AuthDialogue triggerText="Signup">
                <Signup />
              </AuthDialogue>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
