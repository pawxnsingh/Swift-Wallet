"use client"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useBalance } from "@repo/store/balance";

export default async function Page() {
  const balance = useBalance();
  console.log(balance);
  // if (session?.user) {
    redirect("/dashboard");
  // } else {
  //   redirect("/api/auth/signin");
  // }
}
