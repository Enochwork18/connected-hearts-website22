"use client"

import type React from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { useAuth } from "@/lib/contexts/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "@/components/icons"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user, isAdmin } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    console.log("[v0] Admin Layout - Auth state:", {
      isAuthenticated,
      isLoading,
      userEmail: user?.email,
      userRole: user?.role,
      isAdmin,
      pathname,
      isLoginPage,
    })

    if (isLoginPage) {
      console.log("[v0] Admin Layout - Login page, skipping auth checks")
      return
    }

    if (!isLoading) {
      if (!isAuthenticated) {
        console.log("[v0] Admin Layout - Not authenticated, redirecting to /admin/login")
        router.push("/admin/login")
      } else if (user?.role !== "admin") {
        console.log("[v0] Admin Layout - User is not admin, redirecting to /")
        router.push("/")
      } else {
        console.log("[v0] Admin Layout - Admin authenticated, showing admin panel")
      }
    }
  }, [isAuthenticated, isLoading, user, router, isAdmin, pathname, isLoginPage])

  if (isLoginPage) {
    console.log("[v0] Admin Layout - Rendering login page without layout")
    return <>{children}</>
  }

  if (isLoading) {
    console.log("[v0] Admin Layout - Loading auth state...")
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal" />
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "admin") {
    console.log("[v0] Admin Layout - Access denied, showing nothing")
    return null
  }

  console.log("[v0] Admin Layout - Rendering admin layout")

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#121212] transition-colors">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 bg-[#F5F3EE] dark:bg-[#121212] p-8 transition-colors">{children}</main>
      </div>
    </div>
  )
}
