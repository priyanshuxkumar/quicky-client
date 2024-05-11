'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatIdContextType {
    selectedChatId: string | null;
    setSelectedChatId: (chatId: string) => void;
}

const ChatIdContext = createContext<ChatIdContextType | null>(null);

export const useChatIdContext = (): ChatIdContextType => {
    const context = useContext(ChatIdContext);
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

    return (
        <ChatIdContext.Provider value={{ selectedChatId, setSelectedChatId }}>
            {children}
        </ChatIdContext.Provider>
    );
};
