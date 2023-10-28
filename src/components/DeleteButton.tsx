"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteButton = ({ id }: { id: string }) => {
  
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "loading") return <p>Loading..</p>;
  if (status === "unauthenticated" || !session?.user.isAdmin)
    return <p>You must be logged in to view this page.</p>;

  const handleDelete = async () => {
    const response = await fetch(`https://restaurant-app-dusky.vercel.app/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: session?.user?.id,
      }),
    });

    if (response.ok) {
      router.push("/");
      toast.success("Product deleted successfully");
    } else {
      const data = await response.json();
      console.log(data);
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      className="bg-red-400 text-white text-[21px] hover:bg-red-700 transition duration-300 p-2 rounded-[10px] cursor-pointer absolute top-5 right-5"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
