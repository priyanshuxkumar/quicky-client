'use client';

import {X, ChevronLeft , ChevronRight, Play, Pause } from "lucide-react";

import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from 'react';
import { getTimeAgoString } from "@/config/TimeServices";
import { useFetchSingleUserStories } from "../../../../../hooks/story";
import { useCurrentUser } from "../../../../../hooks/user";
import { getMediaType } from "@/config/GetMediaType";
import { useChatContext } from "@/context/ChatContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loading from "@/components/loading";
import toast from "react-hot-toast";
import socket from "@/lib/socket";
import SendButton from "@/components/Button";
import Video from "@/components/Video";


const StoryPage = () => {
  const router = useRouter();
  const {user} = useCurrentUser()

  //getting chatId of story_user with current logged_in user
  const {storyUserChatId} = useChatContext()
 
  //extract userID of story owner 
  const pathname = usePathname();
  const parts = pathname.split("/");
  const STORY_USER_ID = parts[3]
  
  const {isLoading, userStories , error} = useFetchSingleUserStories(STORY_USER_ID);

  const [currentStoryIndex , setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handlePreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevIdx)=> prevIdx -1 );
    }
  },[currentStoryIndex]);

  
  let currentStory = userStories &&  userStories[currentStoryIndex];

  const handleNextStory = useCallback(() => {
    if (userStories && userStories.length - 1 > currentStoryIndex) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (userStories && userStories.length - 1 <= currentStoryIndex ){
      router.push('/chats')
    }
  },[currentStoryIndex, router, userStories]);


  //get mediaType of story media
  const mediaType = getMediaType(currentStory?.mediaUrl)
  
  //story created time
  const storyCreatedTime = getTimeAgoString(new Date(Number(currentStory?.createdAt)));

  //showing error while fetch stories
  if(error){
    toast.error("Error occured while fetching stories")
  };

  //Story reply on Message
  const [storyReplyContent , setStoryReplyContent] = useState('')
  const [isMessageSending , setIsMessageSending] = useState(false);

  
  const handleSendStoryReplyToMsg = async(e:any) => {
      e.preventDefault()
      setIsMessageSending(true);
      const messagePayload = {
        content: storyReplyContent,
        chatId: storyUserChatId,
        senderId: user?.id,
        recipientId: currentStory?.user?.id,
        storyId: currentStory?.id,
        createdAt: Date.now()
      };
      socket.emit('sendMessage', messagePayload);
      toast.success('message sent..');
      setIsMessageSending(false);
  };


  //automatically Move to next story
  useEffect(() => {
    let timer: any;
    if (!isPaused && currentStory?.mediaUrl) {
      timer = setTimeout(() => {
        setProgress((prevProgress) => {
          if(prevProgress >= 100){
            handleNextStory()
            return 0;
          };
          return prevProgress + 1
        })
      }, 50); // Update progress every 50ms
    }
    return () => clearTimeout(timer);
  }, [progress, isPaused, currentStory?.mediaUrl, handleNextStory]);

  useEffect(() => {
    setProgress(0); 
  }, [currentStoryIndex]);

  useEffect(() => {
    if(storyReplyContent){
      setIsPaused(true)
    }
  }, [isPaused , storyReplyContent]);


  const handlePlayPauseStory = useCallback(() => {
     setIsPaused(!isPaused)
  },[isPaused]);
  return (
    <div className="fixed inset-0 bg-black h-screen bg-opacity-75 flex flex-col items-center justify-center z-50">
      <div className="relative w-full sm:h-[90%] h-full max-w-md bg-gray-900 rounded-lg overflow-hidden">
        {isLoading && !currentStory?.mediaUrl  ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Loading size={32} width={2} color='white'/>
          </div>
        ) : mediaType == "image" ? (
          <Image
            priority={true}
            className="inline-block h-screen w-full rounded-xl object-cover"
            src={currentStory?.mediaUrl || ''}
            alt="story-media"
            height={300}
            width={300}
          />
        ) : (
          <Video mediaUrl={currentStory?.mediaUrl} />
        )}
        <div className="absolute top-0 left-0 right-0 flex justify-between p-4 bg-shadow">
          {userStories &&
            userStories.map((story, index) => (
              <div
                key={story.id}
                className="h-[2px] bg-white bg-opacity-50 flex-1 mx-1 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full bg-white transition-all duration-100 ease-linear`}
                  style={{
                    width: `${
                      index === currentStoryIndex
                        ? progress
                        : index < currentStoryIndex
                        ? 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            ))}
        </div>
        <div className="absolute top-4 left-4 flex items-center space-x-2 mt-4">
          {userStories && currentStory?.user?.avatar ? (
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={currentStory?.user && currentStory?.user?.avatar}
              />
            </Avatar>
          ) : (
            <Avatar className="h-10 w-10">
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
          )}
          <span className="text-white font-medium">{currentStory?.user?.username}</span>
          <span className='text-sm text-slate-200'> {storyCreatedTime}</span>
        </div>
        <button
          className="absolute top-4 right-4 text-white mt-4"
          onClick={() => router.push("/chats")}
        >
          <X size={24} />
        </button>
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white"
          onClick={handlePreviousStory}
        >
          {userStories && userStories?.length > 1 && currentStoryIndex > 0 && (
            <ChevronLeft size={32} />
          )}
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white"
          onClick={handleNextStory}
        >
          {userStories &&
            userStories?.length > 1 &&
            currentStoryIndex < userStories.length - 1 && (
              <ChevronRight size={32} />
            )}
        </button>
        <button
          className="absolute bottom-7 right-4 text-white"
          onClick={handlePlayPauseStory}
        >
          {isPaused ? <Play size={24} /> : <Pause size={24} />}
        </button>
      </div>
      {/* Reply Input  Start here */}
      {currentStory?.user?.id !== user?.id && (
        <div className="relative bottom-16 left-0 sm:w-1/4 w-10/12">
          <form
            onSubmit={handleSendStoryReplyToMsg}
            className="w-full flex justify-center"
          >
            <label
              htmlFor="storyreply"
              className="w-11/12 border dark:border-white rounded-full px-4 py-1 flex justify-between items-center"
            >
              <input
                onChange={(e) => setStoryReplyContent(e.target.value)}
                name="storyreply"
                className=" placeholder:text-white text-white w-11/12 text-sm focus:border-none focus:outline-none bg-transparent"
                type="storyreply"
                placeholder="Reply"
                autoComplete="off"
                value={storyReplyContent}
                id="storyreply"
              ></input>
              <SendButton
                messageContent={storyReplyContent}
                isMessageSending={isMessageSending}
              />
            </label>
          </form>
        </div>
      )}
      {/* //Reply Input  End here */}
    </div>
  );
}

export default StoryPage;