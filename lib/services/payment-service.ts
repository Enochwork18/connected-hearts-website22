/**
 * Payment Service - Mock Implementation
 * 
 * This module provides a payment abstraction layer that can be easily
 * swapped with real payment providers (Stripe, Paystack, PayPal, etc.)
 * 
 * Architecture:
 * - Provider-agnostic interface
 * - Idempotency key support for safe retries
 * - State management for payment lifecycle
 * - Webhook simulation for async payment updates
 * 
 * TODO for production:
 * 1. Replace mock functions with real provider SDK calls
 * 2. Move API keys to secure backend environment
 * 3. Implement webhook signature verification
 * 4. Add server-side payment confirmation
 * 5. Enable PCI-compliant payment form handling
 */

export type PaymentProvider = "stripe" | "paystack" | "paypal" | "mock"

export type PaymentStatus = 
  | "idle" 
  | "processing" 
  | "requires_action" 
  | "succeeded" 
  | "failed" 
  | "canceled" 
  | "refunded"

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: PaymentStatus
  clientSecret?: string
  provider: PaymentProvider
  metadata: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface PaymentMethod {
  id: string
  type: "card" | "bank_transfer" | "mobile_money"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
}

export interface CreatePaymentIntentParams {
  amount: number
  currency?: string
  provider?: PaymentProvider
  metadata?: Record<string, any>
  idempotencyKey?: string
}

export interface ConfirmPaymentParams {
  paymentIntentId: string
  paymentMethod: Partial<PaymentMethod>
  idempotencyKey?: string
}

export interface PaymentError {
  code: string
  message: string
  type: "validation_error" | "card_error" | "api_error" | "network_error"
}

// In-memory storage for mock (replace with backend API calls)
const mockPaymentIntents = new Map<string, PaymentIntent>()
const processedIdempotencyKeys = new Map<string, string>() // key -> paymentIntentId

/**
 * Generate idempotency key for safe retries
 * In production, generate on client and send to backend
 */
export function generateIdempotencyKey(): string {
  return `idem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Simulate network delay
 */
const simulateDelay = (ms: number = 1500) => 
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * Create a payment intent
 * 
 * @param params Payment intent parameters
 * @returns Payment intent object
 * 
 * TODO: Replace with real API call:
 * POST /api/payments/create-intent
 * Headers: { 'Idempotency-Key': idempotencyKey }
 */
export async function createPaymentIntent(
  params: CreatePaymentIntentParams
): Promise<PaymentIntent> {
  await simulateDelay()

  const { amount, currency = "USD", provider = "mock", metadata = {}, idempotencyKey } = params

  // Idempotency check
  if (idempotencyKey && processedIdempotencyKeys.has(idempotencyKey)) {
    const existingId = processedIdempotencyKeys.get(idempotencyKey)!
    const existing = mockPaymentIntents.get(existingId)!
    console.log(`[Payment] Idempotent request detected, returning existing intent: ${existingId}`)
    return existing
  }

  // Validation
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0") as PaymentError
  }

  const paymentIntent: PaymentIntent = {
    id: `pi_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    currency,
    status: "idle",
    clientSecret: `pi_secret_${Math.random().toString(36).substr(2, 16)}`,
    provider,
    metadata,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockPaymentIntents.set(paymentIntent.id, paymentIntent)
  
  if (idempotencyKey) {
    processedIdempotencyKeys.set(idempotencyKey, paymentIntent.id)
  }

  console.log(`[Payment] Created intent: ${paymentIntent.id}`)
  return paymentIntent
}

/**
 * Confirm payment with payment method
 * 
 * @param params Confirmation parameters
 * @returns Updated payment intent
 * 
 * TODO: Replace with real API call:
 * POST /api/payments/confirm
 * Headers: { 'Idempotency-Key': idempotencyKey }
 */
