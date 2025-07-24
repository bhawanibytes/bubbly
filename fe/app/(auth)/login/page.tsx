import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function Login() {
  return (
    <div className="mx-40 my-5 flex min-h-[87dvh] items-center justify-around gap-10">
      <Image
        src="/signup.jpg"
        alt="Descriptive alt"
        width={0}
        height={0}
        sizes="100vw"
        className="h-[80dvh] w-auto"
        priority
      />
      <LoginForm />
    </div>
  );
}
