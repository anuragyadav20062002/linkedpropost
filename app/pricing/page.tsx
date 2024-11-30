'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [selectedTier, setSelectedTier] = useState<number | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tier = params.get('tier')
    if (tier) {
      setSelectedTier(Number(tier))
    }
  }, [])

  async function selectPlan(tier: number) {
    setLoading(true)
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        router.push('/auth/signin')
        return
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          subscription_tier: tier,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      router.push('/dashboard')
    } catch (error) {
      console.error('Error selecting plan:', error)
    } finally {
      setLoading(false)
    }
  }

  const plans = [
    {
      tier: 1,
      name: "Basic Plan",
      price: 8,
    },
    {
      tier: 2,
      name: "Professional Plan",
      price: 15,
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.tier} 
            className={`border rounded-lg p-6 ${
              selectedTier === plan.tier ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <h2 className="text-xl font-bold">{plan.name}</h2>
            <p className="text-2xl font-bold mt-2">${plan.price}/month</p>
            <button
              onClick={() => selectPlan(plan.tier)}
              disabled={loading}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 