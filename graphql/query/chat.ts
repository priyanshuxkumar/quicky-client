import { graphql } from "../../gql";

export const fetchChatMessagesQuery = graphql(`
  #graphql
  query FetchChatMessages($chatId: ID $recipientId: ID) {
    fetchAllMessages(chatId: $chatId recipientId: $recipientId) {
      id
      senderId
      recipientId
      content
      createdAt
    }
  }
`);

export const fetchAllChatsQuery = graphql(`
  #graphql
  query FetchAllChats {
    fetchAllChats {
      id
      users {
        user {
          id
          avatar
          firstname
          lastname
          username
          isActive
        }
      }
      messages {
            content
            createdAt
      }
    }
  }
`);

export const getSignedUrlOfChatQuery = graphql(`
  #graphql
  query GetSignedUrlOfChat( $imageName: String! $imageType: String!) {
    getSignedUrlOfChat(imageName: $imageName imageType: $imageType)
  }
`)