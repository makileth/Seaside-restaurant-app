"use client";

import { signOut, signIn, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const { status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <div className="gap-4 flex flex-row items-center">
          <Link
            href="/orders"
            className="hover:text-sunshineYellow transition duration-300"
          >
            My Orders
          </Link>
          <Link
            href="/login"
            className="hover:text-sunshineYellow transition duration-300"
            onClick={() => signOut()}
          >
            SignOut
          </Link>
        </div>
      ) : (
        <div className="gap-4 flex flex-row">
          <Link
            href="/orders"
            className="hover:text-sunshineYellow transition duration-300"
          >
            My Orders
          </Link>
          <Link
            href="/login"
            className="hover:text-sunshineYellow transition duration-300"
          >
            SignIn
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserLinks;
