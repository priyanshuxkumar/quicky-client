import React from "react";
import Loading from "../loading";
import { SendHorizontal } from "lucide-react";

const SendButton = ({ messageContent, isMessageSending}: any) => {
  return (
    <button
      // disabled={!messageContent?.length}
      type="submit"
      className=" p-2 rounded-full cursor-pointer"
    >
      {isMessageSending ? (
        <Loading size={24} width={2} />
      ) : (
        <SendHorizontal className="text-[#3290EC] text-[1.6rem]" />
      )}
    </button>
  );
};

export default SendButton;
