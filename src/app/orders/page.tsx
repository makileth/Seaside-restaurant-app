"use client";

import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { OrderType } from "@/types/types";
import { Input } from "postcss";
import Image from "next/image";
import { PUT } from "../api/orders/[id]/route";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrdersPage = () => {
  
  const { data: session, status } = useSession();

  console.log(session);

  const router = useRouter();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"], // Unique key for this query
    queryFn: () =>
      fetch("/api/orders").then((res) => res.json()), // Function to fetch data
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`/api/orders/${id}`, {
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
    return <div>Loading...</div>;
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
    toast.success('Order updated successfully!')
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((item: OrderType) => (
              <tr className={`text-sm md:text-base bg-red-50 ${item.status == 'Ready!' && 'bg-green-500'}`} key={item.id} >
                <td className="hidden md:block py-6 px-1">{item.id}</td>
                <td className="py-6 px-1">
                  {item.createdAt.toString().slice(0, 10)}
                </td>
                <td className="py-6 px-1">{item.price}</td>
                <td className="hidden md:block py-6 px-1">
                  {item.products[0].title}
                </td>
                {session?.user.isAdmin ? (
                  <td>
                    <form
                      className="flex items-center justify-center gap-4"
                      onSubmit={(e) => handleUpdate(e, item.id)}
                    >
                      <input
                        placeholder={item.status}
                        className="rounded-md bg-slate-100 w-[200px] h-12 p-4"
                      />
                      <button className="rounded-[10px] bg-red-300 p-3">
                        {/* <Image src="/public/edit.svg" alt="edit" width={24} height={24} /> */}
                        Submit
                      </button>
                    </form>
                  </td>
                ) : (
                  <td className="py-6 px-1">{item.status}</td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td>Loading data...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
