import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

//Story Upload Component
const ShowStoryMedia = ({handleSelectStoryMediaVisibility,selectedImageURL,handleUploadStory}: any) => {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex flex-col gap-4 sm:w-1/3 h-full justify-center items-center">
        <div className="w-full px-3 flex justify-between items-center">
          <div onClick={handleSelectStoryMediaVisibility}>
            <X size={28} className="text-slate-800 cursor-pointer" />
          </div>
          <div>
            <p onClick={handleUploadStory} className="text-base cursor-pointer">
              Share
            </p>
          </div>
        </div>
        <Image
          priority={false}
          className="inline-block h-3/4 w-full object-cover"
          src={selectedImageURL}
          alt="story-media"
          height={100}
          width={100}
        />
      </div>
    </div>
  );
};

export default ShowStoryMedia;
