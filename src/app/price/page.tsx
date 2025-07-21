'use client';

import { useState } from 'react';

type Plan = {
  title: string;
  price: string;
  features: string[];
};

type Tab = 'monthly' | 'yearly' | 'lifetime';

const plans: Record<Tab, Plan[]> = {
  monthly: [
    {
      title: 'Free',
      price: '₹0/mo',
      features: ['5 captions/day', 'Basic tone presets'],
    },
    {
      title: 'Pro',
      price: '₹299/mo',
      features: ['Unlimited captions', 'Auto emojis', 'Platform-aware hooks'],
    },
    {
      title: 'Ultra',
      price: '₹499/mo',
      features: ['Everything in Pro', 'NSFW mode 😈', 'Priority support'],
    },
  ],
  yearly: [
    {
      title: 'Free',
      price: '₹0/yr',
      features: ['5 captions/day', 'Basic tone presets'],
    },
    {
      title: 'Pro',
      price: '₹2499/yr',
      features: ['Unlimited captions', 'Auto emojis', 'Platform-aware hooks'],
    },
    {
      title: 'Ultra',
      price: '₹3999/yr',
      features: ['Everything in Pro', 'NSFW mode 😈', 'Priority support'],
    },
  ],
  lifetime: [
    {
      title: 'One-Time Deal',
      price: '₹9999',
      features: ['Lifetime Pro access', 'All future features', 'Founder badge 🔥'],
    },
  ],
};

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<Tab>('monthly');

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-10 space-x-4">
        {(['monthly', 'yearly', 'lifetime'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              activeTab === tab
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Plan Cards */}
      <div
        className={`grid ${
          plans[activeTab].length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
        } gap-6 max-w-5xl mx-auto`}
      >
        {plans[activeTab].map((plan, index) => (
          <div
            key={index}
            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-700 shadow-xl flex flex-col"
          >
            <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
            <p className="text-xl mb-4 text-zinc-400">{plan.price}</p>
            <ul className="mb-6 flex-1 space-y-2 text-sm">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span>✅</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <button className="mt-auto bg-white text-black px-4 py-2 rounded font-bold hover:bg-zinc-200">
              {plan.price.startsWith('₹0') ? 'Get Started' : 'Subscribe'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
