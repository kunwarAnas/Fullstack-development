"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import cartContext from "@/app/cartContext";

const Card = ({ item, route = '', handleCart }: any) => {
  const router = useRouter();
  //const { cart } = useContext(cartContext);
  const handleClick = (e: any) => {
    if (route !== "product") {
      return router.push(`/product/?category=${item.name}`);
    }
    handleCart(item)
  };
  return (
    <div className="h-[260px] w-[240px] drop-shadow-2xl p-1 m-4 border border-[#686464] flex items-center flex-col">
      <img
        src={(item?.img || item?.itemImage) + ".jpeg"}
        className="object-cover h-[165px] w-[200px]"
      />
      <div className="text-2xl m-1">{item?.name}</div>
      <button
        className="text-2xl text-center border border-[#686464] p-1 m-1 w-[80%] bg-[#282626]"
        onClick={handleClick}
      >
        {route === "product" ? "Add to cart" : "View"}
      </button>
    </div>
  );
};

export default Card;
