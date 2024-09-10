'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../../gql/graphql';

interface ChatContextType {
    selectedChatId: string | null;
    setSelectedChatId: (chatId: string) => void;

    isChatBoxOpen: boolean;
    setIsChatBoxOpen: (isOpen: boolean) => void;

    recipientUser: User | null;
    setRecipientUser: (User: User) => void;

    storyUserChatId: string | null;
    setStoryUserChatId: (chatId: string) => void;

    latestMessages: { [key: string]: { content: string; createdAt: Date } };
    setLatestMessage: ({ chatId, newMessage }: { chatId: string; newMessage: {content: string , createdAt: Date} }) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};

interface ChatProviderProps {
    children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
    
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(false);
    const [recipientUser, setRecipientUser] = useState<User | null>(null);
    const [storyUserChatId, setStoryUserChatId] = useState<string | null>(null);
    
    const [latestMessages, setLatestMessages] = useState<{ [key: string]: { content: string; createdAt: Date } }>({});

    const setLatestMessage = ({chatId, newMessage} : {chatId:string , newMessage:{content: string , createdAt: Date}}) => {
        if (!chatId) {
            return;
        }
        setLatestMessages(prevMessages => ({
        ...prevMessages,
        [chatId]: newMessage
        }));

        
    };
    return (
        <ChatContext.Provider value={{ selectedChatId, setSelectedChatId , isChatBoxOpen, setIsChatBoxOpen , recipientUser , setRecipientUser , storyUserChatId , setStoryUserChatId ,latestMessages, setLatestMessage}}>
            {children}
        </ChatContext.Provider>
    );
};
