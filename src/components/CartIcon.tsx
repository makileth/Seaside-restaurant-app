"use client";
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const CartIcon = () => {
  const { products, totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <Link
      href="/cart"
      className="flex items-center gap-3 hover:text-sunshineYellow transition duration-300"
    >
      <span>Cart</span>
      <motion.div
        whileHover={{
          scale: [1, 1.2, 1],
          rotate: [0, -10, 10, -10, 0],
        }}
        transition={{ duration: 0.6 }} // Adjust the duration as needed
        className="relative w-8 h-8 md:w-5 md:h-5"
      >
        <Image src="/cart.svg" alt="" fill className="" />
      </motion.div>
      <span>({totalItems})</span>
    </Link>
  );
};

export default CartIcon;
