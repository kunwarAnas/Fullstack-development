'use client'
import React from 'react'
import { useRouter } from "next/navigation";

const Card = ({item, route}: any) => {
  const router = useRouter();
  console.log(route)
  return (
    <div className="h-[260px] w-[240px] drop-shadow-2xl p-1 m-4 border border-[#686464] flex items-center flex-col"> 
        <img src={item?.img + '.jpeg'} className="object-fit h-[200px] w-[200px]"/>
        <div className='text-2xl m-1'>{item?.name}</div>
        <button className='text-2xl text-center border border-[#686464] p-1 m-1 w-[80%] bg-[#282626]' onClick={()=> router.push(`/product/${item?.name}`)}>{route ==='product' ? 'Add to cart': 'View'}</button>
    </div>
  )
}

export default Card