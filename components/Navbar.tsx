'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                LinkedProPost
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
            <Link href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link href="/features" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Features
            </Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Contact Us
            </Link>
            <Link href="/auth/signup" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
              Get Started
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/about" className="block text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link href="/features" className="block text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">
              Features
            </Link>
            <Link href="/contact" className="block text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium">
              Contact Us
            </Link>
            <Link href="/auth/signup" className="block bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}