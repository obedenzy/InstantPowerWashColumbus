import React from 'react';
import { PlayCircle } from 'lucide-react';

const SuccessHistory: React.FC = () => {
  return (
    <section id="history" className="py-16 bg-brand-white"> {/* Added ID */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-brand-navy-blue mb-6">
            Our Power Washing Services Success History {/* Updated heading */}
          </h2>
          <p className="text-brand-slate-gray mb-6">
            With over 15 years of experience, Instant Wash Columbus has been delivering exceptional power washing services throughout the Columbus metro area. We specialize in residential and commercial power washing projects of all sizes. {/* Updated paragraph 1 */}
          </p>
          <p className="text-brand-slate-gray mb-8">
            Our team consists of skilled, licensed professionals who take pride in their craftsmanship. We use only premium solutions and equipment to ensure lasting results that stand the test of time. As a locally owned and operated business, we understand the unique needs of Columbus homeowners and businesses. Our commitment to quality, reliability, and customer satisfaction has made us a trusted name in the power washing industry. {/* Updated paragraph 2 */}
          </p>
          {/* <div className="flex items-center space-x-6">
            <button className="bg-brand-orange hover:bg-opacity-90 text-brand-white font-bold py-3 px-8 rounded-md text-lg">
              Read More
            </button>
            <div className="flex items-center space-x-2 text-brand-navy-blue font-semibold">
              <PlayCircle size={40} className="text-brand-orange" />
              <span>Call Us <br /> +123 567 898</span>
            </div>
          </div> */}
        </div>
        <div className="relative">
          <img
            src="https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//5.png" // Replaced image URL
            alt="Instant Wash Columbus Success History" // Updated alt text for SEO
            className="rounded-lg shadow-lg"
          />
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle size={80} className="text-brand-orange cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SuccessHistory;
