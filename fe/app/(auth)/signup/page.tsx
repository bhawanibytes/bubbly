"use client";

import Image from "next/image";
import { RootState } from "@/redux/store";
import OtpForm from "@/components/OtpForm";
import SignupForm from "@/components/SignupForm";
import { useSelector } from "react-redux";

export default function Signup() {
  const otpStatus = useSelector((state: RootState) => state.auth.otpStatus);

  return (
    <div className="mx-40 my-5 flex min-h-[87dvh] items-center justify-around gap-10">
      {otpStatus ? <OtpForm /> : <SignupForm />}
      <Image
        src="/signup.jpg"
        alt="Descriptive alt"
        width={0}
        height={0}
        sizes="100vw"
        className="h-[80dvh] w-auto"
        priority
      />
    </div>
  );
}
