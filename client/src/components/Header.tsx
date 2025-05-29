import React, { useState } from 'react';
import { Paintbrush, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const navLinks = [
    { to: '/', text: 'Homepage' }, // Changed href to to
    { to: '/#about', text: 'Our Company' }, // Changed href to to, added /#
    { to: '/#services', text: 'Services' }, // Changed href to to, added /#
    { to: '/#pricing', text: 'Pricing' },   // Changed href to to, added /#
    { to: '/#testimonials', text: 'Testimonials' }, // Changed href to to, added /#
    { to: '/#faq', text: 'FAQs' }, // Changed href to to, added /#
    { to: '/#service-area', text: 'Service Area' }, // Changed href to to, added /#
    { to: '/book-now', text: 'Book Now', isButton: true }, // Changed href to to
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsAboutOpen(false);
  };


  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-brand-navy-blue shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Updated to use Link */}
        <Link to="/" className="flex items-center space-x-2">
          <Paintbrush size={32} className="text-brand-orange" />
          <span className="text-3xl font-bold text-brand-white">Instant Wash Columbus</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link, index) =>
            link.dropdown ? (
              <div key={index} className="relative group">
                <button
                  onClick={() => link.text === 'About Us' && setIsAboutOpen(!isAboutOpen)}
                  className="px-3 py-2 text-brand-white hover:text-brand-orange transition-colors flex items-center"
                >
                  {link.text} <ChevronDown size={16} className="ml-1" />
                </button>
                {(link.text === 'About Us' ? isAboutOpen : false) && (
                  <div className="absolute left-0 mt-1 w-48 bg-brand-white rounded-md shadow-lg py-1 z-20">
                    {link.dropdown.map((item) => (
                      <a // Removed comment
                        key={item.text}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-brand-navy-blue hover:bg-brand-slate-gray hover:text-brand-orange"
                        onClick={closeAllMenus}
                      >
                        {item.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : link.isButton ? (
            
              <Link
                key={index}
                to={link.to}
                className="bg-brand-orange text-brand-white font-semibold px-5 py-2.5 rounded-md hover:bg-opacity-90 transition-colors flex items-center text-sm"
                onClick={closeAllMenus} // Close mobile menu if open
              >
                {link.text} <ChevronRight size={16} className="ml-1" />
              </Link>
            ) : (
            
              <Link
                key={index}
                to={link.to}
                className="px-3 py-2 text-brand-white hover:text-brand-orange transition-colors"
                onClick={closeAllMenus} // Close mobile menu if open
              >
                {link.text}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-brand-white focus:outline-none">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-slate-gray absolute w-full shadow-lg">
          <ul className="flex flex-col items-center py-2">
            {navLinks.map((link, index) =>
              link.dropdown ? (
                <li key={index} className="w-full text-center">
                  <button
                    onClick={() => link.text === 'About Us' ? setIsAboutOpen(!isAboutOpen) : null}
                    className="w-full px-4 py-3 text-brand-white hover:bg-brand-navy-blue transition-colors flex justify-between items-center"
                  >
                    {link.text} <ChevronDown size={16} className={`transform transition-transform ${ (link.text === 'About Us' && isAboutOpen) ? 'rotate-180' : ''}`} />
                  </button>
                  {(link.text === 'About Us' ? isAboutOpen : false) && (
                    <div className="bg-brand-navy-blue py-1">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.text}
                          href={item.href}
                          className="block px-6 py-2 text-sm text-brand-white hover:text-brand-orange"
                          onClick={closeAllMenus}
                        >
                          {item.text}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ) : link.isButton ? (
                <li key={index} className="w-full mt-2 mb-2 px-4">
                   {/* Updated to use Link */}
                   <Link
                    to={link.to}
                    className="bg-brand-orange text-brand-white font-semibold px-4 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center text-sm w-full"
                    onClick={closeAllMenus}
                  >
                    {link.text} <ChevronRight size={16} className="ml-1" />
                  </Link>
                </li>
              ) : (
                <li key={index} className="w-full text-center">
                  {/* Updated to use Link */}
                  <Link
                    to={link.to}
                    className="block px-4 py-3 text-brand-white hover:bg-brand-navy-blue transition-colors"
                    onClick={closeAllMenus}
                  >
                    {link.text}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
