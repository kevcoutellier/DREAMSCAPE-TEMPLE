import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

const TripOptimizer = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-orange-500" />
        <h2 className="text-lg font-semibold">AI Trip Optimizer</h2>
      </div>
      
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Our AI can help optimize your itinerary based on:
        </div>
        
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Opening hours of attractions
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Weather conditions
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Travel time between locations
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Crowd predictions
          </li>
        </ul>

        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
          <RotateCcw className="w-4 h-4" />
          Optimize Itinerary
        </button>
      </div>
    </div>
  );
};

export default TripOptimizer;