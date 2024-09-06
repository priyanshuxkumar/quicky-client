import { Message } from "../../../gql/graphql";
import { useCurrentUser } from "../../../hooks/user";

import { messageSendTime } from "@/config/TimeServices";
import ReplyTemplate from "../ReplyTemplate";

import Image from "next/image";
import { useState } from "react";
import ShowMediaFullView from "../ShowMediaFull";
import { getMediaType } from "@/config/GetMediaType";
import Video from "../Video";
import Loading from "../loading";

interface MessageCardProps {
  data: Message;
}

const MessageCard: React.FC<MessageCardProps> = ({ data }) => {
   const { user } = useCurrentUser();

  //Message send time
  const msgCreatedTime = messageSendTime(new Date(Number(data?.createdAt.toString())));

  //Show Media on Full Screen
  const [isFullScreenOpen , setIsFullScreenOpen] = useState(false);

  const handleFullScreenOfMedia = () => {
    setIsFullScreenOpen(!isFullScreenOpen)
  };

  //get mediaType 
  const mediaType = getMediaType(data?.shareMediaUrl)

  return (
    <>
      <div
        className={`flex flex-col justify-end mb-4 ${
          data?.senderId == user?.id && "place-items-end"
        }`}
      >
        {/* replied stories render compo.  */}
        {data?.storyId &&(
          <div className="story-template-render">
            {<ReplyTemplate mediaUrl={data.story?.mediaUrl} />}
          </div>
        )}

        {/* Shared Image  */}
        {data?.shareMediaUrl && (
          <div
            className={`flex ${
              data?.senderId == user?.id && "justify-end"
            } w-full bg-transparent`}
          >
            {data?.shareMediaUrl ?
              (mediaType == "image" ? (
                <Image
                  onClick={handleFullScreenOfMedia}
                  priority={false}
                  className="inline-block w-40 h-48 rounded-lg object-cover border-[0.5px] border-gray-500 cursor-pointer"
                  src={data?.shareMediaUrl}
                  alt="sharedMedia"
                  height={100}
                  width={100}
                />
              ) : (
                <div onClick={handleFullScreenOfMedia}>
                <Video mediaUrl={data?.shareMediaUrl} />
                </div>
              )) : <Loading size={32} width={2}/>}
          </div>
        )}
        {/* Message text content */}
        {data?.content && (
          <div
            className={`${
              data?.senderId == user?.id
                ? "bg-accent-color text-white rounded-se-none"
                : "bg-slate-100 dark:bg-[#303030] rounded-es-none "
            } w-fit max-w-72 my-2 px-2 py-1 rounded-xl`}
          >
            <p> {data?.content}</p>
          </div>
        )}
        <div className="ml-1 w-fit">
          <span className="text-xs text-black dark:text-white">
            {msgCreatedTime}
          </span>
        </div>
      </div>

      {/* Full Screen of Media Comp  */}
      {isFullScreenOpen && (
        <div className="w-full h-full backdrop-blur-md fixed top-0 left-0 flex justify-center items-center">
          <ShowMediaFullView
            handleFullScreenOfMedia={handleFullScreenOfMedia}
            mediaUrl={data?.shareMediaUrl}
          />
        </div>
      )}
    </>
  );
};

export default MessageCard;
