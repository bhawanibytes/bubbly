import HeroSection from "@/components/HeroSection";
import KeyFeatures from "@/components/KeyFeatures";
import Testimonials from "@/components/Testimonials";
import ChatInterface from "@/components/ChatInterface";
import SignupBT from "@/components/SignupBT";

export default function Home() {
  return (
    <div>
      <div className="mx-40 my-5 flex flex-col items-center">
        <HeroSection />
        <KeyFeatures />
        <Testimonials />
        <ChatInterface />
        <SignupBT />
      </div>
    </div>
  );
}
