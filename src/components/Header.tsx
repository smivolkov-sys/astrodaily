/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Star, Moon, Compass, Sparkles, Heart, Layers, Info, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'მთავარი', icon: Star },
    { id: 'horoscopes', label: 'ჰოროსკოპი', icon: Moon },
    { id: 'transits', label: 'ასტრო პროგნოზი', icon: Compass },
    { id: 'personal', label: 'პერსონალური', icon: Sparkles },
    { id: 'compatibility', label: 'თავსებადობა', icon: Heart },
    { id: 'quizzes', label: 'ქვიზები', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    onPageChange(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5 px-4 md:px-10 h-20 flex items-center justify-between">
      <div 
        className="flex items-center gap-3 cursor-pointer group select-none"
        onClick={() => handleNavClick('home')}
        id="header-logo-container"
      >
        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-400 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-transform group-hover:scale-105">
          <Moon className="w-5 h-5 text-white animate-pulse" />
          <Star className="absolute top-0.5 right-0.5 w-2.5 h-2.5 text-yellow-300 animate-bounce" />
        </div>
        <div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-200 transition-colors">
            astrodaily<span className="text-indigo-400">.ge</span>
          </span>
          <span className="block text-[8px] tracking-widest text-indigo-400 font-mono uppercase text-right -mt-0.5">
            KOSMOSURI ENERGETIKA
          </span>
        </div>
      </div>

      {/* Desktop & Tablet Navigation */}
      <nav className="hidden md:flex items-center gap-2 max-w-full">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              id={`nav-${item.id}`}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                isActive 
                  ? 'bg-white/10 text-white border border-white/10 ring-2 ring-indigo-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile Burger Trigger Button - Minimum 48x48px touch target area */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        id="mobile-menu-trigger"
        className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 hover:bg-white/10 transition-colors cursor-pointer"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Elegant Indicator from the design */}
      <div className="hidden lg:flex items-center gap-3.5 text-xs font-mono uppercase tracking-widest text-slate-500">
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div> 
        Gemini API კავშირი
      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 top-20 bg-black/85 backdrop-blur-lg z-40 transition-opacity duration-300 md:hidden flex flex-col justify-between"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="w-full bg-slate-950/95 border-b border-white/5 px-6 py-8 space-y-3"
          >
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500 pb-2 border-b border-white/5">ნავიგაცია</p>
            <div className="grid grid-cols-1 gap-2 pt-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    id={`mobile-nav-${item.id}`}
                    className={`flex items-center gap-3.5 px-5 py-4 w-full rounded-2xl text-sm font-semibold transition-all duration-300 text-left cursor-pointer border ${
                      isActive 
                        ? 'bg-gradient-to-r from-indigo-900/40 to-indigo-950/20 text-white border-indigo-500/30' 
                        : 'bg-white/5 text-slate-350 border-transparent hover:border-white/10 hover:bg-white/10'
                    }`}
                    style={{ minHeight: '48px' }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="pt-6">
              <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-slate-550 justify-center bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="w-2 h-2 rounded-full bg-green-550 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse"></div> 
                Gemini API კავშირი
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

