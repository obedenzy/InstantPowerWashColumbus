import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsletterSubscribe from './components/NewsletterSubscribe';
import HomePage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import BookNowPage from './pages/BookNowPage';

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans bg-brand-white text-brand-navy-blue">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/book-now" element={<BookNowPage />} />
        </Routes>
        <NewsletterSubscribe />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
