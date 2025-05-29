import React from 'react';

const OurProcessSection: React.FC = () => {
  const processSteps = [
    { step: 'Step 1', title: 'Book Online', description: 'Easily schedule your power washing service through our online booking system.' },
    { step: 'Step 2', title: 'Get a Quote', description: 'Receive a detailed and transparent quote based on your project requirements.' },
    { step: 'Step 3', title: 'Accept Quote', description: 'Review and accept the quote to confirm your power washing service.' },
    { step: 'Step 4', title: 'Begin Power Washing', description: 'Our professional team will begin the power washing process on the scheduled date.' },
    { step: 'Step 5', title: 'Happy You', description: 'Enjoy your freshly power washed space and the quality results.' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: 'radial-gradient(at left top, #B6BCB8, #f4f9f8)' }}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-brand-navy-blue">
          Our Process
        </h2>
        <p className="mt-4 text-lg text-brand-slate-gray">
          See how easy it is to transform your space with Instant Wash Columbus.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((item, index) => (
            <div key={index} className="pt-6">
              <div className="flow-root bg-brand-white rounded-lg px-6 pb-8 shadow-xl h-full transform transition duration-500 hover:scale-105">
                <div className="-mt-6">
                  <div>
                    <span className={`inline-flex items-center justify-center p-3 rounded-md shadow-lg ${index % 2 === 0 ? 'bg-brand-cyan' : 'bg-brand-orange'}`}>
                      {/* You can replace this with an icon later if desired */}
                      <svg className="h-6 w-6 text-brand-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-brand-navy-blue tracking-tight">{item.step}: {item.title}</h3>
                  <p className="mt-5 text-base text-brand-slate-gray">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcessSection;
