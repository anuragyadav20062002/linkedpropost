'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import DashboardNavbar from '@/components/DashNav'
import { User, CreditCard, Download, CheckCircle } from 'lucide-react'
import Footer from '@/components/Footer'

export default function AccountBillingPage() {
  const supabase = createClientComponentClient()
  const [activeTab, setActiveTab] = useState('profile')
  const [user, setUser] = useState(null)
  const [preferences, setPreferences] = useState({
    contentType: '',
    postFrequency: '',
    timezone: ''
  })
  const [subscriptionInfo, setSubscriptionInfo] = useState({
    tier: 'Basic',
    renewalDate: '2024-12-31',
    paymentMethod: '**** **** **** 1234'
  })
  const [paymentHistory, setPaymentHistory] = useState([
    { date: '2024-03-01', amount: '$15.00', status: 'Paid' },
    { date: '2024-02-01', amount: '$15.00', status: 'Paid' },
    { date: '2024-01-01', amount: '$15.00', status: 'Paid' },
  ])

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      // Fetch user preferences from your database here
    }
  }

  const handlePreferenceChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value })
  }

  const savePreferences = async () => {
    // Save preferences to your database here
    alert('Preferences saved successfully!')
  }

  const handlePlanChange = (action) => {
    if (action === 'upgrade') {
      alert('Are you sure you want to upgrade to Professional?')
    } else {
      alert('Are you sure you want to downgrade to Basic?')
    }
  }

  const handleCancelSubscription = () => {
    alert('Are you sure you want to cancel your subscription? You will lose access to premium features after your current billing period ends.')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardNavbar />
      <div className="bg-[#7ED4AD] h-5"></div>
      <div className="p-5 lg:p-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 px-6 text-center font-semibold text-lg transition-colors duration-200 ${
                activeTab === 'profile'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile Info
            </button>
            <button
              className={`flex-1 py-4 px-6 text-center font-semibold text-lg transition-colors duration-200 ${
                activeTab === 'billing'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('billing')}
            >
              Billing Info
            </button>
          </div>

          <div className="p-8">
            {/* Profile Info Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">Profile Details</h2>
                <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <User className="w-12 h-12 text-blue-500 mr-4" />
                    <div>
                      <p className="text-xl font-semibold">{user?.user_metadata?.full_name || 'N/A'}</p>
                      <p className="text-gray-600">{user?.email || 'N/A'}</p>
                    </div>
                  </div>
                  <p className="text-lg"><strong>Subscription Tier:</strong> <span className="text-blue-600">{subscriptionInfo.tier}</span></p>
                </div>

                <h3 className="text-2xl font-bold mb-4">User Preferences</h3>
                <form onSubmit={(e) => { e.preventDefault(); savePreferences(); }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                    <select
                      name="contentType"
                      value={preferences.contentType}
                      onChange={handlePreferenceChange}
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Content Type</option>
                      <option value="educational">Educational</option>
                      <option value="motivational">Motivational</option>
                      <option value="storytelling">Storytelling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Post Frequency</label>
                    <select
                      name="postFrequency"
                      value={preferences.postFrequency}
                      onChange={handlePreferenceChange}
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Post Frequency</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      name="timezone"
                      value={preferences.timezone}
                      onChange={handlePreferenceChange}
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Timezone</option>
                      <option value="UTC">UTC</option>
                      <option value="EST">EST</option>
                      <option value="PST">PST</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors duration-200">
                    Save Preferences
                  </button>
                </form>
              </div>
            )}

            {/* Billing Info Tab */}
            {activeTab === 'billing' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-gray-200">Current Subscription</h2>
                <div className="mb-8 bg-gray-50 p-6 rounded-lg shadow">
                  <div className="flex items-center mb-4">
                    <CreditCard className="w-12 h-12 text-blue-500 mr-4" />
                    <div>
                      <p className="text-xl font-semibold">{subscriptionInfo.tier} Plan</p>
                      <p className="text-gray-600">Renews on {subscriptionInfo.renewalDate}</p>
                    </div>
                  </div>
                  <p className="text-lg"><strong>Payment Method:</strong> Credit Card ending in {subscriptionInfo.paymentMethod.slice(-4)}</p>
                </div>

                <div className="mb-8 flex space-x-4">
                  {subscriptionInfo.tier === 'Basic' ? (
                    <button
                      onClick={() => handlePlanChange('upgrade')}
                      className="flex-1 bg-green-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-600 transition-colors duration-200"
                    >
                      Upgrade to Professional
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePlanChange('downgrade')}
                      className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-600 transition-colors duration-200"
                    >
                      Downgrade to Basic
                    </button>
                  )}
                  <button
                    onClick={handleCancelSubscription}
                    className="flex-1 bg-red-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-600 transition-colors duration-200"
                  >
                    Cancel Subscription
                  </button>
                </div>

                <h3 className="text-2xl font-bold mb-4">Payment History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paymentHistory.map((payment, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">{payment.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{payment.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-500 hover:text-blue-700">
                              <Download className="inline-block w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}