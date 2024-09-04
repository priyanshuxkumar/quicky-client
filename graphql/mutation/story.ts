import { graphql } from "../../gql";

export const createStoryMutation = graphql(`
  #graphql
  mutation CreateStory($mediaUrl: String!) {
    createStory(mediaUrl: $mediaUrl) {
      success
      message
    }
  }
`);

export const deleteStoryMutation = graphql(`
  #graphql
  mutation DeleteStory($storyId: String!) {
    deleteStory(storyId: $storyId) {
      success
      message
    }
  }
`);
