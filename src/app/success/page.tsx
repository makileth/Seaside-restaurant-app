'use client'

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
const SuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const payment_intent = searchParams.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`https://restaurant-app-dusky.vercel.app/api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        router.push("/orders");
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [payment_intent, router]);

  return (
    <main className="text-white gap-12 mx-auto justify-center items-center max-w-4xl min-h-[100vh] my-12">
      <h1 className="mt-[5rem] font-bold text-center text-2xl md:text-[64px] text-sunshineYellow">Success!</h1>
      <p className="text-center my-7">Thank you for your purchase!</p>
      <p className="text-center text-red-400">Redirecting to the orders page now...</p>
    </main>
  );
};

export default SuccessPage;
