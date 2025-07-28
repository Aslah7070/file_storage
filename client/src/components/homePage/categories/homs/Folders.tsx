/* eslint-disable react-hooks/exhaustive-deps */
import { IFile } from "@/components/types/type";
import axiosInstance from "@/lib/service/api";
import { Folder, MoreVertical } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FilePreview from "./FinalReview";
import { Download, Trash2 } from "lucide-react";
import { folders } from "@/constants/folder.constants";
import { useFileStore } from "@/lib/stores/useFileStore";
import { Spinner } from "@/components/ui/spinner";

const Folders = () => {
  const [contentType, setContentTypes] = useState<string>("");
  const [fils, setFiles] = useState<IFile[]>([]);
  const {file,findFileByType,loading}=useFileStore()
console.log("rew",file);


  const handleFindFiles=async(contentType:string)=>{
    const result=await findFileByType(contentType)

    if(result?.success){
         
    }
  }
  
  async function display() {
    const files = await axiosInstance.get(
      `/file/find?contentType=${contentType}`
    );

    
    const datas = files.data.result.data;
    setFiles(datas);
  }

  useEffect(() => {
    if (!contentType) {
      return;
    }

    display();
  }, [contentType]);

  const handleDelete = async (id: string) => {
    const resutlt = await axiosInstance.post(`/file/delete/${id}`);
    console.log(resutlt);
    if (resutlt.data.success) {
      toast.success("file deleted");
      display();
    }
  };
  return (
    <div className="space-y-8 w-10/12 ">
 
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Folder className="w-5 h-5 mr-2 text-blue-600" />
          Folders
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2  xl:grid-cols-2 gap-4">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() =>handleFindFiles(folder.contentType)}
              className={`group relative p-6  rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 `}
            
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 ${folder.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <Folder className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900 truncate w-full mb-1">
                  {folder.name}
                </span>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>{folder.items} items</div>
                  <div>{folder.size}</div>
                </div>
              </div>
              <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-2 hover:bg-white/60 rounded-lg transition-all duration-200">
                <MoreVertical className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
   {loading&&<Spinner/>}
      
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Files</h3>
          <ul className="space-y-4">
            {file.map((file) => (
          <li
  key={file._id}
  className="p-4 bg-white rounded shadow border border-gray-200 flex items-start gap-4"
>
  
  <FilePreview file={file} />

  <div className="flex-1">
    <div className="font-medium break-words">{file.originalName}</div>
    <div className="text-sm text-gray-500">{file.contentType}</div>
  </div>

  {/* Action Buttons */}
  <div className="flex items-center gap-3 ml-auto">
    <button
      onClick={() => handleDelete(file._id)}
      className="text-red-600 hover:text-red-800"
      title="Delete"
    >
      <Trash2 className="w-5 h-5" />
    </button>

    <a
      href={file.url}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800"
      title="Download"
    >
      <Download className="w-5 h-5" />
    </a>
  </div>
</li>
            ))}
          </ul>
        </div>
     
    </div>
  );
};

export default Folders;
