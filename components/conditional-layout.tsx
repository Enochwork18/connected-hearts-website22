"use client"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Check if we're on a dashboard or admin page
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")

  if (isDashboard) {
    // Don't show header/footer on dashboard pages - they have their own layout
    return <>{children}</>
  }

  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}
