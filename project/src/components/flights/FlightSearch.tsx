import React, { useState } from 'react';
import { Plane, Calendar, Users, Search, AlertCircle } from 'lucide-react';
import { useFlightSearch } from '../../hooks/useAPI';
import DateRangePicker from '../shared/DateRangePicker';
import Dropdown from '../shared/Dropdown';
import type { FlightSearchParams } from '../../services/api/types';

interface ValidationErrors {
  origin?: string;
  destination?: string;
  dates?: string;
  passengers?: string;
}

interface FlightSearchProps {
  onSearch: (params: FlightSearchParams) => void;
  initialValues?: FlightSearchParams | null;
  loading?: boolean;
}

const FlightSearch: React.FC<FlightSearchProps> = ({ 
  onSearch, 
  initialValues,
  loading = false
}) => {
  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    origin: initialValues?.origin || '',
    destination: initialValues?.destination || '',
    departureDate: initialValues?.departureDate || '',
    returnDate: initialValues?.returnDate || '',
    adults: initialValues?.adults || 1,
    cabinClass: initialValues?.cabinClass || 'economy'
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [showErrors, setShowErrors] = useState(false);

  const validateSearch = (): boolean => {
    const errors: ValidationErrors = {};

    // Origin validation
    if (!searchParams.origin.trim()) {
      errors.origin = 'Please enter a departure city';
    } else if (searchParams.origin.length < 3) {
      errors.origin = 'Please enter a valid city name';
    }

    // Destination validation
    if (!searchParams.destination.trim()) {
      errors.destination = 'Please enter an arrival city';
    } else if (searchParams.destination.length < 3) {
      errors.destination = 'Please enter a valid city name';
    }

    // Same city validation
    if (searchParams.origin.trim().toLowerCase() === searchParams.destination.trim().toLowerCase()) {
      errors.destination = 'Departure and arrival cities cannot be the same';
    }

    // Date validation
    if (!searchParams.departureDate) {
      errors.dates = 'Please select a departure date';
    } else {
      const departureDate = new Date(searchParams.departureDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (departureDate < today) {
        errors.dates = 'Departure date cannot be in the past';
      }

      if (searchParams.returnDate) {
        const returnDate = new Date(searchParams.returnDate);
        if (returnDate < departureDate) {
          errors.dates = 'Return date must be after departure date';
        }
      }
    }

    // Passenger validation
    if (searchParams.adults < 1) {
      errors.passengers = 'At least one adult passenger is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSearch = () => {
    setShowErrors(true);
    if (!validateSearch()) {
      return;
    }
    onSearch(searchParams);
  };

  const handleDateChange = ({ startDate, endDate }: { startDate: Date | null; endDate: Date | null }) => {
    setSearchParams({
      ...searchParams,
      departureDate: startDate ? startDate.toISOString() : '',
      returnDate: endDate ? endDate.toISOString() : ''
    });
    if (showErrors) validateSearch();
  };

  const renderError = (field: keyof ValidationErrors) => {
    if (showErrors && validationErrors[field]) {
      return (
        <div className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          <span>{validationErrors[field]}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Find Your Flight</h2>
      
      <div className="space-y-6">
        {/* Origin & Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter city or airport"
                value={searchParams.origin}
                onChange={(e) => {
                  setSearchParams({ ...searchParams, origin: e.target.value });
                  if (showErrors) validateSearch();
                }}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                  showErrors && validationErrors.origin ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {renderError('origin')}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter city or airport"
                value={searchParams.destination}
                onChange={(e) => {
                  setSearchParams({ ...searchParams, destination: e.target.value });
                  if (showErrors) validateSearch();
                }}
                className={`w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                  showErrors && validationErrors.destination ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90" />
            </div>
            {renderError('destination')}
          </div>
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Travel Dates
          </label>
          <DateRangePicker
            onChange={handleDateChange}
            value={{
              startDate: searchParams.departureDate ? new Date(searchParams.departureDate) : null,
              endDate: searchParams.returnDate ? new Date(searchParams.returnDate) : null
            }}
            minDate={new Date()}
          />
          {renderError('dates')}
        </div>

        {/* Passengers & Class */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Passengers
            </label>
            <Dropdown
              options={[
                { value: '1', label: '1 Adult' },
                { value: '2', label: '2 Adults' },
                { value: '3', label: '3 Adults' },
                { value: '4', label: '4 Adults' }
              ]}
              value={searchParams.adults.toString()}
              onChange={(value) => {
                setSearchParams({ ...searchParams, adults: parseInt(value) });
                if (showErrors) validateSearch();
              }}
              icon={<Users className="w-5 h-5 text-gray-400" />}
            />
            {renderError('passengers')}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cabin Class
            </label>
            <Dropdown
              options={[
                { value: 'economy', label: 'Economy' },
                { value: 'premium', label: 'Premium Economy' },
                { value: 'business', label: 'Business' },
                { value: 'first', label: 'First Class' }
              ]}
              value={searchParams.cabinClass}
              onChange={(value) => setSearchParams({ 
                ...searchParams, 
                cabinClass: value as 'economy' | 'premium' | 'business' | 'first'
              })}
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Search Flights</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;