'use client';

import {X, ChevronLeft , ChevronRight, EllipsisVertical,CirclePlay , CirclePause } from "lucide-react";

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from 'react';
import Loading from "@/components/loading";
import { getTimeAgoString } from "@/config/TimeServices";
import { useFetchSingleUserStories } from "../../../../../hooks/story";
import toast from "react-hot-toast";
import DeleteMenu from "@/components/DeleteMenu";
import { useCurrentUser } from "../../../../../hooks/user";
import { getMediaType } from "@/config/GetMediaType";
import Video from "@/components/Video";
import SendButton from "@/components/Button";
import { sendMessage } from "@/helpers/sendMessage";
import { useChatContext } from "@/context/ChatContext";


const StoryPage = () => {
  const router = useRouter();
  const {user} = useCurrentUser()

  //getting chatId of story_user with current logged_in user
  const {storyUserChatId} = useChatContext()
 
  //extract userID of story owner 
  const pathname = usePathname();
  const parts = pathname.split("/");
  const STORY_USER_ID = parts[3]
  
  const {isLoading, userStories , error} = useFetchSingleUserStories(STORY_USER_ID)

  //cross click fn
  const handleCloseStoryPage = () => {
    router.back()
  };

  const [currentStoryIndex , setCurrentStoryIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handlePreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevIdx)=> prevIdx -1 );
    }
  },[currentStoryIndex]);
  

  const handleNextStory = useCallback(() => {
    if (userStories && userStories.length - 1 > currentStoryIndex) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (userStories && userStories.length - 1 <= currentStoryIndex ){
      handleCloseStoryPage();
    }
  },[currentStoryIndex , userStories]);

  let currentStory = userStories &&  userStories[currentStoryIndex];

  //get mediaType of story media
  const mediaType = getMediaType(currentStory?.mediaUrl)
  
  //story created time
  const storyCreatedTime = getTimeAgoString(new Date(Number(currentStory?.createdAt)));

  //showing error while fetch stories
  if(error){
    toast.error("Error occured while fetching stories")
  };

  //Handle Story Menu button 
  const [isStoryMenuOpen , setIsStoryMenuOpen] = useState(false)

  const handleStoryMenu = () => {
    setIsStoryMenuOpen(!isStoryMenuOpen)
    setIsPaused(!isPaused)
  };

  //Story reply on Message
  const [storyReplyContent , setStoryReplyContent] = useState('')
  const [isMessageSending , setIsMessageSending] = useState(false);

  
  const handleSendStoryReplyToMsg = async(e:any) => {
      e.preventDefault()
      await sendMessage({ 
        messageContent:storyReplyContent, 
        selectedChatId: storyUserChatId, 
        recipientUser: currentStory?.user, 
        setIsMessageSending, 
        setMessageContent: setStoryReplyContent ,
        storyId: currentStory?.id
      });
      toast.success('message sent..');
  };


  //automatically Move to next story
  useEffect(() => {
    let timer: any;
    if (!isPaused) {
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
  }, [progress , isPaused]);

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
    <>
    <div className='flex justify-between h-screen overflow-hidden bg-dark-secondary'>

      <div className='m-4 hidden sm:block'>
        <Link href={'/chats'} className="font-bold text-white text-xl tracking-tighter">Quicky</Link>  
      </div>

    {isLoading ? (<div className="w-full h-screen flex justify-center items-center"><Loading size={80} width={1}/></div>) :
      (<div className='h-screen sm:h-[734px] w-screen sm:w-[413px] my-auto relative'>
        <div onClick={handlePreviousStory} className='w-1/3 navigation previous-button absolute sm:flex flex-col justify-center h-screen top-20 left-0 sm:top-0 sm:-left-12 text-white cursor-pointer'>
          {userStories && userStories?.length > 1 && currentStoryIndex > 0  && <ChevronLeft size={28} className="hidden sm:inline-block bg-gray-700 rounded-full hover:bg-white text-black"/>}
        </div>

          {!currentStory?.mediaUrl ? (<div className="w-full h-screen flex justify-center items-center"><Loading size={32} width={1}/></div>) : 
            ( mediaType == 'image' ?
              (<Image
                  priority={true}
                  className="inline-block h-full w-full rounded-xl object-cover"
                  src={currentStory?.mediaUrl}
                  alt="story-media"
                  height={300}
                  width={300}
              />) : <Video mediaUrl={currentStory?.mediaUrl}/>
            )
          }
          <div className='top-container flex flex-col items-center gap-3 w-full px-4 py-6 absolute top-0 left-0 bg-shadow '>
            <div className="story-progress-bar-container flex gap-1 w-full">
              {userStories && userStories.map((story, index)=> (
                <div key={story?.id} className={`relative w-full h-[2px] bg-black rounded-full`}>
                 {index === currentStoryIndex &&  <div className="progress-bar h-[2px] bg-white rounded-full" style={{ width: `${progress}%` }} />}
                </div>
              ))}
            </div>

            <div className="story-user-details w-full flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {userStories && currentStory?.user?.avatar && (
                    <Image
                      priority={false}
                      className="inline-block min-h-8 min-w-8 max-h-8 max-w-8 rounded-full"
                      src={currentStory?.user && currentStory?.user?.avatar}
                      alt="avatar"
                      height={20}
                      width={20}
                    />
                  )}
                <p className="text-sm text-center text-slate-200">{currentStory?.user && currentStory?.user?.username}</p>
                <span className='text-sm text-slate-200'> {storyCreatedTime}</span>
              </div>
                
              <div className="flex gap-12 items-center">
              {/* Play and Pause Button    */}
               <div onClick={handlePlayPauseStory} className="cursor-pointer"> {isPaused ? <CirclePlay size={24} className="text-slate-200"/> : <CirclePause size={24} className="text-slate-200"/>}</div>

              {currentStory?.user?.id == user?.id && 
              <div onClick={handleStoryMenu} className="cursor-pointer"><EllipsisVertical size={20} className="text-slate-200"/></div>
              }
              </div>

            </div>
          </div>

          {/* //Reply Input  Start here */}
          {currentStory?.user?.id !== user?.id && 
          <div className="absolute bottom-4 left-0 w-full">
            <form onSubmit={handleSendStoryReplyToMsg} className="w-full flex justify-center">
              <label htmlFor="storyreply" className="w-11/12 border dark:border-white rounded-full px-4 py-1 flex justify-between items-center">
                <input
                  onChange={(e)=> setStoryReplyContent(e.target.value)}
                  name="storyreply"
                  className=" placeholder:text-white text-white w-11/12 text-sm focus:border-none focus:outline-none bg-transparent"
                  type="storyreply"
                  placeholder='Reply'
                  autoComplete="off"
                  value={storyReplyContent}
                  id="storyreply"
                ></input>
                <SendButton messageContent={storyReplyContent} isMessageSending={isMessageSending}/>
              </label>
            </form>
          </div>
          }
          {/* //Reply Input  End here */}

          <div onClick={handleNextStory} className='w-1/3 h-[70%] sm:w-fit sm:flex navigation forward-button absolute flex-col justify-center right-0 top-20 sm:-right-12 sm:top-0 text-white cursor-pointer'>
            {userStories && userStories?.length > 1 && currentStoryIndex < userStories.length -1  && <ChevronRight size={28} className="hidden sm:inline-block bg-gray-700 rounded-full hover:bg-white text-black"/>}
          </div>
          
      </div>)}

        <div onClick={handleCloseStoryPage} className="cursor-pointer m-4 sm:static absolute right-7 top-6 z-50">
          <X size={28} className="text-slate-200" />
        </div>
    </div>

    {/* Menu Page  */}
    {isStoryMenuOpen && 
      <div className="w-full h-full backdrop-blur-sm fixed top-0 left-0 flex justify-center items-center">
        <DeleteMenu handleStoryMenu={handleStoryMenu} currentStoryId={currentStory?.id} userStories={userStories}/>
      </div>
    }

    </>
  )
}

export default StoryPage;