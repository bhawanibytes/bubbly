import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import KeyFeatures from "@/components/KeyFeatures";

export default function Home() {
  return (
    <div>
      <header className="mx-8">
        <Navbar />
      </header>
      <div className="w-full border-t-2 border-[#F2F2F2]"></div>
      <div className="mx-40 mt-5 flex flex-col items-center">
        <HeroSection />
        <KeyFeatures />
      </div>
    </div>
  );
}
