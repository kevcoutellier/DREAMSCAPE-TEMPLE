import React from 'react';
import { History, Sparkles } from 'lucide-react';
import ExperienceCard from '../features/ExperienceCard';

const RecommendationsSection = () => {
  const recentSearches = [
    "Beach resorts in Bali",
    "Cultural tours in Kyoto",
    "Mountain retreats in Switzerland"
  ];

  const recommendations = [
    {
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
      title: "Tokyo Night Tour",
      location: "Tokyo, Japan",
      type: "Cultural",
      duration: "4 hours",
      priceRange: "80-120",
      rating: 4.8
    },
    {
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
      title: "Desert Safari",
      location: "Dubai, UAE",
      type: "Adventure",
      duration: "6 hours",
      priceRange: "150-200",
      rating: 4.9
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">For You</h2>
        <button className="text-orange-500 hover:text-orange-600 transition-colors">
          View All
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-700">Recent Searches</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-50 text-gray-700 rounded-full hover:bg-orange-50 hover:text-orange-500 transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-medium text-gray-700">AI Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((recommendation, index) => (
            <ExperienceCard key={index} {...recommendation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsSection;