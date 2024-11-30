'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock } from 'lucide-react'
import DashboardNavbar from '@/components/DashNav'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Footer from '@/components/Footer'

const postTemplates = [
  { value: 'educational', label: 'Educational', description: 'Informative posts to educate the audience' },
  { value: 'motivational', label: 'Motivational', description: 'Inspiring posts with quotes or personal experiences' },
  { value: 'promotional', label: 'Promotional', description: 'Promote products, services, or achievements' },
  { value: 'storytelling', label: 'Storytelling', description: 'Share personal or professional stories' },
  { value: 'announcement', label: 'Announcement', description: 'Updates, launches, or important company news' },
  { value: 'event', label: 'Event', description: 'Share event invitations or recaps' },
  { value: 'job_opportunity', label: 'Job Opportunity', description: 'Promote job openings or recruitment calls' },
]

export default function ContentCreationPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [postContent, setPostContent] = useState('')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTime, setScheduleTime] = useState('')
  const [postSummary, setPostSummary] = useState('')
  const [userName, setUserName] = useState('Your Name')
  const [userPicture, setUserPicture] = useState('')

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { name, picture } = user.user_metadata || {};
        setUserName(name || 'Your Name');
        setUserPicture(picture || null);
      }
    }
    getUserData()
  }, [supabase])

  async function handleGenerateContent() {
    if (!selectedTemplate || !postSummary) return;
  
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/openai-community/gpt2-medium", {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`, 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: `Generate a LinkedIn ${selectedTemplate} post with this summary: ${postSummary}.`
        })
      });
  
      const data = await response.json();
      if (data.error) {
        console.error("Error in generation:", data.error);
        return;
      }
  
      setPostContent(data[0].generated_text);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  }
  
  

  const handleSaveDraft = () => {
    console.log('Saving draft:', postContent)
  }

  const handleSchedulePost = () => {
    console.log('Scheduling post for:', scheduleDate, scheduleTime)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      <div className="bg-[#7ED4AD] h-5"></div> {/* Separator line */}
      <div className="p-5 lg:p-10"> {/* Box with padding */}
        <div className="flex flex-col lg:flex-row bg-white shadow-md rounded-lg p-5">
          {/* Creation Panel */}
          <div className="lg:w-1/2 p-6">
            <h1 className="text-2xl font-bold mb-6">Create Your LinkedIn Post</h1>
            {/* Post Template Dropdown */}
            <div className="mb-4">
              <label htmlFor="postTemplate" className="block text-sm font-medium text-gray-700">Select Post Template</label>
              <select
                id="postTemplate"
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Choose a template</option>
                {postTemplates.map((template) => (
                  <option key={template.value} value={template.value} title={template.description}>
                    {template.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Post Summary */}
            <div className="mb-4">
              <label htmlFor="postSummary" className="block text-sm font-medium text-gray-700">Post Summary</label>
              <input
                type="text"
                id="postSummary"
                value={postSummary}
                onChange={(e) => setPostSummary(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter a brief summary or description of your post"
              />
            </div>

            {/* AI Content Generator Button */}
            <button
              onClick={handleGenerateContent}
              className="mb-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Generate Content
            </button>

            {/* Text Editor */}
            <div className="mb-4">
              <label htmlFor="postContent" className="block text-sm font-medium text-gray-700">Post Content</label>
              <textarea
                id="postContent"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={6}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Start typing your post content here..."
              ></textarea>
              <p className="mt-2 text-sm text-gray-500">
                {postContent.length}/3000 characters
              </p>
            </div>

            {/* Scheduling Options */}
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700">Schedule Date</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="scheduleDate"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="scheduleTime" className="block text-sm font-medium text-gray-700">Schedule Time</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="scheduleTime"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Save or Schedule Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleSaveDraft}
                className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save as Draft
              </button>
              <button
                onClick={handleSchedulePost}
                className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Schedule Post
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:w-1/2 p-6">
            <h2 className="text-xl font-bold mb-4">Post Preview</h2>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center mb-4">
                {userPicture ? (
                  <img src={userPicture} alt="User Profile" className="h-12 w-12 rounded-full" />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span> {/* Placeholder for no image */}
                  </div>
                )}
                <div className="ml-4">
                  <p className="font-bold">{userName}</p>
                  <p className="text-sm text-gray-500">
                    {scheduleDate && scheduleTime ? 
                      `Scheduled for ${scheduleDate} at ${scheduleTime}` : 
                      'Not scheduled yet'}
                  </p>
                </div>
              </div>
              <div className="prose max-w-none">
                {postContent || "Your post content will appear here..."}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}