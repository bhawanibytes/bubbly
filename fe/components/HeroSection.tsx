import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <div className='relative z-0 w-[58rem] h-[30rem] m-4'>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('/heroImage.png')`,
          }}
          className="hero-image flex flex-col justify-end  px-10 pb-10 bg-[url('/heroImage.png')] bg-no-repeat min-w-[58rem] min-h-[30rem] bg-cover bg-center rounded-2xl "
        >
          <div className='headings p-4 flex flex-col gap-2 text-white'>
            <h1 className='text-5xl'>
              Connect Instantly, Communicate Seamlessly
            </h1>
            <h2 className='text-base text-[#F2F2F2] font-normal'>
              Experience real-time messaging with ChatApp. Our platform offers
              secure, reliable, and feature-rich communication tools for
              individuals and teams. Stay connected with friends, family, and
              colleagues effortlessly.
            </h2>
            <Link href='/signup' className='mt-4 text-base font-bold w-[8.438rem] h-12 bg-black flex justify-center items-center rounded-4xl '>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
