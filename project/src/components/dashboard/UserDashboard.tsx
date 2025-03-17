import React from 'react';
import WelcomeSection from './WelcomeSection';
import RecommendationsSection from './RecommendationsSection';
import SavedItineraries from './SavedItineraries';
import TravelPreferences from './TravelPreferences';
import TripHistory from './TripHistory';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <WelcomeSection />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <RecommendationsSection />
            <SavedItineraries />
            <TripHistory />
          </div>
          <div className="lg:col-span-1">
            <TravelPreferences />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;