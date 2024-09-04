import { useQuery } from "@tanstack/react-query";
import { graphqlClient } from "../clients/api"
import { fetchStoryOfChatUsersQuery, fetchUserStoriesQuery } from "../graphql/query/story";

export const useFetchStories = () => { //User detail of stories for render story circle
    const query = useQuery({
        queryKey: ["fetch-stories"],
        queryFn: () => graphqlClient.request(fetchStoryOfChatUsersQuery),
        staleTime: 5 * 60 * 1000, 
        refetchOnWindowFocus: false,
    })
    
    return { ...query, stories: query.data?.fetchStoryOfChatUsers};
};

export const useFetchSingleUserStories = (userId:string) => { //single user all stories
    const query = useQuery({
        queryKey: ["fetch-single-user-stories" , userId],
        queryFn: () => graphqlClient.request(fetchUserStoriesQuery , {userId}),
        refetchOnWindowFocus: false,
    })

    return{ ... query , userStories: query.data?.fetchUserStories}
};