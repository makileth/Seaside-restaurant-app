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
        await fetch(`/api/confirm/${payment_intent}`, {
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
    <main className="mx-auto justify-center items-center">
      <h1 className="font-bold text-[32px]">Success!</h1>
      <p>Thank you for your purchase!</p>
      <p>Redirecting to the orders page...</p>
    </main>
  );
};

export default SuccessPage;
