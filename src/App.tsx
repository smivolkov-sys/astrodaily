/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import HoroscopeSection from './components/HoroscopeSection';
import AstroForecasts from './components/AstroForecasts';
import PersonalForecast from './components/PersonalForecast';
import CompatibilitySection from './components/CompatibilitySection';
import QuizSection from './components/QuizSection';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HeroSection onPageChange={setCurrentPage} />;
      case 'horoscopes':
        return <HoroscopeSection />;
      case 'transits':
        return <AstroForecasts />;
      case 'personal':
        return <PersonalForecast onPageChange={setCurrentPage} />;
      case 'compatibility':
        return <CompatibilitySection />;
      case 'quizzes':
        return <QuizSection />;
      default:
        return <HeroSection onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative">
      {/* Background ambient light leaks */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-900/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Header element */}
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main container with standard width boundaries */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-10 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer element */}
      <Footer />
    </div>
  );
}
