import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Brain, Layout, Calendar, BarChart2, Eye, Sliders, UserCheck } from 'lucide-react'
import Footer from '@/components/Footer'

const features = [
  {
    title: "Smart Content Creation",
    description: "Generate engaging LinkedIn post ideas effortlessly. Our AI-driven content generator suggests fresh ideas tailored to your style and goals.",
    icon: Brain,
    image: "/placeholder.svg?height=300&width=400",
    details: "Choose from different content types like Educational, Motivational, and Storytelling. Our AI assists in creating posts quickly and efficiently."
  },
  {
    title: "Personalized Post Templates",
    description: "Choose from a variety of templates that match your brand's voice and goals. Customize posts for educational content, stories, or motivational messages.",
    icon: Layout,
    image: "/placeholder.svg?height=300&width=400",
    details: "Adapt templates to your unique needs, whether you're sharing industry insights, company updates, or personal achievements."
  },
  {
    title: "Flexible Scheduling Options",
    description: "Plan your LinkedIn posts in advance with our intuitive scheduling feature. Set the date and time that works best for you and your audience.",
    icon: Calendar,
    image: "/placeholder.svg?height=300&width=400",
    details: "Manage all scheduled posts in one place, with the flexibility to update or reschedule as needed. Optimize your posting times for maximum engagement."
  },
  {
    title: "Visual Content Calendar",
    description: "Easily organize and visualize your content schedule. Our drag-and-drop calendar makes it simple to adjust post timings and keep your content plan on track.",
    icon: Calendar,
    image: "/placeholder.svg?height=300&width=400",
    details: "View your content plan in monthly or weekly formats. Get quick previews of scheduled posts with tooltips."
  },
  {
    title: "Live Post Preview",
    description: "See exactly how your post will appear on LinkedIn with our real-time preview feature. Make edits and adjustments with confidence before scheduling.",
    icon: Eye,
    image: "/placeholder.svg?height=300&width=400",
    details: "Edit your post with the assurance that what you see is exactly how it will appear on LinkedIn. Ensure your message is perfectly crafted before publishing."
  },
  {
    title: "Detailed Performance Analytics",
    description: "Track your post engagement, reach, and effectiveness with easy-to-read analytics. Make data-driven adjustments to improve your LinkedIn strategy.",
    icon: BarChart2,
    image: "/placeholder.svg?height=300&width=400",
    details: "Monitor key metrics like engagement rate, clicks, and post reach. Get actionable insights to continuously improve your content strategy."
  },
  {
    title: "Personalized User Experience",
    description: "Tailor the app to match your content style and posting frequency with custom user preferences.",
    icon: Sliders,
    image: "/placeholder.svg?height=300&width=400",
    details: "Set your preferred content type, post frequency, and timezone to ensure the app aligns perfectly with your LinkedIn strategy and workflow."
  }
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>

      {/* Hero Section */}
      <section className="relative py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Streamline your LinkedIn presence and grow your professional impact</h1>
            <p className="text-xl mb-8">Effortlessly create, schedule, and analyze LinkedIn content to connect with your audience</p>
            <Image
              src="/placeholder.svg?height=300&width=600"
              alt="LinkedProPost features illustration"
              width={600}
              height={300}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center mb-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 md:px-8">
                <div className="flex items-center mb-4">
                  <feature.icon className="w-8 h-8 text-blue-500 mr-3" />
                  <h2 className="text-3xl font-bold">{feature.title}</h2>
                </div>
                <p className="text-xl mb-4">{feature.description}</p>
                <p className="text-gray-600">{feature.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Simplify Your LinkedIn Strategy?</h2>
          <p className="text-xl mb-8">Join hundreds of professionals who trust LinkedProPost to manage their LinkedIn content.</p>
          <Link href="/signup" className="bg-white text-blue-600 px-8 py-3 rounded-full text-xl font-semibold hover:bg-blue-100 transition duration-300">
            Get Started
          </Link>
        </div>
      </section>
      <Footer/>
    </div>
  )
}