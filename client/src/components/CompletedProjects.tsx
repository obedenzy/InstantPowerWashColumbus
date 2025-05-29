import React from 'react';
import { ChevronRight } from 'lucide-react';

const CompletedProjects: React.FC = () => {
  const projects = [
    { image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//interior%20painting.jpg', alt: 'Residential House Washing' },
    { image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//kitchen%20cabinet.jpg', alt: 'Driveway Cleaning' },
    { image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//interior%20painting%202.jpg', alt: 'Commercial Building Wash' },
    { image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//exterior%20painting.png', alt: 'Deck Cleaning Project' },
    { image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//bathroom%20painting.jpg', alt: 'Residential Patio Cleaning' },
    { image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//stairs%20painting.jpg', alt: 'Fence Cleaning' },
    { image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//living%20room%20painting.jpg', alt: 'Pool Deck Cleaning' },
    { image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//living%20space%20painting.jpg', alt: 'Walkway Cleaning' },
   
  ];

  return (
    <section id="projects" className="py-16 bg-brand-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-tag">Project</span>
          <h2 className="text-4xl font-bold text-brand-navy-blue">
            Our Latest <span className="text-brand-orange">Projects</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group relative rounded-lg overflow-hidden shadow-lg aspect-square">
              <img src={project.image} alt={project.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-brand-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                  {project.alt}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          {/* <a
            href="#contact" // Link to a more detailed projects page or contact
            className="bg-brand-orange text-brand-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors text-lg"
          >
            View All Projects <ChevronRight size={20} className="inline ml-1" />
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default CompletedProjects;
