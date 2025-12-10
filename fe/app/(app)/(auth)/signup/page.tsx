"use client";

// import Image from "next/image";
import { RootState } from "@/redux/store";
import OtpForm from "@components/OtpForm";
import SignupForm from "@components/SignupForm"; 
import { useSelector } from "react-redux";
import Button from "@components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; 
export default function Signup() {
  const otpStatus = useSelector((state: RootState) => state.auth.otpStatus);

  return (
    <>
      <div className="flex min-h-[91dvh] flex-col">
        <div className="flex w-full justify-center gap-5">
          <div
            className={`flex min-h-10 min-w-10 items-center justify-center rounded-full bg-gray-300`}
          >
            1
          </div>
          <div
            className={`flex min-h-10 min-w-10 items-center justify-center rounded-full bg-gray-300`}
          >
            2
          </div>
        </div>
        <div className="mx-40 flex flex-grow items-center justify-around gap-10">
          {otpStatus ? <OtpForm /> : <SignupForm />}
          <Button href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/google/auth`}>
          <FontAwesomeIcon icon={faGoogle} className="mx-2" />
            | Contacts
          </Button>
          {/* <Image
        src="/signup.jpg"
        alt="Descriptive alt"
        width={0}
        height={0}
        sizes="100vw"
        className="h-[80dvh] w-auto"
        priority
        /> */}
        </div>
      </div>
    </>
  );
}
