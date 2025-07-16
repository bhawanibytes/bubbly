import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import KeyFeatures from "@/components/KeyFeatures";
import Testimonials from "@/components/Testimonials";
import ChatInterface from "@/components/ChatInterface";
import SignupBT from "@/components/SignupBT";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <header className="mx-10">
        <Navbar />
      </header>
      <div className="w-full border-t-2 border-[#F2F2F2]"></div>
      <div className="mx-40 my-5 flex flex-col items-center">
        <HeroSection />
        <KeyFeatures />
        <Testimonials />
        <ChatInterface />
        <SignupBT />
      </div>
      <Footer />
    </div>
  );
}
