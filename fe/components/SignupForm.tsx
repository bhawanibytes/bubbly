import { useRegisterMutation } from "@/features/auth/authApi";
import { signupFormData, otpStatus } from "@/features/auth/authSlice";
import { SignupBody } from "@/types/types.auth";
import {
  faEye,
  faEyeSlash,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import DigitsInput from "./DigitsInput";
import Button from "./Button";
import { toast } from "sonner";

const SignupForm = () => {
  const [pinVisible, setPinVisible] = useState(false);
  const { register, handleSubmit } = useForm<SignupBody>();
  const dispatch = useDispatch();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const onSubmit: SubmitHandler<SignupBody> = async (data, e) => {
    e?.preventDefault();
    dispatch(signupFormData(data));
    try {
      toast.promise(registerUser(data).unwrap(), {
        loading: "Signing up...",
        success: (result) => {
          if (result.success) {
            dispatch(otpStatus({ otpStatus: true }));
            return {
              // @ts-expect-error number will be received
              message: `OTP is sent to +91${result.data.number}`,
              description: "Verify with otp...",
            };
          }
          throw new Error("Signup failed");
        },
        error: "Something went wrong",
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
      <div className="w-full text-left text-2xl font-medium">Sign Up</div>
      <div className="mt-6 flex h-10 w-full items-center gap-2 rounded-xl border-[0.1rem] border-[#e6e6e6] p-2">
        <FontAwesomeIcon icon={faUser} className="max-h-5 max-w-5" />
        <input
          className="h-full w-full outline-none"
          type="text"
          placeholder="Harkirat Singh"
          {...register("fullname")}
          autoComplete="name"
        />
      </div>
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
          Set 4 digit pin |{" "}
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
  );
};

export default SignupForm;
