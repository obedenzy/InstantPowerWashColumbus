import React from 'react';
import { ChevronRight, Users, Award, Smile, Clock } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const HeroSection: React.FC = () => {
  const stats = [
    { number: '1 min', label: 'Instant Response', icon: <Clock size={24} className="text-brand-orange" /> },
    { number: '100%', label: 'Client Satisfaction', icon: <Smile size={24} className="text-brand-orange" /> },
    { number: '100%', label: 'Ethical & Trust', icon: <Award size={24} className="text-brand-orange" /> },
  ];

  return (
    <section
      id="hero"
      className="relative bg-brand-navy-blue text-brand-white py-20 md:py-32 overflow-hidden"
    >
      <img
        src="https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//sidekix-media-wRzBarqn3hs-unsplash.jpg"
        alt="Hero section background pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
      />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 bg-brand-navy-blue pl-[30px] pb-[30px] pt-[30px]">
            <span className="section-tag bg-brand-cyan text-brand-white">Welcome to Instant Wash Columbus</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Power Washing Solution with <span className="text-brand-orange">Instant Wash Columbus</span>
            </h1>
            <p className="text-lg text-brand-white mb-8 max-w-xl mx-auto md:mx-0">
              Transform your property with our expert power washing services. From residential touch-ups to commercial projects, we deliver quality and precision.
            </p>
            {/* Updated to use Link and point to /book-now */}
            <Link
              to="/book-now"
              className="bg-brand-orange text-brand-white font-semibold px-8 py-3.5 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center md:justify-start w-fit mx-auto md:mx-0 text-lg"
            >
              Booking Now <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
          {/* <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative">
              <img
                src="https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//Painting%20Service.png"
                alt="Power Washing Services"
                className="rounded-lg shadow-2xl max-w-md w-full"
              />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand-orange rounded-full opacity-30 z-0"></div>
              <div className="absolute -top-8 -right-8 w-32 h-32 border-4 border-brand-cyan rounded-full opacity-50 z-0"></div>
            </div>
          </div> */}
        </div>
        <div className="mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-brand-white text-brand-navy-blue p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="mb-3">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-brand-navy-blue mb-1">{stat.number}</h3>
              <p className="text-brand-slate-gray">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
