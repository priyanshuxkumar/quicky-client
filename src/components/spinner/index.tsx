'use client'

import React from 'react'
import loading from "../../../public/loading.svg"
import Image from 'next/image'

const Spinner = () => {
  return (
    <div className='mr-2'>
        <Image src={loading} width={200} height={200} className="w-6" alt="spinner"/>
    </div>
  )
}

export default Spinner