import { sendMessageFn } from "@/components/Layout/QuickyLayout";
import socket from "@/lib/socket";
import toast from "react-hot-toast";

export const sendMessage = async ({ messageContent, selectedChatId = null, recipientUser, setIsMessageSending, setMessageContent , storyId = null }:any) => {
    setIsMessageSending(true);
  
    if (messageContent.trim() === '') {
      toast.error('Message cannot be empty');
      setIsMessageSending(false);
      return;
    }
  
    try {
      const variables = {
        chatId: selectedChatId || null,
        content: messageContent,
        recipientId: recipientUser?.id,
        storyId: storyId
      };
      const response = await sendMessageFn(variables);
      if (response) {
        socket.emit("sendMessage", response);
      } else {
        toast.error("Error sending message");
      }
      setMessageContent("");
      setIsMessageSending(false);
    } catch (error) {
      console.error("Error occurred while sending message:", error);
      setIsMessageSending(false);
      setMessageContent('');
    }
};