import Notification from "@/components/Notification";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "../components/AuthProvider";
import QueryProvider from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seaside",
  description:
    "Welcome to Seaside, where the vibrant spirit of the Caribbean comes alive on every plate. Immerse yourself in a culinary journey that celebrates the rich tapestry of flavors and traditions from the islands. Our menu, a harmonious blend of Caribbean Classics, Island Specialties, and Tropical Cocktails, invites you to explore the authentic essence of Caribbean cuisine. From the fiery embrace of Jerk Chicken to the tender indulgence of Curry Goat and the refreshing sips of our handcrafted Mojitos, every dish and cocktail is a passport to the sun-soaked beaches and lively culture of the Caribbean. At Seaside, we invite you to savor the warmth, spice, and tropical delights that define our culinary haven. Join us and let the flavors of the Caribbean transport you to a place where every bite tells a story of the islands.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <QueryProvider>
            <div className="bg-[#080808]">
              <Notification />
              <Navbar />
              {children}
              <Footer />
              <ToastContainer
                position="bottom-right"
                theme="dark"
                autoClose={3000}
              />
            </div>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
