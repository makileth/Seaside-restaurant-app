"use client";

import { ProductType } from "@/types/types";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/utils/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Price = ({ productData }: { productData: ProductType }) => {
  const { addToCart } = useCartStore();
  const [total, setTotal] = useState(productData.price); // total price
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const handleAddToCart = () => {
    addToCart({
      id: productData.id,
      title: productData.title,
      img: productData.img,
      price: total,
      ...(productData.options?.length && {
        // a spread operator to conditionally add the prop
        optionTitle: productData.options[selected].title,
      }),
      quantity: quantity,
    });

    toast.success(`${productData.title} added to cart!`);
  };

  useEffect(() => {
    if (productData.options?.length) {
      // Check if productData has options and the array is not empty
      setTotal(
        quantity * productData.price +
          productData.options[selected].additionalPrice * quantity
      );
    }
  }, [quantity, selected, productData]);

  useEffect(() => {
    useCartStore.persist.rehydrate(); // it's used for restoring or rehydrating the state from some form of storage (e.g., localStorage) when the component first loads or the application starts
  }, []);

  return (
    <div className="flex flex-col gap-4 my-6">
      <h2 className="text-2xl font-bold">${total}</h2>
      {/* OPTIONS CONTAINER */}
      <div className="flex gap-4">
        {productData.options?.length &&
          productData.options?.map((option, index) => (
            <button
              key={option.title} // unique key for each button
              className="min-w-[6rem] p-2 rounded-md"
              style={{
                background: selected === index ? "#ffc322" : "#092226",
               // color: selected === index ? "white" : "red",
              }}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className="flex md:flex-row flex-col md:gap-0 gap-6 justify-between items-start md:items-center py-3">
        {/* QUANTITY */}
        <div className="flex justify-between w-full p-3 ring-1 ring-white rounded-[30px]">
          <span className="pl-2"> • Quantity</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
              {">"}
            </button>
          </div>
        </div>
        {/* CART BUTTON */}
      
        <button
          onClick={() => handleAddToCart()}
          className="bg-sunshineYellow  md:ml-4 rounded-[10px] hover:translate-y-[-5px] text-white py-[0.9rem] w-[12rem] hover:shadow-yellow-400 hover:shadow-2xl transition duration-350"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
