/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import { ForecastRecord, ZODIAC_SIGNS } from '../types.js';

const DB_PATH = path.join(process.cwd(), 'src', 'db', 'forecasts.json');

// Ensure parent directory exists
function ensureDbDir() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function readForecasts(): ForecastRecord[] {
  ensureDbDir();
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ forecasts: [] }, null, 2));
    return [];
  }
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return data.forecasts || [];
  } catch (err) {
    console.error('Error reading forecasts database:', err);
    return [];
  }
}

export function writeForecasts(forecasts: ForecastRecord[]): void {
  ensureDbDir();
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify({ forecasts }, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing forecasts database:', err);
  }
}

export function getForecast(sign: string, type: string, period: string): ForecastRecord {
  const all = readForecasts();
  const found = all.find(f => f.sign === sign && f.type === type && f.period === period);
  if (found) {
    return found;
  }

  // Fallback to generating a high-quality offline astrological forecast if not found
  const fallback = generateOfflineFallback(sign, type, period);
  
  // Save fallback so we don't regenerate every time
  all.push(fallback);
  writeForecasts(all);
  return fallback;
}

export function upsertForecasts(newRecords: ForecastRecord[]): void {
  const all = readForecasts();
  const updatedList = [...all];

  for (const record of newRecords) {
    const idx = updatedList.findIndex(
      f => f.sign === record.sign && f.type === record.type && f.period === record.period
    );
    if (idx !== -1) {
      updatedList[idx] = { ...updatedList[idx], ...record, updatedAt: new Date().toISOString() };
    } else {
      updatedList.push({ ...record, updatedAt: new Date().toISOString() });
    }
  }

  writeForecasts(updatedList);
}

