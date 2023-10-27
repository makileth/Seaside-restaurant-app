"use client";

import { signOut, signIn, useSession } from "next-auth/react";
import Link from "next/link";

const UserLinks = () => {
  const { status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <div className="gap-4 flex flex-row">
          <Link href="/orders">My Orders</Link>
          <Link href="/login" onClick={() => signOut()}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="gap-4 flex flex-row">
          <Link href="/orders">My Orders</Link>
          <Link href="/login">Log in</Link>
        </div>
      )}
    </div>
  );
};

export default UserLinks;
