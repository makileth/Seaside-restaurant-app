import React from "react";
import Menu from "./Menu";
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import UserLinks from "./UserLinks";

const Navbar = () => {

  const user = false;
  
  return (

    <div className="h-16 w-screen bg-softBlack bg-opacity-70 backdrop-blur-2xl fixed z-[30] text-white p-4 flex items-center justify-between border-b-[1px] border-neutral-200 md:h-24 lg:px-20 xl:px-30">
      {/* LEFT LINKS */}
      <div className="hidden  md:flex gap-4 flex-1">
        <Link href="/" className="hover:text-sunshineYellow transition duration-300">
          Home
        </Link>
        <Link href="/menu" className="hover:text-sunshineYellow transition duration-300">
          Menu
        </Link>
        <Link href="/contact" className="hover:text-sunshineYellow transition duration-300">
          Contact
        </Link>
      </div>
      {/* LOGO */}
      <div className="flex-1 transition duration-300 justify-center item-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={94} height={64} className="md:mx-auto  w-[55px] md:w-[100px]"></Image>
        </Link>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute hidden top-3 r-2 lg:static xl:flex items-center gap-2 cursor-pointer bg-sunshineYellow px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>123 456 789</span>
        </div>
        <UserLinks />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
