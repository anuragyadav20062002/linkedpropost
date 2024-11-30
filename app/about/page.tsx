import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Mail, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />


      {/* Hero Section */}
      <section className="relative h-96 bg-blue-600 text-white">
        <Image
          src="/placeholder.svg?height=384&width=1920"
          alt="LinkedIn networking illustration"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Empowering LinkedIn Users to Grow and Connect</h1>
            <p className="text-xl md:text-2xl">Simplifying content creation and scheduling for professionals</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Mission & Vision</h2>
        <div className="space-y-6 text-lg">
          <p className="bg-white p-6 rounded-lg shadow-md">
            <strong className="text-blue-600">Mission:</strong> Our mission is to simplify LinkedIn content creation and scheduling, empowering professionals to share insights and build connections consistently.
          </p>
          <p className="bg-white p-6 rounded-lg shadow-md">
            <strong className="text-blue-600">Vision:</strong> Our vision is to become the go-to platform for LinkedIn professionals seeking ease, efficiency, and impact in their content strategy.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="space-y-6 text-lg">
            <p>It all began with a passion for helping people share their stories and build their personal brands on LinkedIn.</p>
            <p>Many professionals struggle to maintain a consistent LinkedIn presence because content creation and scheduling take time and energy. This inspired us to create a streamlined, user-friendly tool to help people generate and schedule high-quality LinkedIn content effortlessly.</p>
            <p>As a solo developer, I know the value of efficiency and focus. That's why I've built this tool to deliver maximum impact with minimum time investment.</p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-4 md:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet the Creator</h2>
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Founder's portrait"
              width={200}
              height={200}
              className="rounded-full"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">John Doe</h3>
              <p className="text-gray-600 mb-4">Founder & Developer</p>
              <p className="mb-4">
                I'm John Doe, the creator of LinkedProPost. With a background in SaaS development, my goal is to bring simple, effective solutions to the LinkedIn community.
              </p>
              <p className="italic mb-4">"I believe anyone can make a lasting impression with the right tools and a bit of creativity."</p>
              <div className="flex space-x-4">
                <Link href="https://linkedin.com/in/johndoe" className="text-blue-600 hover:text-blue-800">
                  <Linkedin />
                </Link>
                <Link href="mailto:john@linkedpropost.com" className="text-blue-600 hover:text-blue-800">
                  <Mail />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "User-Centric Design", description: "We prioritize a user-first approach to ensure that every feature adds real value to our users' experiences." },
              { title: "Consistency and Reliability", description: "We believe that consistency is key to building a strong online presence, which is why we focus on providing reliable tools." },
              { title: "Simplicity", description: "We believe in simplifying complex tasks so that users can focus on what truly matters: their voice and message." },
              { title: "Empowerment through Technology", description: "We are dedicated to helping professionals leverage technology to empower their personal brands." }
            ].map((value, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-16 px-4 md:px-8 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Looking to the Future</h2>
           <div className="space-y-6 text-lg">
            <p>In the near future, we plan to enhance analytics, providing users with deeper insights into their LinkedIn engagement.</p>
            <p>We're also exploring options for more automation tools to further streamline content management on LinkedIn.</p>
            <Link href="/contact" className="inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-full font-semibold transition-colors duration-200">
              Join us on this journey <ChevronRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}