'use client'

import { useState, useEffect } from 'react'
import { Eye, ThumbsUp, MessageSquare, Share2, TrendingUp, Clock, Calendar, ArrowUp, ArrowDown, BarChart2, PieChart, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Area, AreaChart } from 'recharts'
import DashboardNavbar from '@/components/DashNav'
import { motion } from 'framer-motion'



// Define interfaces for the data structure
interface SummaryStats {
  totalViews: number;
  totalEngagements: number;
  ctr: number;
  avgEngagementRate: number;
}

interface Post {
  id: number;
  title: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

interface BestTimes {
  days: string[];
  times: string[];
}

interface EngagementTrend {
  name: string;
  likes: number;
  comments: number;
  shares: number;
}

interface LinkedInData {
  summaryStats: SummaryStats;
  posts: Post[];
  bestTimes: BestTimes;
  engagementTrends: EngagementTrend[];
}

// This function will be replaced with actual API call
const fetchLinkedInData = async () => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Return mock data structure (to be replaced with actual API data)
  return {
    summaryStats: {
      totalViews: 10000,
      totalEngagements: 500,
      ctr: 3,
      avgEngagementRate: 4.5
    },
    posts: [
      { id: 1, title: 'Post 1', views: 1000, likes: 50, comments: 10, shares: 5 },
      { id: 2, title: 'Post 2', views: 2000, likes: 100, comments: 20, shares: 10 },
      { id: 3, title: 'Post 3', views: 1500, likes: 75, comments: 15, shares: 8 },
      { id: 4, title: 'Post 4', views: 3000, likes: 150, comments: 30, shares: 15 },
    ],
    bestTimes: {
      days: ['Wednesday', 'Thursday'],
      times: ['10:00 AM', '2:00 PM']
    },
    engagementTrends: [
      { name: 'Week 1', likes: 100, comments: 20, shares: 10 },
      { name: 'Week 2', likes: 150, comments: 30, shares: 15 },
      { name: 'Week 3', likes: 120, comments: 25, shares: 12 },
      { name: 'Week 4', likes: 200, comments: 40, shares: 20 },
    ]
  }
}

// Define the StatCardProps interface
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ComponentType;
  color: 'blue' | 'green' | 'yellow' | 'purple';
  change: number;
}

