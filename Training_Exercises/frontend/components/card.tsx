'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from "next/navigation";

const Card = ({item}: any) => {
  const router = useRouter();
  return (
    <div className="h-[240px] w-[240px] drop-shadow-2xl p-1 m-4 border border-black flex items-center flex-col"> 
        <img src={'/pizza.jpeg'} className="object-contain h-[200px] w-[200px]"/>
        <div className='text-2xl m-1'>{item?.name}</div>
        <button className='text-2xl text-center border border-black p-1 w-[80%] bg-gray-300' onClick={()=> router.push(`/product/${item?.name}`)}>View</button>
    </div>
  )
}

export default Card