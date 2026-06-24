/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HelpCircle, RefreshCw, Check, Flame, Award, Globe, Wind, Droplets } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    element: 'ცეცხლი' | 'მიწა' | 'ჰაერი' | 'წყალი';
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'რთული გადაწყვეტილების მიღებისას, ყველაზე ხშირად რას ეყრდნობით?',
    options: [
      { label: 'მყისიერ იმპულსს და შინაგან ვნებას', element: 'ცეცხლი' },
      { label: 'ლოგიკურ ფაქტებს, ციფრებსა და პრაქტიკულობას', element: 'მიწა' },
      { label: 'სხვების აზრს, კომუნიკაციასა და მეგობრულ რჩევას', element: 'ჰაერი' },
      { label: 'ღრმა ინტუიციასა და გულისხმას', element: 'წყალი' }
    ]
  },
  {
    id: 2,
    question: 'როგორი გარემო გაძლევთ ყველაზე მეტ ენერგიას დასვენებისას?',
    options: [
      { label: 'აქტიური თავგადასავალი ან ცეცხლოვანი წვეულება', element: 'ცეცხლი' },
      { label: 'მყუდრო სახლი, ბუნებასთან სიახლოვე ან მებაღეობა', element: 'მიწა' },
      { label: 'ახალი ქალაქების დათვალიერება, სიმაღლეები ან სოციალიზაცია', element: 'ჰაერი' },
      { label: 'მდინარის, ზღვის პირას ყოფნა ან მშვიდი მუსიკა', element: 'წყალი' }
    ]
  },
  {
    id: 3,
    question: 'რა არის თქვენი ყველაზე დიდი ძალა კრიზისულ სიტუაციაში?',
    options: [
      { label: 'გაბედავობა, სწრაფი რეაგირება და სხვების გაძღოლა', element: 'ცეცხლი' },
      { label: 'სიმშვიდე, სტაბილურობა და ურყევი ნებისყოფა', element: 'მიწა' },
      { label: 'იდეების გენერირება, დიპლომატია და მოლაპარაკება', element: 'ჰაერი' },
      { label: 'ემპათია, ადამიანების გაგება და ემოციური მხარდაჭერა', element: 'წყალი' }
    ]
  },
  {
    id: 4,
    question: 'რა არის თქვენი მთავარი პიროვნული მისწრაფება?',
    options: [
      { label: 'მსოფლიო აღიარება, წარმატება და მუდმივი წინსვლა', element: 'ცეცხლი' },
      { label: 'დაცულობა, მატერიალური კეთილდღეობა და ოჯახური სიმყუდროვე', element: 'მიწა' },
      { label: 'თავისუფლება, შემეცნება და ახალი იდეების გავრცელება', element: 'ჰაერი' },
      { label: 'სულიერი მშვიდობა, ჰარმონია და გარესამყაროსთან შერწყმა', element: 'წყალი' }
    ]
  }
];

