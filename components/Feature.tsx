import { Brain, Layout, Calendar, BarChart2, Linkedin, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "AI-Powered Content Generation",
    description: "Generate engaging LinkedIn post ideas tailored to your audience, powered by AI."
  },
  {
    icon: Layout,
    title: "Customizable Templates",
    description: "Choose from a library of post templates designed for different goals, from storytelling to promotion."
  },
  {
    icon: Calendar,
    title: "Automated Scheduling",
    description: "Plan ahead and let our scheduler handle the rest. Choose the optimal posting times and dates."
  },
  {
    icon: BarChart2,
    title: "In-Depth Analytics",
    description: "Track your post's performance and receive actionable insights to improve engagement."
  },
  {
    icon: Linkedin,
    title: "Seamless LinkedIn Integration",
    description: "Connect your LinkedIn account, and automate posting directly through our app."
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description: "Receive personalized content and timing recommendations based on your audience's engagement patterns."
  }
]

export default function FeatureHighlight() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Powerful Features to Boost Your LinkedIn Presence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}