
'use client'
import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
import { useRouter } from "next/navigation";
const Offer = () => {

  const router = useRouter();
  return (
    <div className="bg-black h-[120vh] flex flex-col md:flex-row md:justify-between bg-right md:bg-center bg-no-repeat bg-[url('/offerBg.jpg')] md:h-[70vh]">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6 bg-neutral-950">
        
        <h1 className=" text-5xl font-bold xl:text-6xl text-sunshineYellow text-shadow-lg">
          Island Jerk Chicken Platter
        </h1>
        <div className="bg-turquoise py-3">
          <p className="text-white xl:text-xl font-thin px-4 md:px-0">
            Savor the Caribbean with our mouthwatering Jerk Chicken Platter.
            Each succulent piece of chicken is marinated with a special blend of
            spices and seasonings, then grilled to perfection. The result is a
            harmonious mix of smoky, spicy, and sweet flavors that&apos;s a true
            Caribbean delight.
          </p>
        </div>

        <CountDown />
        <button onClick={() => router.push('/product/clniy26140000trxcnm414655')} className="bg-sunshineYellow rounded-[10px] hover:translate-y-[-5px] text-white py-4 px-8 hover:shadow-yellow-400 hover:shadow-2xl transition duration-350">
          Order Now
        </button>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 w-full relative md:h-full">
        <Image src="/offerProduct.png" alt="" fill className="object-contain p-4" />
      </div>
    </div>
  );
};

export default Offer;
