import { graphql } from "../../gql";

export const sendMessageMutation = graphql(`
    #graphql
    mutation SendMessage($payload: SendMessageInput!){
        sendMessage(payload: $payload){
            id
            senderId
            content
            chatId
            recipientId
            createdAt
        }
    }
`)