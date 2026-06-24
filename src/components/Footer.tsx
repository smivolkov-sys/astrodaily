/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Moon, Star, Mail, MapPin, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black/20 border-t border-white/5 mt-20 px-6 py-12 text-xs md:text-sm text-slate-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-400 flex items-center justify-center text-white shadow-md">
              <Moon className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-white">astrodaily<span className="text-indigo-400">.ge</span></span>
          </div>
          <p className="text-slate-400 max-w-sm leading-relaxed">
            ავტომატიზებული ასტროლოგიური პორტალი, რომელიც გთავაზობთ ზუსტ, პერსონალიზებულ და დინამიკურად განახლებად კოსმოსურ პროგნოზებს. ჩვენი სისტემა ყოველდღიურად აანალიზებს პლანეტარულ განლაგებას და გაწვდით საუკეთესო ასტროლოგიურ რჩევებს.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-600">
            <span>© 2026 ASTRODAILY.GE</span>
            <span>•</span>
            <span>MADE IN GEORGIA</span>
          </div>
        </div>

        {/* Dynamic features links */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold flex items-center gap-2 text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> ნავიგაცია
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#horoscopes" className="hover:text-indigo-400 transition-colors">ყოველდღიური ჰოროსკოპი</a></li>
            <li><a href="#compatibility" className="hover:text-indigo-400 transition-colors">სიყვარულის თავსებადობა</a></li>
            <li><a href="#personal" className="hover:text-indigo-400 transition-colors">პირადი კოსმოსური კაბინეტი</a></li>
          </ul>
        </div>

        {/* Contact/Credits */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold flex items-center gap-2 text-xs uppercase tracking-wider">
            კავშირი
          </h4>
          <p className="text-slate-400">
            გაქვთ კითხვები ან თანამშრომლობის სურვილი? დაგვიკავშირდით.
          </p>
          <div className="space-y-2 text-slate-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>astro@astrodaily.ge</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>თბილისი, საქართველო</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-600">
        <p>საიტზე გამოქვეყნებული მასალები ეყრდნობა კოსმოსური ტრანზიტების მათემატიკურ მოდელირებასა და მოწინავე Gemini AI ანალიტიკას.</p>
        <p className="font-mono">VER 1.4.0 (DARK_COSMOS)</p>
      </div>
    </footer>
  );
}
