"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { bookingAPI, paymentAPI, downloadICS, type Booking } from "@/lib/services/api"
import { services } from "@/lib/mock-data"
import { useAuth } from "@/lib/contexts/auth-context"
import {
  Calendar,
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle2,
  Loader2,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Image from "next/image"

type Step = 1 | 2 | 3 | 4

export default function BookingPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [completedBooking, setCompletedBooking] = useState<Booking | null>(null)

  // Step 1: Service Selection & Date/Time
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  // Step 2: Client Information
  const [clientInfo, setClientInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    notes: "",
    acceptTerms: false,
  })

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"paystack" | "flutterwave">("paystack")

  const selectedServiceData = services.find((s) => s.id.toString() === selectedService)

  const handleStep1Next = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      setError("Please select a service, date, and time")
      return
    }
    setError("")
    setCurrentStep(2)
  }

  const handleStep2Next = () => {
    if (!clientInfo.name || !clientInfo.email || !clientInfo.phone) {
      setError("Please fill in all required fields")
      return
    }
    if (!clientInfo.acceptTerms) {
      setError("Please accept the terms and conditions")
      return
    }
    setError("")
    setCurrentStep(3)
  }

  const handlePayment = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Create booking first
      const booking = await bookingAPI.create({
        userId: user?.id || "guest",
        serviceId: selectedService,
        serviceName: selectedServiceData?.title || "",
        date: selectedDate,
        time: selectedTime,
        clientName: clientInfo.name,
        clientEmail: clientInfo.email,
        clientPhone: clientInfo.phone,
        notes: clientInfo.notes,
        amount: 75, // Mock amount
        paymentMethod,
      })

      // Create payment session
      const paymentSession =
        paymentMethod === "paystack"
          ? await paymentAPI.createPaystackSession({
              amount: 75,
              email: clientInfo.email,
              bookingId: booking.id,
            })
          : await paymentAPI.createFlutterwaveSession({
              amount: 75,
              email: clientInfo.email,
              bookingId: booking.id,
            })

      // In a real app, redirect to payment URL
      // window.location.href = paymentSession.paymentUrl

      // For demo, simulate successful payment
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await paymentAPI.verifyPayment(paymentSession.reference)

      // Get updated booking
      const updatedBooking = await bookingAPI.getUserBookings(user?.id || "guest")
      const finalBooking = updatedBooking.find((b) => b.id === booking.id)

      setCompletedBooking(finalBooking || booking)
      setCurrentStep(4)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                currentStep >= step
                  ? "border-[#2A7F7F] bg-[#2A7F7F] text-white dark:border-teal-500 dark:bg-teal-600"
                  : "border-gray-300 bg-white text-gray-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400"
              }`}
            >
              {currentStep > step ? <CheckCircle2 className="h-5 w-5" /> : step}
            </div>
            {step < 3 && <div className={`h-1 w-16 md:w-24 ${currentStep > step ? "bg-[#2A7F7F] dark:bg-teal-600" : "bg-gray-300 dark:bg-slate-600"}`} />}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-8 md:gap-16">
        <span className={`text-sm ${currentStep >= 1 ? "text-[#2A7F7F] dark:text-teal-400 font-semibold" : "text-gray-400 dark:text-slate-500"}`}>
          Select Service
        </span>
        <span className={`text-sm ${currentStep >= 2 ? "text-[#2A7F7F] dark:text-teal-400 font-semibold" : "text-gray-400 dark:text-slate-500"}`}>
          Your Details
        </span>
        <span className={`text-sm ${currentStep >= 3 ? "text-[#2A7F7F] dark:text-teal-400 font-semibold" : "text-gray-400 dark:text-slate-500"}`}>
          Payment
        </span>
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-[#2D5F4F] dark:text-white mb-4">Select a Service</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {services
            .filter((s) => s.featured)
            .map((service) => (
              <Card
                key={service.id}
                className={`cursor-pointer transition-all hover-lift dark:bg-slate-800 dark:border-slate-700 ${
                  selectedService === service.id.toString() ? "ring-2 ring-[#2A7F7F] dark:ring-teal-500" : ""
                }`}
                onClick={() => setSelectedService(service.id.toString())}
              >
                <CardHeader>
                  <div className="relative h-32 w-full mb-4 rounded-md overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="dark:border-slate-600">{service.duration}</Badge>
                    <span className="font-semibold text-[#2A7F7F] dark:text-teal-400">£75</span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="date">Select Date</Label>
          <Input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="mt-2"
          />
        </div>
        <div>
          <Label htmlFor="time">Select Time</Label>
          <select
            id="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Choose a time</option>
            <option value="09:00">09:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="13:00">01:00 PM</option>
            <option value="14:00">02:00 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="16:00">04:00 PM</option>
          </select>
        </div>
      </div>

      <div className="bg-[#CFEAFB]/20 dark:bg-teal-900/20 p-4 rounded-lg">
        <p className="text-sm text-[#2C3E50] dark:text-slate-300">
          <strong>Note:</strong> Sessions are conducted via video call (Zoom) or phone. You'll receive a confirmation
          email with the meeting link after booking.
        </p>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-[#2D5F4F] dark:text-white mb-4">Your Information</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="name">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <div className="relative mt-2">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={clientInfo.name}
              onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={clientInfo.email}
              onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="phone">
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <div className="relative mt-2">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="+44 7958 709238"
            value={clientInfo.phone}
            onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Tell us anything that might help us prepare for your session..."
          value={clientInfo.notes}
          onChange={(e) => setClientInfo({ ...clientInfo, notes: e.target.value })}
          className="mt-2 min-h-[100px]"
        />
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={clientInfo.acceptTerms}
          onCheckedChange={(checked) => setClientInfo({ ...clientInfo, acceptTerms: checked as boolean })}
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
          I accept the{" "}
          <a href="/legal/terms" className="text-[#2A7F7F] hover:underline" target="_blank" rel="noreferrer">
            terms and conditions
          </a>{" "}
          and{" "}
          <a href="/legal/privacy" className="text-[#2A7F7F] hover:underline" target="_blank" rel="noreferrer">
            privacy policy
          </a>
        </label>
      </div>

      <div className="bg-[#F5F3EE] dark:bg-slate-800 p-4 rounded-lg">
        <h3 className="font-semibold text-[#2D5F4F] dark:text-white mb-2">Booking Summary</h3>
        <div className="space-y-2 text-sm dark:text-slate-300">
          <div className="flex justify-between">
            <span>Service:</span>
            <span className="font-medium">{selectedServiceData?.title}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span className="font-medium">{selectedTime}</span>
          </div>
          <div className="flex justify-between border-t dark:border-slate-600 pt-2 mt-2">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-[#2A7F7F] dark:text-teal-400">£75.00</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold text-[#2D5F4F] dark:text-white mb-4">Payment Method</h2>

      <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as typeof paymentMethod)}>
        <Card className={`cursor-pointer dark:bg-slate-800 dark:border-slate-700 ${paymentMethod === "paystack" ? "ring-2 ring-[#2A7F7F] dark:ring-teal-500" : ""}`}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-4">
            <RadioGroupItem value="paystack" id="paystack" />
            <div className="flex-1">
              <Label htmlFor="paystack" className="cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Paystack</h3>
                    <p className="text-sm text-muted-foreground">Pay securely with card via Paystack</p>
                  </div>
                  <CreditCard className="h-6 w-6 text-[#2A7F7F]" />
                </div>
              </Label>
            </div>
          </CardHeader>
        </Card>

        <Card className={`cursor-pointer dark:bg-slate-800 dark:border-slate-700 ${paymentMethod === "flutterwave" ? "ring-2 ring-[#2A7F7F] dark:ring-teal-500" : ""}`}>
          <CardHeader className="flex flex-row items-center space-x-4 pb-4">
            <RadioGroupItem value="flutterwave" id="flutterwave" />
            <div className="flex-1">
              <Label htmlFor="flutterwave" className="cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Flutterwave</h3>
                    <p className="text-sm text-muted-foreground">Pay securely with card via Flutterwave</p>
                  </div>
                  <CreditCard className="h-6 w-6 text-[#2A7F7F]" />
                </div>
              </Label>
            </div>
          </CardHeader>
        </Card>
      </RadioGroup>

      <div className="bg-[#F5F3EE] dark:bg-slate-800 p-6 rounded-lg">
        <h3 className="font-semibold text-[#2D5F4F] dark:text-white mb-4">Order Summary</h3>
        <div className="space-y-3 text-sm dark:text-slate-300">
          <div className="flex justify-between">
            <span>{selectedServiceData?.title}</span>
            <span>£75.00</span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground dark:text-slate-400">
            <span>
              {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
            </span>
          </div>
          <div className="border-t dark:border-slate-600 pt-3 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-[#2A7F7F] dark:text-teal-400">£75.00</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
        <p className="text-sm text-blue-900 dark:text-blue-300">
          <strong>Secure Payment:</strong> Your payment information is encrypted and secure. You'll be redirected to{" "}
          {paymentMethod === "paystack" ? "Paystack" : "Flutterwave"} to complete your payment.
        </p>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-6">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-heading font-bold text-[#2D5F4F] dark:text-white mb-2">Booking Confirmed!</h2>
        <p className="text-muted-foreground dark:text-slate-300">Your session has been successfully booked</p>
      </div>

      {completedBooking && (
        <Card className="text-left dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Booking Details</CardTitle>
            <CardDescription className="dark:text-slate-400">Booking ID: {completedBooking.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(completedBooking.date).toLocaleDateString()} at {completedBooking.time}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Service</p>
                  <p className="text-sm text-muted-foreground">{completedBooking.serviceName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">Sent to {completedBooking.clientEmail}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <Button onClick={() => downloadICS(completedBooking)} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Add to Calendar
              </Button>
              <Button
                onClick={() => router.push("/dashboard/bookings")}
                className="w-full bg-[#2A7F7F] hover:bg-[#2D5F4F]"
              >
                View My Bookings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="bg-[#CFEAFB]/20 dark:bg-teal-900/20 p-4 rounded-lg text-sm text-left">
        <p className="font-semibold text-[#2D5F4F] dark:text-white mb-2">What's Next?</p>
        <ul className="space-y-1 text-muted-foreground dark:text-slate-300">
          <li>• You'll receive a confirmation email with the meeting link</li>
          <li>• A reminder will be sent 24 hours before your session</li>
          <li>• If you need to reschedule, please contact us at least 24 hours in advance</li>
        </ul>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3EE] to-white dark:from-slate-900 dark:to-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {currentStep < 4 && (
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-heading font-bold text-[#2D5F4F] dark:text-white mb-2">Book Your Session</h1>
              <p className="text-muted-foreground dark:text-slate-300">Complete the steps below to schedule your consultation</p>
            </div>
          )}

          {currentStep < 4 && renderStepIndicator()}

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="pt-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              {currentStep < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep((prev) => (prev - 1) as Step)}
                      disabled={isLoading}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  )}
                  <div className={currentStep === 1 ? "ml-auto" : ""}>
                    {currentStep === 1 && (
                      <Button onClick={handleStep1Next} className="bg-[#2A7F7F] hover:bg-[#2D5F4F]">
                        Continue
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {currentStep === 2 && (
                      <Button onClick={handleStep2Next} className="bg-[#2A7F7F] hover:bg-[#2D5F4F]">
                        Continue to Payment
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                    {currentStep === 3 && (
                      <Button onClick={handlePayment} disabled={isLoading} className="bg-[#2A7F7F] hover:bg-[#2D5F4F]">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Complete Payment
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
