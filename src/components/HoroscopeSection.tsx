/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ZODIAC_SIGNS, ZodiacSign, ForecastRecord } from '../types.js';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Briefcase, Activity, RefreshCw, Star, Compass, Award } from 'lucide-react';

export default function HoroscopeSection() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>(ZODIAC_SIGNS[0]);
  const [activeTab, setActiveTab] = useState<'day' | 'week' | 'month' | 'year'>('day');
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<ForecastRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper date calculation functions
  const getPeriodString = (type: 'day' | 'week' | 'month' | 'year'): string => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const date = String(d.getDate()).padStart(2, '0');

    if (type === 'day') {
      return `${year}-${month}-${date}`;
    }
    if (type === 'month') {
      return `${year}-${month}`;
    }
    if (type === 'year') {
      return `${year}`;
    }
    // Week
    const tempDate = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - (tempDate.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((tempDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${tempDate.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
  };

  const getPeriodLabelGe = (type: 'day' | 'week' | 'month' | 'year'): string => {
    const d = new Date();
    if (type === 'day') {
      return `დღევანდელი (${d.toLocaleDateString('ka-GE')})`;
    }
    if (type === 'week') {
      return 'ამ კვირის';
    }
    if (type === 'month') {
      const monthNames = [
        'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
        'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
      ];
      return `${monthNames[d.getMonth()]}ს თვის`;
    }
    return `${d.getFullYear()} წლის`;
  };

  useEffect(() => {
    async function fetchForecast() {
      setLoading(true);
      setError(null);
      const period = getPeriodString(activeTab);
      try {
        const url = `/api/forecast?sign=${selectedSign.id}&type=${activeTab}&period=${period}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('პროგნოზის ჩატვირთვა ვერ მოხერხდა');
        }
        const data = await res.json();
        setForecast(data);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError('კავშირის შეცდომა. გთხოვთ სცადოთ მოგვიანებით.');
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [selectedSign, activeTab]);

  return (
    <div className="space-y-10">
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
          <Star className="w-6 h-6 text-indigo-400 animate-spin [animation-duration:15s]" />
          კოსმოსური ჰოროსკოპი
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          აირჩიეთ თქვენი ზოდიაქოს ნიშანი და გაეცანით პერსონალიზებულ პროგნოზებს. ჩვენი სერვერი ავტომატურად ანახლებს კოსმოსურ რჩევებს.
        </p>
      </div>

      {/* Grid of ZODIAC SIGNS */}
      <section className="grid grid-cols-2 min-[380px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3">
        {ZODIAC_SIGNS.map((sign) => {
          const isSelected = selectedSign.id === sign.id;
          return (
            <button
              key={sign.id}
              onClick={() => setSelectedSign(sign)}
              id={`zodiac-btn-${sign.id}`}
              className={`py-3.5 px-2.5 rounded-3xl border flex flex-col items-center justify-center gap-1.5 transition-all text-center relative overflow-hidden group cursor-pointer min-h-[48px] ${
                isSelected
                  ? 'bg-white/15 border-white/20 shadow-xl shadow-indigo-650/10 scale-[1.03]'
                  : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10'
              }`}
            >
              {isSelected && (
                <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              )}
              <span className={`text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`}>
                {sign.symbol}
              </span>
              <span className="font-bold text-xs text-white">{sign.nameGe}</span>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wide">{sign.nameLa}</span>
            </button>
          );
        })}
      </section>

      {/* Active forecast and tab switching */}
      <section className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
        {/* Navigation tabs - wrapping on mobile to prevent horizontal overflow */}
        <div className="flex flex-wrap sm:flex-nowrap border-b border-white/10 overflow-hidden justify-items-stretch bg-black/20">
          {(['day', 'week', 'month', 'year'] as const).map((tab) => {
            const labels = {
              day: 'დღის',
              week: 'კვირის',
              month: 'თვის',
              year: 'წლის'
            };
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                id={`tab-${tab}`}
                className={`flex-1 min-w-[50%] sm:min-w-0 py-3.5 text-center font-semibold text-xs sm:text-sm transition-all relative border-b sm:border-b-0 border-r last:border-0 border-white/5 cursor-pointer min-h-[48px] ${
                  isActive ? 'text-indigo-400 bg-white/5' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {labels[tab]} პროგნოზი
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Forecast Details */}
        <div className="p-6 md:p-10">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading-spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 gap-4 text-center"
              >
                <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
                <span className="text-sm font-mono text-slate-400 animate-pulse">კოსმოსური მონაცემების სინქრონიზაცია...</span>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 space-y-4"
              >
                <p className="text-red-400 text-sm">{error}</p>
                <button
                  onClick={() => setActiveTab(activeTab)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold cursor-pointer text-white"
                >
                  თავიდან ცდა
                </button>
              </motion.div>
            ) : forecast ? (
              <motion.div
                key={selectedSign.id + activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Left side: Sign card */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col justify-between space-y-6">
                  <div className="space-y-4 text-center lg:text-left">
                    <div className="inline-flex w-16 h-16 rounded-full bg-white/5 border border-white/10 items-center justify-center text-4xl text-indigo-400 mx-auto lg:mx-0 shadow-inner">
                      {selectedSign.symbol}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center justify-center lg:justify-start gap-2">
                        {selectedSign.nameGe}
                        <span className="text-sm text-slate-500 font-mono font-normal">({selectedSign.nameLa})</span>
                      </h3>
                      <p className="text-xs text-indigo-400 font-mono mt-1">{selectedSign.dateRange}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-2.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>ელემენტი:</span>
                      <span className="text-white font-medium">{selectedSign.element}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>მმართველი პლანეტა:</span>
                      <span className="text-white font-medium">{selectedSign.ruler}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ენერგოდონე:</span>
                      <span className="text-indigo-400 font-mono font-medium">{forecast.energyScore}%</span>
                    </div>
                  </div>

                  {/* Energy Score bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">კოსმოსური ჰარმონია:</span>
                      <span className="text-indigo-400 font-semibold font-mono">{forecast.energyScore}%</span>
                    </div>
                    <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${forecast.energyScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right side: Detailed predictions */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Period indicator */}
                  <div className="flex items-center gap-1 text-xs text-indigo-400 font-semibold font-mono uppercase tracking-wider">
                    <Compass className="w-4 h-4" />
                    {getPeriodLabelGe(activeTab)} ასტრო პროგნოზი
                  </div>

                  {/* General forecast */}
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-lg flex items-center gap-2">
                      <Award className="w-4 h-5 text-indigo-400" /> ზოგადი ასპექტი
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line text-justify bg-white/5 p-4 border border-white/10 rounded-2xl">
                      {forecast.content}
                    </p>
                  </div>

                  {/* Health, Love, Career Bento layout */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold">
                        <Heart className="w-4 h-4" /> სიყვარული
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{forecast.love}</p>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
                        <Briefcase className="w-4 h-4" /> კარიერა
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{forecast.career}</p>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                        <Activity className="w-4 h-4" /> ჯანმრთელობა
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{forecast.health}</p>
                    </div>
                  </div>

                  {/* Lucky charms bar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between bg-black/40 px-4 py-3 rounded-2xl border border-white/5 text-xs">
                      <span className="text-slate-500">იღბლიანი რიცხვები:</span>
                      <div className="flex gap-1.5">
                        {forecast.luckyNumbers.map(n => (
                          <span key={n} className="w-6 h-6 rounded-lg bg-white/5 border border-white/15 text-indigo-300 font-mono font-bold flex items-center justify-center">
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-black/40 px-4 py-3 rounded-2xl border border-white/5 text-xs">
                      <span className="text-slate-500">მფარველი ფერები:</span>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {forecast.luckyColors.map(color => (
                          <span key={color} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-350 font-medium">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
