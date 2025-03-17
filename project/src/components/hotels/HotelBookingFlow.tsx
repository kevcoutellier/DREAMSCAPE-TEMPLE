import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HotelSearch from './HotelSearch';
import HotelResults from './HotelResults';
import HotelDetails from './HotelDetails';
import type { HotelOffer, HotelSearchParams } from '../../services/api/types';

type BookingStep = 'search' | 'results' | 'details' | 'rooms' | 'payment';

const HotelBookingFlow: React.FC = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<BookingStep>('search');
  const [searchResults, setSearchResults] = useState<HotelOffer[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<HotelOffer | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock hotel search function - replace with actual API call
  const handleSearch = async (params: HotelSearchParams) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock results
      const mockResults: HotelOffer[] = [
        {
          id: '1',
          hotelId: 'HTPAR001',
          chainCode: 'HL',
          name: 'Grand Hotel Paris',
          rating: '4',
          description: {
            text: 'Luxurious hotel in the heart of Paris with stunning views of the Eiffel Tower',
            lang: 'EN'
          },
          amenities: [
            'WIFI',
            'POOL',
            'SPA',
            'RESTAURANT',
            'PARKING',
            'BUSINESS_CENTER'
          ],
          media: [
            {
              uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
              category: 'EXTERIOR'
            }
          ],
          price: {
            currency: 'EUR',
            total: '250.00',
            base: '200.00',
            fees: [
              {
                amount: '30.00',
                type: 'TAX'
              },
              {
                amount: '20.00',
                type: 'SERVICE'
              }
            ],
            grandTotal: '250.00'
          },
          policies: [
            {
              type: 'CANCELLATION',
              description: {
                text: 'Free cancellation up to 24 hours before check-in',
                lang: 'EN'
              }
            }
          ],
          room: {
            type: 'DELUXE',
            typeEstimated: {
              category: 'DELUXE_ROOM',
              beds: 1,
              bedType: 'KING'
            },
            description: {
              text: 'Spacious room with city view',
              lang: 'EN'
            }
          }
        }
      ];

      setSearchResults(mockResults);
      setCurrentStep('results');
    } catch (error) {
      console.error('Hotel search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelSelect = (hotel: HotelOffer) => {
    setSelectedHotel(hotel);
    setCurrentStep('details');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 'search', label: 'Search' },
              { step: 'results', label: 'Select Hotel' },
              { step: 'rooms', label: 'Choose Room' },
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
            <HotelSearch
              onSearch={handleSearch}
              initialValues={location.state}
              loading={loading}
            />
          )}

          {currentStep === 'results' && (
            <div className="space-y-6">
              <HotelSearch
                onSearch={handleSearch}
                initialValues={location.state}
                loading={loading}
              />
              <HotelResults
                hotels={searchResults}
                onSelect={handleHotelSelect}
              />
            </div>
          )}

          {currentStep === 'details' && selectedHotel && (
            <HotelDetails
              hotel={selectedHotel}
              onClose={() => setCurrentStep('results')}
              onBack={() => setCurrentStep('results')}
              onSelectRoom={() => setCurrentStep('rooms')}
            />
          )}

          {currentStep === 'rooms' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold">Select Room</h2>
              <p className="text-gray-600 mt-2">Room selection coming soon...</p>
            </div>
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

export default HotelBookingFlow;