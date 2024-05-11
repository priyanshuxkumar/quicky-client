import { graphql } from "../../gql";

export const createMessageMutation = graphql(`
    #graphql
    mutation CreateMessage($payload: CreateMessageInput!){
        createMessage(payload: $payload){
            senderId
            content
            chatId
        }
    }
`)