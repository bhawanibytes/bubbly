import Link from "next/link";

export default function SignupBT() {
  return (
    <div className="flex px-4 py-3">
      <Link
        href="/signup"
        className="flex h-12 w-35.5 items-center justify-center rounded-full bg-black text-base font-bold text-white"
      >
        Sign Up Now
      </Link>
    </div>
  );
}
