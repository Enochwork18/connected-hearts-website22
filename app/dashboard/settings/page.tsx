"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Bell, Mail, MessageSquare, Calendar } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    newsletterUpdates: true,
    marketingEmails: false,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // TODO: Integrate with API to save settings
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your notification preferences and account settings</p>
      </div>

      <div className="grid gap-6">
        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Choose how you want to receive updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="email-notifications" className="text-base">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="sms-notifications" className="text-base">
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                </div>
              </div>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="booking-reminders" className="text-base">
                    Booking Reminders
                  </Label>
                  <p className="text-sm text-muted-foreground">Get reminders before your scheduled sessions</p>
                </div>
              </div>
              <Switch
                id="booking-reminders"
                checked={settings.bookingReminders}
                onCheckedChange={(checked) => setSettings({ ...settings, bookingReminders: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="newsletter-updates" className="text-base">
                    Newsletter Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive our monthly newsletter with tips and insights</p>
                </div>
              </div>
              <Switch
                id="newsletter-updates"
                checked={settings.newsletterUpdates}
                onCheckedChange={(checked) => setSettings({ ...settings, newsletterUpdates: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <Label htmlFor="marketing-emails" className="text-base">
                    Marketing Emails
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
                </div>
              </div>
              <Switch
                id="marketing-emails"
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => setSettings({ ...settings, marketingEmails: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Control your privacy and data preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Download Your Data</p>
                <p className="text-sm text-muted-foreground">Get a copy of all your data</p>
              </div>
              <Button variant="outline">Download</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    </div>
  )
}
