import Link from 'next/link'
import { Check } from 'lucide-react'

const plans = [
  {
    name: "Basic Plan",
    price: "$8",
    period: "month",
    description: "Great for individual professionals looking to grow their LinkedIn presence.",
    features: [
      "AI-powered content suggestions",
      "5 posts per month",
      "Basic analytics",
      "1 LinkedIn account",
      "Email support"
    ]
  },
  {
    name: "Professional Plan",
    price: "$15",
    period: "month",
    description: "For small teams and businesses who need more content and analytics.",
    features: [
      "All Basic Plan features",
      "Unlimited posts",
      "Advanced analytics and insights",
      "3 LinkedIn accounts",
      "Priority support",
      "Team collaboration tools"
    ]
  }
]

export default function PricingSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Choose the Right Plan for You
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-semibold text-gray-900 text-center">{plan.name}</h3>
                <p className="mt-4 text-center">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/{plan.period}</span>
                </p>
                <p className="mt-4 text-gray-600 text-center">{plan.description}</p>
              </div>
              <div className="px-6 pt-6 pb-8">
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="flex-shrink-0 h-6 w-6 text-green-500" />
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href={`/pricing?tier=${index + 1}`}
                    className="block w-full bg-blue-600 text-white text-center font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
                  >
                    Choose Plan
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}