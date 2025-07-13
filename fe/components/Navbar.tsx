import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navContainer flex min-h-16 items-center justify-between text-black">
      <div className="logo">
        <Link href="/" className="flex gap-4">
          <Image
            className=""
            src="/logo.svg"
            alt="Bubbly logo"
            width={16}
            height={16}
            priority
          />
          <h1 className="text-lg font-bold">Bubbly Connect</h1>
        </Link>
      </div>
      <nav className="navlinks flex items-center gap-8">
        <ul className="flex gap-9">
          <Link href="/product" className="text-sm font-medium">
            {" "}
            Product{" "}
          </Link>
          <Link href="/features" className="text-sm font-medium">
            {" "}
            Features{" "}
          </Link>
          <Link href="/pricing" className="text-sm font-medium">
            {" "}
            Pricing{" "}
          </Link>
        </ul>
        <div className="flex gap-2 font-medium">
          <Link
            href="/signup"
            className="flex h-10 w-[5.375rem] items-center justify-center rounded-3xl bg-black text-sm text-white"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="flex h-10 w-[5.375rem] items-center justify-center rounded-3xl bg-[#F2F2F2] text-sm"
          >
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}
