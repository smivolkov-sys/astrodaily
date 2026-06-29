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
    // 1. Если пришел запрос с seed=true, принудительно записываем данные
    if (req.query.seed === 'true') {
      await redis.set(`forecast:${type}:${period}`, JSON.stringify([
        { sign: "Aries", text: "Сегодня отличный день для новых начинаний!" },
        { sign: "Taurus", text: "Вас ждет финансовый успех и стабильность." }
      ]));
    }

    // 2. Получаем данные из Redis
    const data = await redis.get(`forecast:${type}:${period}`);
    
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }

    // 3. Возвращаем результат
    const records = typeof data === 'string' ? JSON.parse(data) : data;
    const record = Array.isArray(records) ? records.find((r: any) => r.sign === sign) : null;
    
    return record ? res.json(record) : res.status(404).json({ error: "Sign not found" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

export default app;
