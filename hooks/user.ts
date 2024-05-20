import { graphqlClient } from "../clients/api"
import { SendMessageInput, UserCreateInput, UserLoginInput } from "../gql/graphql";
import { loginUserMutation, registerUserMutation } from "../graphql/mutation/user"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCurrentUserQuery } from "../graphql/query/user";
import { fetchAllChatsQuery, fetchChatMessagesQuery } from "../graphql/query/chat";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { sendMessageMutation } from "../graphql/mutation/chat";
import { useChatContext } from "@/context/ChatIdContext";
import socket from "@/lib/socket";




export const useRegisterUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (payload: UserCreateInput) =>
            graphqlClient.request(registerUserMutation, {payload}),
        
        onMutate: (payload) => toast.loading('Registering', {id: '2'}),

        onSuccess: async(payload) => {
            await queryClient.invalidateQueries({ queryKey: ["register"] }),
            toast.success('Signup successfull', {id: '2'})
        },
        onError: (error) => {
          console.error('Error in Register User:', error);
          toast.error("Invalid credentials", {id: '2'})
        }
    });
    return mutation;
};

export const useLoginUser = () => {
    const router = useRouter()
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: async (payload: UserLoginInput) => {
        const response = await graphqlClient.request(loginUserMutation, { payload });
        const userData = response.loginUser.user

        if(userData){
            localStorage.setItem('__token__', response?.loginUser?.token);
            router.replace('/chats')
        }
        return response;
      },
      onMutate: (payload) => toast.loading('Logging in', { id: '1' }),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['curent-user'] });
        toast.success('Login successful!', { id: '1' });
      },
      onError: (error) => {
        console.error('Login error:', error);
        toast.error('Invalid Credentials', { id: '1' });
      },
    });
  
    return mutation;
};

export const useCurrentUser =  () => {
    const query = useQuery({
        queryKey: ["current-user"],
        queryFn: () => graphqlClient.request(getCurrentUserQuery),
    })
    return { ...query, user: query.data?.getCurrentUser};
};

export const useFetchAllChats = () => {
  const query = useQuery({
      queryKey: ["all-chats"],

      queryFn: () => graphqlClient.request(fetchAllChatsQuery),
  })
  return { ...query, chats: query.data?.fetchAllChats};
}



export const useFetchChatMessages = (chatId?: string) => {

  const { selectedChatId }: any = useChatContext();

  // Use useQuery to manage fetching the chat messages
  socket.emit("join chat", selectedChatId);

  const query = useQuery({
      queryKey: ['chat-messages', chatId], // Unique query key for caching
      queryFn: () => {
        if (chatId) {
          // Fetch chat messages only if chatId is provided
          return graphqlClient.request(fetchChatMessagesQuery, { chatId });
        } else {
          // Return empty array if chatId is not provided
          return { fetchAllMessages: [] };
        }
      },
      enabled: !!chatId, // Enable query only if chatId is provided
  });

  // Return the data, loading status, and error from the query
  return {
      chatMessages: query.data?.fetchAllMessages,
  };
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
      mutationFn : async (payload : SendMessageInput) => {
        const response = await graphqlClient.request(sendMessageMutation, {payload})
        // console.log("res",response)

        return response;
      },
      onMutate: (payload) => toast.loading('Sending message', { id: '1' }),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['send-message'] });
        toast.success('Message sent successfully!', { id: '1' });

      },
      onError: (error) => {
        console.error('Message send failed', error);
        toast.error('Message not sent', { id: '1' });
      },
  })
  return mutation;
}

