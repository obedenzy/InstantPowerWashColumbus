import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, ChevronRight } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'John Doe',
    role: 'Lead Power Washer',
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//team-member-1.jpg', // Replace
    socials: { facebook: '#', twitter: '#', linkedin: '#' },
  },
  {
    name: 'Jane Smith',
    role: 'Operations Manager',
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//team-member-2.jpg', // Replace
    socials: { twitter: '#', instagram: '#', linkedin: '#' },
  },
  {
    name: 'Mike Pomir',
    role: 'Project Manager',
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//team-member-3.jpg', // Replace
    socials: { facebook: '#', linkedin: '#' },
  },
  {
    name: 'Justin Deviz',
    role: 'Senior Technician',
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//team-member-4.jpg', // Replace
    socials: { instagram: '#', twitter: '#' },
  },
];

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-16 bg-brand-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-tag">Our Team</span>
          <h2 className="text-4xl font-bold text-brand-navy-blue">
            Meet Our Expert <span className="text-brand-orange">Team Members</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-brand-white rounded-lg shadow-lg text-center overflow-hidden group">
              <div className="relative h-64">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-navy-blue bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center space-x-3">
                  {member.socials.facebook && <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 p-2 bg-brand-orange rounded-full hover:bg-opacity-80"><Facebook size={18} /></a>}
                  {member.socials.twitter && <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-brand-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200 p-2 bg-brand-orange rounded-full hover:bg-opacity-80"><Twitter size={18} /></a>}
                  {member.socials.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-300 p-2 bg-brand-orange rounded-full hover:bg-opacity-80"><Linkedin size={18} /></a>}
                  {member.socials.instagram && <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-400 p-2 bg-brand-orange rounded-full hover:bg-opacity-80"><Instagram size={18} /></a>}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-brand-navy-blue mb-1">{member.name}</h3>
                <p className="text-brand-orange text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#contact" // Or a dedicated team page
            className="bg-brand-orange text-brand-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors text-lg"
          >
            View All Members <ChevronRight size={20} className="inline ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
