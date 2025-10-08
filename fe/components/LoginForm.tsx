"use client";

import {
  faEye,
  faEyeSlash,
  faLock,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import DigitsInput from "./DigitsInput";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import { LoginBody } from "@shared/types/auth.type";
import { toast } from "sonner";
import { useLoginUserMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userDetailsFromBE } from "@/features/auth/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [pinVisible, setPinVisible] = useState(false);
  const { register, handleSubmit } = useForm<LoginBody>();
  const onSubmit: SubmitHandler<LoginBody> = async (data, e) => {
    e?.preventDefault();
    data.number = "+91" + data.number;
    try {
      toast.promise(loginUser(data).unwrap(), {
        loading: "Logging in...",
        success: (result) => {
          if (result.success) {
            localStorage.setItem("userId", result.data.userId);
            dispatch(
              userDetailsFromBE({
                number: result.data.number,
                userId: result.data.userId,
              })
            );
            console.log(`loginPage: ${result.data.userId}`);
            setTimeout(() => {
              router.push("/dashboard");
            }, 1000);
            return {
              message: `You have logged in with ${result.data.number}`,
              description: "Redirecting to Dashboard ...",
            };
          }
          throw new Error("Logging in failed");
        },
        error: (result) => {
          if (result.status === 401) {
            return `Invalid credentials`;
          }
          return "Something went wrong";
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-w-70 flex-col justify-center py-5"
    >
      <div className="w-full text-left text-2xl font-medium">Log in</div>
      <div className="mt-6 flex h-10 w-full items-center gap-2 rounded-xl border-[0.1rem] border-[#e6e6e6] p-2">
        <FontAwesomeIcon icon={faPhone} className="max-h-4 max-w-4" />
        +91
        <DigitsInput
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
          Enter 4 digit pin |{" "}
        </label>
        <DigitsInput
          className="max-w-20"
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

      <Button
        className={`mt-6 w-full ${isLoading ? "cursor-not-allowed bg-gray-700 text-shadow-indigo-100" : ""} `}
        type="submit"
        disabled={isLoading}
      >
        Login
      </Button>
      <div className="mt-6 flex w-full justify-center">
        <p>{`Don't have an Account?`}</p>
        <Button
          href="/signup"
          className="m-0 h-fit w-fit bg-white p-0 px-1 text-black"
        >
          Signup
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
