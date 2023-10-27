// Importiere benötigte Funktionen und Komponenten von Stripe und React
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";

// Die CheckoutForm-Komponente ist dafür verantwortlich, das Zahlungsformular zu erstellen und die Zahlung zu verarbeiten.
const CheckoutForm = () => {
  // Verwende Stripe-Hooks, um auf Stripe-Funktionalität zuzugreifen
  const stripe = useStripe();
  const elements = useElements();

  // Zustandsvariablen für E-Mail, Nachricht und Ladezustand
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Effekt, der aufgerufen wird, wenn die Komponente geladen wird
  useEffect(() => {
    if (!stripe) {
      return;
    }

    // Holen Sie sich den PaymentIntent-Client-Geheimcode aus den Suchparametern der URL
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    // Rufen Sie den PaymentIntent ab und aktualisieren Sie die Nachricht entsprechend dem Status
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Zahlung erfolgreich!");
          break;
        case "processing":
          setMessage("Ihre Zahlung wird verarbeitet.");
          break;
        case "requires_payment_method":
          setMessage("Ihre Zahlung war nicht erfolgreich, bitte versuchen Sie es erneut.");
          break;
        default:
          setMessage("Etwas ist schief gelaufen.");
          break;
      }
    });
  }, [stripe]);

  // Funktion, die aufgerufen wird, wenn das Formular gesendet wird
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js wurde noch nicht geladen.
      // Stellen Sie sicher, dass das Formular erst dann übermittelt wird, wenn Stripe.js geladen ist.
      return;
    }

    setIsLoading(true);

    // Bestätigen Sie die Zahlung über Stripe und zeigen Sie eine Nachricht entsprechend dem Ergebnis an
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Stellen Sie sicher, dass Sie diese URL auf Ihre Zahlungsabschlussseite ändern
        return_url: "/success",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Etwas ist schief gelaufen!");
    } else {
      setMessage("Ein unerwarteter Fehler ist aufgetreten.");
    }

    setIsLoading(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8"
    >
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <AddressForm />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="bg-red-500 text-white p-4 rounded-md w-28">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Jetzt bezahlen"}
        </span>
      </button>
      {/* Zeige Fehler- oder Erfolgsmeldungen an */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
