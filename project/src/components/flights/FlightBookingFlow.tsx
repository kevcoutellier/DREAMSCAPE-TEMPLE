import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FlightSearch from './FlightSearch';
import FlightResults from './FlightResults';
import FlightDetails from './FlightDetails';
import PassengerInfo from './PassengerInfo';
import type { FlightOffer, FlightSearchParams } from '../../services/api/types';

type BookingStep = 'search' | 'results' | 'details' | 'passengers' | 'payment';

const FlightBookingFlow: React.FC = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<BookingStep>('search');
  const [searchResults, setSearchResults] = useState<FlightOffer[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock flight search function - replace with actual API call
  const handleSearch = async (params: FlightSearchParams) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock results
      const mockResults: FlightOffer[] = [
        {
          id: '1',
          source: 'GDS',
          instantTicketingRequired: false,
          nonHomogeneous: false,
          oneWay: false,
          lastTicketingDate: '2024-03-20',
          numberOfBookableSeats: 4,
          itineraries: [
            {
              duration: 'PT3H20M',
              segments: [
                {
                  departure: {
                    iataCode: params.origin.toUpperCase(),
                    terminal: '2',
                    at: '2024-03-20T10:00:00'
                  },
                  arrival: {
                    iataCode: params.destination.toUpperCase(),
                    terminal: '4',
                    at: '2024-03-20T13:20:00'
                  },
                  carrierCode: 'AF',
                  number: '1234',
                  aircraft: {
                    code: '320'
                  },
                  duration: 'PT3H20M',
                  id: 'seg1',
                  numberOfStops: 0,
                  blacklistedInEU: false
                }
              ]
            }
          ],
          price: {
            currency: 'EUR',
            total: '350.00',
            base: '300.00',
            fees: [
              {
                amount: '30.00',
                type: 'SUPPLIER'
              },
              {
                amount: '20.00',
                type: 'TICKETING'
              }
            ],
            grandTotal: '350.00'
          },
          pricingOptions: {
            fareType: ['PUBLISHED'],
            includedCheckedBagsOnly: true
          },
          validatingAirlineCodes: ['AF'],
          travelerPricings: []
        }
      ];

      setSearchResults(mockResults);
      setCurrentStep('results');
    } catch (error) {
      console.error('Flight search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFlightSelect = (flight: FlightOffer) => {
    setSelectedFlight(flight);
    setCurrentStep('details');
  };

  const handleFlightAccept = (flight: FlightOffer) => {
    setSelectedFlight(flight);
    setCurrentStep('passengers');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 'search', label: 'Search' },
              { step: 'results', label: 'Select Flight' },
              { step: 'passengers', label: 'Passenger Info' },
              { step: 'payment', label: 'Payment' }
            ].map(({ step, label }, index) => (
              <div
                key={step}
                className="flex items-center"
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep === step
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-600">
                  {label}
                </div>
                {index < 3 && (
                  <div className="w-24 h-0.5 mx-2 bg-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === 'search' && (
            <FlightSearch
              onSearch={handleSearch}
              initialValues={location.state}
              loading={loading}
            />
          )}

          {currentStep === 'results' && (
            <div className="space-y-6">
              <FlightSearch
                onSearch={handleSearch}
                initialValues={location.state}
                loading={loading}
              />
              <FlightResults
                flights={searchResults}
                onSelect={handleFlightSelect}
              />
            </div>
          )}

          {currentStep === 'details' && selectedFlight && (
            <FlightDetails
              flight={selectedFlight}
              onClose={() => setCurrentStep('results')}
              onBack={() => setCurrentStep('results')}
              onAccept={handleFlightAccept}
            />
          )}

          {currentStep === 'passengers' && selectedFlight && (
            <PassengerInfo
              flight={selectedFlight}
              onBack={() => setCurrentStep('details')}
              onContinue={(passengerDetails) => {
                console.log('Passenger details:', passengerDetails);
                setCurrentStep('payment');
              }}
            />
          )}

          {currentStep === 'payment' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold">Payment</h2>
              <p className="text-gray-600 mt-2">Payment implementation coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightBookingFlow;