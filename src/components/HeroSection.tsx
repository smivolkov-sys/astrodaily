/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, Moon, Compass, Layers, Heart, Info, ArrowUpRight, CheckCircle, CircleDot } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  onPageChange: (page: string) => void;
}

export default function HeroSection({ onPageChange }: HeroSectionProps) {
  const [profileExists, setProfileExists] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('userBirthProfile');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        setProfileExists(true);
        setUserName(p.name);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  // Compute lunar phase based on current date
  const getLunarPhase = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // Simple astronomical Lunar Cycle formula approximation
    const c = year - 1900;
    const e = month < 3 ? month + 12 : month;
    const f = month < 3 ? year - 1 : year;
    const jd = Math.round(365.25 * f) + Math.round(30.6 * (e + 1)) + day - 694039.09;
    const age = (jd / 29.530588853) - Math.floor(jd / 29.530588853);
    const moonAge = age * 29.53;

    if (moonAge < 1.84) return { name: 'ახალი მთვარე', icon: '🌑', desc: 'იდეალური დროა ახალი განზრახვებისა და ჩანაფიქრების დასაწყებად.' };
    if (moonAge < 5.53) return { name: 'მზარდი ნახევარმთვარე', icon: '🌒', desc: 'ენერგია იზრდება. დროა პრაქტიკული ნაბიჯები გადადგათ მიზნებისკენ.' };
    if (moonAge < 9.22) return { name: 'პირველი მეოთხედი', icon: '🌓', desc: 'გამოწვევები ჩნდება. შეინარჩუნეთ მოტივაცია და გადალახეთ დაბრკოლებები.' };
    if (moonAge < 12.91) return { name: 'მზარდი მთვარე', icon: '🌔', desc: 'ანალიზისა და დახვეწის პერიოდი. დააკვირდით დეტალებს.' };
    if (moonAge < 16.6) return { name: 'სავსე მთვარე', icon: '🌕', desc: 'ემოციური და სასიცოცხლო ენერგიის პიკი. მადლიერების დროა.' };
    if (moonAge < 20.29) return { name: 'კლებადი მთვარე', icon: '🌖', desc: 'გაზიარებისა და გაცემის დრო. გაუზიარეთ ცოდნა სხვებს.' };
    if (moonAge < 23.98) return { name: 'მესამე მეოთხედი', icon: '🌗', desc: 'გათავისუფლებისა და პატიების პერიოდი. მოიშორეთ ძველი ტვირთი.' };
    return { name: 'კლებადი ნახევარმთვარე', icon: '🌘', desc: 'დასვენებისა და აღდგენის ფაზა. მოემზადეთ ახალი ციკლისთვის.' };
  };

  const currentMoon = getLunarPhase();

  const cards = [
    {
      id: 'horoscopes',
      title: 'ჰოროსკოპი',
      desc: 'ყოველდღიური, ყოველკვირეული, ყოველთვიური და წლიური ინდივიდუალური პროგნოზები 12 ნიშნისთვის.',
      icon: Moon,
      color: 'from-blue-600 to-indigo-600',
      badge: 'ყოველდღიური'
    },
    {
      id: 'transits',
      title: 'ასტრო პროგნოზი',
      desc: 'ზოგადი პლანეტარული ტრანზიტები, რეტროგრადები და გლობალური კოსმოსური მოვლენების ანალიზი.',
      icon: Compass,
      color: 'from-purple-600 to-indigo-600',
      badge: 'ტრანზიტები'
    },
    {
      id: 'personal',
      title: 'პირადი პროგნოზი',
      desc: 'მხოლოდ თქვენს ნატალურ მონაცემებზე მორგებული ყოველდღიური კოსმოსური მრჩეველი.',
      icon: Sparkles,
      color: 'from-fuchsia-600 to-pink-600',
      badge: 'პერსონალური'
    },
    {
      id: 'compatibility',
      title: 'სიყვარულის თავსებადობა',
      desc: 'შეამოწმეთ თქვენი და თქვენი პარტნიორის კავშირი კოსმოსურ დონეზე (ელემენტების სინასტრია).',
      icon: Heart,
      color: 'from-pink-600 to-rose-600',
      badge: 'თავსებადობა'
    },
    {
      id: 'quizzes',
      title: 'ასტროლოგიური ქვიზები',
      desc: 'გაიგეთ მეტი თქვენი პიროვნების შესახებ სახალისო და შემეცნებითი ინტერაქციული ტესტებით.',
      icon: Info,
      color: 'from-blue-600 to-cyan-600',
      badge: 'ტესტები'
    }
  ];

  return (
    <div className="space-y-16 px-4 md:px-0">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 overflow-hidden rounded-3xl bg-radial from-indigo-950/40 via-transparent to-transparent">
        {/* Animated background circles */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full border border-indigo-950/40 animate-[spin_120s_linear_infinite]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full border border-purple-950/20 border-dashed animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-purple-500 rounded-full blur-xs animate-ping" />
          <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full blur-xs animate-pulse" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-900/50 text-xs text-indigo-300 font-medium tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            კოსმოსური ყოველდღიური თანამგზავრი თქვენს ხელისგულზე
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight"
          >
            აღმოაჩინე ვარსკვლავების <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              იდუმალი ძალა
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            ავტომატიზებული პლატფორმა <span className="text-white font-medium">astrodaily.ge</span> აერთიანებს უძველეს კოსმოსურ სიბრძნეს და თანამედროვე ხელოვნურ ინტელექტს თქვენი ყოველდღიური წინსვლისთვის.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-6"
          >
            <button
              onClick={() => onPageChange('horoscopes')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-650 to-purple-650 font-semibold text-white shadow-lg hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer bg-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              წაიკითხე ჰოროსკოპი
            </button>
            <button
              onClick={() => onPageChange('personal')}
              className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-350 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              პირადი კაბინეტის შექმნა
            </button>
          </motion.div>
        </div>
      </section>

      {/* Astro Metadata & Profile Tracker bar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Status */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-start gap-4 backdrop-blur-md shadow-lg">
          <div className="p-3 bg-indigo-950/40 rounded-xl border border-white/5">
            <CheckCircle className={`w-6 h-6 ${profileExists ? 'text-green-400' : 'text-indigo-400'}`} />
          </div>
          <div className="space-y-1 w-full">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-500">პირადი პროფილი</span>
            <h4 className="text-white font-semibold text-base">
              {profileExists ? `კეთილი იყოს დაბრუნება, ${userName}!` : 'ასტრო-პროფილი ცარიელია'}
            </h4>
            <p className="text-xs text-slate-400">
              {profileExists 
                ? 'თქვენი მონაცემები შენახულია. შეგიძლიათ გამოიყენოთ პერსონალური პროგნოზები.'
                : 'შეიყვანეთ დაბადების თარიღი პერსონალურ კაბინეტში ექსკლუზიური პროგნოზებისთვის.'}
            </p>
            {!profileExists && (
              <button 
                onClick={() => onPageChange('personal')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 mt-2 cursor-pointer"
              >
                შექმენი პროფილი <ArrowUpRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Moon Phase Tracker */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-start gap-4 md:col-span-2 backdrop-blur-md shadow-lg">
          <div className="text-4xl filter drop-shadow-[0_0_10px_rgba(129,140,248,0.4)] px-1">
            {currentMoon.icon}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-500">მთვარის მიმდინარე ფაზა</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-indigo-400 text-[10px] font-semibold border border-white/5">
                {currentMoon.name}
              </span>
            </div>
            <p className="text-xs text-indigo-200 mt-1 font-medium italic">{currentMoon.desc}</p>
            <p className="text-[11px] text-slate-400">მთვარის გავლენა განსაკუთრებით აძლიერებს ინტუიციას და ემოციურ ვიბრაციებს.</p>
          </div>
        </div>
      </section>

      {/* Grid of Core features */}
      <section className="space-y-6">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">კოსმოსური მოდულები</h2>
          <p className="text-slate-400 text-sm">აირჩიეთ სასურველი მიმართულება თქვენი კოსმოსური გზამკვლევიდან:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.15)', scale: 1.01 }}
                className="group relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 cursor-pointer shadow-lg"
                onClick={() => onPageChange(card.id)}
                id={`hero-card-${card.id}`}
              >
                {/* Visual glow on card hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-2xl group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] group-hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all">
                      <Icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wide text-slate-400 bg-black/40 border border-white/5 px-2.5 py-1 rounded-full group-hover:text-indigo-400 group-hover:border-white/10 transition-colors">
                      {card.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-1">
                      {card.title}
                      <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Daily Astro-Tip Box */}
      <section className="bg-gradient-to-br from-indigo-900/10 via-slate-900 to-black border border-white/10 rounded-3xl p-8 text-center space-y-4 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />
        <CircleDot className="w-8 h-8 text-indigo-400 mx-auto animate-spin [animation-duration:12s]" />
        <h3 className="font-bold text-lg text-white">ყოველდღიური კოსმოსური რჩევა</h3>
        <p className="text-base text-slate-300 max-w-xl mx-auto italic leading-relaxed serif">
          „გახსოვდეთ, რომ ვარსკვლავები მიგვითითებენ მიმართულებაზე, თუმცა ბედისწერის განმკარგველი ყოველთვის თქვენ ხართ. ნება მიეცით პლანეტების ენერგიას დაგეხმაროთ შემეცნებაში, მაგრამ გადაწყვეტილებები თქვენი სულის ხმით მიიღეთ.“
        </p>
        <div className="text-xs font-mono text-indigo-400 tracking-wider">
          ASTRODAILY.GE EDITORIAL
        </div>
      </section>
    </div>
  );
}
