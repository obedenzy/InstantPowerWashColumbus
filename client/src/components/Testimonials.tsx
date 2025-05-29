import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData = [
  {
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//woman1.jpg', // Replace with actual client image 1
    name: 'Jessica M.',
    role: 'Homeowner, Dublin OH',
    quote: "Instant Wash Columbus did an absolutely fantastic job on our home's exterior. The attention to detail was incredible, and the team was professional, punctual, and so clean! Our house feels brand new. Highly recommend their services!",
    rating: 5,
  },
  {
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//man1.jpg', // Replace with actual client image 2
    name: 'Michael B.',
    role: 'Business Owner, Westerville OH',
    quote: "The exterior of our office building looks incredible thanks to Instant Wash Columbus. They worked around our schedule and delivered a top-quality finish. Will use them again for sure.",
    rating: 5,
  },
  {
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//woman3.jpg', // Replace with actual client image 3
    name: 'Sarah K.',
    role: 'Property Manager, Columbus OH',
    quote: "Reliable, efficient, and high-quality work. Instant Wash Columbus is my go-to for all property turnovers and common area refreshes. They make my job easier!",
    rating: 4,
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const activeTestimonial = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="py-16 bg-brand-cyan text-brand-white relative overflow-hidden"> {/* Added overflow-hidden */}
      {/* Background Image using <img> tag */}
      <img
        src="https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//10.png" // Using the URL from the previous CSS background
        alt="Testimonial background pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0" // z-0 to be behind content
      />
      
      <div className="container mx-auto px-4 z-10 relative"> {/* Content container with z-10 */}
        <div className="text-center mb-12">
          <span className="section-tag bg-brand-navy-blue text-brand-white">Testimonials</span>
          <h2 className="text-4xl font-bold">
            What Our Clients Say
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-brand-navy-blue p-8 md:p-12 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-8 min-h-[350px] md:min-h-[300px]">
            <div className="md:w-1/3 text-center">
              <img 
                src={activeTestimonial.image} 
                alt={activeTestimonial.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto mb-4 border-4 border-brand-orange shadow-md"
              />
              <h3 className="text-xl font-semibold text-brand-white">{activeTestimonial.name}</h3>
              <p className="text-brand-orange text-sm">{activeTestimonial.role}</p>
              <div className="flex justify-center mt-2">
                {(() => {
                  const stars = [];
                  const fullStars = Math.floor(activeTestimonial.rating);
                  const hasHalfStar = activeTestimonial.rating % 1 !== 0;
                  const emptyStars = 5 - Math.ceil(activeTestimonial.rating);

                  for (let i = 0; i < fullStars; i++) {
                    stars.push(<Star key={`full-${i}`} size={20} className="text-yellow-400 fill-current" />);
                  }
                  if (hasHalfStar) {
                    stars.push(<Star key="half" size={20} className="text-yellow-400 fill-current" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
                  }
                  for (let i = 0; i < emptyStars; i++) {
                    stars.push(<Star key={`empty-${i}`} size={20} className="text-brand-slate-gray fill-current" />);
                  }
                  return stars;
                })()}
              </div>
            </div>
            <div className="md:w-2/3 relative">
              <Quote size={48} className="absolute -top-4 -left-4 text-brand-orange opacity-30" />
              <p className="text-lg italic text-brand-white leading-relaxed">
                {activeTestimonial.quote}
              </p>
              <Quote size={48} className="absolute -bottom-4 -right-4 text-brand-orange opacity-30 transform scale-x-[-1]" />
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 md:-left-12 transform -translate-y-1/2 bg-brand-orange text-brand-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition-colors focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 md:-right-12 transform -translate-y-1/2 bg-brand-orange text-brand-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition-colors focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={28} />
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index ? 'bg-brand-orange' : 'bg-brand-slate-gray hover:bg-brand-slate-gray'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
