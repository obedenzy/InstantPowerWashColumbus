import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section id="cta" className="py-16 bg-orange-500 text-white text-center"> {/* Added ID */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold leading-tight">
          Have Any Project for Us? Call Now Or Book Online Below {/* Replaced text */}
        </h2>
      </div>
    </section>
  );
};

export default CallToAction;
