import { createClient } from "redis";
import { redisUrl } from "./env.config.js";

const cache = createClient({
  url: redisUrl,
});

cache.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await cache.connect();
  console.log("Cache Connected");
})();

export default cache;
