import express from 'express';
import { Redis } from '@upstash/redis';

const app = express();
app.use(express.json());

const redis = Redis.fromEnv();

app.get('/api/forecast', async (req, res) => {
  const { sign, type, period } = req.query as { sign: string; type: string; period: string };
  
  if (!sign || !type || !period) return res.status(400).json({ error: 'Missing parameters' });

  try {
    const key = `forecast:${type}:${period}`;
    const data: any = await redis.get(key);
    
    if (!data) {
      return res.status(404).json({ error: "No data found" });
    }
    
    const allRecords = typeof data === 'string' ? JSON.parse(data) : data;
    const record = Array.isArray(allRecords) ? allRecords.find((r: any) => r.sign === sign) : null;
    
    return record ? res.json(record) : res.status(404).json({ error: "Sign not found" });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

export default app;
