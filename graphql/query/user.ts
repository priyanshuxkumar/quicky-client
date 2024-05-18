import { graphql } from "../../gql";

export const getCurrentUserQuery = graphql(`
    #graphql
    query GetCurrentUser {
        getCurrentUser {
            id
            username
            firstname
            lastname
            email
            avatar 
        }
    }
`)

export const checkUsernameIsValidQuery = graphql(`
    #graphql
    query CheckUsernameIsValid($username: String!) {
        checkUsernameIsValid(username: $username)
    }
`)

export const checkEmailIsValidQuery = graphql(`
    #graphql
    query CheckEmailIsValid($email: String!) {
        checkEmailIsValid(email: $email)
    }
`)


export const getUserByUsernameQuery = graphql(`
    #graphql
    query GetUserByUsername($username: String!){
        getUserByUsername(username: $username){
            id
            firstname
            lastname
            username
            avatar
            isActive
            users {
                chat {
                    id
                }
            }
        }
    }
`)
