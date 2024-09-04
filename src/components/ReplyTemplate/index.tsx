import Image from "next/image";
import { ArrowDownLeft } from "lucide-react";

// replied stories render compo. 
const ReplyTemplate = (mediaUrl: any) => {
  return (
    <>
      <div className="flex items-center text-xs text-black dark:text-white mb-1">
        Replied to this story{" "}
        <span>
          <ArrowDownLeft
            size={14}
            className="text-black dark:text-white ml-1"
          />
        </span>
      </div>
      <div>
        
        <Image
          priority={false}
          className="inline-block w-24 h-fit  rounded-xl object-cover"
          src={mediaUrl.mediaUrl}
          alt="story-media"
          height={30}
          width={30}
        />
      </div>
    </>
  );
};

export default ReplyTemplate;
