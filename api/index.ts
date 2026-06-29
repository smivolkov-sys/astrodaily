import express from 'express';
import dotenv from 'dotenv';
import { Redis } from '@upstash/redis';

dotenv.config();

const app = express();
app.use(express.json());

const redis = Redis.fromEnv();

// --- ФУНКЦИИ РАБОТЫ С БАЗОЙ ---
async function saveForecasts(type: string, period: string, records: any) {
  const key = `forecast:${type}:${period}`;
  await redis.set(key, JSON.stringify(records));
}

async function getForecastFromDb(sign: string, type: string, period: string) {
  const key = `forecast:${type}:${period}`;
  const data: any = await redis.get(key);
  
  if (!data) return null;
  
  // Данные в Redis уже могут быть объектом, если используете JSON
  const allRecords = typeof data === 'string' ? JSON.parse(data) : data;
  
  // Если allRecords - это массив, ищем знак
  if (Array.isArray(allRecords)) {
    return allRecords.find((r: any) => r.sign === sign);
  }
  return null;
}

// --- МАРШРУТЫ ---

// Быстрый эндпоинт для получения прогноза
app.get('/api/forecast', async (req, res) => {
  const { sign, type, period } = req.query as { sign: string; type: string; period: string };
  
  if (!sign || !type || !period) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const record = await getForecastFromDb(sign, type, period);
    
    if (!record) {
      // МГНОВЕННЫЙ ОТВЕТ, чтобы избежать таймаута
      return res.status(404).json({ 
        error: "Forecast not found", 
        message: "Please run automation first to populate the database." 
      });
    }
    return res.json(record);
  } catch (err) {
    console.error("Redis Error:", err);
    return res.status(500).json({ error: 'Database connection error' });
  }
});

// Эндпоинт для администратора (заполнение базы)
app.post('/api/automate-forecasts', async (req, res) => {
  const { type, period, records } = req.body;
  
  if (!type || !period || !records) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  try {
    await saveForecasts(type, period, records);
    return res.json({ status: 'success', message: 'Forecasts saved' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save to Redis' });
  }
});

export default app;
