/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ZodiacSign {
  id: string; // e.g., 'verzi'
  nameGe: string; // e.g., 'ვერძი'
  nameLa: string; // e.g., 'Aries'
  symbol: string; // ♈
  element: 'ცეცხლი' | 'მიწა' | 'ჰაერი' | 'წყალი';
  ruler: string; // მმართველი პლანეტა
  dateRange: string; // e.g., '21 მარტი - 19 აპრილი'
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { id: 'verzi', nameGe: 'ვერძი', nameLa: 'Aries', symbol: '♈', element: 'ცეცხლი', ruler: 'მარსი', dateRange: '21 მარტი - 19 აპრილი' },
  { id: 'ku', nameGe: 'კუ', nameLa: 'Taurus', symbol: '♉', element: 'მიწა', ruler: 'ვენერა', dateRange: '20 აპრილი - 20 მაისი' },
  { id: 'tyupebi', nameGe: 'ტყუპები', nameLa: 'Gemini', symbol: '♊', element: 'ჰაერი', ruler: 'მერკური', dateRange: '21 მაისი - 20 ივნისი' },
  { id: 'kirchkhibi', nameGe: 'კირჩხიბი', nameLa: 'Cancer', symbol: '♋', element: 'წყალი', ruler: 'მთვარე', dateRange: '21 ივნისი - 22 ივლის' },
  { id: 'lomi', nameGe: 'ლომი', nameLa: 'Leo', symbol: '♌', element: 'ცეცხლი', ruler: 'მზე', dateRange: '23 ივლისი - 22 აგვისტო' },
  { id: 'qaltsuli', nameGe: 'ქალწული', nameLa: 'Virgo', symbol: '♍', element: 'მიწა', ruler: 'მერკური', dateRange: '23 აგვისტო - 22 სექტემბერი' },
  { id: 'sastsori', nameGe: 'სასწორი', nameLa: 'Libra', symbol: '♎', element: 'ჰაერი', ruler: 'ვენერა', dateRange: '23 სექტემბერი - 22 ოქტომბერი' },
  { id: 'moriele', nameGe: 'მორიელი', nameLa: 'Scorpio', symbol: '♏', element: 'წყალი', ruler: 'პლუტონი/მარსი', dateRange: '23 ოქტომბერი - 21 ნოემბერი' },
  { id: 'mshvildosani', nameGe: 'მშვილდოსანი', nameLa: 'Sagittarius', symbol: '♐', element: 'ცეცხლი', ruler: 'იუპიტერი', dateRange: '22 ნოემბერი - 21 დეკემბერი' },
  { id: 'txis_rqa', nameGe: 'თხის რქა', nameLa: 'Capricorn', symbol: '♑', element: 'მიწა', ruler: 'სატურნი', dateRange: '22 დეკემბერი - 19 იანვარი' },
  { id: 'mertsyuli', nameGe: 'მერწყული', nameLa: 'Aquarius', symbol: '♒', element: 'ჰაერი', ruler: 'ურანი/სატურნი', dateRange: '20 იანვარი - 18 თებერვალი' },
  { id: 'tevzebi', nameGe: 'თევზები', nameLa: 'Pisces', symbol: '♓', element: 'წყალი', ruler: 'ნეპტუნი/იუპიტერი', dateRange: '19 თებერვალი - 20 მარტი' }
];

export interface ForecastRecord {
  sign: string; // e.g., 'verzi'
  type: string; // 'day' | 'week' | 'month' | 'year'
  period: string; // e.g., '2026-06-21', '2026-W25', '2026-06', '2026'
  content: string; // Georgian forecast prose
  love: string; // Love aspect
  career: string; // Career aspect
  health: string; // Health aspect
  luckyNumbers: number[];
  luckyColors: string[];
  energyScore: number; // 0-100 rating
  updatedAt: string; // ISO string
}

export interface CompatibilityResponse {
  score: number;
  sign1: ZodiacSign;
  sign2: ZodiacSign;
  summary: string;
  lovePercentage: number;
  friendshipPercentage: number;
  workPercentage: number;
}

export interface NatalChartPlanet {
  planetName: string; // e.g., 'მზე', 'მთვარე', 'ასცენდენტი'
  planetLa: string; // e.g. 'Sun', 'Moon'
  signGe: string; // e.g., 'ვერძი'
  symbol: string; // Planet icon
  house: number; // 1-12
  description: string; // Detailed astrological description in Georgian
}

export interface NatalChartResponse {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  planets: NatalChartPlanet[];
}
