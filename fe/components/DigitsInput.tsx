import React from "react";
import { twMerge } from "tailwind-merge";

export default function DigitsInput({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const acceptDigitOnly = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.value = input.value.replace(/[^0-9]/g, "");
  };

  return (
    <input
      className={twMerge("h-full w-full outline-none", className)}
      inputMode="numeric"
      onInput={acceptDigitOnly}
      {...rest}
    />
  );
}
