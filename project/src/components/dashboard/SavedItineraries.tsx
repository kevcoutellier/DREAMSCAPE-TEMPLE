import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const SavedItineraries = () => {
  const itineraries = [
    {
      title: "Summer in Europe",
      destinations: ["Paris", "Rome", "Barcelona"],
      duration: "14 days",
      startDate: "June 15, 2024",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80",
      progress: 70
    },
    {
      title: "Asian Adventure",
      destinations: ["Tokyo", "Seoul", "Bangkok"],
      duration: "12 days",
      startDate: "September 3, 2024",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80",
      progress: 30
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Saved Itineraries</h2>
        <button className="text-orange-500 hover:text-orange-600 transition-colors">
          Create New
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {itineraries.map((itinerary, index) => (
          <div key={index} className="group relative overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={itinerary.image}
                alt={itinerary.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{itinerary.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{itinerary.destinations.join(", ")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{itinerary.duration}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{itinerary.startDate}</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Planning Progress</span>
                  <span className="text-sm font-medium text-gray-700">{itinerary.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${itinerary.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedItineraries;