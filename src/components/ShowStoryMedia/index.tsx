import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

const ShowStoryMedia = ({handleSelectStoryMediaVisibility, selectedImageURL , handleUploadStory}:any) => {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex gap-4 h-full justify-center items-center">
          <Image
            priority={false}
            className="inline-block h-3/4 w-full rounded-lg object-cover"
            src={selectedImageURL}
            alt="story-media"
            height={100}
            width={100}
          />
        <div>
          <p onClick={handleUploadStory} className="text-base cursor-pointer">Share</p>
        </div>
      </div>
      <div onClick={handleSelectStoryMediaVisibility}>
        <X size={28} className="text-slate-800" />
      </div>
    </div>
  );
};

export default ShowStoryMedia;
