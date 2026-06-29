import express from 'express';
import dotenv from 'dotenv';
import { Redis } from '@upstash/redis';
import { ZODIAC_SIGNS } from '../src/types.js';

dotenv.config();

const app = express();
app.use(express.json());

// Инициализация базы данных Redis
const redis = Redis.fromEnv();

// --- ФУНКЦИИ РАБОТЫ С БАЗОЙ (Замена forecastsDb) ---
async function saveForecasts(type: string, period: string, records: any) {
  const key = `forecast:${type}:${period}`;
  await redis.set(key, JSON.stringify(records));
}

async function getForecastFromDb(sign: string, type: string, period: string) {
  const key = `forecast:${type}:${period}`;
  const data: any = await redis.get(key);
  if (!data) return null;
  
  const allRecords = typeof data === 'string' ? JSON.parse(data) : data;
  return allRecords.find((r: any) => r.sign === sign);
}

// --- МАРШРУТЫ ---

app.get('/api/forecast', async (req, res) => {
  const { sign, type, period } = req.query as { sign: string; type: string; period: string };
  if (!sign || !type || !period) return res.status(400).json({ error: 'Missing parameters' });

  try {
    const record = await getForecastFromDb(sign, type, period);
    // Если записи нет, возвращаем заглушку или обрабатываем логику fallback
    if (!record) {
      return res.json({ message: "Forecast not found, generating...", sign, type, period });
    }
    return res.json(record);
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/automate-forecasts', async (req, res) => {
  const { type, period, records } = req.body;
  try {
    await saveForecasts(type, period, records);
    return res.json({ status: 'success', message: 'Forecasts saved to Redis' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save to Redis' });
  }
});

// Экспорт для Vercel
export default app;
