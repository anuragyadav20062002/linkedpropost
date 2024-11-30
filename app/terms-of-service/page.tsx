'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUp, User, Shield, CreditCard, FileText, Lock, AlertTriangle, Calendar, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const sections = [
  {
    id: 'user-accounts',
    title: 'User Accounts',
    icon: User,
    content: `• Registration: Users must provide accurate and complete information.
    • Security: Users are responsible for their passwords and agree not to share accounts.
    • Termination: We reserve the right to terminate accounts if terms are violated.`
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use Policy',
    icon: Shield,
    content: `• No Misuse of Service: Users are prohibited from misusing or exploiting the app.
    • Respect for Other Users: Users must respect others' content and rights.
    • No Hacking or Interference: Hacking or attempting to disrupt the app is strictly forbidden.`
  },
  {
    id: 'payment-terms',
    title: 'Payment Terms',
    icon: CreditCard,
    content: `• Subscription Model: Users agree to recurring billing for subscriptions.
    • Payment Terms: Payments are processed on a monthly/annual basis. Refunds are subject to our refund policy.
    • Taxes and Fees: Users are responsible for all applicable taxes and fees.`
  },
  {
    id: 'content-ownership',
    title: 'Content Ownership',
    icon: FileText,
    content: `• User Content: Users retain ownership of content they create.
    • Our License to Use: By using our service, you grant us a license to display and modify your content for operational purposes.
    • Content Standards: Users must ensure their content does not violate laws or third-party rights.`
  },
  {
    id: 'privacy-security',
    title: 'Privacy and Data Security',
    icon: Lock,
    content: `• Personal Data: We are committed to protecting and responsibly handling your personal data.
    • Cookies: We use cookies to enhance your experience. By using our service, you consent to our use of cookies.
    • For more details, please refer to our Privacy Policy.`
  },
  {
    id: 'termination',
    title: 'Termination of Service',
    icon: AlertTriangle,
    content: `• Reasons for Termination: We may terminate accounts for violations of these terms, abuse, or other reasons.
    • Notice: Users will be informed prior to termination when possible.
    • Post-Termination Data: We will handle your data post-termination as outlined in our Privacy Policy.`
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    icon: Shield,
    content: `• No Warranty: Our service is provided "as-is" without any warranties.
    • Liability Limits: We are not liable for any indirect, incidental, or consequential damages.
    • Exceptions: Some jurisdictions do not allow the exclusion of certain warranties or limitations on liability.`
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    icon: Calendar,
    content: `• Modifications: We may modify these terms from time to time.
    • Notification: Users will be informed of significant changes.
    • Effective Date: Updates are effective immediately after posting.`
  }
]

export default function TermsOfServicePage() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            By using our services, you agree to these terms. Please read them carefully.
          </p>
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Terms of Service illustration"
            width={200}
            height={200}
            className="mx-auto mt-8"
          />
        </div>

        {sections.map((section, index) => (
          <div key={section.id} className={`mb-12 p-6 rounded-lg ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <section.icon className="mr-2 text-blue-600" />
              {section.title}
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
          </div>
        ))}

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Mail className="mr-2 text-blue-600" />
            Contact Us
          </h2>
          <p className="text-gray-700">
            For questions about these terms, please{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact us
            </Link>
            . We're here to help!
          </p>
        </div>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"
            aria-label="Back to top"
          >
            <ArrowUp />
          </button>
        )}
      </div>
      <Footer/>
    </div>
  )
}