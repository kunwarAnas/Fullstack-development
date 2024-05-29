"use client"
import React from "react";
import Card from "../components/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const items = [
    {
      id: 1,
      name: "Electronic",
      img: "electronic",
    },
    {
      id: 2,
      name: "Toys",
      img: "toys",
    },
    {
      id: 3,
      name: "Home Decor",
      img: "Home_Decor",
    },
    {
      id: 4,
      name: "Cloths",
      img: "Cloths",
    },
    
  ];
  return (
    <>
      <div className="bg-[#282626] flex justify-between items-center">
        <h1 className="p-6 text-4xl ">Category</h1>
        <div>
          <Link href="/cart">
            <span className="text-2xl p-4">Cart</span>
          </Link>
          <Link href="/account">
            <span className="text-2xl p-4">Account</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-6" >
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
        <div className="h-[260px] w-[240px] p-1 m-4 flex justify-center items-center">
          <button
            className="text-2xl text-center border border-[#686464] p-1 w-[80%] bg-[#282626]"
            onClick={() => router.push(`/category/add`)}
          >
            Add Category
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
