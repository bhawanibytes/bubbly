import Image from "next/image";
import Link from "next/link";

export default function Navbar () {
  return (
      <div className='navContainer min-h-16 text-black flex justify-between items-center'>
        <div className='logo'>
          <Link href='/' className='flex gap-4'>
            <Image
              className=''
              src='/logo.svg'
              alt='Bubbly logo'
              width={16}
              height={16}
              priority
            />
            <h1 className='font-plus font-bold text-2xl'>
              Bubbly Connect
            </h1>
          </Link>
        </div>
        <nav className="navlinks flex gap-8 items-center">
          <ul className=" flex gap-9">
          <Link href='/product' className="text-xl"> Product </Link>
          <Link href='/features' className="text-xl"> Features </Link>
          <Link href='/pricing' className="text-xl"> Pricing </Link>
          </ul>
          <div className="flex font-medium  gap-2">
          <Link href='/signup' className=" w-[5.375rem] text-[1em] flex items-center justify-center bg-black h-10 rounded-3xl text-white ">Sign Up</Link>
          <Link href='/login' className=" w-[5.375rem] text-[1em] flex items-center justify-center h-10 bg-[#F2F2F2] rounded-3xl ">Login</Link>
          </div>
        </nav>
      </div>
  )
}