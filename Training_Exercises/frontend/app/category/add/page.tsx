"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [name, setName] = React.useState("");
  const [img, setImg] = React.useState("");
  const router = useRouter();

  const formAction = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/Ecommerce/category/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          img
        }),
        cache:'no-cache'
      });
      router.push("/");
    } catch (err: any) {
      router.push("/login");
      console.log(err.message);
    }
  };

  return (
    <section className="h-[100vh] flex justify-center items-center flex-col">
      <div className="text-4xl mb-4">Add Category</div>
      <div className="h-[20rem] w-[40rem] flex justify-center items-center flex-col gap-6 border-2 border-dashed">
        <input
          className="border p-1"
          placeholder="Name"
          type="text"
          onChange={(e)=> setName(e.target.value)}
        />
        <input
          className="border p-1"
          placeholder="image"
          type="text"
          onChange={(e)=> setImg(e.target.value)}
        />
        <button className="border px-6" onClick={formAction}>
          Add
        </button>
      </div>
    </section>
  );
};

export default Login;