export async function confirmPayment(
  params: ConfirmPaymentParams
): Promise<PaymentIntent> {
  await simulateDelay(2000)

  const { paymentIntentId, paymentMethod, idempotencyKey } = params

  const intent = mockPaymentIntents.get(paymentIntentId)
  if (!intent) {
    const error: PaymentError = {
      code: "payment_intent_not_found",
      message: "Payment intent not found",
      type: "validation_error",
    }
    throw error
  }

  // Idempotency check
  if (idempotencyKey && processedIdempotencyKeys.has(idempotencyKey)) {
    console.log(`[Payment] Idempotent confirm request, returning current state`)
    return intent
  }

  // Update status to processing
  intent.status = "processing"
  intent.updatedAt = new Date().toISOString()

  // Simulate payment processing (80% success rate for testing)
  const success = Math.random() > 0.2

  await simulateDelay(1000)

  if (success) {
    intent.status = "succeeded"
    console.log(`[Payment] Payment succeeded: ${paymentIntentId}`)
  } else {
    intent.status = "failed"
    intent.metadata.error = {
      code: "card_declined",
      message: "Your card was declined. Please try another payment method.",
      type: "card_error",
    }
    console.log(`[Payment] Payment failed: ${paymentIntentId}`)
  }

  intent.updatedAt = new Date().toISOString()
  
  if (idempotencyKey) {
    processedIdempotencyKeys.set(idempotencyKey, paymentIntentId)
  }

  return intent
}

/**
 * Retrieve payment intent by ID
 * 
 * TODO: Replace with: GET /api/payments/intent/:id
 */
export async function retrievePaymentIntent(
  paymentIntentId: string
): Promise<PaymentIntent | null> {
  await simulateDelay(300)
  return mockPaymentIntents.get(paymentIntentId) || null
}

/**
 * Cancel payment intent
 * 
 * TODO: Replace with: POST /api/payments/intent/:id/cancel
 */
export async function cancelPaymentIntent(
  paymentIntentId: string
): Promise<PaymentIntent> {
  await simulateDelay(500)

  const intent = mockPaymentIntents.get(paymentIntentId)
  if (!intent) {
    throw new Error("Payment intent not found")
  }

  if (intent.status === "succeeded") {
    throw new Error("Cannot cancel succeeded payment")
  }

  intent.status = "canceled"
  intent.updatedAt = new Date().toISOString()

  console.log(`[Payment] Payment canceled: ${paymentIntentId}`)
  return intent
}

/**
 * Request refund for succeeded payment
 * 
 * TODO: Replace with: POST /api/payments/refund
 */
export async function createRefund(
  paymentIntentId: string,
  amount?: number
): Promise<{ id: string; status: string; amount: number }> {
  await simulateDelay(1500)

  const intent = mockPaymentIntents.get(paymentIntentId)
  if (!intent) {
    throw new Error("Payment intent not found")
  }

  if (intent.status !== "succeeded") {
    throw new Error("Can only refund succeeded payments")
  }

  const refundAmount = amount || intent.amount

  intent.status = "refunded"
  intent.metadata.refundAmount = refundAmount
  intent.updatedAt = new Date().toISOString()

  console.log(`[Payment] Refund created: ${paymentIntentId}, amount: ${refundAmount}`)

  return {
    id: `re_mock_${Date.now()}`,
    status: "succeeded",
    amount: refundAmount,
  }
}

/**
 * Simulate webhook event (for testing)
 * In production, this comes from the payment provider
 * 
 * TODO: Implement webhook endpoint on backend:
 * POST /api/webhooks/payment
 * Verify signature, process event, update database
 */
export function simulateWebhook(
  paymentIntentId: string,
  event: "payment.succeeded" | "payment.failed"
): void {
  console.log(`[Payment Webhook] Event: ${event}, Intent: ${paymentIntentId}`)
  
  // In real implementation, backend receives this and:
  // 1. Verifies webhook signature
  // 2. Updates database
  // 3. Triggers business logic (send confirmation email, fulfill order, etc.)
}

/**
 * Payment provider configuration
 * 
 * TODO: Move to secure backend environment
 * NEVER expose API keys on frontend
 */
export const paymentConfig = {
  // Mock config (safe to commit)
  mock: {
    enabled: true,
  },
  
  // TODO: Real provider config (backend only)
  // stripe: {
  //   publicKey: process.env.STRIPE_PUBLIC_KEY,
  //   secretKey: process.env.STRIPE_SECRET_KEY, // BACKEND ONLY
  // },
  // paystack: {
  //   publicKey: process.env.PAYSTACK_PUBLIC_KEY,
  //   secretKey: process.env.PAYSTACK_SECRET_KEY, // BACKEND ONLY
  // },
}
