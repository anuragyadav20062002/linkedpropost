import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/Hero";
import FeatureHighlight from "@/components/Feature";
import Testimonial from "@/components/Testimonial";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeatureHighlight />
      <Testimonial />
      <Pricing />
      <Faq />
      <Footer />
    </div>
  )
}
