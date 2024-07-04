import React from "react";
import { graphqlClient } from "../../../clients/api";
import { deleteStoryMutation } from "../../../graphql/mutation/story";
import { Story } from "../../../gql/graphql";

const DeleteMenu = ({handleStoryMenu, currentStoryId , userStories }:any) => {
    const handleStoryDelete = async () => {
        const response = await graphqlClient.request(deleteStoryMutation , {storyId:currentStoryId})
        if(response.deleteStory.success == true){
            console.log("entered here")
            const updatedStories = userStories.filter((story:Story) => story?.id !== currentStoryId)
            console.log(updatedStories)
            handleStoryMenu(); //Close Story menu tab
        }
    };
  return (
    <div className="w-10/12 sm:w-1/5">
      <div onClick={handleStoryDelete} className="my-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 cursor-pointer">
        <p className="text-center">Delete</p>
      </div>
      <div onClick={handleStoryMenu} className="my-2 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 cursor-pointer">
        <p className="text-center">Cancel</p>
      </div>
    </div>
  );
};

export default DeleteMenu;
