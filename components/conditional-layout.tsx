"use client"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Check if we're on a dashboard, admin, or auth page
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin")
  const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password" || pathname === "/admin/login"

  if (isDashboard || isAuthPage) {
    // Don't show header/footer on dashboard or auth pages - they have their own minimal layout
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
