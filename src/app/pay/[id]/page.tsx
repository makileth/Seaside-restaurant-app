"use client";
import CheckoutForm from "@/components/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading"; // Import the Loading component

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PayPage = ({ params }: { params: { id: string } }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const { id } = params;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(`/api/create-intent/${id}`, {
          method: "POST",
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
        setLoading(false); // Set loading to false when data is available
      } catch (err) {
        console.log(err);
        setLoading(false); // Set loading to false on error
      }
    };

    makeRequest();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "night",
      variables: {
        fontFamily: "Sohne, system-ui, sans-serif",
        fontWeightNormal: "500",
        borderRadius: "8px",
        colorBackground: "#0A2540",
        colorPrimary: "#EFC078",
        accessibleColorOnColorPrimary: "#1A1B25",
        colorText: "white",
        colorTextSecondary: "white",
        colorTextPlaceholder: "#727F96",
        tabIconColor: "white",
        logoColor: "dark",
      },
      rules: {
        ".Input, .Block": {
          backgroundColor: "transparent",
          border: "1.5px solid var(--colorPrimary)",
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto min-h-[100vh] justify-center items-center my-4">
      {loading ? ( // Check the loading state
        <Loading />
      ) : (
        <section className="bg-neutral-900 mt-[5rem] my-6 w-auto h-auto max-h-[65rem] items-center justify-center py-9">
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </section>
      )}
    </div>
  );
};

export default PayPage;
