import { Message } from "../../../gql/graphql";
import { useCurrentUser } from "../../../hooks/user";

import { messageSendTime, messagesTimeGroup } from "@/config/TimeServices";
import ReplyTemplate from "../ReplyTemplate";

interface MessageCardProps {
  data: Message;
}

const MessageCard: React.FC<MessageCardProps> = ({ data }) => {
  const { user } = useCurrentUser();

  //Message send time
  const msgCreatedTime = messageSendTime(new Date(Number(data?.createdAt.toString())));
  return (
    <>
      <div
        className={`flex flex-col justify-end mb-4 ${
          data?.senderId == user?.id && "place-items-end"
        }`}
      > 
      <div className="story-template-render">
        {data?.storyId && <ReplyTemplate mediaUrl ={data.story?.mediaUrl}/>}
      </div>

        <div
          className={`${
            data?.senderId == user?.id
              ? "bg-accent-color text-white rounded-se-none"
              : "bg-white dark:bg-[#303030] rounded-es-none "
          } w-fit max-w-72 my-2 px-2 py-1 rounded-xl`}
        > 
          <p className="text-sm">{data?.content}</p>
        </div>
        <div className="ml-1 w-fit">
          <span className="text-xs text-black dark:text-white">{msgCreatedTime}</span>
        </div>
      </div>
    </>
  );
};

export default MessageCard;
