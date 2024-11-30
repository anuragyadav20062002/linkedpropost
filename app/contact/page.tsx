'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, ChevronDown, ChevronUp, Send } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

const faqs = [
  {
    question: "How can I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions sent to your email to create a new password."
  },
  {
    question: "What payment options are available?",
    answer: "We accept all major credit cards and PayPal for payment. You can manage your payment options in your account settings."
  },
  {
    question: "Can I upgrade or downgrade my subscription?",
    answer: "Yes, you can change your subscription plan at any time. Go to your account settings and select 'Change Plan' to upgrade or downgrade your subscription."
  },
  {
    question: "How does scheduling work?",
    answer: "Our scheduling feature allows you to set specific dates and times for your LinkedIn posts. You can manage all your scheduled posts in the Content Calendar section of the app."
  }
]

export default function ContactUsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, email, subject, message })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>

      {/* Improved Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="Background pattern"
            layout="fill"
            objectFit="cover"
            className="opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Let's Connect and Grow Together
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Have questions, ideas, or feedback? We're here to listen and help you make the most of your LinkedIn presence.
            </p>
            <a
              href="#contact-form"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Reach Out Now
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-gray-50">
            <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div id="contact-form" className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center text-lg font-semibold"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            ) : (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                <p className="font-bold">Thank you for reaching out!</p>
                <p>We'll get back to you within 24 hours.</p>
              </div>
            )}
          </div>

          {/* Direct Contact Information and Social Media Links */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-blue-600 mr-4" />
                  <span className="text-gray-700">support@linkedpropost.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-blue-600 mr-4" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-600 mr-4" />
                  <span className="text-gray-700">123 App Street, San Francisco, CA 94107</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="https://linkedin.com" className="text-blue-600 hover:text-blue-800 transition duration-300">
                  <Linkedin className="w-8 h-8" />
                </Link>
                {/* Add other social media links here */}
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium text-lg text-gray-800">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-blue-600" />
                  )}
                </button>
                {expandedFaq === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}