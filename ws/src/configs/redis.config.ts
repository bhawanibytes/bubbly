import { createClient } from 'redis';
import { redisUrl } from './env.config.js';

const cache = createClient({
  url: redisUrl
});

cache.on('error', (err) => console.error('Redis Client Error', err));

await cache.connect();

export default cache;