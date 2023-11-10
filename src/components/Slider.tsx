"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    title: "Discover Caribbean ",
    titleGradient: "Delights",
    titleSecond: "Crafted for Unforgettable Moments",
    image: "/sliderChef.jpg",
  },
  {
    id: 2,
    title: "Celebrate the Caribbean Spirit with ",
    titleGradient: "Exotic",
    titleSecond: "Cocktails. Cheers to Paradise!",
    image: "/sliderDrinks.jpg",
  },
  {
    id: 3,
    title: "Bringing Caribbean ",
    titleGradient: "Sunshine",
    titleSecond: "Straight to Your Table, Across Europe",
    image:
      "https://i.pinimg.com/originals/1d/f4/4b/1df44b9af4a41299dfbd45a5907c020d.jpg",
  },
];

const isMobile = () => (typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false);

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1)),
      4500
    );
    return () => clearInterval(interval);
  }, []);

  const textContainerAnimation = isMobile()
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 1 },
      }
    : {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
        transition: { duration: 1 },
      };

  return (
    <div className="flex flex-col h-[115vh] md:h-[100vh] lg:flex-row bg-softBlack">
      {/* TEXT CONTAINER */}
      <motion.div
        className="flex-1 flex items-start md:mt-0 mt-6 justify-center flex-col gap-8 text-white font-bold mb-6 md:mb-12"
        key={currentSlide}
        {...textContainerAnimation}
      >
        <h1 className="text-[2.05rem] text-start mt-12 uppercase p-4 md:p-10 md:text-6xl xl:text-7xl">
          <span>{data[currentSlide].title}</span>
          <span className="mr-3 bg-clip-text text-transparent  bg-gradient-to-r from-sunshineYellow to-turquoise">
            {data[currentSlide].titleGradient}
          </span>
          <span>{data[currentSlide].titleSecond}</span>
        </h1>
        <button className="bg-sunshineYellow rounded-[10px] ml-4 md:ml-11 hover:translate-y-[-5px] text-white py-4 px-8 hover:shadow-yellow-400 hover:shadow-2xl transition duration-350">
          Order Now
        </button>
      </motion.div>
      {/* IMAGE CONTAINER */}
      <div className="w-full flex-1 relative">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={data[currentSlide].image}
            alt=""
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Slider;
