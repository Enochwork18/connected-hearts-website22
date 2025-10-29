"use client"

import { useEffect, useState } from "react"

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    async function initMSW() {
      if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('@/lib/mocks/browser')
        await worker.start({
          onUnhandledRequest: 'bypass',
        })
        console.log('[MSW] Mock API ready')
      }
      setMswReady(true)
    }

    initMSW()
  }, [])

  // In development, wait for MSW to be ready
  if (process.env.NODE_ENV === 'development' && !mswReady) {
    return null
  }

  return <>{children}</>
}
