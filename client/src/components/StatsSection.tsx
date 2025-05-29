import React from 'react';

const StatsSection: React.FC = () => {
  const stats = [
    { number: '25', label: 'Years of Experience' },
    { number: '32', label: 'Awards Winning' },
    { number: '1988', label: 'Satisfied clients' },
    { number: '76', label: 'Certified staffs' },
  ];

  return (
    <section id="stats" className="py-16 bg-brand-orange text-brand-white text-center"> {/* Added ID */}
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index}>
            <h3 className="text-5xl font-bold mb-2">{stat.number}</h3>
            <p className="text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
