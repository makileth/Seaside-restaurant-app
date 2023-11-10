import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="z-[30] h-12 md:h-24 p-4 lg:px-20 xl:px-40 text-white flex items-center justify-between py-9 bg-neutral-900">
      <Link href="/" className="font-bold text-xl">Seaside</Link>
      <p>© ALL RIGHTS RESERVED.</p>
    </div>
  );
};

export default Footer;
