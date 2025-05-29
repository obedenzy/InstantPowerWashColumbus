import React from 'react';
import { ChevronRight, Calendar } from 'lucide-react';

interface BlogPost {
  image: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//blog-post-1.jpg', // Replace
    date: '26 Jan',
    title: 'Choosing the Right Power Washing Technique for Your Home',
    excerpt: 'Soft washing, pressure washing? Understanding techniques can be tricky. We break down the pros and cons of each...',
    link: '#',
  },
  {
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//blog-post-2.jpg', // Replace
    date: '15 Feb',
    title: 'Top Power Washing Trends for Exterior Cleaning in 2025',
    excerpt: 'Discover the hottest methods that will dominate exterior cleaning this year and bring your home to life.',
    link: '#',
  },
  {
    image: 'https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//blog-post-3.jpg', // Replace
    date: '05 Mar',
    title: 'DIY vs. Professional Power Washing: When to Hire Experts',
    excerpt: 'Thinking of a DIY power wash job? We explore the benefits of hiring professionals for a flawless, lasting finish.',
    link: '#',
  },
];

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-16 bg-brand-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="section-tag">Blog</span>
          <h2 className="text-4xl font-bold text-brand-navy-blue">
            Our Latest <span className="text-brand-orange">Blog Posts</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-brand-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="relative">
                <img src={post.image} alt={post.title} className="w-full h-56 object-cover" />
                <div className="absolute top-4 left-4 bg-brand-orange text-brand-white text-xs font-semibold px-3 py-1.5 rounded">
                  <Calendar size={14} className="inline mr-1" /> {post.date}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-brand-navy-blue mb-3 hover:text-brand-orange transition-colors">
                  <a href={post.link}>{post.title}</a>
                </h3>
                <p className="text-brand-slate-gray text-sm mb-4 flex-grow">{post.excerpt}</p>
                <a
                  href={post.link}
                  className="text-brand-orange font-semibold hover:underline self-start text-sm"
                >
                  Learn More <ChevronRight size={16} className="inline" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#" // Link to a dedicated blog page
            className="bg-brand-orange text-brand-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors text-lg"
          >
            View All Posts <ChevronRight size={20} className="inline ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
