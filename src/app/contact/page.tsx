"use client";
import ContactForm from "../../components/ContactForm";
import Link from "next/link";

const ContactPage = () => {
  return (
    <div className="flex items-center justify-center mx-auto max-w-4xl min-h-[100vh] flex-col">
      <Link className="text-white text-xl text-start w-full p-4" href='/'>
      ← Back
      </Link>
      <h1 className="text-white text-5xl font-bold p-4 mb-6 text-start w-full">Contact us</h1>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
