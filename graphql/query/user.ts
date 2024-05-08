import { graphql } from "../../gql";

export const getCurrentUserQuery = graphql(`
    #graphql
    query GetCurrentUser {
        getCurrentUser {
            username
            firstname
            lastname
            email
            avatar  
            chats {
                id
                users {
                    id
                    avatar
                    firstname
                    lastname
                }
            }
        }
    }
`)