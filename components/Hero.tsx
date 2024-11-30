import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Section */}
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Effortlessly Generate and Schedule LinkedIn Content for Maximum Engagement
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your all-in-one tool for creating, scheduling, and analyzing LinkedIn posts. Elevate your LinkedIn strategy, and boost your professional presence.
            </p>
            <Link 
              href="/auth/signup" 
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Get Started Now
            </Link>
          </div>

          {/* Right Section */}
          <div className="lg:w-1/2">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <Image
                src="/placeholder.svg?height=384&width=384"
                alt="Social media scheduling illustration"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}