interface AnalyticsCardProps {
  title: string;
  icon: React.ComponentType;
  children: React.ReactNode;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<LinkedInData | null>(null)
  const [summaryStats, setSummaryStats] = useState({
    totalViews: 0,
    totalEngagements: 0,
    ctr: 0,
    avgEngagementRate: 0,
  });

  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const loadData = async () => {
      try {
        const linkedInData = await fetchLinkedInData()
        setData(linkedInData)
      } catch (error) {
        console.error('Error fetching LinkedIn data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const fetchSummaryStats = async () => {
    const res = await fetch('/api/linkedin-summary');
    const data = await res.json();
    setSummaryStats(data)
    console.log(setSummaryStats);
  };

  useEffect(() => {
    fetchSummaryStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-gray-700">We're sorry, but there was an error loading your analytics data. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white p-4">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          LinkedIn Analytics Dashboard
        </motion.h1>

        {/* Summary Statistics Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatCard title="Total Views" value={summaryStats.totalViews} icon={Eye} color="blue" change={12} />
            <StatCard title="Total Engagements" value={summaryStats.totalEngagements} icon={ThumbsUp} color="green" change={8} />
            <StatCard title="Click-Through Rate" value={`${summaryStats.ctr}%`} icon={TrendingUp} color="yellow" change={-2} />
            <StatCard title="Avg. Engagement Rate" value={`${summaryStats.avgEngagementRate}%`} icon={Share2} color="purple" change={5} />
          </motion.div>
        </div>

        {/* Analytics Cards */}
        <motion.div 
          className="grid grid-cols-1 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnalyticsCard title="Engagement Overview" icon={Activity}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.engagementTrends}>
                    <defs>
                      <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                    <Legend />
                    <Area type="monotone" dataKey="likes" stroke="#8884d8" fillOpacity={1} fill="url(#colorLikes)" />
                    <Area type="monotone" dataKey="comments" stroke="#82ca9d" fillOpacity={1} fill="url(#colorComments)" />
                    <Area type="monotone" dataKey="shares" stroke="#ffc658" fillOpacity={1} fill="url(#colorShares)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Recent Posts Engagement</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-800 bg-opacity-50">
                        <th className="py-2 px-3 text-left">Post</th>
                        <th className="py-2 px-3 text-left">Likes</th>
                        <th className="py-2 px-3 text-left">Comments</th>
                        <th className="py-2 px-3 text-left">Shares</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.posts.slice(0, 3).map((post) => (
                        <tr key={post.id} className="border-b border-blue-700">
                          <td className="py-2 px-3">{post.title}</td>
                          <td className="py-2 px-3">{post.likes}</td>
                          <td className="py-2 px-3">{post.comments}</td>
                          <td className="py-2 px-3">{post.shares}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Suggestion</h3>
                <p className="text-blue-200">Based on your engagement trends, consider posting more content similar to "Post 2" which has the highest engagement rates.</p>
              </div>
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Audience Insights" icon={PieChart}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.posts}>
                    <PolarGrid stroke="rgba(255,255,255,0.3)" />
                    <PolarAngleAxis dataKey="title" stroke="#fff" />
                    <PolarRadiusAxis angle={30} domain={[0, 'auto']} stroke="#fff" />
                    <Radar name="Views" dataKey="views" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Likes" dataKey="likes" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Radar name="Comments" dataKey="comments" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Post Performance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-blue-800 bg-opacity-50">
                        <th className="py-2 px-3 text-left">Post</th>
                        <th className="py-2 px-3 text-left">Views</th>
                        <th className="py-2 px-3 text-left">CTR</th>
                        <th className="py-2 px-3 text-left">Eng. Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.posts.map((post) => (
                        <tr key={post.id} className="border-b border-blue-700">
                          <td className="py-2 px-3">{post.title}</td>
                          <td className="py-2 px-3">{post.views}</td>
                          <td className="py-2 px-3">{((post.likes + post.comments + post.shares) / post.views * 100).toFixed(2)}%</td>
                          <td className="py-2 px-3">{((post.likes + post.comments + post.shares) / post.views * 100).toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Suggestion</h3>
                <p className="text-blue-200">Your audience engages most with visual content. Try incorporating more infographics or video content in your posts.</p>
              </div>
            </div>
          </AnalyticsCard>

          <AnalyticsCard title="Timing Insights" icon={Clock}>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.engagementTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px' }} />
                    <Legend />
                    <Bar dataKey="likes" fill="#8884d8" />
                    <Bar dataKey="comments" fill="#82ca9d" />
                    <Bar dataKey="shares" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Best Times to Post</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-800 bg-opacity-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-200 mb-2">Best Days</h4>
                    <ul className="list-disc list-inside text-blue-100">
                      {data.bestTimes.days.map((day, index) => (
                        <li key={index}>{day}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-purple-800 bg-opacity-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-200 mb-2">Best Times</h4>
                    <ul className="list-disc list-inside text-purple-100">
                      {data.bestTimes.times.map((time, index) => (
                        <li key={index}>{time}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Suggestion</h3>
                <p className="text-blue-200">Schedule your posts for Wednesday and Thursday around 10:00 AM or 2:00 PM to maximize engagement.</p>
              </div>
            </div>
          </AnalyticsCard>
        </motion.div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color, change }: StatCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <motion.div 
      className={`bg-gradient-to-br ${colorClasses[color]} p-6 rounded-xl shadow-lg transition duration-300 hover:shadow-2xl`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <Icon  />
      </div>
      <p className="text-2xl font-bold text-white">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      <p className={`text-sm ${change >= 0 ? 'text-green-200' : 'text-red-200'} flex items-center mt-2`}>
        {change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
        {Math.abs(change)}% {change >= 0 ? 'increase' : 'decrease'}
      </p>
    </motion.div>
  );
}

function AnalyticsCard({ title, icon: Icon, children }: AnalyticsCardProps) {
  return (
    <motion.div 
      className="bg-blue-900 bg-opacity-50 p-6 rounded-xl shadow-lg backdrop-blur-sm"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-6">
        <Icon />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}