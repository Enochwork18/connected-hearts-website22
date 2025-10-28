"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "@/components/icons"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#A8D5BA]/30 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/admin/dashboard" className="text-xl font-heading font-bold text-[#2D5F4F]">
            Connected Hearts Admin
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild className="border-[#2A7F7F] text-[#2A7F7F] bg-transparent">
            <Link href="/">View Site</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
