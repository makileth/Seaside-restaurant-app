"use client";

import { ProductType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const getCategoryData = async (category: string) => {
  const res = await fetch(
    `https://restaurant-app-dusky.vercel.app/api/products?category=${category}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

type Props = {
  params: { category: string };
};

const CategoryPage = ({ params }: Props) => {

  const { data: session, status } = useSession();

  const router = useRouter();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery(["category", params.category], () =>
    getCategoryData(params.category)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="flex flex-wrap text-sunshineYellow min-h-[100vh] mt-[5rem]">
      {products.map((item: any) => (
        <Link
          className="w-full h-[60vh] relative border-r-2 border-b-2 border-neutral-700 sm:w-1/2 lg:w-1/3 flex flex-col justify-between group odd:bg-fuchsia-50"
          href={`/product/${item.id}`}
          key={item.id}
        >
          {/* IMAGE CONTAINER */}
          {item.img ? (
            <div className="relative h-[100%] group overflow-hidden">
              <Image
                src={item.img}
                alt=""
                fill
                className="object-cover transform scale-100 group-hover:scale-110 transition-transform"
              />
            </div>
          ) : (<Loading />)}
          {/* BUTTON CONTAINER */}
          <button className="bg-sunshineYellow rounded-[10px] hover:translate-y-[-5px] hover:shadow-yellow-400 hover:shadow-2xl transition duration-350 hidden group-hover:block absolute top-5 right-5 uppercase text-white p-2">
            Add to Cart
          </button>
          {/* TEXT CONTAINER */}
          <div className="flex flex-col items-start w-full absolute bottom-0 h-[8rem] bg-black bg-opacity-70 backdrop-blur-md font-bold">
            <div className="flex w-full flex-row items-center justify-between py-2 px-4">
              <h1 className="md:text-3xl text-2xl font-bold">{item.title}</h1>
              <h2 className=" text-2xl md:text-3xl">${item.price}</h2>
            </div>
            <p className="text-white text-[10px] md:text-[13px] line-clamp-3 md:line-clamp-4 font-thin pb-[3.2rem] pl-4 w-[85%]">
              {item.desc}
            </p>
          </div>
        </Link>
      ))}
      {session?.user.isAdmin && (
        <div
          onClick={() => router.push(`/add`)}
          className="hover:shadow-2xl transition duration-300 hover:shadow-green-400 bottom-[2%] fixed right-[2%] rounded-[10px] px-4 py-2 bg-green-500 text-white"
        >
          Add New
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
