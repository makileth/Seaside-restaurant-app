// import DeleteButton from "@/components/DeleteButton";
import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";

const getData = async (id: string) => {
  const res = await fetch(`https://restaurant-app-dusky.vercel.app/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const singleProduct: ProductType = await getData(params.id);

  return (
    <div className="p-4 lg:px-20 xl:px-40 mt-[5rem] h-screen flex flex-col justify-around text-white md:flex-row md:gap-8 md:items-center relative">
      {/* IMAGE CONTAINER */}

      {singleProduct.img && (
        <div className="relative w-full h-full md:h-[70%]">
          <Image
            src={singleProduct.img}
            alt=""
            className="object-cover border-2 border-turquoise"
            fill
          />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="h-[100vh] flex flex-col gap-4 md:h-[70%] md:justify-start md:gap-6 xl:gap-8 mt-6 md:mt-0">
        <h1 className="text-4xl font-bold text-sunshineYellow uppercase">
          <span>{singleProduct.title}</span>
          <DeleteButton id={singleProduct.id} />
        </h1>
        <p>{singleProduct.desc}</p>
       
          <Price productData={singleProduct} />
     
      </div>
    </div>
  );
};

export default SingleProductPage;
