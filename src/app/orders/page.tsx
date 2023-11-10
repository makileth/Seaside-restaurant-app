"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OrderType } from "@/types/types";
import { Input } from "postcss";
import Image from "next/image";
import { PUT } from "../api/orders/[id]/route";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";

const OrdersPage = () => {
  const { data: session, status } = useSession();

  console.log(session);

  const router = useRouter();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"], // Unique key for this query
    queryFn: () => fetch("https://restaurant-app-dusky.vercel.app/api/orders").then((res) => res.json()), // Function to fetch data
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`https://restaurant-app-dusky.vercel.app/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const queryClient = useQueryClient();

  console.log("Data:", data, "Status:", status); // for debugging

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return "An error has occured:" + error;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    // Retrieve the form element that triggered the event
    const form = e.target as HTMLFormElement;

    // Access the first element within the form (an input field)
    const input = form.elements[0] as HTMLInputElement;

    // Extract the value entered by the user in the input field
    const status = input.value;

    mutation.mutate({ id, status });
    toast.success("Order updated successfully!");
  };

  return (
    <div className="mx-auto min-h-[100vh] md:max-w-5xl justify-center">
      <section className="w-full mt-[7rem] md:mt-[10rem] bg-neutral-900 my-8 border-2 border-neutral-500 px-4 pb-4 rounded-[10px]">
        <table className="w-full">
          <thead className="">
            <tr className="text-left bg-neutral-900 items-center text-turquoise border-b border-gray-200 ">
              <th className="hidden md:table-cell p-4">Order ID</th>
              <th className="hidden md:table-cell p-4">Date</th>
              <th className="p-4">Price</th>
              <th className="p-4">Products</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {data ? (
              data.map((item: OrderType) => (
                <tr
                  className={`text-sm md:text-base text-white bg-neutral-900 border-b border-gray-100`}
                  key={item.id}
                >
                  <td className="hidden md:block p-4">{item.id}</td>
                  <td className="p-4">
                    {item.createdAt.toString().slice(0, 10)}
                  </td>
                  <td className="p-4">${item.price}</td>
                  <td className="hidden md:block p-4 mt-[12px]">
                    {item.products[0].title}
                  </td> 
                  {session?.user.isAdmin ? (
                    <td className="p-4">
                      <form
                        className="flex items-center justify-start gap-4"
                        onSubmit={(e) => handleUpdate(e, item.id)}
                      >
                        <input
                          placeholder={item.status}
                          className={`rounded-md bg-gray-100 text-black w-[200px] h-12 p-4 ${
                            item.status === "Ready"
                              ? "text-green-600 bg-green-100"
                              : item.status === "In Process..."
                              ? "text-orange-600 bg-orange-100"
                              : ""
                          }`}
                        />
                        <button className="rounded-md bg-gray-600 hover:bg-sunshineYellow transition duration-300 text-white p-3">
                          Submit
                        </button>
                      </form>
                    </td>
                  ) : (
                    <td
                      className={`p-4 ${
                        item.status === "Ready"
                          ? "text-green-600 bg-green-100 rounded-md"
                          : item.status === "In Process.."
                          ? "text-orange-600 bg-orange-100 rounded-md"
                          : ""
                      }`}
                    >
                      {item.status}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4">Loading data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default OrdersPage;
