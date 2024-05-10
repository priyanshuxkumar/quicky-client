import { graphql } from "../../gql";

export const fetchChatMessagesQuery = graphql(`
  #graphql
  query FetchChatMessages($chatId: ID!) {
    fetchAllMessages(chatId: $chatId) {
      id
      content
      senderId
      recipientId
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
        }
      }
      messages {
            content
      }
    }
  }
`);
