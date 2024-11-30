'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "How does this tool integrate with LinkedIn?",
    answer: "You can securely connect your LinkedIn account and start posting directly from our app. We use OAuth 2.0 for authentication, ensuring your credentials are never stored on our servers."
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle."
  },
  {
    question: "How does the AI-powered content generation work?",
    answer: "Our AI analyzes your LinkedIn profile, industry trends, and your target audience to generate relevant content ideas. You can then edit and customize these suggestions before posting."
  },
  {
    question: "Is there a limit to how many posts I can schedule?",
    answer: "The number of posts you can schedule depends on your plan. The Basic plan allows for 5 posts per month, while the Professional plan offers unlimited posting."
  },
  {
    question: "What kind of analytics does the tool provide?",
    answer: "We offer comprehensive analytics including engagement rates, reach, follower growth, and best performing content types. The Professional plan includes more advanced insights and competitor analysis."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full text-left px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}