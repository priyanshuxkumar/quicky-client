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


