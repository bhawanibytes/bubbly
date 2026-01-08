import Link from "next/link";
import { twMerge } from "tailwind-merge";
import React from "react";

type CommonProps = {
    className?: string | Record<string, string>;
    children?: React.ReactNode;
};

type ButtonAsLink = CommonProps &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    };

type ButtonAsButton = CommonProps &
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        href?: string;
    };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button(props: ButtonProps) {
    const { className, children, ...rest } = props;

    const merged = twMerge(
        "flex h-10 px-6 items-center justify-center rounded-full bg-black text-base font-bold text-white",
        className
    );

    if ("href" in props) {
        // Render as Link
        return (
            //@ts-expect-error tsi
            <Link {...rest} href={props.href} className={merged}>
                {children}
            </Link>
        );
    }

    // Render as <button>
    return (
        //@ts-expect-error tsi
        <button {...rest} className={merged}>
            {children}
        </button>
    );
}
