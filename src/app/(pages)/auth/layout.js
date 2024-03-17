import AuthProvider from "@/context/AuthProvider";
import { Inter } from "next/font/google";
import "../../../assets/style.css";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  )
}
