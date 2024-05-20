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
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChatContext = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatIdContext must be used within a ChatIdProvider');
    }
    return context;
};

interface ChatIdProviderProps {
    children: ReactNode;
}

export const ChatIdProvider: React.FC<ChatIdProviderProps> = ({ children }) => {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(false);
    const [recipientUser, setRecipientUser] = useState<User | null>(null);

    return (
        <ChatContext.Provider value={{ selectedChatId, setSelectedChatId , isChatBoxOpen, setIsChatBoxOpen , recipientUser , setRecipientUser}}>
            {children}
        </ChatContext.Provider>
    );
};
