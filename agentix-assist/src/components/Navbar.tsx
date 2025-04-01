import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-display font-bold text-taxblue-600">
                IT<span className="text-taxgreen-500">Yaar</span>
              </span>
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-gray-700 hover:text-taxblue-500 transition-colors">
                Learn ▼
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <Link to="/tinder" className="w-full block">
                    Tinder
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/reels" className="w-full block">
                    Reels
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/voice"
              className="text-gray-700 hover:text-taxblue-500 transition-colors"
            >
              Voice UI
            </Link>

            <Link
              to="/ocrscan"
              className="text-gray-700 hover:text-taxblue-500 transition-colors"
            >
              OCR Scan
            </Link>

            <a
              href="http://localhost:3001/recommendations"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-taxblue-500 transition-colors"
            >
              Recommendations
            </a>

            {/* <Button
              variant="outline"
              className="border-taxblue-500 text-taxblue-500 hover:bg-taxblue-50"
            >
              Log In
            </Button> */}
            <Button className="bg-taxblue-500 hover:bg-taxblue-600">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-taxblue-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
            <a
              href="#features"
              className="block px-3 py-2 text-gray-700 hover:bg-taxblue-50 rounded-md"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 text-gray-700 hover:bg-taxblue-50 rounded-md"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 text-gray-700 hover:bg-taxblue-50 rounded-md"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 text-gray-700 hover:bg-taxblue-50 rounded-md"
            >
              FAQ
            </a>
            <div className="flex flex-col space-y-2 px-3 py-2">
              <Button
                variant="outline"
                className="border-taxblue-500 text-taxblue-500 hover:bg-taxblue-50 w-full"
              >
                Log In
              </Button>
              <Button className="bg-taxblue-500 hover:bg-taxblue-600 w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
