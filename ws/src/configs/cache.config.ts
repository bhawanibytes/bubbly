import { createClient } from "redis"
import { env } from "./env.config"

const cache = createClient({
  url: env.REDIS_URL,
})

cache.on("error", (err) => console.error("Redis Client Error", err))
;(async () => {
  await cache.connect()
  console.log("Cache Connected")
})()

export default cache
