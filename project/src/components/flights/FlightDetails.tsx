import React, { useState } from 'react';
import { 
  Plane,
  Clock,
  Calendar,
  Users,
  Luggage,
  Shield,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  X
} from 'lucide-react';
import type { FlightOffer } from '../../services/api/types';

interface FlightDetailsProps {
  flight: FlightOffer;
  onClose: () => void;
  onAccept: (flight: FlightOffer) => void;
  onBack: () => void;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({
  flight,
  onClose,
  onAccept,
  onBack
}) => {
  const [showFareRules, setShowFareRules] = useState(false);
  const [showBaggage, setShowBaggage] = useState(false);

  const formatDuration = (duration: string) => {
    // Convert ISO duration to readable format
    const hours = duration.match(/(\d+)H/)?.[1] || '0';
    const minutes = duration.match(/(\d+)M/)?.[1] || '0';
    return `${hours}h ${minutes}m`;
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      date: date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })
    };
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Flight Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Flight Summary */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                <Plane className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500">
                  {flight.itineraries[0].segments[0].carrierCode} 
                  {flight.itineraries[0].segments[0].number}
                </div>
                <div className="font-medium">
                  {flight.itineraries[0].segments[0].departure.iataCode} → 
                  {flight.itineraries[0].segments[0].arrival.iataCode}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {flight.price.currency} {flight.price.total}
              </div>
              <div className="text-sm text-gray-500">per passenger</div>
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="p-6 space-y-8">
          {/* Itinerary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Flight Itinerary</h3>
            {flight.itineraries[0].segments.map((segment, index) => {
              const departure = formatDateTime(segment.departure.at);
              const arrival = formatDateTime(segment.arrival.at);
              
              return (
                <div key={segment.id} className="relative flex gap-4">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">
                      {departure.time}
                    </div>
                    <div className="w-0.5 h-20 bg-gray-200" />
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">
                      {arrival.time}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Departure */}
                    <div className="mb-6">
                      <div className="font-medium">{segment.departure.iataCode}</div>
                      <div className="text-sm text-gray-600">{departure.date}</div>
                      {segment.departure.terminal && (
                        <div className="text-sm text-gray-500">
                          Terminal {segment.departure.terminal}
                        </div>
                      )}
                    </div>

                    {/* Flight Info */}
                    <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(segment.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Plane className="w-4 h-4" />
                        <span>{segment.carrierCode} {segment.number}</span>
                      </div>
                    </div>

                    {/* Arrival */}
                    <div>
                      <div className="font-medium">{segment.arrival.iataCode}</div>
                      <div className="text-sm text-gray-600">{arrival.date}</div>
                      {segment.arrival.terminal && (
                        <div className="text-sm text-gray-500">
                          Terminal {segment.arrival.terminal}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fare Rules */}
          <div>
            <button
              onClick={() => setShowFareRules(!showFareRules)}
              className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Fare Rules & Conditions</span>
              </div>
              {showFareRules ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {showFareRules && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Cancellation Policy</div>
                    <p className="text-gray-600">
                      Cancellation permitted up to 24 hours before departure for a fee.
                      After that, tickets are non-refundable.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Change Policy</div>
                    <p className="text-gray-600">
                      Flight changes allowed subject to fare difference and change fee.
                      Must be made at least 3 hours before departure.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Baggage Information */}
          <div>
            <button
              onClick={() => setShowBaggage(!showBaggage)}
              className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Luggage className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Baggage Information</span>
              </div>
              {showBaggage ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {showBaggage && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium mb-2">Cabin Baggage</h4>
                    <p className="text-sm text-gray-600">
                      1 personal item (under seat) - max 8 kg<br />
                      1 carry-on bag (overhead) - max 10 kg
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <h4 className="font-medium mb-2">Checked Baggage</h4>
                    <p className="text-sm text-gray-600">
                      {flight.pricingOptions.includedCheckedBagsOnly
                        ? '1 checked bag included - max 23 kg'
                        : 'No checked bags included - available for purchase'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Price Breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Base fare</span>
                <span>{flight.price.currency} {flight.price.base}</span>
              </div>
              {flight.price.fees.map((fee, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-gray-600">{fee.type}</span>
                  <span>{flight.price.currency} {fee.amount}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                <span>Total Price</span>
                <span>{flight.price.currency} {flight.price.grandTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back to Results
            </button>
            <button
              onClick={() => onAccept(flight)}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <span>Continue to Booking</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;