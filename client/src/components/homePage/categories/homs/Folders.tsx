import axiosInstance from "@/lib/service/api";
import { Folder, MoreVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Folders = () => {
  const [contentType, setContentTypes] = useState<string>("");
  const [fils, setFiles] = useState([]);
  const folders = [
    {
      id: 1,
      name: "PDFs",
      items: 45,
      modified: "2 hours ago",
      color: "bg-purple-500",
      size: "2.1 GB",
      contentType: "application/pdf",
    },
    {
      id: 2,
      name: "Images",
      items: 238,
      modified: "1 day ago",
      color: "bg-green-500",
      size: "15.6 GB",
      contentType: "image/png",
    },
    {
      id: 3,
      name: "Documents",
      items: 67,
      modified: "3 days ago",
      color: "bg-blue-500",
      size: "456 MB",
      contentType: "application/msword",
    },
    {
      id: 4,
      name: "Videos",
      items: 23,
      modified: "5 hours ago",
      color: "bg-orange-500",
      size: "892 MB",
      contentType: "video/mp4",
    },
  ];
      async function display() {
      const files = await axiosInstance.get(
        `/file/find?contentType=${contentType}`
      );

      console.log(files, "dfffffffffffffffff");
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
   const resutlt=await axiosInstance.post(`/file/delete/${id}`)
   console.log(resutlt)
   if(resutlt.data.success){
    toast.success("file deleted")
    display();
   }

};
  return (
    <div className="space-y-8 ">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Folder className="w-5 h-5 mr-2 text-blue-600" />
          Folders
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2  xl:grid-cols-2 gap-4">
          {folders.map((folder) => (
            <div
              key={folder.id}
              onClick={() => setContentTypes(folder.contentType)}
              className={`group relative p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 `}
              // onClick={() => toggleSelection(folder.id)}
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
      </div>

     {fils.length > 0 && (
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Files</h3>
    <ul className="space-y-4">
      {fils.map((file: any) => (
        <li
          key={file._id}
          className="p-4 bg-white rounded shadow border border-gray-200 flex items-start gap-4"
        >
          {/* Show image preview if file is image */}
          {file.contentType?.startsWith("image/") ? (
            <img
              src={file.url}
              alt={file.originalName}
              className="w-20 h-20 object-cover rounded border"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded border text-gray-500 text-xs text-center px-1">
              {file.contentType?.split("/")[1]?.toUpperCase() || "FILE"}
            </div>
          )}

          {/* File Details */}
          <div className="flex-1">
            <div className="font-medium break-words">{file.originalName}</div>
            <div className="text-sm text-gray-500">{file.contentType}</div>
            <a
              href={file.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline mt-1 inline-block"
            >
              Download
            </a>
          </div>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(file._id)}
            className="text-red-600 hover:text-red-800 text-sm ml-4"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default Folders;
