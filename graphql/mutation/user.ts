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
        success
        message
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

export const updateUserProfileDetailsMutation = graphql(`
    #graphql
    mutation UpdateUserProfileDetails($payload: UpdateUserProfileDetailsInput!){
      updateUserProfileDetails(payload: $payload) {
        firstname
        lastname
        username
        avatar
      }
    }
`)


export const changePasswordMutation = graphql(`
  #graphql
  mutation ChangePassword($oldPassword: String!, $newPassword: String!, $confirmPassword: String!){
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword, confirmPassword: $confirmPassword) {
      success
      message
    }
  }
`)

