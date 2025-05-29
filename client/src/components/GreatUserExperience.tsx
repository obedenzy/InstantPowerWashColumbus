import React from 'react';

const GreatUserExperience: React.FC = () => {
  return (
    <section id="experience" className="py-16 bg-orange-500 text-white text-center"> {/* Added ID */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold leading-tight">
          We invested our hard work for people just <br /> like you that insist on a great <br /> user experience.
        </h2>
      </div>
    </section>
  );
};

export default GreatUserExperience;
