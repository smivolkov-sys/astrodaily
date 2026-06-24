/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, Moon, Orbit, ShieldCheck, Sun, Info, CalendarClock, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function AstroForecasts() {
  const transits = [
    {
      planet: 'მზე (Sun)',
      sign: 'კირჩხიბი ♋',
      direction: 'დირექტიული',
      status: 'მზის გადასვლა კირჩხიბის ნიშანში ზრდის ემოციურ მგრძნობელობას, ინტუიციას და ყურადღებას ამახვილებს საოჯახო კერაზე.'
    },
    {
      planet: 'მერკური (Mercury)',
      sign: 'კირჩხიბი ♋',
      direction: 'დირექტიული',
      status: 'კომუნიკაცია ხდება უფრო ემოციური და ინტუიტიური. ახლა უკეთ გამოხატავთ გრძნობებს, ვიდრე მშრალ ლოგიკას.'
    },
    {
      planet: 'ვენერა (Venus)',
      sign: 'ლომი ♌',
      direction: 'დირექტიული',
      status: 'სიყვარულსა და ურთიერთობებში შემოდის ვნება, დრამატურგია და გულუხვობა. სოციალურ ასპარეზზე ყურადღების ცენტრში ყოფნის მოთხოვნილება იზრდება.'
    },
    {
      planet: 'მარსი (Mars)',
      sign: 'ვერძი ♈',
      direction: 'რეტროგრადული 🔄',
      status: 'ფიზიკური ენერგიის მიმართვა შიდა რესურსების გადახალისებაზე ხდება საჭირო. მოერიდეთ იმპულსურ მოქმედებებს და აგრესიას.'
    },
    {
      planet: 'იუპიტერი (Jupiter)',
      sign: 'ტყუპები ♊',
      direction: 'დირექტიული',
      status: 'ხელსაყრელი ტრანზიტი ახალი ცოდნის მისაღებად, სწავლისა და სოციალური კონტაქტების გასაფართოებლად.'
    },
    {
      planet: 'სატურნი (Saturn)',
      sign: 'თევზები ♓',
      direction: 'დირექტიული',
      status: 'სულიერი კუთხით დისციპლინისა და სტრუქტურის შემოტანა. დროა თქვენი ოცნებები ხელშესახებ მიზნებად გარდასახოთ.'
    }
  ];

  const eclipses = [
    {
      date: '18 სექტემბერი, 2026',
      type: 'მთვარის ნაწილობრივი დაბნელება',
      sign: 'თევზები ♓',
      impact: 'ემოციური დასრულება, ილუზიების მსხვრევა და სულიერი განწმენდის პერიოდი.'
    },
    {
      date: '2 ოქტომბერი, 2026',
      type: 'მზის რგოლისებრი დაბნელება',
      sign: 'სასწორი ♎',
      impact: 'ახალი პარტნიორული კავშირები, ხელშეკრულებები და ურთიერთობის საფუძვლების გადააზრება.'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
          <Orbit className="w-6 h-6 text-indigo-400 animate-[spin_20s_linear_infinite]" />
          კოსმოსური პროგნოზები
        </h2>
        <p className="text-sm text-slate-400">
          გაეცანით მიმდინარე პლანეტარულ განლაგებებს, რეტროგრადებსა და დაბნელებებს, რომლებიც განსაზღვრავენ გლობალურ კოსმოსურ ამინდს.
        </p>
      </div>

      {/* Grid of transits & eclipses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Planet transits table (Col span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Sun className="w-5 h-5 text-yellow-500" />
            <h3 className="font-bold text-lg text-white">პლანეტარული ტრანზიტები</h3>
          </div>

          <div className="space-y-4">
            {transits.map((trans, i) => {
              const isRetro = trans.direction.includes('რეტრო');
              return (
                <div 
                  key={i} 
                  className={`border rounded-3xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:bg-white/10 ${
                    isRetro ? 'border-amber-550/20 bg-amber-500/5' : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className="space-y-1 md:w-1/3">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">პლანეტა</span>
                    <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
                      {trans.planet}
                    </h4>
                    <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold font-mono border ${
                      isRetro ? 'bg-amber-950/40 text-amber-400 border-amber-900/30' : 'bg-white/10 text-slate-400 border-white/5'
                    }`}>
                      {trans.direction}
                    </span>
                  </div>

                  <div className="space-y-1 md:w-1/4">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">ზოდიაქოს ნიშანი</span>
                    <p className="text-indigo-400 font-bold text-sm">{trans.sign}</p>
                  </div>

                  <div className="space-y-1 md:w-5/12 text-xs text-slate-400">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">გავლენა</span>
                    <p className="leading-relaxed text-justify">{trans.status}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Eclipses Column */}
        <div className="space-y-8">
          {/* Eclipses list */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6 backdrop-blur-md">
            <h3 className="font-bold text-lg text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <CalendarClock className="w-4 h-5 text-indigo-400" /> დაბნელებების კალენდარი
            </h3>

            <div className="space-y-6">
              {eclipses.map((eclipse, idx) => (
                <div key={idx} className="space-y-2 border-l-2 border-indigo-500/40 pl-4">
                  <span className="text-[10px] font-mono font-semibold text-indigo-400 bg-white/10 border border-white/10 px-2 py-0.5 rounded">
                    {eclipse.date}
                  </span>
                  <div>
                    <h4 className="text-white font-bold text-sm">{eclipse.type}</h4>
                    <p className="text-xs text-indigo-300 font-medium">{eclipse.sign} ნიშანში</p>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed bg-black/40 p-2.5 rounded-2xl border border-white/10">
                    {eclipse.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Retrograde Guide banner */}
          <div className="p-6 bg-gradient-to-tr from-indigo-950/20 to-purple-950/10 border border-white/10 rounded-3xl space-y-3 relative overflow-hidden backdrop-blur-md">
            <Zap className="absolute top-4 right-4 text-indigo-500 w-5 h-5 animate-pulse" />
            <h4 className="text-white font-bold text-sm flex items-center gap-1.5 uppercase tracking-wide">
              რას ნიშნავს რეტროგრადი?
            </h4>
            <div className="text-xs text-slate-400 leading-relaxed space-y-2">
              <p>
                ასტროლოგიაში რეტროგრადი მიუთითებს პერიოდზე, როდესაც დედამიწიდან დამზერილი პლანეტა თითქოს უკუმიმართულებით იწყებს მოძრაობას.
              </p>
              <p>
                ეს არის შინაგანი ასახვის, გადაფასებისა და ძველი საქმეების დასრულების კოსმოსური დრო. ახალი წამოწყებები ამ პერიოდში ხშირად ნელდება.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
