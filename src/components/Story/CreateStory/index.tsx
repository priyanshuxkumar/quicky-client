import { X } from 'lucide-react'
import React from 'react'

const CreateStory = () => {
  return (
    <div className='w-screen h-screen'>
        <div>Story Box</div>
        <div className='cursor-pointer'>
          <X size={32} className="text-white" />
        </div>
    </div>
  )
}

export default CreateStory