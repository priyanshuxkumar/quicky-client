import { X } from "lucide-react";
import React from "react";
import Image from "next/image";
import SendButton from "../Button";

const PopupSendMedia = ({ mediaUrl, handleSendMediaPopup ,handleSendMessage}: any) => {
  return (
    <div className="popup-send-photo-container bg-white sm:w-1/4 sm:h-1/3 rounded-md shadow-lg ">
      <div className="top-bar bg-white dark:bg-dark-primary-bg flex w-full px-4 py-2 gap-6 items-center justify-between sticky top-0 z-50">
        <div className="w-full flex items-center justify-between gap-3">
          <div onClick={handleSendMediaPopup} className="cursor-pointer">
            <X size={24} className="text-black dark:text-white " />
          </div>
          <div>
            <p className="text-black text-md dark:text-white ">Send Photo</p>
          </div>
          <div onClick={handleSendMessage} className="snd-btn">
            <SendButton/>
          </div>
        </div>
      </div>

      <div className="w-full h-full">
        {mediaUrl && (
          <Image
            priority={false}
            className="w-full h-full object-cover"
            src={mediaUrl}
            alt="send-media"
            height={200}
            width={200}
          />
        )}
      </div>
    </div>
  );
};

export default PopupSendMedia;
