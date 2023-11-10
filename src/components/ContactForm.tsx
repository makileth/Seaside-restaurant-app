import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Submit form logic here
    router.push("/"); // Redirect to the main page
    // Toast success message
    toast.success("Message sent successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center bg-neutral-900 bg-opacity-70 p-6 w-full gap-1"
    >
      <div className="flex flex-col w-full">
        <label htmlFor="" className="text-white text-start">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type your name here"
          className="rounded-[10px] bg-neutral-800 p-2 my-2 text-white"
        />
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="" className="text-white text-start">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="username@email.com"
          className="rounded-[10px] bg-neutral-800 p-2 my-2 text-white"
        />
      </div>

      <div className="flex flex-col w-full">
        <label htmlFor="" className="text-white text-start ">
          Your Message
        </label>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message, question, or problem here"
          className="rounded-[10px] bg-neutral-800 p-2 my-2 text-white"
        />
      </div>

      <div className="flex flex-col w-full">
        <button
          type="submit"
          className="bg-sunshineYellow rounded-[10px] w-full md:w-1/4 mt-4 hover:translate-y-[-5px] text-white py-4 px-8 hover:shadow-yellow-400 hover:shadow-2xl transition duration-350"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
