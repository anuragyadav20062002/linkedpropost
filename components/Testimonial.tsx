import { Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "This tool transformed my LinkedIn presence! Scheduling content has never been easier.",
    author: "Jane Doe",
    title: "Marketing Manager"
  },
  {
    quote: "Generating ideas for LinkedIn posts used to be time-consuming. Now, I can create and schedule posts in minutes.",
    author: "John Smith",
    title: "HR Specialist"
  },
  {
    quote: "The AI-powered content suggestions are spot-on. It's like having a personal LinkedIn strategist.",
    author: "Emily Chen",
    title: "Startup Founder"
  },
  {
    quote: "The analytics feature has been a game-changer for optimizing my content strategy. Highly recommended!",
    author: "Michael Johnson",
    title: "Social Media Consultant"
  }
]

export default function TestimonialSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-lg shadow-lg ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}
            >
              <div className="flex flex-col h-full">
                <Quote className="w-10 h-10 text-blue-500 mb-4" />
                <p className="text-gray-600 italic mb-4 flex-grow">"{testimonial.quote}"</p>
                <div>
                  <p className="text-gray-900 font-semibold">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}