import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const WelcomeSection = () => {
  const upcomingTrip = {
    destination: 'Paris, France',
    dates: 'March 15-22, 2024',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80',
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-pink-600 text-white">
      <div className="absolute inset-0">
        <img
          src={upcomingTrip.image}
          alt={upcomingTrip.destination}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 opacity-90" />
      </div>
      
      <div className="relative p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div>
            <p className="text-orange-100 mb-4">Your next adventure awaits</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{upcomingTrip.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{upcomingTrip.dates}</span>
              </div>
            </div>
          </div>
          <button className="md:ml-auto px-6 py-2 bg-white text-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
            View Itinerary
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;