'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, ThumbsUp, MessageSquare, Share2, TrendingUp, Clock, Calendar, ArrowUp, ArrowDown, BarChart2, PieChart, Activity, Plus, Edit3, ChevronRight, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import DashboardNavbar from '@/components/DashNav'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Interfaces (you can move these to a separate file if preferred)
interface Post {
  id: number;
  title: string;
  scheduledDate: string;
  status: 'draft' | 'scheduled' | 'published';
  engagement: number;
}

interface EngagementTrend {
  name: string;
  likes: number;
  comments: number;
  shares: number;
}

interface DashboardData {
  upcomingPosts: Post[];
  engagementTrends: EngagementTrend[];
  audienceInsights: { title: string; views: number; likes: number; comments: number }[];
  timingInsights: EngagementTrend[];
  totalViews: number;
  totalEngagements: number;
  profileViews: number;
  searchAppearances: number;
}

// Mock data fetching function (replace with actual API call)
const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    upcomingPosts: [
      { id: 1, title: "5 Tips for LinkedIn Success", scheduledDate: "2024-12-05", status: 'scheduled', engagement: 85 },
      { id: 2, title: "How to Optimize Your Profile", scheduledDate: "2024-12-07", status: 'draft', engagement: 0 },
      { id: 3, title: "Networking Strategies for 2025", scheduledDate: "2024-12-10", status: 'scheduled', engagement: 92 },
      { id: 4, title: "The Future of Work: AI and Automation", scheduledDate: "2024-12-12", status: 'scheduled', engagement: 78 },
      { id: 5, title: "Building Your Personal Brand on LinkedIn", scheduledDate: "2024-12-15", status: 'draft', engagement: 0 },
    ],
    engagementTrends: [
      { name: 'Week 1', likes: 100, comments: 20, shares: 10 },
      { name: 'Week 2', likes: 150, comments: 30, shares: 15 },
      { name: 'Week 3', likes: 120, comments: 25, shares: 12 },
      { name: 'Week 4', likes: 200, comments: 40, shares: 20 },
    ],
    audienceInsights: [
      { title: "Post 1", views: 1000, likes: 50, comments: 10 },
      { title: "Post 2", views: 1500, likes: 75, comments: 15 },
      { title: "Post 3", views: 2000, likes: 100, comments: 20 },
      { title: "Post 4", views: 1800, likes: 90, comments: 18 },
      { title: "Post 5", views: 2200, likes: 110, comments: 22 },
    ],
    timingInsights: [
      { name: 'Mon', likes: 100, comments: 20, shares: 10 },
      { name: 'Tue', likes: 120, comments: 25, shares: 12 },
      { name: 'Wed', likes: 150, comments: 30, shares: 15 },
      { name: 'Thu', likes: 140, comments: 28, shares: 14 },
      { name: 'Fri', likes: 130, comments: 26, shares: 13 },
      { name: 'Sat', likes: 90, comments: 18, shares: 9 },
      { name: 'Sun', likes: 80, comments: 16, shares: 8 },
    ],
    totalViews: 12500,
    totalEngagements: 2800,
    profileViews: 450,
    searchAppearances: 1200,
  }
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await fetchDashboardData()
        setData(dashboardData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 to-purple-900">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-red-600">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">We're sorry, but there was an error loading your dashboard data. Please try again later.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Anurag</h1>
            <p className="text-gray-400">Here's what's happening with your LinkedIn profile</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Views" value={data.totalViews} icon={Eye} change={12} />
          <StatCard title="Total Engagements" value={data.totalEngagements} icon={ThumbsUp} change={8} />
          <StatCard title="Profile Views" value={data.profileViews} icon={TrendingUp} change={15} />
          <StatCard title="Search Appearances" value={data.searchAppearances} icon={Share2} change={-3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Engagement Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  likes: {
                    label: "Likes",
                    color: "hsl(var(--chart-1))",
                  },
                  comments: {
                    label: "Comments",
                    color: "hsl(var(--chart-2))",
                  },
                  shares: {
                    label: "Shares",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <AreaChart data={data.engagementTrends}>
                  <defs>
                    <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-likes)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-likes)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-comments)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-comments)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-shares)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-shares)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="likes" stroke="var(--color-likes)" fillOpacity={1} fill="url(#colorLikes)" />
                  <Area type="monotone" dataKey="comments" stroke="var(--color-comments)" fillOpacity={1} fill="url(#colorComments)" />
                  <Area type="monotone" dataKey="shares" stroke="var(--color-shares)" fillOpacity={1} fill="url(#colorShares)" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Upcoming Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {data.upcomingPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between mb-4 bg-white bg-opacity-5 p-3 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="text-sm text-gray-400">{post.scheduledDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={post.status === 'scheduled' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                      {post.status === 'scheduled' && (
                        <Badge variant="outline" className="bg-green-500 bg-opacity-20">
                          {post.engagement}% Engagement
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Create New Post
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Audience Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  views: {
                    label: "Views",
                    color: "hsl(var(--chart-1))",
                  },
                  likes: {
                    label: "Likes",
                    color: "hsl(var(--chart-2))",
                  },
                  comments: {
                    label: "Comments",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.audienceInsights}>
                  <PolarGrid stroke="rgba(255,255,255,0.3)" />
                  <PolarAngleAxis dataKey="title" stroke="#fff" />
                  <PolarRadiusAxis angle={30} domain={[0, 'auto']} stroke="#fff" />
                  <Radar name="Views" dataKey="views" stroke="var(--color-views)" fill="var(--color-views)" fillOpacity={0.6} />
                  <Radar name="Likes" dataKey="likes" stroke="var(--color-likes)" fill="var(--color-likes)" fillOpacity={0.6} />
                  <Radar name="Comments" dataKey="comments" stroke="var(--color-comments)" fill="var(--color-comments)" fillOpacity={0.6} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <BarChart2 className="w-5 h-5 mr-2" />
                Timing Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  likes: {
                    label: "Likes",
                    color: "hsl(var(--chart-1))",
                  },
                  comments: {
                    label: "Comments",
                    color: "hsl(var(--chart-2))",
                  },
                  shares: {
                    label: "Shares",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={data.timingInsights}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="likes" fill="var(--color-likes)" />
                  <Bar dataKey="comments" fill="var(--color-comments)" />
                  <Bar dataKey="shares" fill="var(--color-shares)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl">AI-Powered Post Generation</CardTitle>
            <CardDescription className="text-gray-400">Create engaging LinkedIn posts with our advanced AI technology</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Our AI analyzes your profile, audience, and trending topics to generate tailored content that resonates with your network.</p>
            <Tabs defaultValue="topic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="topic">Choose Topic</TabsTrigger>
                <TabsTrigger value="customize">Customize</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="topic">
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Button variant="outline">Industry Trends</Button>
                  <Button variant="outline">Career Advice</Button>
                  <Button variant="outline">Personal Growth</Button>
                  <Button variant="outline">Company News</Button>
                </div>
              </TabsContent>
              <TabsContent value="customize">
                <div className="space-y-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Tone:</label>
                    <select className="bg-transparent border rounded p-1">
                      <option>Professional</option>
                      <option>Casual</option>
                      <option>Inspirational</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium">Length:</label>
                    <select className="bg-transparent border rounded p-1">
                      <option>Short</option>
                      <option>Medium</option>
                      <option>Long</option>
                    </select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="preview">
                <div className="mt-4 p-4 bg-white bg-opacity-5 rounded-lg">
                  <p className="text-sm">Your AI-generated post preview will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Generate Post</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, change }: { title: string; value: number; icon: any; change: number }) {
  return (
    <Card className="bg-white bg-opacity-10 backdrop-blur-lg border-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
          {change >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
          {Math.abs(change)}% from last month
        </p>
      </CardContent>
    </Card>
  )
}