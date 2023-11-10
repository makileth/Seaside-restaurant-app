
import Image from "next/image";
import React from "react";
import { featuredProducts } from '../data';
import { ProductType } from "@/types/types";

export const runtime = "edge"

const getData = async () => {
  const res = await fetch("https://restaurant-app-dusky.vercel.app/api/products", {cache: 'no-store'});
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const Featured = async () => {

  const featuredProducts:ProductType[] = await getData();

  return (
    <div className="w-screen overflow-x-scroll text-sunshineYellow shadow-yellow-400 shadow-2xl">
      {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen h-[60vh] py-12 flex flex-col items-center justify-around p-4 hover:text-yellow-300 hover:bg-neutral-900 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 border-[1px] border-neutral-400 hover:border-turquoise rounded-[10px] w-full hover:scale-[102%] transition-all duration-[0.6s] ">
                <Image src={item.img} alt="" fill className=" object-cover rounded-[10px]" />
              </div>
            )}
            {/* TEXT CONTAINER */}
            <div className=" flex-1 flex flex-col items-center justify-center text-center gap-4 ">
              <h1 className="text-xl font-bold md:mt-0 mt-6 uppercase xl:text-4xl 2xl:text-5xl">{item.title}</h1>
              <p className="p-4 2xl:p-8 text-white">{item.desc}</p>
              <span className="text-3xl font-bold">${item.price}</span>
              <button className="bg-sunshineYellow rounded-[10px] hover:translate-y-[-5px] text-white py-4 px-8 hover:shadow-yellow-400 hover:shadow-2xl transition duration-350">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
