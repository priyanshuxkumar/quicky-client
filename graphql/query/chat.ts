import { graphql } from "../../gql";

export const fetchChatMessagesQuery = graphql(`
  #graphql
  query FetchChatMessages($chatId: ID $recipientId: ID $limit: Int $offset: Int) {
    fetchAllMessages(chatId: $chatId recipientId: $recipientId limit: $limit offset: $offset) {
      id
      senderId
      recipientId
      content
      createdAt
      isSeen
      storyId
      story {
        mediaUrl
      }
      shareMediaUrl
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
          isSeen
          senderId
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

export const fetchSharedMediaOfChatQuery = graphql(`
  #graphql
  query FetchSharedMediaOfChat($chatId:String!){
    fetchSharedMediaOfChat(chatId:$chatId){
      id
      shareMediaUrl
    }
  }

`)