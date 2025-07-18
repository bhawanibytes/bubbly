import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex min-w-240 flex-col items-center gap-6 px-5 py-10">
      <div className="policies flex min-w-230 justify-around">
        <Link
          href="# "
          className="flex min-w-40 items-center justify-center text-base text-[#757575]"
        >
          Privacy Policy
        </Link>
        <Link
          href="# "
          className="flex min-w-40 items-center justify-center text-base text-[#757575]"
        >
          Term of Service
        </Link>
        <Link
          href="# "
          className="flex min-w-40 items-center justify-center text-base text-[#757575]"
        >
          Contact Us
        </Link>
      </div>
      <div className="socials flex gap-4">
        <Image src="./x.svg" alt="X or Twitter" width={20} height={20} />
        <Image src="./facebook.svg" alt="Facebook" width={20} height={20} />
        <Image src="./instagram.svg" alt="Instagram" width={20} height={20} />
      </div>
      <div className="copyrights flex justify-center">
        <p className="text-base font-normal text-[#757575]">
          © 2024 ChatApp. All rights reserved.
        </p>
      </div>
    </div>
  );
}
