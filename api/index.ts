import express from 'express';
import { Redis } from '@upstash/redis';

const app = express();
app.use(express.json());

const redis = Redis.fromEnv();

// --- API МАРШРУТЫ ---

app.get('/api/forecast', async (req, res) => {
  const { sign, type, period } = req.query as { sign: string; type: string; period: string };
  
  try {
    // Читаем ТОЛЬКО из Redis, никаких fs (file system)
    const data: any = await redis.get(`forecast:${type}:${period}`);
    
    if (!data) return res.status(404).json({ error: "Data not found" });
    
    const records = typeof data === 'string' ? JSON.parse(data) : data;
    const record = Array.isArray(records) ? records.find((r: any) => r.sign === sign) : null;
    
    return record ? res.json(record) : res.status(404).json({ error: "Sign not found" });
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
});

// Только этот метод пишет в Redis
app.post('/api/automate-forecasts', async (req, res) => {
  const { type, period, records } = req.body;
  try {
    await redis.set(`forecast:${type}:${period}`, JSON.stringify(records));
    return res.json({ status: 'success' });
  } catch (err) {
    return res.status(500).json({ error: 'Save error' });
  }
});

export default app;
