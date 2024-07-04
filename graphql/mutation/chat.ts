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

export const updateMsgSeenStatusMutation = graphql(`
    #graphql
    mutation UpdateMsgSeenStatus($chatId:String!){
        updateMsgSeenStatus(chatId: $chatId){
            success
            message
        }
    }
`)