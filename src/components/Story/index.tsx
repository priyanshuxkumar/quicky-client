'use client';

import { useChatContext } from "@/context/ChatContext";
import axios from "axios";
import { CircleFadingPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "../../../clients/api";
import { getSignedUrlOfStoryMediaQuery } from "../../../graphql/query/story";
import ShowStoryMedia from "../ShowStoryMedia";
import { createStoryMutation } from "../../../graphql/mutation/story";


const Story = ({ storyUser , currentUserStory}: any) => {
  const router = useRouter();

  const { setStoryUserChatId } = useChatContext(); //get chatId of StoryUser for reply on msg

  const handleStoryClickFn = () => {
    router.push(`/stories/${storyUser?.username}/${storyUser?.id}`);
    setStoryUserChatId(storyUser?.chatId); //assign chatId of storyUser
  };

  //Upload story
  const [storyMediaUrl, setStoryMediaUrl] = useState("");

  const [isSelectedStoryMediaPageShowing, setIsSelectedStoryMediaPageShowing] = useState(false);

  const [selectedImageURL, setSelectedImageURL] = useState(null);

  const handleSelectStoryMediaVisibility = () => {
      setIsSelectedStoryMediaPageShowing(!isSelectedStoryMediaPageShowing)
  };

  //Get image file for sending
  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();

      const file: File | undefined | null | string = input.files?.item(0);
      if (!file) return;
      if (file) {
        const tempUrl = URL.createObjectURL(file);
        setSelectedImageURL(tempUrl)
      }
      console.log(file)
      const { getSignedUrlOfStoryMedia } = await graphqlClient.request(
        getSignedUrlOfStoryMediaQuery,
        {
          mediaName: file.name,
          mediaType: file.type,
        }
      );

      if(getSignedUrlOfStoryMedia){
        setIsSelectedStoryMediaPageShowing(true)
      };
      
      if (getSignedUrlOfStoryMedia) {
        await axios.put(getSignedUrlOfStoryMedia, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        const url = new URL(getSignedUrlOfStoryMedia);
        const myFilePath = `${url.origin}${url.pathname}`;
        setStoryMediaUrl(myFilePath);
      }
    };
  }, []);

  //Handle select Image -
  const handleSelectMedia = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".jpg, .jpeg, .png");

    const handlerFn = handleInputChangeFile(input);
    input.addEventListener("change", handlerFn);

    input.click();
  }, [handleInputChangeFile]);

  //Upload story 
  const handleUploadStory = async () => {
   toast.loading("Uploading story...", { id: "1" });
   const response = await graphqlClient.request(createStoryMutation , {mediaUrl: storyMediaUrl})
   if(response.createStory.success){
       setIsSelectedStoryMediaPageShowing(false);
       toast.success("Uploaded successfully", { id: "1" });
       setStoryMediaUrl('')
   };
  };
  return (
    <>
    <div className="my-2 mx-3 cursor-pointer w-14 h-auto relative">
      {storyUser && storyUser?.avatar && (
        <Image
          onClick={handleStoryClickFn}
          priority={false}
          className={`inline-block min-h-14 min-w-14 max-h-14 max-w-14  rounded-full ring-2 ring-accent-color ring-offset-2 dark:ring-offset-black`}
          src={storyUser?.avatar}
          alt="avatar"
          height={20}
          width={20}
        />
      )}
      {currentUserStory === "true" && (
        <div
          onClick={handleSelectMedia}
          className="absolute bottom-5 -right-1 bg-accent-color rounded-full p-1"
        >
          <CircleFadingPlus strokeWidth={2} size={16} className="text-white" />
        </div>
      )}
      <p className="text-xs text-center mt-2 text-black font-medium dark:text-white truncate">
        {currentUserStory == "true" ? "My Story" : storyUser?.username}
      </p>
    </div>

    {/* SHowing Story selected media */}
      {isSelectedStoryMediaPageShowing && 
        <div className="absolute top-0 left-0 backdrop-blur-sm z-50">
          <ShowStoryMedia handleUploadStory={handleUploadStory} handleSelectStoryMediaVisibility={handleSelectStoryMediaVisibility} selectedImageURL={selectedImageURL}/>
        </div>
      }
    </>
  );
};

export default Story;