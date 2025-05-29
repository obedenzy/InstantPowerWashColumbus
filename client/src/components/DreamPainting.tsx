import React from 'react';
import { Paintbrush, Home, Building, Store, ChevronRight } from 'lucide-react'; // Example icons

// Existing services data (can be expanded or modified)
export const services = [
  {
    id: 'house-washing',
    title: 'House Washing',
    description: 'This service involves cleaning the exterior surfaces of homes, including siding (vinyl, aluminum, brick), to remove dirt, grime, mildew, and algae. Soft washing techniques, which use lower pressure and specialized cleaning solutions, are often employed to protect delicate surfaces while ensuring a thorough clean. This enhances curb appeal and maintains the home’s exterior.',
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//placeholder.jpg', // Placeholder image
    icon: <Paintbrush size={24} className="text-brand-orange" />,
  },
  {
    id: 'driveway-concrete-cleaning',
    title: 'Driveway and Concrete Cleaning',
    description: 'This service targets concrete surfaces like driveways, walkways, and patios, removing oil stains, dirt, and algae buildup. High-pressure washing is typically used for durable surfaces, restoring their appearance and improving safety by reducing slippery areas.',
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//placeholder.jpg', // Placeholder image
    icon: <Paintbrush size={24} className="text-brand-orange" />,
  },
  {
    id: 'deck-fence-cleaning',
    title: 'Deck and Fence Cleaning',
    description: 'Cleaning wooden or composite decks and fences to remove dirt, mold, and weathered stains. This service may include soft washing or low-pressure techniques to avoid damaging wood fibers, often followed by sealing or staining options for added protection and aesthetic appeal.',
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//placeholder.jpg', // Placeholder image
    icon: <Paintbrush size={24} className="text-brand-orange" />,
  },
  {
    id: 'pool-deck-patio-cleaning',
    title: 'Pool Deck and Patio Cleaning',
    description: 'Cleaning pool decks, patios, and surrounding hardscapes (concrete, pavers, or stone) to remove algae, mold, and dirt, ensuring a safe and attractive outdoor space. This service uses pressure washing or soft washing depending on the surface material to prevent damage while restoring vibrancy.',
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//placeholder.jpg', // Placeholder image
    icon: <Paintbrush size={24} className="text-brand-orange" />,
  },
];

const DreamPainting: React.FC = () => {
  return (
    <section id="services" className="py-16 bg-brand-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-tag">Services</span>
          <h2 className="text-4xl font-bold text-brand-navy-blue">
            Our Exclusive <span className="text-brand-orange">Power Washing Services</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-brand-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img src={service.image} alt={service.title} className="w-full h-56 object-cover" />
              <div className="p-6 bg-brand-navy-blue text-brand-white flex-grow flex flex-col">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-brand-orange rounded-full mr-3">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-brand-white text-sm mb-4 flex-grow">{service.description}</p>
                <a href="#pricing" className="text-brand-orange font-semibold hover:underline self-start text-sm">
                  View Details &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          {/* <a
            href="#contact"
            className="bg-brand-orange text-brand-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors text-lg"
          >
            View All Services <ChevronRight size={20} className="inline ml-1" />
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default DreamPainting;
