"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const Product = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const category = useSearchParams();
  const categoryParam = category.get("category");
  const [cart, setCart] = useState<any[]>([]);

  const fetchProduct = async () => {
    try {
      const response = await (
        await fetch(
          `http://localhost:8080/api/Ecommerce/product/?category=${categoryParam}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-cache",
          }
        )
      ).json();
      if (response.status === 401) {
        return router.push("/login");
      }
      setProducts(response.Products);
    } catch (err: any) {
      router.push("/login");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

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
        <h1 className="p-6 text-4xl ">Products</h1>
        <div>
          <Link href="/cart">
            <span className="text-2xl p-4">Cart:{cart.length}</span>
          </Link>
          <Link href="/account">
            <span className="text-2xl p-4">Account</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-6">
        {Array.isArray(products) &&
          products.map((item: any) => (
            <Card
              key={item.id}
              item={item}
              route={"product"}
              handleCart={(item: any) => {
                setCart([...cart, item]);
                console.log(cart);
              }}
            />
          ))}
      </div>
    </>
  );
};

export default Product;
