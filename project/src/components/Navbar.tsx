import React from 'react';
import { Plane, Menu, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-orange-400" />
            <span className="text-2xl font-bold">TravelX</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#" active>Home</NavLink>
            <NavLink href="#">Destinations</NavLink>
            <NavLink href="#">Experiences</NavLink>
            <NavLink href="#">About</NavLink>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="hidden md:block bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors">
              Sign In
            </button>
            <button className="hidden md:block bg-gradient-to-r from-orange-500 to-pink-600 px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
              Get Started
            </button>
            <button className="md:hidden p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children, active = false }) => (
  <a 
    href={href}
    className={`text-sm font-medium hover:text-orange-400 transition-colors ${
      active ? 'text-orange-400' : 'text-gray-300'
    }`}
  >
    {children}
  </a>
);

export default Navbar;