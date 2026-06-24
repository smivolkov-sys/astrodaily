/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, Heart, Shield, Award, Clock, ArrowRight, Compass, RefreshCw, User, MapPin } from 'lucide-react';

interface PersonalForecastProps {
  onPageChange: (page: string) => void;
}

export default function PersonalForecast({ onPageChange }: PersonalForecastProps) {
  const [profile, setProfile] = useState<{ name: string; birthDate: string; birthTime: string; birthPlace: string } | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Dynamic Clock in Georgian
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ka-GE'));
    }, 1000);

    const saved = localStorage.getItem('userBirthProfile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setFormData(parsed);
      } catch (e) {
        // ignore
      }
    }

    return () => clearInterval(timer);
  }, []);

  // Calculate astrological numbers based on user name
  const getUserNumber = (name: string) => {
    return (name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 9) + 1;
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('გთხოვთ შეავსოთ სახელი');
      return;
    }
    if (!formData.birthDate) {
      setErrorMsg('გთხოვთ მიუთითოთ დაბადების თარიღი');
      return;
    }
    setErrorMsg('');
    localStorage.setItem('userBirthProfile', JSON.stringify(formData));
    setProfile(formData);
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-fuchsia-400" />
          პირადი ასტრო კაბინეტი
        </h2>
        <p className="text-sm text-gray-400">
          მიიღეთ მხოლოდ თქვენს დაბადების ვიბრაციებზე მორგებული პერსონალიზებული ყოველდღიური პროგნოზები და ასტროლოგიური მითითებები.
        </p>
      </div>

      {profile ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Left: Profile summary & UTC Clock */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-transparent rounded-full" />
              
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">აქტიური პროფაილი</span>
                <div>
                  <h3 className="text-white font-bold text-2xl">{profile.name}</h3>
                  <p className="text-xs text-indigo-400 mt-1">დაბადების ადგილი: {profile.birthPlace || 'თბილისი'}</p>
                </div>
                
                <div className="border-t border-white/10 pt-4 space-y-2.5 text-xs text-slate-400 font-mono">
                  <div className="flex justify-between">
                    <span>დაბადების თარიღი:</span>
                    <span className="text-white font-bold">{profile.birthDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>დაბადების დრო:</span>
                    <span className="text-white font-bold">{profile.birthTime || '12:00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ბედისწერის რიცხვი:</span>
                    <span className="text-fuchsia-400 font-bold"># {getUserNumber(profile.name)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Clock card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center space-y-2 backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block">მიმდინარე ადგილობრივი დრო</span>
              <Clock className="w-5 h-5 text-indigo-400 mx-auto animate-pulse" />
              <div className="text-2xl font-bold font-mono text-white tracking-widest">{currentTime || 'ჩატვირთვა...'}</div>
              <span className="block text-[10px] text-slate-550">Tbilisi Offset (UTC+4)</span>
            </div>
          </div>

          {/* Cards Right: Personal Advice & custom energy dials */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Compass className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-lg text-white">თქვენი დღევანდელი პერსონალური ასპექტები</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs text-indigo-400 font-bold uppercase tracking-wide flex items-center gap-1.5 font-mono">
                    <Award className="w-4 h-4 text-indigo-400" /> დღის ვიბრაცია
                  </span>
                  <p className="text-sm text-slate-300 leading-relaxed text-justify">
                    {profile.name}, დღეს თქვენი ბედისწერის რიცხვი ({getUserNumber(profile.name)}) შედის ჰარმონიაში მიმდინარე მზის ტრანზიტთან. ვარსკვლავები მიგითითებენ, რომ დღის პირველ ნახევარში უნდა დაასრულოთ ის საქმეები, რაც პროფესიულ პასუხისმგებლობას მოითხოვს. საღამოს კოსმოსური ენერგიები გირჩევენ ყურადღება დაუთმოთ საყვარელ ადამიანებთან ან მეგობრებთან ურთიერთობას.
                  </p>
                </div>

                {/* Grid for custom personal meters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  {/* Intuition meter */}
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-semibold flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-purple-400" /> ინტუიციის დონე
                      </span>
                      <span className="text-purple-400 font-bold font-mono">88%</span>
                    </div>
                    <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '88%' }} />
                    </div>
                  </div>

                  {/* Harmony meter */}
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-semibold flex items-center gap-1">
                        <Heart className="w-4 h-4 text-pink-400" /> სიყვარულის მიზიდულობა
                      </span>
                      <span className="text-pink-400 font-bold font-mono">74%</span>
                    </div>
                    <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-pink-500 h-full rounded-full" style={{ width: '74%' }} />
                    </div>
                  </div>

                  {/* Physical energy */}
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-semibold flex items-center gap-1">
                        <Clock className="w-4 h-4 text-yellow-400" /> ფიზიკური ტონუსი
                      </span>
                      <span className="text-yellow-400 font-bold font-mono">65%</span>
                    </div>
                    <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-yellow-500 h-full rounded-full" style={{ width: '65%' }} />
                    </div>
                  </div>

                  {/* Protection level */}
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-semibold flex items-center gap-1">
                        <Shield className="w-4 h-4 text-blue-400" /> კოსმოსური მფარველობა
                      </span>
                      <span className="text-blue-400 font-bold font-mono">92%</span>
                    </div>
                    <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Dynamic inline form to create a birth profile directly in Personal Cabinets */
        <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-xl">შექმენით პირადი პროფილი</h3>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              მიუთითეთ თქვენი დაბადების მონაცემები ასტროლოგიური მახასიათებლების გამოსათვლელად და პერსონალიზებული ყოველდღიური მრჩეველის გასააქტიურებლად.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1.5">
              <label htmlFor="pf-name" className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" /> თქვენი სახელი
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="pf-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="მაგ: გიორგი"
                  className="w-full bg-black/40 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-500"
                  required
                />
              </div>
            </div>

            {/* Birth Date Input */}
            <div className="space-y-1.5">
              <label htmlFor="pf-date" className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-450 text-indigo-405" /> დაბადების თარიღი
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="pf-date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3.5 text-base text-white text-slate-350"
                  required
                />
              </div>
            </div>

            {/* Birth Time and Place Side-by-Side (or stacked on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="pf-time" className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" /> დაბადების დრო (სურვილისამებრ)
                </label>
                <input
                  type="time"
                  id="pf-time"
                  value={formData.birthTime}
                  onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3.5 text-base text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="pf-place" className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" /> დაბადების ადგილი (სურვილისამებრ)
                </label>
                <input
                  type="text"
                  id="pf-place"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  placeholder="მაგ: თბილისი"
                  className="w-full bg-black/40 border border-white/10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-3.5 text-base text-white placeholder-slate-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3.5 rounded-xl bg-indigo-650 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:brightness-110 active:scale-[0.98] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border border-white/5"
            >
              პროფილის შენახვა და აქტივაცია <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
