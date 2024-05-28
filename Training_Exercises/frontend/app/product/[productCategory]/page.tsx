import React from "react";

const Slug = ({ params }: any) => {
  const category = params.productCategory;
  return <div>{category}</div>;
};

export default Slug;
