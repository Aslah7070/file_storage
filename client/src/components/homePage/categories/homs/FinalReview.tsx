import { IFile } from "@/components/types/type";
import Image from "next/image";
import { useState } from "react";

export default function FilePreview({ file }: { file: IFile }) {
  const [playVideo, setPlayVideo] = useState(false);
  console.log("fu",file);
  

  const isImage = file.contentType?.startsWith("image/");
  const isPDF = file.contentType === "application/pdf";
  const isVideo = file.contentType?.startsWith("video/");

  return (
    <div className="w-20 h-12 rounded border bg-gray-100 flex items-center justify-center overflow-hidden">
      {isImage && file.url ? (
  <img
    src={file.url}
    alt={file.originalName || "Uploaded Image"}
    width={100}
    height={100}
    className="object-cover rounded border"
  />
) : isPDF && file.url ? (
   <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm text-blue-600 underline"
        >
          View PDF
        </a>
) : isVideo && file.url ? (
  <div onClick={() => setPlayVideo(!playVideo)} className="cursor-pointer">
    {playVideo ? (
      <video width="128" height="128" controls>
        <source src={file.url} type={file.contentType} />
        Your browser does not support the video tag.
      </video>
    ) : (
      <div className="w-32 h-32 flex items-center justify-center bg-black text-white text-xs">
        Click to Play Video
      </div>
    )}
  </div>
) : (
  <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded border text-gray-500 text-xs text-center px-2">
    {file.contentType?.split("/")[1]?.toUpperCase() || "FILE"}
  </div>
)}
    </div>
  );
}
