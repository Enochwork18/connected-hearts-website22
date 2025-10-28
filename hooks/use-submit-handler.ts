"use client"

import { useState, useCallback, useRef } from "react"

interface UseSubmitHandlerOptions {
  /**
   * Minimum time between submissions (ms)
   * Default: 1000ms (1 second)
   */
  debounceTime?: number

  /**
   * Callback when duplicate submission is attempted
   */
  onDuplicateAttempt?: () => void
}

interface SubmitState {
  isSubmitting: boolean
  isSuccess: boolean
  error: Error | null
}

/**
 * Hook to prevent duplicate form submissions and handle rapid clicks
 * 
 * Features:
 * - Prevents duplicate submissions while one is in progress
 * - Debounces rapid clicks
 * - Tracks submission state (loading, success, error)
 * - Returns safe submit handler
 * 
 * Usage:
 * ```tsx
 * const { handleSubmit, isSubmitting, isSuccess, error, reset } = useSubmitHandler({
 *   debounceTime: 1000
 * })
 * 
 * const onSubmit = handleSubmit(async (data) => {
 *   await api.submitForm(data)
 * })
 * ```
 */
export function useSubmitHandler<T = any>(options: UseSubmitHandlerOptions = {}) {
  const { debounceTime = 1000, onDuplicateAttempt } = options

  const [state, setState] = useState<SubmitState>({
    isSubmitting: false,
    isSuccess: false,
    error: null,
  })

  const lastSubmitTime = useRef<number>(0)
  const submissionInProgress = useRef<boolean>(false)

  const reset = useCallback(() => {
    setState({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    })
  }, [])

  const handleSubmit = useCallback(
    (submitFn: (data?: T) => Promise<void>) => {
      return async (data?: T) => {
        const now = Date.now()

        // Check if submission is already in progress
        if (submissionInProgress.current) {
          console.warn("[Submit] Duplicate submission blocked - request in progress")
          onDuplicateAttempt?.()
          return
        }

        // Check debounce time
        if (now - lastSubmitTime.current < debounceTime) {
          console.warn("[Submit] Duplicate submission blocked - debounce active")
          onDuplicateAttempt?.()
          return
        }

        try {
          submissionInProgress.current = true
          lastSubmitTime.current = now

          setState({
            isSubmitting: true,
            isSuccess: false,
            error: null,
          })

          await submitFn(data)

          setState({
            isSubmitting: false,
            isSuccess: true,
            error: null,
          })
        } catch (error) {
          setState({
            isSubmitting: false,
            isSuccess: false,
            error: error as Error,
          })
          throw error
        } finally {
          submissionInProgress.current = false
        }
      }
    },
    [debounceTime, onDuplicateAttempt]
  )

  return {
    handleSubmit,
    isSubmitting: state.isSubmitting,
    isSuccess: state.isSuccess,
    error: state.error,
    reset,
  }
}

/**
 * Simple debounce hook for any function
 * 
 * Usage:
 * ```tsx
 * const debouncedSearch = useDebounce(searchFunction, 500)
 * ```
 */
export function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        func(...args)
      }, delay)
    },
    [func, delay]
  )
}

/**
 * Throttle hook - ensures function is called at most once per interval
 * 
 * Usage:
 * ```tsx
 * const throttledScroll = useThrottle(handleScroll, 100)
 * ```
 */
export function useThrottle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 300
): (...args: Parameters<T>) => void {
  const inThrottle = useRef<boolean>(false)

  return useCallback(
    (...args: Parameters<T>) => {
      if (!inThrottle.current) {
        func(...args)
        inThrottle.current = true

        setTimeout(() => {
          inThrottle.current = false
        }, limit)
      }
    },
    [func, limit]
  )
}
