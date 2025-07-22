"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import DigitsInput from "@/components/DigitsInput";
import Button from "@/components/Button";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setFormData } from "@/lib/features/auth/signupSlice";

type Inputs = {
  fullname: string;
  number: string;
  pin: string;
};

export default function Signup() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<Inputs>();
  const [pinVisible, setPinVisible] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    dispatch(setFormData(data));
  };
  // console.log(watch("fullname"));
  return (
    <div className="mx-40 my-5 flex min-h-[87dvh] items-center justify-around gap-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-w-70 flex-col justify-center py-5"
      >
        <div className="w-full text-left text-2xl font-medium">Sign Up</div>
        <div className="mt-6 flex h-10 w-full items-center gap-2 rounded-xl border-[0.1rem] border-[#e6e6e6] p-2">
          <FontAwesomeIcon icon={faUser} className="max-h-5 max-w-5" />
          <input
            className="h-full w-full outline-none"
            type="text"
            id="usersname"
            placeholder="Harkirat"
            {...register("fullname")}
            autoComplete="name"
          />
        </div>
        <div className="mt-6 flex h-10 w-full items-center gap-2 rounded-xl border-[0.1rem] border-[#e6e6e6] p-2">
          <FontAwesomeIcon icon={faPhone} className="max-h-4 max-w-4" />
          <DigitsInput
            id="usersnumber"
            placeholder="9876543210"
            pattern="[0-9]{10}"
            maxLength={10}
            minLength={10}
            {...register("number")}
          />
        </div>
        <div className="mt-6 flex h-10 w-full items-center gap-2 rounded-xl border-[0.1rem] border-[#e6e6e6] p-2">
          <FontAwesomeIcon icon={faLock} className="max-h-4 max-w-4" />
          <label htmlFor="pin" className="">
            Set 4 digit pin |{" "}
          </label>
          <DigitsInput
            className="max-w-20"
            id="userspin"
            placeholder="1234"
            pattern="[0-9]{4}"
            maxLength={4}
            minLength={4}
            {...register("pin")}
            type={pinVisible ? "text" : "password"}
          />
          <FontAwesomeIcon
            icon={pinVisible ? faEye : faEyeSlash}
            className="max-h-4 max-w-4"
            onClick={() => setPinVisible(!pinVisible)}
          />
        </div>
        <Button className="mt-6 w-full" type="submit">
          Signup
        </Button>
        <div className="mt-6 flex w-full justify-center">
          <p>Already have an Account?</p>
          <Button
            href="/login"
            className="m-0 h-fit w-fit bg-white p-0 px-1 text-black"
          >
            Login
          </Button>
        </div>
      </form>
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
