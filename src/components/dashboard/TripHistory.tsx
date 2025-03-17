import React from 'react';
import { MapPin, Calendar, Star } from 'lucide-react';

const TripHistory = () => {
  const trips = [
    {
      destination: "Kyoto, Japan",
      dates: "November 10-20, 2023",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80",
      rating: 5,
      highlights: ["Cultural Tours", "Temple Visits", "Tea Ceremony"]
    },
    {
      destination: "Santorini, Greece",
      dates: "August 5-12, 2023",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80",
      rating: 4.5,
      highlights: ["Sunset Cruise", "Wine Tasting", "Beach Hopping"]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Trip History</h2>
      
      <div className="space-y-6">
        {trips.map((trip, index) => (
          <div key={index} className="relative">
            {index !== trips.length - 1 && (
              <div className="absolute left-6 top-24 bottom-0 w-0.5 bg-gray-200" />
            )}
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{trip.destination}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      <span className="text-sm text-gray-600">{trip.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{trip.dates}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {trip.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white text-gray-600 rounded-full text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHistory;