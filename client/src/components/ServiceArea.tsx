import React from 'react';

const serviceAreas = [
  'Columbus',
  'Bexley',
  'Dublin',
  'Gahanna',
  'Grandview Heights',
  'Grove City',
  'Hilliard',
  'Reynoldsburg',
  'Upper Arlington',
  'Westerville',
  'Whitehall',
  'Worthington',
  'Delaware',
  'Powell',
  'Sunbury',
  'Lancaster',
  'Pickerington',
];

const ServiceArea: React.FC = () => {
  return (
    <section id="service-area" className="py-16 bg-brand-white">
      <div className="container mx-auto px-4 text-center">
        <span className="section-tag">Service Areas</span>
        <h2 className="text-4xl font-bold text-brand-navy-blue mb-12">
          We Serve These <span className="text-brand-orange">Locations</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-brand-navy-blue max-w-4xl mx-auto">
          {serviceAreas.map((area, index) => (
            <div key={index} className="p-3 border border-brand-white rounded-md shadow-sm hover:shadow-md transition-shadow bg-brand-white">
              {area}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
