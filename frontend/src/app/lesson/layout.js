import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eantreprenor",
  description: "E-learning platform for the new generation of antrepreneurs",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden min-h-[100vh] flex flex-col`}>

        <Navigation/>
        <div className='w-full flex-1 flex flex-col'>
          {children}
        </div>

      </body>
    </html>
  );
}
