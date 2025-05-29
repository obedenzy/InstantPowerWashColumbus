import React, { useState } from 'react';
import { Send } from 'lucide-react';

const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const NewsletterSubscribe: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address.');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    try {
      // Construct the URL with email as a query parameter
      const url = `${BACKEND_BASE_URL}/api/subscribe-newsletter?email=${encodeURIComponent(email)}`;

      console.log('Subscribing to newsletter at:', url); // Log the URL

      const response = await fetch(url, { credentials: "include", method: 'GET' });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || 'Subscription failed. Please try again.');
        setIsError(true);
      } else {
        setMessage(data.message || 'Successfully subscribed!');
        setIsError(false);
        setEmail(''); // Clear input on success
      }
    } catch (err) {
      setMessage('An unexpected error occurred. Please try again.');
      setIsError(true);
      console.error("Subscription error:", err);
    } finally {
      setIsLoading(false);
      setTimeout(() => { // Clear message after a few seconds
        setMessage('');
        setIsError(false);
      }, 5000);
    }
  };

  return (
    <section id="newsletter" className="py-16 bg-brand-cyan relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-brand-white text-center md:text-left">
            <h2 className="text-3xl font-bold mb-3">Subscribe to Newsletter</h2>
            <p className="text-brand-white mb-6 md:mb-0">
              Get the latest power washing tips, trends, and exclusive offers delivered straight to your inbox.
            </p>
          </div>
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow p-3 rounded-md border border-transparent focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none text-brand-navy-blue"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-brand-orange text-brand-white font-semibold px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribe...' : 'Subscribe'} <Send size={18} className="ml-2" />
              </button>
            </form>
            {message && (
              <p className={`text-sm mt-2 text-center md:text-left ${isError ? 'text-red-300' : 'text-green-300'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
      <img
        src="https://afptpimxlqmtxmdcvjtv.supabase.co/storage/v1/object/public/paint//paint-swirl-decoration.png"
        alt="Decorative power washing swirl"
        className="absolute -bottom-16 -right-10 w-64 h-64 opacity-20 transform rotate-45 hidden md:block"
      />
    </section>
  );
};

export default NewsletterSubscribe;
