"use client";

import { Chat } from "../../../gql/graphql";

interface MessageCardProps {
  data: Chat;
  // onClick: (chatId: string) => void;
}

const MessageCard = () => {
  return (
    <>
      <div className="bg-gray-200 w-[450px] my-2 px-4 py-2 rounded-2xl">
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
          at. Enim assumenda natus necessitatibus? Amet laboriosam ullam
          voluptatum voluptatem nemo.
        </p>
      </div>
      <div className="px-3">
        <span className="text-xs">10:20</span>
      </div>
    </>
  );
};

export default MessageCard;
