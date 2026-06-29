import { Redis } from '@upstash/redis';

// Инициализация базы данных
const redis = Redis.fromEnv();

// --- ПРИМЕР СОХРАНЕНИЯ (Замена для upsertForecasts) ---
async function saveForecast(type: string, period: string, records: any) {
  const key = `forecast:${type}:${period}`;
  await redis.set(key, JSON.stringify(records));
}

// --- ПРИМЕР ЧТЕНИЯ (Замена для getForecast) ---
async function getForecastFromDb(sign: string, type: string, period: string) {
  const key = `forecast:${type}:${period}`;
  const data: any = await redis.get(key);
  
  if (!data) return null; // Если данных нет
  
  const allRecords = typeof data === 'string' ? JSON.parse(data) : data;
  return allRecords.find((r: any) => r.sign === sign);
}
