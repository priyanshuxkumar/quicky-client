import { graphql } from "../../gql";

//Fetch single user story
export const fetchUserStoriesQuery = graphql(`
  #graphql
  query FetchUserStories($userId: String!) {
    fetchUserStories(userId: $userId) {
        id
        mediaUrl
        user {
           id
           username
           avatar
        }
        expiresAt
        createdAt
        updatedAt
    }
  }
`);

//Fetch all stories to render circle 
export const fetchStoryOfChatUsersQuery = graphql(`
  #graphql
  query FetchStoryOfChatUsers {
    fetchStoryOfChatUsers {
      id
      username
      avatar
      chatId
    }
  }
`);

export const getSignedUrlOfStoryMediaQuery = graphql(`
  #graphql
  query GetSignedUrlOfStoryMedia($mediaName: String! $mediaType: String!) {
    getSignedUrlOfStoryMedia(mediaName: $mediaName mediaType: $mediaType)
  }
`)