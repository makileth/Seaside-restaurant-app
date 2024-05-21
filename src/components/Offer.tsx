"use client";
import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
import { useRouter } from "next/navigation";
const Offer = () => {
  const router = useRouter();
  return (
    <div className="bg-black h-[120vh] flex flex-col md:flex-row md:justify-between md:h-[70vh]">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6 bg-neutral-950">
        <h1 className=" text-5xl font-bold xl:text-6xl text-sunshineYellow text-shadow-lg">
          Roast pork
        </h1>
        <div className=" py-3">
          <p className="text-white xl:text-xl font-thin px-4 md:px-0">
            Slow-roasted pork seasoned with a blend of Caribbean spices, served
            tender and juicy.
          </p>
        </div>

        <CountDown />
        <button
          onClick={() => router.push("/product/clwgbtjg20004pspnekczp4xf")}
          className="bg-sunshineYellow rounded-[10px] hover:translate-y-[-5px] text-white py-4 px-8 hover:shadow-yellow-400 hover:shadow-2xl transition duration-350"
        >
          Order Now
        </button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full">
        <Image
          src="https://i.pinimg.com/564x/3a/f5/73/3af573d741b470c7d1f88b312271a144.jpg"
          alt=""
          fill
          className="object-cover p-4"
        />
      </div>
    </div>
  );
};

export default Offer;
