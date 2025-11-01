import type { Metadata } from "next"
import ServicesClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Our Services - Faith-Based Coaching",
  description:
    "Comprehensive faith-based coaching services including marriage counseling, pre-marital coaching, family therapy, parenting support, and personal development workshops.",
}

export default function ServicesPage() {
  return <ServicesClientPage />
}
