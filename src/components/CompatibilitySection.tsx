/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, RefreshCw, Star, Compass, User, Sparkles, Check } from 'lucide-react';
import { ZODIAC_SIGNS, CompatibilityResponse, ZodiacSign } from '../types.js';

export default function CompatibilitySection() {
  const [sign1, setSign1] = useState<string>('verzi');
  const [sign2, setSign2] = useState<string>('ku');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompatibilityResponse | null>(null);

  // Auto-align sign1 if profile exists in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('userBirthProfile');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.birthDate) {
          const bDate = new Date(p.birthDate);
          const day = bDate.getDate();
          const month = bDate.getMonth() + 1;
          const year = bDate.getFullYear();
          const seed = day * 7 + month * 13 + (year % 100);
          const sunSignIndex = (seed + 3) % ZODIAC_SIGNS.length;
          setSign1(ZODIAC_SIGNS[sunSignIndex].id);
        }
      } catch (err) {
        // ignore
      }
    }
  }, []);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/compatibility?sign1=${sign1}&sign2=${sign2}`);
      if (res.ok) {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
          <Heart className="w-6 h-6 text-red-400 animate-pulse" />
          სიყვარულისა და კავშირის თავსებადობა
        </h2>
        <p className="text-sm text-gray-400">
          შეიყვანეთ ორი ზოდიაქოს ნიშანი და გაანალიზეთ თქვენი კოსმოსური სინასტრია – ელემენტებისა და პლანეტარული მმართველების კავშირი.
        </p>
      </div>

      {/* Selectors card */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto backdrop-blur-md shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
          {/* Sign 1 Selector */}
          <div className="md:col-span-4 space-y-2">
            <label className="text-xs uppercase font-mono text-slate-500 font-bold block" htmlFor="compat-sign1">პირველი ნიშანი</label>
            <select
              id="compat-sign1"
              value={sign1}
              onChange={(e) => { setSign1(e.target.value); setResult(null); }}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-indigo-500 h-12 cursor-pointer"
            >
              {ZODIAC_SIGNS.map(s => (
                <option key={s.id} value={s.id} className="bg-slate-950 text-white">
                  {s.symbol} {s.nameGe} ({s.nameLa})
                </option>
              ))}
            </select>
          </div>

          {/* Plus/Heart visual division */}
          <div className="md:col-span-3 flex justify-center pt-4 md:pt-0">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-red-400 shadow-inner">
              <Heart className="w-5 h-5 fill-red-400/20" />
            </div>
          </div>

          {/* Sign 2 Selector */}
          <div className="md:col-span-4 space-y-2">
            <label className="text-xs uppercase font-mono text-slate-500 font-bold block" htmlFor="compat-sign2 font-bold">მეორე ნიშანი</label>
            <select
              id="compat-sign2"
              value={sign2}
              onChange={(e) => { setSign2(e.target.value); setResult(null); }}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-indigo-500 h-12 cursor-pointer"
            >
              {ZODIAC_SIGNS.map(s => (
                <option key={s.id} value={s.id} className="bg-slate-950 text-white">
                  {s.symbol} {s.nameGe} ({s.nameLa})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calculate button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCalculate}
            id="compat-calc-btn"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-indigo-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:brightness-110 active:scale-[0.98] transition-all text-white font-semibold flex items-center gap-2 select-none cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> ანალიზი...
              </>
            ) : (
              'კოსმოსური თავსებადობის გამოთვლა'
            )}
          </button>
        </div>
      </div>

      {/* Result presentation area */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* Compatibility rating bar */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
              {/* Radial or Ring numerical score */}
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">საერთო თავსებადობა</span>
                <div className="text-6xl font-bold font-mono text-white tracking-tighter flex items-center justify-center gap-1">
                  {result.score}
                  <span className="text-2xl text-red-400">%</span>
                </div>
                <div className="w-full max-w-[120px] bg-red-950/40 border border-red-900/40 px-3 py-1.5 rounded-xl text-[10px] text-red-400 font-semibold font-mono uppercase tracking-wide mx-auto mt-2">
                  {result.score >= 85 ? 'უმაღლესი კავშირი' : result.score >= 70 ? 'ჰარმონიული' : result.score >= 50 ? 'სტაბილური' : 'კოსმოსური გამოწვევა'}
                </div>
              </div>

              {/* Elemental matching indicators */}
              <div className="w-full md:w-2/3 space-y-4">
                {/* Love bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-450 text-slate-400">რომანტიკა და მიზიდულობა:</span>
                    <span className="text-red-400 font-mono">{result.lovePercentage}%</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${result.lovePercentage}%` }} />
                  </div>
                </div>

                {/* Friendship bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-450 text-slate-400">მეგობრობა და გაგება:</span>
                    <span className="text-indigo-400 font-mono">{result.friendshipPercentage}%</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${result.friendshipPercentage}%` }} />
                  </div>
                </div>

                {/* Work bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-450 text-slate-400">საქმიანი კავშირი და კოლაბორაცია:</span>
                    <span className="text-emerald-400 font-mono">{result.workPercentage}%</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${result.workPercentage}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* In-depth Georgian Synthesis details */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-4 backdrop-blur-md">
              <span className="text-xs uppercase font-mono tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-300" /> სინასტრიული ანალიზი
              </span>
              <h3 className="text-white font-bold text-lg">
                როგორ ურთიერთქმედებს {result.sign1.nameGe} და {result.sign2.nameGe}?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed text-justify">
                {result.summary}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
