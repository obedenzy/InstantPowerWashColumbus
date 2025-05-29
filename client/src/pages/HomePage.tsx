import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import HeroSection from '../components/HeroSection';
import WhyChooseUs from '../components/WhyChooseUs';
import DreamPainting from '../components/DreamPainting';
import OurProcessSection from '../components/OurProcessSection';
import PricingSection from '../components/PricingSection';
// FreeQuote component is now primarily on the BookNowPage
import CompletedProjects from '../components/CompletedProjects';
import ServiceArea from '../components/ServiceArea';
import Testimonials from '../components/Testimonials';
import FAQSection from '../components/FAQSection';
import DoYouHaveAnyProject from '../components/DoYouHaveAnyProject';

function HomePage() {
  const location = useLocation(); // Get current location

  // Effect to scroll to section on hash change
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Use setTimeout to allow the page to render before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Adjust delay if needed
      }
    } else {
      // Optional: Scroll to top when navigating to the homepage without a hash
      // window.scrollTo(0, 0);
    }
  }, [location]); // Re-run effect when location changes

  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <DreamPainting />
      <OurProcessSection />
      <PricingSection />
      {/* <FreeQuote /> If you still want a CTA to booking on the homepage, you could have a smaller link/button here pointing to /book-now */}
      <CompletedProjects />
      <ServiceArea />
      <Testimonials />
      <FAQSection />
      <DoYouHaveAnyProject />
    </>
  );
}

export default HomePage;
