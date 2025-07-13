export default function HeroSection() {
  return (
    <div className='relative z-0 w-[58rem] h-[30rem] m-4'>
      <div className="hero-image bg-[url('/heroImage.png')] min-w-[58rem] min-h-[30rem] bg-cover bg-center rounded-2xl"></div>
      <div className='absolute inset-0 z-10 rounded-2xl bg-gradient-to-r from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.4)] pointer-events-none' />
    </div>
  );
}
