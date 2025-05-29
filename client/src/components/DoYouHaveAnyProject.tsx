import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const DoYouHaveAnyProject: React.FC = () => {
  return (
    <section id="dream-space-cta" className="py-20 bg-brand-teal-dark text-white text-center relative overflow-hidden">
      {/* Background Image using <img> tag */}
      <img
        src="https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//11.png" // URL from previous CSS background
        alt="Dream space background pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
      />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Your Dream Space is Just a <span className="text-brand-orange">Wash Away!</span>
        </h2>
        <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
          Ready to give your home or office a stunning new look? Our expert power washers are here to deliver high-quality results you can trust.
        </p>
        {/* Updated to use Link and point to /book-now */}
        <Link
          to="/book-now"
          className="bg-brand-orange text-white font-semibold py-3.5 px-10 rounded-md text-lg hover:bg-opacity-90 transition-colors inline-flex items-center"
        >
          Book Your Power Washing Service <ChevronRight size={20} className="ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default DoYouHaveAnyProject;
