"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const router = useRouter();

  const formAction = async (formData: any) => {
    try {
      const response = await fetch("http://localhost:8080/api/task/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: email,
        }),
      });

      router.push("/");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <section className="h-[100vh] flex justify-center items-center flex-col">
      <div className="text-4xl mb-4">Login</div>
      <div className="h-[20rem] w-[40rem] flex justify-center items-center flex-col gap-6 border-2 border-dashed border-black">
        <input
          className="border border-black p-1"
          placeholder="Email"
          type="email"
          name="email"
        />
        <input
          className="border border-black p-1"
          placeholder="Password"
          type="password"
          name="password"
        />
        <button className="border border-black px-6" onClick={formAction}>
          Submit
        </button>
      </div>
    </section>
  );
};

export default Login;
