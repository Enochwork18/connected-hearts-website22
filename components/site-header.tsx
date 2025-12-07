"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut, Shield } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/contexts/auth-context"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80 shadow-sm transition-colors">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          {/* LOGO PLACEHOLDER */}
          <Image
            src="/placeholder-logo.svg"
            alt="Connected Hearts Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl font-heading font-bold text-[#2D5F4F] dark:text-[#A8D5BA]">Ìbáṣepọ̀</span>
            <span className="text-sm text-[#2A7F7F] dark:text-[#2A7F7F]">Connected Hearts</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#2A7F7F] dark:hover:text-[#A8D5BA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A7F7F] focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${
                  isActive
                    ? "text-[#2A7F7F] dark:text-[#A8D5BA] font-semibold border-b-2 border-[#2A7F7F] dark:border-[#A8D5BA]"
                    : "text-[#2C3E50] dark:text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
          <Button asChild className="bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
            <Link href="/booking">Book a Session</Link>
          </Button>

          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-[#A8D5BA]/30">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">My Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/bookings">My Bookings</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Login</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border-[#A8D5BA]/30">
                <DropdownMenuItem asChild>
                  <Link href="/login" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    User Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/login" className="cursor-pointer">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Login
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#2C3E50]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t bg-white lg:hidden">
          <div className="container mx-auto space-y-1 px-4 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium hover:bg-[#F5F3EE] ${
                    isActive ? "bg-[#A8D5BA]/20 text-[#2A7F7F] font-semibold" : "text-[#2C3E50]"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
            <Button asChild className="w-full bg-[#2A7F7F] hover:bg-[#2D5F4F] text-white">
              <Link href="/booking" onClick={() => setMobileMenuOpen(false)}>
                Book a Session
              </Link>
            </Button>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#2C3E50] hover:bg-[#F5F3EE]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block rounded-md px-3 py-2 text-base font-medium text-[#2D5F4F] hover:bg-[#F5F3EE]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-[#F5F3EE]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#2C3E50] hover:bg-[#F5F3EE]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  User Login
                </Link>
                <Link
                  href="/admin/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#2D5F4F] hover:bg-[#F5F3EE] font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
