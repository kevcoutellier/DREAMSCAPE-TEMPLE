import React from 'react';
import { Clock, Plane, DollarSign, Star, Shield, Leaf } from 'lucide-react';
import type { FlightOffer } from '../../services/api/types';

interface FlightResultsProps {
  flights: FlightOffer[];
  onSelect: (flight: FlightOffer) => void;
}

const FlightResults: React.FC<FlightResultsProps> = ({ flights, onSelect }) => {
  const formatDuration = (duration: string) => {
    // Convert ISO duration to readable format
    const hours = duration.match(/(\d+)H/)?.[1] || '0';
    const minutes = duration.match(/(\d+)M/)?.[1] || '0';
    return `${hours}h ${minutes}m`;
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Calculate estimated CO2 emissions based on distance and aircraft type
  // This is a simplified calculation for demonstration
  const calculateCO2Emissions = (segment: FlightOffer['itineraries'][0]['segments'][0]) => {
    // Average CO2 emissions per passenger per kilometer
    const emissionsPerKm = 0.115; // kg CO2
    
    // Estimate distance based on flight duration (rough estimation)
    const durationMatch = segment.duration.match(/(\d+)H/);
    const hours = durationMatch ? parseInt(durationMatch[1]) : 0;
    const estimatedDistance = hours * 800; // Assume average speed of 800 km/h
    
    return Math.round(estimatedDistance * emissionsPerKm);
  };

  return (
    <div className="space-y-4">
      {flights.map((flight) => {
        const firstSegment = flight.itineraries[0]?.segments[0];
        if (!firstSegment) return null;

        const co2Emissions = calculateCO2Emissions(firstSegment);

        return (
          <div
            key={flight.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* Airline Logo/Info */}
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Plane className="w-8 h-8 text-gray-400" />
                  </div>

                  {/* Flight Details */}
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-lg font-semibold">
                        {firstSegment.departure.iataCode} → {firstSegment.arrival.iataCode}
                      </div>
                      <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
                        {flight.oneWay ? 'One Way' : 'Round Trip'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(firstSegment.departure.at)}</span>
                      </div>
                      <div>•</div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>{flight.pricingOptions.fareType[0]}</span>
                      </div>
                      <div>•</div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{firstSegment.carrierCode} {firstSegment.number}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="text-right">
                  <div className="flex items-baseline gap-1 justify-end mb-2">
                    <span className="text-2xl font-bold text-orange-500">
                      {flight.price.currency} {flight.price.total}
                    </span>
                    <span className="text-sm text-gray-500">per person</span>
                  </div>
                  <button
                    onClick={() => onSelect(flight)}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Select Flight
                  </button>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="px-6 py-3 bg-orange-50 border-t border-orange-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-orange-600">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>Flexible booking</span>
                  </div>
                  <div>•</div>
                  <div>Free cancellation within 24h</div>
                </div>
                {/* CO2 Emissions */}
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Leaf className="w-4 h-4" />
                  <span>{co2Emissions} kg CO₂e per passenger</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {flights.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Flights Found</h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or selecting different dates
          </p>
        </div>
      )}
    </div>
  );
};

export default FlightResults;