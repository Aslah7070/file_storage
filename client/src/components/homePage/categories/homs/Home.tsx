

"use client"
import React from 'react'
import Search from './Search'
import Folders from './Folders'


const Homes = () => {
  return (
    <div className=' w-full px-5 flex  flex-col justify-start items-center'>
    
      <div className='flex justify-end w-full'>
         <Search/>
      </div>
      <Folders/>
     
   
    </div>
  )
}

export default Homes
