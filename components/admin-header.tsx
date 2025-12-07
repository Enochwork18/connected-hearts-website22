"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu } from "@/components/icons"
import { ThemeToggleAdvanced } from "@/components/theme-toggle-advanced"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card transition-colors">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            {/* LOGO PLACEHOLDER */}
            <Image
              src="/placeholder-logo.svg"
              alt="Connected Hearts Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-xl font-heading font-bold text-foreground">
              Connected Hearts Admin
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggleAdvanced variant="dropdown" />
          <Button variant="outline" asChild className="border-primary text-primary bg-transparent">
            <Link href="/">View Site</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
