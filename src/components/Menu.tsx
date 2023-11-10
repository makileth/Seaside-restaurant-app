"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { motion } from "framer-motion";
const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
  { id: 3, title: "Contact", url: "/contact" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  const user = false;
  return (
    <div>
      <Image
        src="/open.svg"
        alt=""
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer filter-white"
      />
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setOpen(false)}
          style={{ backdropFilter: "blur(2px)" }}
          className="bg-neutral-900 fixed text-white left-0 top-0 w-[100vw] h-[100vh] flex flex-col gap-8 items-center justify-center text-3xl z-10"
        >
          <Image
            src={open ? "/close.svg" : "/open.svg"}
            alt=""
            width={20}
            height={20}
            onClick={() => setOpen(!open)}
            className="cursor-pointer absolute right-5 top-5 filter-white"
          />
          {links.map((item) => (
            <Link
              href={item.url}
              key={item.id}
              onClick={() => setOpen(false)}
              className="hover:text-sunshineYellow"
            >
              {item.title}
            </Link>
          ))}

          <Link
            href={user ? "/orders" : "login"}
            onClick={() => setOpen(false)}
          >
            {user ? "Orders" : "Login"}
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Menu;
