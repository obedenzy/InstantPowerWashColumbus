import React from 'react';
import { FileText, Layout, Calendar, Award } from 'lucide-react';

const EasySteps: React.FC = () => {
  const steps = [
    { icon: <FileText size={40} className="text-orange-500" />, title: 'Provide Us With The Details', description: 'Just provide us the timing you want we will set our schedule according to your need and finished work', buttonColor: 'bg-orange-500' },
    { icon: <Layout size={40} className="text-lime-600" />, title: 'Pick The Suitable Plan For You', description: 'Just provide us the timing you want we will set our schedule according to your need and finished work', buttonColor: 'bg-lime-600' },
    { icon: <Calendar size={40} className="text-orange-500" />, title: 'Best Online Scheduling', description: 'Just provide us the timing you want we will set our schedule according to your need and finished work', buttonColor: 'bg-orange-500' },
    { icon: <Award size={40} className="text-orange-500" />, title: 'Our Expertise, Success', description: 'Just provide us the timing you want we will set our schedule according to your need and finished work', buttonColor: 'bg-orange-500' },
  ];

  return (
    <section id="steps" className="py-16 bg-lime-50"> {/* Added ID */}
      <div className="container mx-auto px-4 text-center">
        <p className="text-orange-500 text-sm mb-2">See How It Works!</p>
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Easy Steps For Our Best <br /> Painting Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600 mb-6">{step.description}</p>
              <button className={`${step.buttonColor} hover:opacity-90 text-white font-bold py-3 px-8 rounded-md text-lg`}>
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EasySteps;
