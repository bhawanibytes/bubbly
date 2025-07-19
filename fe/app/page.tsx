import HeroSection from "@/components/HeroSection";
import KeyFeatures from "@/components/KeyFeatures";
import Testimonials from "@/components/Testimonials";
import ChatInterface from "@/components/ChatInterface";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div>
      <div className="mx-40 my-5 flex flex-col items-center">
        <HeroSection />
        <KeyFeatures />
        <Testimonials />
        <ChatInterface />
        <Button href="/signup" className="mx-4 my-3">Sign Up Now</Button>
      </div>
    </div>
  );
}
