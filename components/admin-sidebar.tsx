"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
  Calendar,
  CreditCard,
  ImageIcon,
  Users,
  Mail,
  FolderOpen,
} from "@/components/icons"

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/contacts", label: "Contact Submissions", icon: Mail },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block w-64 border-r border-[#A8D5BA]/30 dark:border-[#303030] bg-white dark:bg-[#1E1E1E] transition-colors">
      <nav className="space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#A8D5BA]/20 dark:bg-[#8CC9A8]/20 text-[#2D5F4F] dark:text-[#8CC9A8]"
                  : "text-[#2C3E50] dark:text-[#E5E5E5] hover:bg-[#A8D5BA]/10 dark:hover:bg-[#303030] hover:text-[#2D5F4F] dark:hover:text-[#8CC9A8]",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
