import React from 'react';
import { motion } from 'framer-motion';
import { Headset as VrHeadset, Star, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResultsProps {
  onVRPreview: (id: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ onVRPreview }) => {
  const navigate = useNavigate();

  const results = [
    {
      id: 'paris-1',
      title: 'Romantic Paris Getaway',
      location: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80',
      rating: 4.9,
      reviews: 128,
      price: '€299',
      availability: 'Available from June 15',
      type: 'Cultural',
      features: ['City View', 'Near Metro', 'Historic District']
    },
    {
      id: 'tokyo-1',
      title: 'Modern Tokyo Experience',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80',
      rating: 4.8,
      reviews: 95,
      price: '¥35,000',
      availability: 'Available from July 1',
      type: 'Urban',
      features: ['City Center', 'Modern Design', 'Shopping District']
    }
  ];

  return (
    <div className="space-y-6">
      {results.map((result) => (
        <motion.div
          key={result.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-80 relative group">
              <img
                src={result.image}
                alt={result.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onVRPreview(result.id)}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <VrHeadset className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{result.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      <span>{result.rating} ({result.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{result.price}</div>
                  <span className="text-sm text-gray-500">per night</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {result.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{result.availability}</span>
                </div>
                <button 
                  onClick={() => navigate(`/destination/${result.id}`)}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SearchResults;