// Beautiful Georgian astrological vocabulary and templates to construct rich fallback content
function generateOfflineFallback(sign: string, type: string, period: string): ForecastRecord {
  const zSign = ZODIAC_SIGNS.find(s => s.id === sign) || ZODIAC_SIGNS[0];
  const ruler = zSign.ruler;
  const element = zSign.element;

  // Let's create varying astrological texts for daily, weekly, monthly, yearly
  let content = '';
  let love = '';
  let career = '';
  let health = '';
  let luckyNumbers: number[] = [];
  let luckyColors: string[] = [];
  let energyScore = 75;

  // Generate pseudorandom parameters based on sign and period to make them consistent but dynamic
  const seed = sign.charCodeAt(0) + period.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const random = (max: number, offset = 0) => ((seed * 9301 + 49297) % 233280) % max + offset;

  const colorPool = ['კოსმოსური ლურჯი', 'ოქროსფერი', 'ვერცხლისფერი', 'ღრმა იასამნისფერი', 'ზურმუხტისფერი', 'ალიბალისფერი', 'ნეონის ნარინჯისფერი', 'თეთრი მარგალიტი', 'ზღვის ტალღისფერი', 'ნახშირისფერი'];
  const numberCount = 3 + (seed % 2);
  luckyNumbers = [];
  for (let i = 0; i < numberCount; i++) {
    const num = (seed + i * 17) % 99 + 1;
    if (!luckyNumbers.includes(num)) luckyNumbers.push(num);
  }
  luckyNumbers.sort((a, b) => a - b);

  luckyColors = [
    colorPool[seed % colorPool.length],
    colorPool[(seed + 4) % colorPool.length]
  ];

  energyScore = 65 + (seed % 31); // 65 to 95

  if (type === 'day') {
    content = `დღეს თქვენი მმართველი პლანეტა ${ruler} ქმნის ჰარმონიულ ასპექტს თქვენს ნიშანთან, რაც ზრდის თქვენს სასიცოცხლო ენერგიას. ${element}-ის სტიქია გეხმარებათ მიზნების მკაფიოდ დანახვაში. იდეალური დროა მნიშვნელოვანი გადაწყვეტილებების მისაღებად და ახალი იდეების გასაზიარებლად. მოერიდეთ ზედმეტ კამათს შუადღისას.`;
    love = `პირად ცხოვრებაში კოსმოსური ტრანზიტები სასიამოვნო სიურპრიზებს გპირდებათ. პარტნიორთან ურთიერთობაში სითბო და გაგება სუფევს. თუ მარტოხელა ხართ, მოულოდნელი შეხვედრა შესაძლოა ახალი ნაპერწკლის დასაწყისი გახდეს.`;
    career = `პროფესიულ ასპარეზზე თქვენი აქტიურობა გამოიღებს შედეგს. ფინანსური კუთხით მოსალოდნელია მცირე წინსვლა ან საინტერესო თანამშრომლობის შეთავაზება. იყავით ყურადღებიანი დეტალების მიმართ.`;
    health = `ჯანმრთელობის მხრივ დღე ხელსაყრელია. შეინარჩუნეთ აქტიური ცხოვრების წესი, თუმცა მოერიდეთ გადაღლას. სასარგებლოა მეტი დროის გატარება სუფთა ჰაერზე.`;
  } else if (type === 'week') {
    content = `ეს კვირა აღინიშნება მნიშვნელოვანი პლანეტარული გადასვლებით. თქვენი ნიშნისთვის იხსნება ახალი შესაძლებლობების პორტალი. განსაკუთრებით კვირის შუა რიცხვებში, იგრძნობთ კრეატიული ენერგიის მოზღვავებას, რაც დაგეხმარებათ დიდი ხნის გაჭიანურებული საქმეების მოგვარებაში.`;
    love = `სასიყვარულო სფერო ამ კვირაში ემოციურ სიღრმეს შეიძენს. მნიშვნელოვანია იყოთ ღია გულწრფელი საუბრებისთვის. ვარსკვლავები გირჩევენ მეტი ყურადღება დაუთმოთ საყვარელი ადამიანის საჭიროებებს.`;
    career = `კარიერულ წინსვლას განსაზღვრავს თქვენი ორგანიზებულობა. შესაძლოა შეგხვდეთ ახალი პროექტი, რაც თქვენს ავტორიტეტს გუნდში საგრძნობლად გაზრდის. ფინანსური ტრანზაქციები წარმატებული იქნება კვირის მეორე ნახევარში.`;
    health = `საჭიროა ენერგიის სწორად გადანაწილება. ნუ უგულებელყოფთ ძილის რეჟიმს და ეცადეთ განთავისუფლდეთ სტრესული ფიქრებისგან მედიტაციით ან სპორტით.`;
  } else if (type === 'month') {
    content = `ამ თვის განმავლობაში ${ruler}-ის გავლენა განსაკუთრებით ძლიერია. ეს პერიოდი გიბიძგებთ პიროვნული ტრანსფორმაციისა და შინაგანი ძიებისკენ. ${element}-ის ენერგეტიკა მიგითითებთ, რომ დროა დაასრულოთ ის, რაც უკვე აღარ გემსახურებათ და ადგილი დაუთმოთ ახალ წამოწყებებს.`;
    love = `თვეს მოაქვს გაგება და ემოციური სტაბილურობა. წყვილებისთვის კარგი დროა სამომავლო გეგმების დასასახავად. მარტოხელა ნიშნებს კი ვარსკვლავები ურჩევენ, ყურადღება მიაქციონ მეგობრულ წრეს.`;
    career = `პროფესიული ზრდა და ფინანსური კეთილდღეობა იქნება წინა პლანზე. მიიღებთ აღიარებას გაწეული შრომისთვის. კარგი თვეა გრძელვადიანი ინვესტიციების დასაგეგმად და თამამი იდეების პრეზენტაციისთვის.`;
    health = `ყურადღება მიაქციეთ იმუნიტეტის გაძლიერებას და სწორ კვებას. გირჩევთ დაიწყოთ დღე მსუბუქი ვარჯიშით და შეამციროთ კოფეინის მიღება.`;
  } else {
    // year
    content = `ეს წელი თქვენთვის აღმოჩნდება მნიშვნელოვანი მიღწევებისა და გარდამტეხი მომენტების პერიოდი. იუპიტერისა და სატურნის ერთობლივი გავლენა გაძლევთ როგორც გაფართოების, ისე სტაბილური საძირკვლის ჩაყრის შანსს. თქვენი ${element}-ის ბუნება გამოავლენს საუკეთესო ლიდერულ თვისებებს.`;
    love = `წელი დატვირთული იქნება როგორც რომანტიკული თავგადასავლებით, ასევე სერიოზული გადაწყვეტილებებით. ბევრი თქვენგანისთვის მოსალოდნელია ურთიერთობის ახალ ეტაპზე გადასვლა. გულწრფელობა იქნება თქვენი უმთავრესი იარაღი.`;
    career = `კარიერულ ასპარეზზე გელით დიდი ნახტომი. შესაძლოა შეიცვალოთ საქმიანობის სფერო ან დაიკავოთ წამყვანი პოზიცია. ფინანსური კუთხით წელი გაცილებით სტაბილური და პროდუქტიული იქნება, ვიდრე წინა.`;
    health = `ჯანმრთელობის კუთხით უმჯობესია ფოკუსირება მოახდინოთ ცხოვრების ჯანსაღი წესის დამკვიდრებაზე. რეგულარული დასვენება და სუფთა ეკოლოგიური გარემო დაგეხმარებათ შეინარჩუნოთ შესანიშნავი ტონუსი მთელი წლის მანძილზე.`;
  }

  return {
    sign,
    type,
    period,
    content,
    love,
    career,
    health,
    luckyNumbers,
    luckyColors,
    energyScore,
    updatedAt: new Date().toISOString()
  };
}
