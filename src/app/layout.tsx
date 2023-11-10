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
  description: "Best food, try for yourself",
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
