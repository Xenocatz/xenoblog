"use client";
import { useSearchParams } from "next/navigation";

export default function AuthCodeError() {
  const error = useSearchParams().get("msg");
  return <h1>{error}</h1>;
}
