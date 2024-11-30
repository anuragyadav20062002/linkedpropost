'use client'

import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import DashboardNavbar from '@/components/DashNav'
import Footer from '@/components/Footer'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

// Define a type for Post objects
type Post = {
  id: number
  title: string
  status: 'Scheduled' | 'Draft' | 'Published'
  date: string
  time: string
  type: string
}

// Mock data for demonstration
const mockPosts: Post[] = [
  { id: 1, title: 'LinkedIn Strategy 2024', status: 'Scheduled', date: '2024-03-15', time: '09:00', type: 'Educational' },
  { id: 2, title: 'New Product Launch', status: 'Draft', date: '2024-03-18', time: '14:00', type: 'Promotional' },
  { id: 3, title: 'Team Spotlight: Marketing', status: 'Published', date: '2024-03-10', time: '11:00', type: 'Storytelling' },
]

export default function ContentCalendarPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const [view, setView] = useState<'monthly' | 'weekly'>('monthly')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isPostDetailsOpen, setIsPostDetailsOpen] = useState(false)

  useEffect(() => {
    // Fetch posts from Supabase or API
    // For now, we're using mock data
  }, [])

  const handleViewChange = (newView: 'monthly' | 'weekly') => {
    setView(newView)
  }

  const handleDateChange = (amount: number) => {
    const newDate = new Date(currentDate)
    if (view === 'monthly') {
      newDate.setMonth(newDate.getMonth() + amount)
    } else {
      newDate.setDate(newDate.getDate() + amount * 7)
    }
    setCurrentDate(newDate)
  }

  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
    setIsPostDetailsOpen(true)
  }

  const handleClosePostDetails = () => {
    setIsPostDetailsOpen(false)
    setSelectedPost(null)
  }

  const renderCalendarGrid = () => {
    // Simplified calendar grid rendering
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    return (
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day} className="border p-2 h-24 overflow-y-auto">
            <div className="font-bold">{day}</div>
            {posts
              .filter((post) => new Date(post.date).getDate() === day)
              .map((post) => (
                <div
                  key={post.id}
                  className={`p-1 mb-1 rounded text-xs cursor-pointer ${
                    post.status === 'Scheduled' ? 'bg-blue-100' :
                    post.status === 'Draft' ? 'bg-gray-100' : 'bg-green-100'
                  }`}
                  onClick={() => handlePostClick(post)}
                >
                  {post.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      <div className="bg-[#7ED4AD] h-5"></div>
      <div className="p-5 lg:p-10">
        <div className="bg-white shadow-md rounded-lg p-5">
          {/* Top Bar */}
          <h1 className="text-2xl font-bold mb-6">Post Calendar</h1>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded ${view === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleViewChange('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-3 py-1 rounded ${view === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleViewChange('weekly')}
              >
                Weekly
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-blue-500 text-white rounded" onClick={() => router.push('/dashboard/creation')}>
                <Plus size={20} />
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-8 pr-2 py-1 border rounded"
                />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => handleDateChange(-1)}>
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-xl font-bold">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={() => handleDateChange(1)}>
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Calendar Grid */}
          {renderCalendarGrid()}

          {/* Post Details Popup */}
          {isPostDetailsOpen && selectedPost && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                <h3 className="text-xl font-bold mb-2">{selectedPost.title}</h3>
                <p>Status: {selectedPost.status}</p>
                <p>Date: {selectedPost.date}</p>
                <p>Time: {selectedPost.time}</p>
                <p>Type: {selectedPost.type}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => router.push(`/dashboard/creation?id=${selectedPost.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={handleClosePostDetails}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

// Implement the weekly view rendering.
// Add drag-and-drop functionality for rescheduling posts.
// Implement the post details tooltip on hover.
// Add color coding for different post types.
// Implement the search and filter functionality.
// Connect to your backend API or Supabase to fetch and manage real post data