import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "React Query Example",
  description: "Next.js + React Query CRUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ReactQueryProvider>
          <body className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <Navbar />
            <main className="min-h-screen p-4 max-w-lg mx-auto">{children}</main>
            <Toaster position="top-right" />
          </body>
        </ReactQueryProvider>
      </ThemeProvider>
    </html>
  );
}
