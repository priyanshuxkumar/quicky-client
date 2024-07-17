import { getMediaType } from "@/config/GetMediaType";
import { X } from "lucide-react";
import Image from "next/image";
import Video from "../Video";

const ShowMediaFullView = ({ mediaUrl, handleFullScreenOfMedia }: any) => {
  const mediaType = getMediaType(mediaUrl);

  return (
    <>
      <div className="w-10/12 h-3/4 flex justify-center ">
        {mediaUrl &&
          (mediaType == "image" ? (
            <Image
              priority={false}
              className="inline-block w-fit object-cover"
              src={mediaUrl}
              alt="sharedMedia"
              height={500}
              width={500}
            />
          ) : (
            <Video mediaUrl={mediaUrl} />
          ))}
      </div>
      <div
        onClick={handleFullScreenOfMedia}
        className="cursor-pointer m-4 absolute right-7 top-6 z-50"
      >
        <X size={28} className="text-slate-800" />
      </div>
    </>
  );
};

export default ShowMediaFullView;
