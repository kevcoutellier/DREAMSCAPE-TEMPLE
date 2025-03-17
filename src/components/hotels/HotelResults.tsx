import React from 'react';
import { Star, MapPin, Wifi, Coffee, Building2, Users, Shield } from 'lucide-react';
import type { HotelOffer } from '../../services/api/types';

interface HotelResultsProps {
  hotels: HotelOffer[];
  onSelect: (hotel: HotelOffer) => void;
}

const HotelResults: React.FC<HotelResultsProps> = ({ hotels = [], onSelect }) => {
  return (
    <div className="space-y-4">
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-80 relative group">
              <img
                src={hotel.media[0]?.uri || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80'}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{hotel.chainCode}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      <span>{hotel.rating} Star Hotel</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1 justify-end mb-2">
                    <span className="text-2xl font-bold text-orange-500">
                      {hotel.price.currency} {hotel.price.total}
                    </span>
                    <span className="text-sm text-gray-500">per night</span>
                  </div>
                  <button
                    onClick={() => onSelect(hotel)}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-3 mb-4">
                {hotel.amenities.slice(0, 4).map((amenity, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm"
                  >
                    {amenity === 'WIFI' && <Wifi className="w-4 h-4" />}
                    {amenity === 'RESTAURANT' && <Coffee className="w-4 h-4" />}
                    {amenity === 'BUSINESS_CENTER' && <Building2 className="w-4 h-4" />}
                    {amenity === 'POOL' && <Users className="w-4 h-4" />}
                    {amenity.replace(/_/g, ' ').toLowerCase()}
                  </span>
                ))}
                {hotel.amenities.length > 4 && (
                  <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm">
                    +{hotel.amenities.length - 4} more
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">
                {hotel.description.text}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="px-6 py-3 bg-orange-50 border-t border-orange-100">
            <div className="flex items-center gap-4 text-sm text-orange-600">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                <span>
                  {hotel.policies.find(p => p.type === 'CANCELLATION')?.description.text || 
                   'Flexible booking options available'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {hotels.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Hotels Found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or selecting different dates
          </p>
        </div>
      )}
    </div>
  );
};

export default HotelResults;