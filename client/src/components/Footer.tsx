import React from 'react';
import { Paintbrush, Facebook, Twitter, Linkedin, Instagram, ChevronRight, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const Footer: React.FC = () => {
  const quickLinks = [
    { to: '/#hero', text: 'Home' }, // Changed href to to, added /#
    { to: '/#about', text: 'About Us' }, // Changed href to to, added /#
    { to: '/#projects', text: 'Projects' }, // Changed href to to, added /#
    { to: '/#pricing', text: 'Pricing' }, // Changed href to to, added /#
    { to: '/book-now', text: 'Contact Us' }, // Changed href to to, points to booking page
    { to: '/privacy-policy', text: 'Privacy Policy' },
  ];

  const ourServices = [
    { to: '/#services', text: 'House Washing' },
    { to: '/#services', text: 'Driveway and Concrete Cleaning' },
    { to: '/#services', text: 'Deck and Fence Cleaning' },
    { to: '/#services', text: 'Pool Deck and Patio Cleaning' },
  ];

  return (
    <footer className="bg-brand-navy-blue text-brand-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            {/* Updated to use Link */}
            <Link to="/" className="flex items-center space-x-2 mb-5">
              <Paintbrush size={36} className="text-brand-orange" />
              <span className="text-3xl font-bold text-brand-white">Instant Wash Columbus</span>
            </Link>
            <p className="text-sm mb-5 leading-relaxed">
              Instant Wash Columbus offers top-quality power washing solutions for residential and commercial properties. Our expert team is dedicated to transforming your space with precision and care.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 bg-brand-slate-gray rounded-full flex items-center justify-center hover:bg-brand-orange transition-colors text-brand-white"><Facebook size={18} /></a>
              <a href="#" className="w-9 h-9 bg-brand-slate-gray rounded-full flex items-center justify-center hover:bg-brand-orange transition-colors text-brand-white"><Twitter size={18} /></a>
              <a href="#" className="w-9 h-9 bg-brand-slate-gray rounded-full flex items-center justify-center hover:bg-brand-orange transition-colors text-brand-white"><Linkedin size={18} /></a>
              <a href="#" className="w-9 h-9 bg-brand-slate-gray rounded-full flex items-center justify-center hover:bg-brand-orange transition-colors text-brand-white"><Instagram size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-brand-white mb-5">Quick Menu</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.text}>
                  {/* Updated to use Link */}
                  <Link to={link.to} className="hover:text-brand-orange transition-colors flex items-center text-sm">
                    <ChevronRight size={16} className="mr-1.5 text-brand-orange" /> {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-brand-white mb-5">Our Services</h3>
            <ul className="space-y-2.5">
              {ourServices.map(service => (
                <li key={service.text}>
                  {/* Updated to use Link */}
                  <Link to={service.to} className="hover:text-brand-orange transition-colors flex items-center text-sm">
                    <ChevronRight size={16} className="mr-1.5 text-brand-orange" /> {service.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-brand-white mb-5">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              {/* <li className="flex items-start">
                <MapPin size={18} className="text-brand-orange mr-3 mt-0.5 flex-shrink-0" />
                <span>4182 Worth Ave Space #l-115, Columbus, OH 43219
                </span>
              </li> */}
              <li className="flex items-center">
                <Mail size={18} className="text-brand-orange mr-3 flex-shrink-0" />
                <a href="mailto:support@columbusinstantwash.com" className="hover:text-brand-orange">contactus@instantwashcolumbus.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-brand-orange mr-3 flex-shrink-0" />
                <a href="tel:+12345678912" className="hover:text-brand-orange">+1 (614) 655-1216</a>
              </li>
              <li className="flex items-center">
                <Clock size={18} className="text-brand-orange mr-3 flex-shrink-0" />
                <span>Mon - Sat: 09am - 06pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-slate-gray pt-8 text-center text-sm">
          © {new Date().getFullYear()} Instant Wash Columbus Operating Under Code To Green LLC. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