export default function QuizSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<('ცეცხლი' | 'მიწა' | 'ჰაერი' | 'წყალი')[]>([]);
  const [done, setDone] = useState(false);

  const handleOptionSelect = (element: 'ცეცხლი' | 'მიწა' | 'ჰაერი' | 'წყალი') => {
    const nextAnswers = [...answers, element];
    setAnswers(nextAnswers);

    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setDone(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setAnswers([]);
    setDone(false);
  };

  // Analyze element frequencies to get dominant
  const getDominantElement = () => {
    const counts = { ცეცხლი: 0, მიწა: 0, ჰაერი: 0, წყალი: 0 };
    answers.forEach(ans => counts[ans]++);
    
    let dominant: 'ცეცხლი' | 'მიწა' | 'ჰაერი' | 'წყალი' = 'ცეცხლი';
    let max = -1;
    for (const key in counts) {
      const el = key as 'ცეცხლი' | 'მიწა' | 'ჰაერი' | 'წყალი';
      if (counts[el] > max) {
        max = counts[el];
        dominant = el;
      }
    }
    return {
      element: dominant,
      count: counts[dominant]
    };
  };

  const getElementMetadata = (el: 'ცეცხლი' | 'მიწა' | 'ჰაერი' | 'წყალი') => {
    if (el === 'ცეცხლი') {
      return {
        icon: Flame,
        color: 'text-orange-500 bg-orange-950/40 border-orange-900/60',
        banner: 'from-orange-600 to-amber-600',
        title: 'ქვეცნობიერი ცეცხლი (Internal Fire)',
        desc: 'თქვენი ქვეცნობიერი სავსეა ვნებით, დინამიკითა და ლიდერული თვისებებით. ხართ იმპულსური, ენერგიული და ყოველთვის მზად ახალი მწვერვალების დასაპყრობად. თქვენი ძალა ვლინდება მოტივაციასა და შემოქმედებით ნაპერწკალში.',
        zodiacs: 'ვერძი ♈, ლომი ♌, მშვილდოსანი ♐'
      };
    }
    if (el === 'მიწა') {
      return {
        icon: Globe,
        color: 'text-amber-500 bg-amber-950/40 border-amber-900/60',
        banner: 'from-amber-700 to-yellow-600',
        title: 'ქვეცნობიერი მიწა (Internal Earth)',
        desc: 'თქვენ ხართ სტაბილური, პრაგმატული და საიმედო პიროვნება. თქვენი პრიორიტეტი სიმყუდროვე და დისციპლინაა. ცხოვრებას პრაგმატულად უყურებთ და იცით მატერიალური მიღწევების ფასი. თქვენი სიმშვიდე გარშემომყოფებს დაცულობის შეგრძნებას აძლევს.',
        zodiacs: 'კუ ♉, ქალწული ♍, თხის რქა ♑'
      };
    }
    if (el === 'ჰაერი') {
      return {
        icon: Wind,
        color: 'text-indigo-400 bg-indigo-950/40 border-indigo-900/60',
        banner: 'from-blue-600 to-indigo-600',
        title: 'ქვეცნობიერი ჰაერი (Internal Air)',
        desc: 'თქვენი მთავარი იარაღი გონება, კომუნიკაცია და თავისუფლებაა. გიყვართ ინფორმაციის გაზიარება, იდეების გენერირება და სოციალური კავშირები. ხართ ძალიან მოქნილი და არ გიყვართ ჩარჩოებში მოქცევა.',
        zodiacs: 'ტყუპები ♊, სასწორი ♎, მერწყული ♒'
      };
    }
    return {
      icon: Droplets,
      color: 'text-blue-400 bg-blue-950/40 border-blue-900/60',
      banner: 'from-blue-600 to-cyan-600',
      title: 'ქვეცნობიერი წყალი (Internal Water)',
      desc: 'თქვენი სამყარო არის ემოციების, ინტუიციის, ხელოვნებისა და ემპათიის გაერთიანება. ადვილად გრძნობთ სხვების განწყობას, ხართ ხავერდოვანი და იდუმალი. გაქვთ მდიდარი ქვეცნობიერი და ძლიერი შემოქმედებითი ნიჭი.',
      zodiacs: 'კირჩხიბი ♋, მორიელი ♏, თევზები ♓'
    };
  };

  const activeQuestion = QUESTIONS[currentIdx];

  return (
    <div className="space-y-12 max-w-2xl mx-auto">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-400" />
          კოსმოსური ქვიზები და ტესტები
        </h2>
        <p className="text-sm text-slate-400">
          გაიარეთ მოკლე ფსიქო-ასტროლოგიური ტესტები და შეიცანით თქვენი ფარული თვისებები.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl backdrop-blur-md min-h-[350px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={activeQuestion.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Progress counter */}
              <div className="flex justify-between items-center text-xs text-slate-500 font-mono font-bold uppercase">
                <span>ტესტი: შენი კოსმოსური სტიქია</span>
                <span className="text-indigo-400">კითხვა {currentIdx + 1} / {QUESTIONS.length}</span>
              </div>

              {/* Question Label */}
              <h3 className="text-white font-bold text-base md:text-lg">
                {activeQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {activeQuestion.options.map((option, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleOptionSelect(option.element)}
                    id={`quiz-option-${oIdx}`}
                    className="w-full text-left bg-black/40 border border-white/10 hover:border-white/20 h-14 hover:bg-white/10 p-4 rounded-xl text-xs md:text-sm text-slate-350 hover:text-white flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <span>{option.label}</span>
                    <span className="w-5 h-5 rounded-full border border-white/10 group-hover:border-indigo-500 flex items-center justify-center text-[10px] text-indigo-400 transition-colors">
                      {oIdx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Results Presentation column */
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-center py-4"
            >
              {(() => {
                const dominant = getDominantElement();
                const meta = getElementMetadata(dominant.element);
                const Icon = meta.icon;

                return (
                  <div className="space-y-6">
                    {/* Element Icon container */}
                    <div className="flex justify-center">
                      <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center shadow-lg animate-bounce ${meta.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400">ტესტის შედეგი</span>
                      <h3 className="text-white font-bold text-2xl tracking-tight uppercase">
                        {meta.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">
                        შესაბამისი პასუხების წილი: {Math.round((dominant.count / QUESTIONS.length) * 100)}%
                      </p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto text-center font-normal px-2">
                      {meta.desc}
                    </p>

                    <div className="bg-black/40 p-4 border border-white/10 rounded-2xl max-w-sm mx-auto text-xs">
                      <span className="text-slate-550 block">თქვენი სტიქიის ზოდიაქოს ნიშნები:</span>
                      <span className="font-bold text-indigo-300 font-mono block mt-1">{meta.zodiacs}</span>
                    </div>

                    {/* Reset Button */}
                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        id="quiz-reset-btn"
                        className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 mx-auto transition-transform cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> ტესტის თავიდან დაწყება
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic progress bar bottom */}
        {!done && (
          <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mt-6 border border-white/5">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((currentIdx) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
