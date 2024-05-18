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

export const sendOTPVerificationEmailMutation = graphql(`
    #graphql
    mutation SendOTPVerificationEmail($email: String!){
      sendOTPVerificationEmail(email: $email) {
        success
        message
      }
    }
`)
export const verifyOTPMutation = graphql(`
    #graphql
    mutation VerifyOTP($email: String!, $otp:String!){
      verifyOTP(email: $email , otp: $otp) {
        success
        message
      }
    }
`)



