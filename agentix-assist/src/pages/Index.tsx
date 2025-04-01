
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Reels from "./Reels";
import SistaAI from "../components/sista-ai/SistaAI";
import Tinder from "../pages/Tinder";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow">
        <Hero />
        <Features />
        <Process />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
