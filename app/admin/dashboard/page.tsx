import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Briefcase, MessageSquare, Calendar, Users, Mail } from "lucide-react"
import { services, blogPosts, testimonials } from "@/lib/mock-data"

export default function AdminDashboard() {
  // Mock statistics from mock data
  const stats = [
    {
      title: "Total Blog Posts",
      value: blogPosts.length,
      icon: FileText,
      color: "text-[#2A7F7F]",
    },
    {
      title: "Active Services",
      value: services.length,
      icon: Briefcase,
      color: "text-[#2D5F4F]",
    },
    {
      title: "Testimonials",
      value: testimonials.length,
      icon: MessageSquare,
      color: "text-[#2A7F7F]",
    },
    {
      title: "Pending Bookings",
      value: 0,
      icon: Calendar,
      color: "text-[#2D5F4F]",
    },
    {
      title: "Subscribers",
      value: 0,
      icon: Users,
      color: "text-[#2A7F7F]",
    },
    {
      title: "Contact Submissions",
      value: 0,
      icon: Mail,
      color: "text-[#2D5F4F]",
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-[#2D5F4F]">Dashboard</h1>
        <p className="text-[#2C3E50] mt-2">Welcome to your admin panel</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-[#A8D5BA]/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#2C3E50]">{stat.title}</CardTitle>
                <Icon className={cn("h-5 w-5", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#2D5F4F]">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8">
        <Card className="border-[#A8D5BA]/30">
          <CardHeader>
            <CardTitle className="text-[#2D5F4F]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#2C3E50]">
              This is a UI-only admin panel. Backend functionality will be implemented in the future.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
