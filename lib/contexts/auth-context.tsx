"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authAPI, type User } from "@/lib/services/api"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, phone?: string) => Promise<void>
  adminLogin: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      console.log("[v0] Auth Context - Loading user from token...")
      try {
        const token = localStorage.getItem("auth_token")
        if (token) {
          console.log("[v0] Auth Context - Token found, fetching user...")
          const currentUser = await authAPI.getCurrentUser(token)
          console.log("[v0] Auth Context - User loaded:", { email: currentUser.email, role: currentUser.role })
          setUser(currentUser)
        } else {
          console.log("[v0] Auth Context - No token found")
        }
      } catch (error) {
        console.error("[v0] Auth Context - Failed to load user:", error)
        localStorage.removeItem("auth_token")
      } finally {
        setIsLoading(false)
        console.log("[v0] Auth Context - Loading complete")
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    console.log("[v0] Auth Context - User login attempt:", email)
    const { user, token } = await authAPI.login({ email, password })
    localStorage.setItem("auth_token", token)
    setUser(user)
    console.log("[v0] Auth Context - User login successful:", { email: user.email, role: user.role })
  }

  const signup = async (email: string, password: string, name: string, phone?: string) => {
    console.log("[v0] Auth Context - User signup attempt:", email)
    const { user, token } = await authAPI.signup({ email, password, name, phone })
    localStorage.setItem("auth_token", token)
    setUser(user)
    console.log("[v0] Auth Context - User signup successful:", { email: user.email, role: user.role })
  }

  const adminLogin = async (email: string, password: string) => {
    console.log("[v0] Auth Context - Admin login attempt:", email)
    const { user, token } = await authAPI.adminLogin({ email, password })
    localStorage.setItem("auth_token", token)
    setUser(user)
    console.log("[v0] Auth Context - Admin login successful:", { email: user.email, role: user.role })
  }

  const logout = () => {
    console.log("[v0] Auth Context - Logging out user:", user?.email)
    authAPI.logout()
    setUser(null)
    console.log("[v0] Auth Context - Logout complete")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        signup,
        adminLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
