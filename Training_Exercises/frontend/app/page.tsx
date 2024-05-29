"use client"
import React, { useEffect, useState } from "react";
import Card from "../components/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [category , setCategory] = useState([])

  const fetchCategory = async () =>{
    try {
      const response = await (await fetch("http://localhost:8080/api/Ecommerce/category/all", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        cache: 'no-cache'
      })).json();
      if(response.status === 401){
        return router.push("/login");
      }
      setCategory(response)
    } catch (err: any) {
      router.push("/login");
      console.log(err);
    }
  }

  const logout = async () =>{
    try {
      await fetch("http://localhost:8080/api/task/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        cache:'no-cache'
      });
      setCategory([])
      router.push("/login");
    } catch (err: any) {
      router.push("/login");
      console.log(err.message);
    }
  }

  useEffect(()=>{
    fetchCategory()
  },[])

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
            <span className="text-2xl p-4" onClick={logout}>Logout</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-6" >
        { Array.isArray(category) && category?.map((item: any) => (
          <Card key={item?.id} item={item} />
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

export default Page;
