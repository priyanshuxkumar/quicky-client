import { graphql } from "../../gql";

export const loginUserMutation = graphql(`
  #graphql
  mutation LoginUser($payload: UserLoginInput!) {
    loginUser(payload: $payload) {
      user {
        firstname
        lastname
      }
      token
    }
}
`)

export const registerUserMutation = graphql(`
    #graphql
    mutation RegisterUser($payload: UserCreateInput!){
      registerUser(payload: $payload) {
        username
        firstname
        lastname
      }
    }
`)
