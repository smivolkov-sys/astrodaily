import express from 'express';
import dotenv from 'dotenv';
import { ZODIAC_SIGNS } from '../src/types.js'; // Путь изменен на ../
import * as forecastsDb from '../src/db/forecastsDb.js'; // Путь изменен на ../
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

// Логика Gemini
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key.trim() !== '') {
      aiClient = new GoogleGenAI({ apiKey: key });
    }
  }
  return aiClient;
}

// --- ВАШИ МАРШРУТЫ (API) ---

app.get('/api/forecast', async (req, res) => {
  const { sign, type, period } = req.query as { sign: string; type: string; period: string };
  if (!sign || !type || !period) return res.status(400).json({ error: 'Missing parameters' });
  
  const record = forecastsDb.getForecast(sign, type, period);
  return res.json(record);
});

app.post('/api/automate-forecasts', async (req, res) => {
  const { type, period } = req.body;
  // ... (здесь ваша логика generateAllSignsForecast)
  return res.json({ status: 'success' });
});

app.get('/api/compatibility', (req, res) => {
  // ... (ваша логика совместимости)
  return res.json({ message: "Compatibility data" });
});

app.post('/api/natal-chart', (req, res) => {
  // ... (ваша логика натальной карты)
  return res.json({ name: "data" });
});

// !!! ЭКСПОРТ ДЛЯ VERCEL !!!
export default app;
