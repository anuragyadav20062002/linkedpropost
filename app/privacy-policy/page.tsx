'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUp, Lock, Shield, UserCheck, Cookie, Calendar, Mail } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    content: `We collect various types of information to provide and improve our service to you:
    • Personal Information: Name, email address, profile details, and content you create in the app.
    • Usage Data: Information about how you interact with our app, including frequency of use and clicks.
    • Device Information: Type of device, IP address, browser type, and operating system.`
  },
  {
    id: 'how-we-use-your-information',
    title: 'How We Use Your Information',
    content: `We use your data for the following purposes:
    • Improving User Experience: We analyze usage patterns to provide a more personalized and efficient experience.
    • Service Enhancement: Your data helps us troubleshoot issues, improve features, and maintain the app.
    • Marketing and Communication: With your consent, we may use your information to send updates about our services.`
  },
  {
    id: 'sharing-of-information',
    title: 'Sharing of Information',
    content: `We are committed to protecting your privacy and only share information in specific circumstances:
    • Service Providers: We may share your data with trusted third-party services essential to app functionality (e.g., analytics).
    • Legal Compliance: We may disclose information if required by law or to protect user safety.
    • No Third-Party Sales: We do not sell your personal information to third parties.`
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: `We take the security of your data seriously and implement various measures to protect it:
    • Encryption: We use industry-standard encryption for data storage and transfer.
    • Access Control: We limit employee access to user data and ensure secure logins for all users.
    • Regular Audits: We conduct periodic reviews to ensure our data security measures are up-to-date and effective.`
  },
  {
    id: 'user-rights-and-choices',
    title: 'User Rights and Choices',
    content: `You have several rights regarding your personal data:
    • Access and Edit: You can access or update your personal information at any time through your account settings.
    • Delete or Withdraw Consent: You can delete your account or adjust your data sharing permissions.
    • Data Portability: You can request a copy of your data in a structured, commonly used format.`
  },
  {
    id: 'cookie-policy',
    title: 'Cookie Policy',
    content: `We use cookies and similar tracking technologies to improve your browsing experience:
    • Essential Cookies: These are necessary for basic app functionality.
    • Analytical Cookies: These help us understand how users interact with our app.
    • User Control: You can manage cookie preferences via your browser settings.`
  },
  {
    id: 'changes-to-this-policy',
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any significant changes via email or through a prominent notice on our app.`
  }
]

export default function PrivacyPolicyPage() {
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
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          We value your privacy and are dedicated to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
        </p>

        {sections.map((section, index) => (
          <div key={section.id} className={`mb-12 p-6 rounded-lg ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              {index === 0 && <UserCheck className="mr-2 text-blue-600" />}
              {index === 1 && <Shield className="mr-2 text-blue-600" />}
              {index === 2 && <Lock className="mr-2 text-blue-600" />}
              {index === 3 && <Lock className="mr-2 text-blue-600" />}
              {index === 4 && <UserCheck className="mr-2 text-blue-600" />}
              {index === 5 && <Cookie className="mr-2 text-blue-600" />}
              {index === 6 && <Calendar className="mr-2 text-blue-600" />}
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
            For any questions or concerns about this Privacy Policy, please{' '}
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