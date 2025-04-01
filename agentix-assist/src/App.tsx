import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TaxAIChatbot from "./components/ui/chatBot";
import Reels from "./pages/Reels";
import Tinder from "./pages/Tinder";
import SistaAI from "./components/sista-ai/SistaAI";
import { OCR } from "./pages/OcrPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/chat" element={<TaxAIChatbot/>} />
        </Routes>
	  <div className="min-h-screen flex flex-col">
          {/* Fixed Navbar at the top */}
          <div className="w-full fixed top-0 left-0 bg-white shadow-md z-50">
            <Navbar />
          </div>

          {/* Main content with padding to avoid overlap */}
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/voice" element={<SistaAI />} />
              <Route path="/tinder" element={<Tinder />} />
			  <Route path="/ocrscan" element={<OCR/>} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </main>

          {/* Footer remains at the bottom */}
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
