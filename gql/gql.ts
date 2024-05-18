/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    #graphql\n    mutation SendMessage($payload: SendMessageInput!){\n        sendMessage(payload: $payload){\n            senderId\n            content\n            chatId\n        }\n    }\n": types.SendMessageDocument,
    "\n  #graphql\n  mutation LoginUser($payload: UserLoginInput!) {\n    loginUser(payload: $payload) {\n      user {\n        firstname\n        lastname\n      }\n      token\n    }\n}\n": types.LoginUserDocument,
    "\n    #graphql\n    mutation RegisterUser($payload: UserCreateInput!){\n      registerUser(payload: $payload) {\n        username\n        firstname\n        lastname\n      }\n    }\n": types.RegisterUserDocument,
    "\n    #graphql\n    mutation SendOTPVerificationEmail($email: String!){\n      sendOTPVerificationEmail(email: $email) {\n        success\n        message\n      }\n    }\n": types.SendOtpVerificationEmailDocument,
    "\n    #graphql\n    mutation VerifyOTP($email: String!, $otp:String!){\n      verifyOTP(email: $email , otp: $otp) {\n        success\n        message\n      }\n    }\n": types.VerifyOtpDocument,
    "\n  #graphql\n  query FetchChatMessages($chatId: ID!) {\n    fetchAllMessages(chatId: $chatId) {\n      id\n      content\n      senderId\n      recipientId\n      createdAt\n    }\n  }\n": types.FetchChatMessagesDocument,
    "\n  #graphql\n  query FetchAllChats {\n    fetchAllChats {\n      id\n      users {\n        user {\n          id\n          avatar\n          firstname\n          lastname\n          username\n          isActive\n        }\n      }\n      messages {\n            content\n            createdAt\n      }\n    }\n  }\n": types.FetchAllChatsDocument,
    "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            username\n            firstname\n            lastname\n            email\n            avatar \n        }\n    }\n": types.GetCurrentUserDocument,
    "\n    #graphql\n    query CheckUsernameIsValid($username: String!) {\n        checkUsernameIsValid(username: $username)\n    }\n": types.CheckUsernameIsValidDocument,
    "\n    #graphql\n    query CheckEmailIsValid($email: String!) {\n        checkEmailIsValid(email: $email)\n    }\n": types.CheckEmailIsValidDocument,
    "\n    #graphql\n    query GetUserByUsername($username: String!){\n        getUserByUsername(username: $username){\n            id\n            firstname\n            lastname\n            username\n            avatar\n            isActive\n            users {\n                chat {\n                    id\n                }\n            }\n        }\n    }\n": types.GetUserByUsernameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation SendMessage($payload: SendMessageInput!){\n        sendMessage(payload: $payload){\n            senderId\n            content\n            chatId\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation SendMessage($payload: SendMessageInput!){\n        sendMessage(payload: $payload){\n            senderId\n            content\n            chatId\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation LoginUser($payload: UserLoginInput!) {\n    loginUser(payload: $payload) {\n      user {\n        firstname\n        lastname\n      }\n      token\n    }\n}\n"): (typeof documents)["\n  #graphql\n  mutation LoginUser($payload: UserLoginInput!) {\n    loginUser(payload: $payload) {\n      user {\n        firstname\n        lastname\n      }\n      token\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation RegisterUser($payload: UserCreateInput!){\n      registerUser(payload: $payload) {\n        username\n        firstname\n        lastname\n      }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation RegisterUser($payload: UserCreateInput!){\n      registerUser(payload: $payload) {\n        username\n        firstname\n        lastname\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation SendOTPVerificationEmail($email: String!){\n      sendOTPVerificationEmail(email: $email) {\n        success\n        message\n      }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation SendOTPVerificationEmail($email: String!){\n      sendOTPVerificationEmail(email: $email) {\n        success\n        message\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation VerifyOTP($email: String!, $otp:String!){\n      verifyOTP(email: $email , otp: $otp) {\n        success\n        message\n      }\n    }\n"): (typeof documents)["\n    #graphql\n    mutation VerifyOTP($email: String!, $otp:String!){\n      verifyOTP(email: $email , otp: $otp) {\n        success\n        message\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query FetchChatMessages($chatId: ID!) {\n    fetchAllMessages(chatId: $chatId) {\n      id\n      content\n      senderId\n      recipientId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query FetchChatMessages($chatId: ID!) {\n    fetchAllMessages(chatId: $chatId) {\n      id\n      content\n      senderId\n      recipientId\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query FetchAllChats {\n    fetchAllChats {\n      id\n      users {\n        user {\n          id\n          avatar\n          firstname\n          lastname\n          username\n          isActive\n        }\n      }\n      messages {\n            content\n            createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query FetchAllChats {\n    fetchAllChats {\n      id\n      users {\n        user {\n          id\n          avatar\n          firstname\n          lastname\n          username\n          isActive\n        }\n      }\n      messages {\n            content\n            createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            username\n            firstname\n            lastname\n            email\n            avatar \n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            username\n            firstname\n            lastname\n            email\n            avatar \n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query CheckUsernameIsValid($username: String!) {\n        checkUsernameIsValid(username: $username)\n    }\n"): (typeof documents)["\n    #graphql\n    query CheckUsernameIsValid($username: String!) {\n        checkUsernameIsValid(username: $username)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query CheckEmailIsValid($email: String!) {\n        checkEmailIsValid(email: $email)\n    }\n"): (typeof documents)["\n    #graphql\n    query CheckEmailIsValid($email: String!) {\n        checkEmailIsValid(email: $email)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetUserByUsername($username: String!){\n        getUserByUsername(username: $username){\n            id\n            firstname\n            lastname\n            username\n            avatar\n            isActive\n            users {\n                chat {\n                    id\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetUserByUsername($username: String!){\n        getUserByUsername(username: $username){\n            id\n            firstname\n            lastname\n            username\n            avatar\n            isActive\n            users {\n                chat {\n                    id\n                }\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;