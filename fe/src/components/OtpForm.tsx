import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DigitsInput from "./DigitsInput";
import Button from "./Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { VerifySignupBody } from "@shared/types/auth.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { verifyFormData } from "@/features/auth/authSlice";
import { toast } from "sonner";
import { useVerifyUserMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";

export const OtpForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const number = useSelector((state: RootState) => state.auth.number);
    const [verifyUser, { isLoading }] = useVerifyUserMutation();
    const { register, handleSubmit } = useForm<VerifySignupBody>();
    const onSubmit: SubmitHandler<VerifySignupBody> = async (data, e) => {
        e?.preventDefault();
        dispatch(verifyFormData(data));
        try {
            toast.promise(verifyUser({ number, otp: data.otp }).unwrap(), {
                loading: "Verifing...",
                success: (result) => {
                    if (result.success) {
                        setTimeout(() => {
                            router.push("/login");
                        }, 3000);
                        return {
                            message: `You are verified with ${result.data.number}`,
                            description: "Redirecting to Login ...",
                        };
                    }
                    throw new Error("Verification failed");
                },
                error: (result) => {
                    if (result.status === 401) {
                        return "Wrong Otp";
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
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex min-w-70 flex-col justify-center py-5"
            >
                <div className="w-full text-left text-2xl font-medium">
                    Sign Up
                </div>
                <p className="mt-6 text-sm font-normal text-neutral-500">
                    Otp is sent to +91 {number}
                </p>
                <div className="mt-1 flex h-10 w-full items-center gap-2 rounded-xl border-[0.1rem] border-[#190a0a] p-2">
                    <FontAwesomeIcon icon={faKey} className="max-h-4 max-w-4" />
                    <label htmlFor="otp">Verify otp | </label>
                    <DigitsInput
                        className="max-w-25"
                        placeholder="342516"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        minLength={6}
                        {...register("otp")}
                        type="text"
                    />
                </div>
                <Button
                    className={`mt-6 w-full ${isLoading ? "cursor-not-allowed bg-gray-700 text-shadow-indigo-100" : ""} `}
                    type="submit"
                    disabled={isLoading}
                >
                    Verify
                </Button>
            </form>
        </>
    );
};

export default OtpForm;
