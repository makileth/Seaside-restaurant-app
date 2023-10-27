'use client'
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect} from "react";

const CartIcon = () => {

  const {products, totalItems} = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate() // it's used for restoring or rehydrating the state from some form of storage (e.g., localStorage) when the component first loads or the application starts
  },[])

  return (
    <Link href="/cart" className="flex items-center gap-3">
      <span>Cart</span>
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image src="/cart.png" alt="" fill />
      </div>
      <span>({totalItems})</span>
    </Link>
  );
};

export default CartIcon;
