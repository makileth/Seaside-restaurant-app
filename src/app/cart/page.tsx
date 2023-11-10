"use client";

import { useCartStore } from "@/utils/store";
import Image from "next/image";
import React, { useEffect } from "react";
import DeleteButton from "../../components/DeleteButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartPage = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  console.log("Session is:" + session + "Status is:" + status);

  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate(); // it's used for restoring or rehydrating the state from some form of storage (e.g., localStorage) when the component first loads or the application starts
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
    } else {
      try {
        const res = await fetch("https://restaurant-app-dusky.vercel.app/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
          }),
        });
        const data = await res.json();
        router.push(`/pay/${data.id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className=" mt-[5rem] flex flex-col md:pt-0 pt-4 justify-center overflow-scroll md:overflow-hidden w-screen lg:w-1/2 lg:px-10 xl:px-20">
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div
            className="flex items-center md:w-full justify-between mb-4 mx-3 relative max-w-[40rem] lg:max-w-none bg-neutral-700 p-4 rounded-[10px] bg-opacity-50"
            key={item.id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={100}
                height={100}
                className="rounded-[10px]"
              />
            )}
            <div className="flex flex-col w-full gap-2 px-4 ">
              <table className="text-white w-full">
                <thead>
                  <tr className="flex flex-row items-center justify-between gap-4">
                    <th>
                      <div>
                        <h1 className="text-lg font-bold">{item.title}</h1>
                      </div>
                    </th>
                    <th>
                      <div>
                        <h1 className="text-lg font-bold">Price</h1>
                      </div>
                    </th>
                    <th>
                      <div>
                        <h1 className="text-lg font-bold">Qty</h1>
                      </div>
                    </th>
                  </tr>
                </thead>
                <hr className="my-2 border border-white" />
                <tbody>
                  <tr className="flex flex-row items-center justify-between gap-4">
                    <td>
                      <div>
                        <span>{item.optionTitle}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <h2>${item.price}</h2>
                      </div>
                    </td>
                    <td>
                      <div>
                        <h2>{item.quantity}</h2>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              className="bg-red-400 absolute top-1 right-1 text-white hover:bg-red-700 transition duration-300 p-2 rounded-[10px] cursor-pointer"
              onClick={() => removeFromCart(item)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className=" p-4 bg-neutral-800 relative flex flex-col gap-4  justify-center lg:w-1/2 ">
        <h1 className="text-white font-bold text-[3rem] py-4 z-[2]">
          Your Order Details:
        </h1>
        <div
          className="left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-3/4 h-3/4 absolute blur-2xl z-[1]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(255, 200, 0, 1) 0%, transparent 70%)",
          }}
        />

        <div className="flex flex-col  gap-8 text-white bg-neutral-900 bg-opacity-70  text-2xl backdrop-blur-md z-[2] p-9 py-12 mb-12 md:mb-0">
          <div className="flex justify-between">
            <span className="">Subtotal: ({totalItems})</span>
            <span className="">${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="">Service Cost</span>
            <span className="">$0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="">Delivery Cost</span>
            <span className="text-green-500">$0.00</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <span className="">TOTAL(INCL. VAT)</span>
            <span className="font-bold text-4xl text-sunshineYellow">
              ${totalPrice}
            </span>
          </div>
          <button
            className="bg-sunshineYellow hover:shadow-sunshineYellow hover:shadow-2xl hover:translate-y-[-4px] transition duration-300 text-white p-3 rounded-md w-1/2 self-end"
            onClick={() => handleCheckout()}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
