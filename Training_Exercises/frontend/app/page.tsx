import React from "react";
import Card from "../components/card";

const page = () => {
  const items = [
    {
      id: 1,
      name: "Electronic",
    },
    {
      id: 2,
      name: "Toys",
    },
    {
      id: 3,
      name: "Home Decor",
    },
    {
      id: 4,
      name: "Cloths",
    },
  ];
  return (
    <>
      <h1 className="p-6 block text-4xl bg-gray-300">Category</h1>
      <div className="flex flex-wrap justify-center mt-6">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
      </div>
    </>
  );
};

export default page;
