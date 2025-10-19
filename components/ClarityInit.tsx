"use client";
import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityInit() {
  useEffect(() => {
    Clarity.init("tss7r1evpo");
  }, []);
  return null;
}
