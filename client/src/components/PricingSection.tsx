import React from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

export const pricingTiers = [
  {
    title: 'House Washing',
    price: '$200-$550',
    unit: '(typically per 1,500–3,000 sq ft)',
    features: [
      'Soft washing for delicate surfaces',
      'Removes dirt, grime, mildew, algae',
      'Enhances curb appeal',
      'Protects home\'s exterior',
      'Thorough and safe cleaning',
    ],
    bgColor: 'bg-brand-white',
    textColor: 'text-brand-navy-blue',
    buttonClass: 'bg-brand-orange text-brand-white hover:bg-opacity-90',
  },
  {
    title: 'Driveway and Concrete Cleaning',
    price: '$100-$250',
    unit: '(typically per single to double driveway)',
    features: [
      'Removes oil stains, dirt, algae',
      'High-pressure washing for durable surfaces',
      'Restores appearance',
      'Improves safety (reduces slipperiness)',
      'Suitable for driveways, walkways, patios',
    ],
    bgColor: 'bg-brand-orange',
    textColor: 'text-brand-white',
    buttonClass: 'bg-brand-white text-brand-orange hover:bg-brand-slate-gray',
  },
  {
    title: 'Deck and Fence Cleaning',
    price: '$150-$350',
    unit: '(typically per standard decks or fences)',
    features: [
      'Removes dirt, mold, weathered stains',
      'Soft/low-pressure techniques to protect wood',
      'Optional sealing/staining for protection',
      'Enhances aesthetic appeal',
      'Suitable for wooden or composite surfaces',
    ],
    bgColor: 'bg-brand-white',
    textColor: 'text-brand-navy-blue',
    buttonClass: 'bg-brand-orange text-brand-white hover:bg-opacity-90',
  },
  {
    title: 'Pool Deck and Patio Cleaning',
    price: '$150-$400',
    unit: '(typically per small patios to large pool decks)',
    features: [
      'Removes algae, mold, dirt',
      'Ensures safe and attractive outdoor space',
      'Uses pressure or soft washing based on material',
      'Restores vibrancy to hardscapes',
      'Suitable for concrete, pavers, stone',
    ],
    bgColor: 'bg-brand-orange',
    textColor: 'text-brand-white',
    buttonClass: 'bg-brand-white text-brand-orange hover:bg-brand-slate-gray',
  },
];

const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-16 bg-brand-navy-blue text-brand-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-tag bg-brand-cyan text-brand-white">Pricing</span>
          <h2 className="text-4xl font-bold">
            Transparent Pricing for <span className="text-brand-orange">Quality Services</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-xl p-8 flex flex-col ${tier.bgColor} ${tier.textColor}`}
            >
              <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
              <div className="mb-6">
                <span className={`text-5xl font-extrabold ${tier.bgColor === 'bg-brand-orange' ? 'text-brand-white' : 'text-brand-orange'}`}>{tier.price}</span>
                <span className="text-lg ml-1">{tier.unit}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircle size={18} className={`mr-2 ${tier.bgColor === 'bg-brand-orange' ? 'text-brand-white' : 'text-brand-orange'}`} />
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Updated to use Link and point to /book-now */}
              <Link
                to="/book-now"
                className={`w-full text-center font-semibold py-3 px-6 rounded-md transition-colors text-lg ${tier.buttonClass}`}
              >
                Book Now <ChevronRight size={20} className="inline ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
