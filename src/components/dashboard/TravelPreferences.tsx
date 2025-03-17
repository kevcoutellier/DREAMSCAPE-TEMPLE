import React from 'react';
import { Sliders, Tag, Compass, Palette } from 'lucide-react';

const TravelPreferences = () => {
  const preferences = {
    travelStyle: ['Adventure', 'Cultural', 'Relaxation'],
    budget: 'Medium',
    preferredDestinations: ['Europe', 'Asia'],
    interests: ['Photography', 'Food', 'History']
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Travel Profile</h2>
        <button className="p-2 text-gray-500 hover:text-orange-500 transition-colors">
          <Sliders className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Compass className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-medium text-gray-700">Travel Style</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferences.travelStyle.map((style, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm"
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-medium text-gray-700">Budget Level</h3>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600">Preferred Budget</span>
            <span className="font-medium text-gray-800">{preferences.budget}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-medium text-gray-700">Interests</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferences.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
          Update Preferences
        </button>
      </div>
    </div>
  );
};

export default TravelPreferences;