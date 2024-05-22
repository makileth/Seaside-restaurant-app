"use client";

import { MenuType } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
export const runtime = "edge";

const getData = async () => {
  const res = await fetch(
    "https://restaurant-app-dusky.vercel.app/api/categories",
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const MenuPage = () => {
  const {
    data: menu,
    isLoading,
    error,
  } = useQuery<MenuType>(["menu"], () => getData());

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="lg:px-20 xl:px-40 min-h-[100vh] z-[1]">
      <div className="mt-[5rem] flex p-4 flex-col items-center justify-center mx-auto  md:py-12 lg:py-26 gap-6">
        <div className="lg:max-w-[88rem] w-[97%] md:mt-9 mt-0">
          <div className="text-start h-[210px] hidden 2xl:block mb-12">
            <h1 className="text-[48px]  font-bold text-white">
              Explore the Caribbean Culinary Journey!
            </h1>
            <h4 className="text-[18px]  font-thin text-white py-4  leading-[1.8]">
              We invite you to embark on a journey through the vibrant and
              diverse world of Caribbean cuisine. Our menu is thoughtfully
              crafted and divided into three delectable categories to suit your
              every craving.
            </h4>
          </div>
          <Link
            href={`/product/clwgbtjg20008pspnsmvj9nwa`}
            className="flex md:mt-[0rem] h-[140px] w-full md:flex-row md:h-[240px] rounded-[10px] my-4 hover:shadow-2lg hover:shadow-sunshineYellow"
          >
            <div className="h-full md:w-[25%] w-[33%]  bg-[url(https://i.pinimg.com/736x/2d/4f/9a/2d4f9a20f52d530f19a74339325322df.jpg)] relative bg-center bg-cover rounded-l-[10px]">
              <Image
                src="/new.svg"
                alt="new"
                width={86}
                height={86}
                className="absolute left-[-13%] top-[-21%]"
              ></Image>
            </div>
            <div className="h-full md:w-[75%] w-[67%] bg-neutral-900 rounded-r-[10px]">
              <div className="flex flex-col p-4">
                <h1 className="md:text-[32px] text-[12px] font-bold text-white">
                  Goat stew
                </h1>
                <h4 className="md:text-[18px] text-[7.5px] font-thin text-white py-2">
                  A rich and flavorful stew made with tender goat meat,
                  slow-cooked with Caribbean spices.
                </h4>
              </div>
            </div>
          </Link>

          <div className="flex flex-col md:flex-row items-center justify-center my-[2rem] md:h-[45rem]">
            {menu?.map((category) => (
              <Link
                href={`/menu/${category.slug}`}
                key={category.id}
                style={{ backgroundImage: `url(${category.img})` }}
                className={` h-full w-full  md:w-1/3 relative bg-cover p-4 md:p-8 object-cover bg-center hover:shadow-2xl hover:shadow-sunshineYellow transition ease-in-out duration-350 hover:scale-[102%]`}
              >
                <div className={`text-white w-3/4 `}>
                  <h1
                    className="uppercase font-bold text-3xl md:text-4xl"
                    style={{ textShadow: "5px 5px 10px rgba(0, 0, 0, 1)" }}
                  >
                    {category.title}
                  </h1>
                  <p
                    style={{ textShadow: "0px 0px 5px rgba(0, 0, 0, 1)" }}
                    className="text-lg my-8 bg-white bg-opacity-10 backdrop-blur-lg px-4 py-6"
                  >
                    {category.desc}
                  </p>
                  {/* <button
                    className={`hidden absolute bottom-8 left-8 2xl:block hover:bg-sunshineYellow hover:text-white transition duration-300 ease-in-out bg-${
                      category.color
                    } text-${
                      category.color === "black" ? "white" : "red-500"
                    } py-2 px-9 rounded-md`}
                  >
                    Explore
                  </button> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
