import express from 'express';
import { Redis } from '@upstash/redis';

const app = express();
app.use(express.json());

const redis = Redis.fromEnv();

app.get('/api/forecast', async (req, res) => {
  const { sign, type, period } = req.query;
  
  // Если нет параметров, сразу выходим
  if (!sign || !type || !period) return res.status(400).json({ error: "Missing params" });

  try {
    // Получаем данные ТОЛЬКО из Redis
    const data = await redis.get(`forecast:${type}:${period}`);
    
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }

    // Возвращаем результат сразу
    const records = typeof data === 'string' ? JSON.parse(data) : data;
    const record = Array.isArray(records) ? records.find((r: any) => r.sign === sign) : null;
    
    return record ? res.json(record) : res.status(404).json({ error: "Sign not found" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

export default app;
