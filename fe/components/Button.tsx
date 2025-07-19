import Link from "next/link";
import { twMerge } from "tailwind-merge";
import React from "react";
interface ButtonProps {
  className?: string;
  href: string;
  children?: React.ReactNode;
  buttonProp?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
export default function Button({
  className,
  href,
  children,
  ...buttonProp
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={twMerge(
        "flex h-12 w-35.5 items-center justify-center rounded-full bg-black text-base font-bold text-white",
        className
      )}
    >
      <button className="cursor-pointer" {...buttonProp}>
        {children}
      </button>
    </Link>
  );
}
