import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <div className="relative z-0 m-4 h-[30rem] w-[58rem]">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('/heroImage.png')`,
          }}
          className="hero-image flex min-h-[30rem] min-w-[58rem] flex-col justify-end gap-8 rounded-2xl bg-[url('/heroImage.png')] bg-cover bg-center bg-no-repeat px-10 pb-10 text-white"
        >
          <div className="headings flex flex-col gap-2">
            <h1 className="text-5xl leading-tight font-black tracking-[-0.033em]">
              Connect Instantly, Communicate Seamlessly
            </h1>
            <h2 className="text-base font-normal text-[#F2F2F2]">
              Experience real-time messaging with ChatApp. Our platform offers
              secure, reliable, and feature-rich communication tools for
              individuals and teams. Stay connected with friends, family, and
              colleagues effortlessly.
            </h2>
          </div>
          <Link
            href="/signup"
            className="flex h-12 w-[8.438rem] items-center justify-center rounded-4xl bg-black text-base font-bold"
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}
