import React from 'react'
import Image from "next/image";

import { useCurrentUser } from '../../../../hooks/user';
import { Plus , CircleFadingPlus} from 'lucide-react';

const MyStory = () => {
  const { user } = useCurrentUser();

  return (
    <div className="my-2 mx-3 cursor-pointer w-14 h-auto relative">
      {user && user?.avatar && (
        <Image
          priority={false}
          className="inline-block min-h-14 min-w-14 max-h-14 max-w-14 rounded-full ring-2 ring-accent-color ring-offset-2 dark:ring-offset-black"
          src={user?.avatar}
          alt="avatar"
          height={30}
          width={30}
        />
      )}
      <div className='absolute bottom-5 -right-1 bg-accent-color rounded-full p-1'>
        <CircleFadingPlus strokeWidth={2} size={16} className='text-white'/>
      </div>
      <p className="text-xs text-center mt-2 text-black dark:text-white truncate">My Story</p>
    </div>
  )
}

export default MyStory