"use client"

import { useEffect, useState } from "react"
import Button from "./Button"

export const WakeupBackend = () => {
  const [href, setHref] = useState<string | null>(null)

  useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_BACKEND_URL +
      "?from=" +
      encodeURIComponent(window.location.href)

    setHref(url)
  }, [])

  if (!href) return null // or a skeleton / loader

  return (
    <div className="mb-6 flex flex-col items-center justify-center gap-2">
      <span>Please wakeup the backend before using it</span>
      <Button href={href} className="w-fit">
        Wakeup the Backend
      </Button>
    </div>
  )
}
