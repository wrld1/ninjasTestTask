import Image from "next/image";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import SuperheroesList from "@/components/SuperheroList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [backendData, setBackendData] = useState({ users: [] });

  return (
    <main
      className={`flex min-h-screen flex-col text-center bg-[#121212] text-white p-24 ${inter.className}`}
    >
      <SuperheroesList />
    </main>
  );
}
