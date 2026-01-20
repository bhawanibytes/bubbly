import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex flex-col items-center gap-6 px-5 py-10">
            <div className="policies flex min-w-230 justify-around">
                <Link
                    href={
                        process.env.NEXT_PUBLIC_X_URL ||
                        "https://bhawanibytes.dev"
                    }
                    target="_blank"
                    className="flex min-w-40 items-center justify-center text-base text-[#757575]"
                >
                    Privacy Policy
                </Link>
                <Link
                    href={
                        process.env.NEXT_PUBLIC_X_URL ||
                        "https://bhawanibytes.dev"
                    }
                    target="_blank"
                    className="flex min-w-40 items-center justify-center text-base text-[#757575]"
                >
                    Term of Service
                </Link>
                <Link
                    href={
                        process.env.NEXT_PUBLIC_X_URL ||
                        "https://bhawanibytes.dev"
                    }
                    target="_blank"
                    className="flex min-w-40 items-center justify-center text-base text-[#757575]"
                >
                    Contact Us
                </Link>
            </div>
            <div className="socials flex gap-4">
                <Link
                    href={
                        process.env.NEXT_PUBLIC_X_URL ||
                        "https://bhawanibytes.dev"
                    }
                    target="_blank"
                >
                    <Image
                        src="./x.svg"
                        alt="X or Twitter"
                        width={20}
                        height={20}
                    />
                </Link>
                <Link
                    href={
                        process.env.NEXT_PUBLIC_FACEBOOK_URL ||
                        "https://bhawanibytes.dev"
                    }
                    target="_blank"
                >
                    <Image
                        src="./facebook.svg"
                        alt="Facebook"
                        width={20}
                        height={20}
                    />
                </Link>
                <Link
                    href={
                        process.env.NEXT_PUBLIC_INSTA_URL ||
                        "https://bhawanibytes.dev"
                    }
                    target="_blank"
                >
                    <Image
                        src="./instagram.svg"
                        alt="Instagram"
                        width={20}
                        height={20}
                    />
                </Link>
            </div>
            <div className="copyrights flex justify-center">
                <p className="text-base font-normal text-[#757575]">
                    © 2024 ChatApp. All rights reserved.
                </p>
            </div>
        </div>
    );
}
