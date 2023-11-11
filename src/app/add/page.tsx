"use client";

import { getAuthSession } from "@/utils/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

type Option = {
  title: string;
  additionalPrice: number;
};

type Input = {
  title: string;
  desc: string;
  price: number;
  catSlug: string;
};
const AddPage = () => {
  const { data: session, status } = useSession();

  const [file, setFile] = useState<File>(); // image

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [inputs, setInputs] = useState<Input>({
    title: "",
    desc: "",
    price: 0,
    catSlug: "",
  });

  const [option, setOption] = useState({
    title: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);

  const router = useRouter();

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    //  router.push("/");
    return <h1>You are not authorized to access this page</h1>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    console.log(inputs); // for debugging
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value }; // target name is a dynamic key used in order to access the input's data
    });

    console.log(options); // for debugging
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // we access the HTML-Element that activated the event
    const target = e.target as HTMLInputElement;

    // 'target.files' has info about the chosen files. We have the info about the first chosen img ([0])
    const item = (target.files as FileList)[0];

    // lets save the file
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData(); // by using this we will collect our img and some other info for our http-request

    data.append("file", file!); // we give the file over to data

    data.append("upload_preset", "food-app"); // add our preset from Cloudinary

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dn2ep2prg/image/upload",
      {
        method: "POST",
        //  headers: { "Content-Type": "multipart/form-data" },
        body: data,
      }
    );

    const resData = await res.json(); // the answer from the server

    setImageUrl(resData.url);

    return resData.url; // extract url from the answer
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();
      const res = await fetch(
        "https://restaurant-app-dusky.vercel.app/api/products",
        {
          // https://restaurant-app-dusky.vercel.app
          method: "POST",
          body: JSON.stringify({
            img: url,
            ...inputs, // everything inside inputs
            options,
          }),
        }
      );

      const data = await res.json();

      //  console.log(data);

      toast.success("Product added successfully!"); // display an alert message to the user

      setInputs({ title: "", desc: "", price: 0, catSlug: "" }); // reset the form inputs

      setOptions([]); // reset the options array

      setOption({ title: "", additionalPrice: 0 }); // reset the option object
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="flex items-center justify-center mx-auto max-w-4xl min-h-[100vh]">
      <form
        action=""
        className=" mt-[5rem] shadow-md rounded-[10px] px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h1 className="block text-sunshineYellow text-[24px] font-bold mb-2">
          Add a new product
        </h1>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            className="shadow bg-neutral-800 appearance-none border rounded-[10px] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Product's name"
            id="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="productName"
          >
            Product Image
          </label>
          {/* {imageUrl && <Image src={imageUrl} width={24} height={24} alt="" />} */}
          <input
            type="file"
            onChange={handleChangeImage}
            className="bg-neutral-800 text-white  rounded-[10px] p-2"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <input
            className="shadow appearance-none border rounded-[10px] bg-neutral-800 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Category"
            id="category"
            name="catSlug"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 ">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none bg-neutral-800 border rounded-[10px] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            name="desc"
            id="description"
            cols={30}
            rows={10}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            className="shadow appearance-none border rounded-[10px] w-full bg-neutral-800 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="123.00$"
            id="price"
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="inputs"
          >
            Options
          </label>
          <div className="space-y-4 mb-4 ">
            <input
              onChange={handleChangeOption}
              className="shadow appearance-none border bg-neutral-800 rounded-[10px] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
              name="title"
              id="inputs"
            />
            <input
              onChange={handleChangeOption}
              className="shadow appearance-none border bg-neutral-800 rounded-[10px] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Additional Price"
              name="additionalPrice"
            />
          </div>
          <button
            className="bg-neutral-900 hover:bg-black text-white font-bold py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline mt-3"
            type="button"
            onClick={() => setOptions((prev) => [...prev, option])}
          >
            Add Option
          </button>
          <div>
            {options.map((opt) => (
              // use title because no id
              <div key={opt.title} className="flex flex-row">
                <div className="bg-white border-[3px] px-3 py-2 mt-4 font-semibold text-neutral-800 border-red-500 rounded-[10px]-[10px]">
                  <h4>
                    {opt.title} ({opt.additionalPrice + "$"})
                  </h4>
                </div>
                <button
                  className="text-red-500 text-[21px] mt-4 mx-3"
                  onClick={() =>
                    setOptions(
                      options.filter((item) => item.title !== opt.title)
                    )
                  }
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 space-x-4">
          <button
            className="bg-sunshineYellow hover:shadow-2xl hover:shadow-sunshineYellow text-white font-bold py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add
          </button>
          <button
            className="bg-neutral-700 hover:bg-black text-white font-bold py-2 px-4 rounded-[10px] focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPage;
