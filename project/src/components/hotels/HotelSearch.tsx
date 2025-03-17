import React, { useState } from 'react';
import { Building2, Calendar, Users, Search } from 'lucide-react';
import { useHotelSearch } from '../../hooks/useAPI';
import DateRangePicker from '../shared/DateRangePicker';
import Dropdown from '../shared/Dropdown';
import type { HotelSearchParams } from '../../services/api/types';

interface HotelSearchProps {
  onSearch: (params: HotelSearchParams) => void;
  initialValues?: HotelSearchParams | null;
  loading?: boolean;
}

const HotelSearch: React.FC<HotelSearchProps> = ({
  onSearch,
  initialValues,
  loading = false
}) => {
  const [searchParams, setSearchParams] = useState<HotelSearchParams>({
    cityCode: initialValues?.cityCode || '',
    checkInDate: initialValues?.checkInDate || '',
    checkOutDate: initialValues?.checkOutDate || '',
    roomQuantity: initialValues?.roomQuantity || 1,
    adults: initialValues?.adults || 2
  });

  const handleDateChange = ({ startDate, endDate }: { startDate: Date | null; endDate: Date | null }) => {
    setSearchParams({
      ...searchParams,
      checkInDate: startDate ? startDate.toISOString() : '',
      checkOutDate: endDate ? endDate.toISOString() : ''
    });
  };

  const handleSearch = () => {
    onSearch(searchParams);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold mb-6">Find Your Perfect Stay</h2>
      
      <div className="space-y-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Where are you going?"
              value={searchParams.cityCode}
              onChange={(e) => setSearchParams({ ...searchParams, cityCode: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in / Check-out
          </label>
          <DateRangePicker
            onChange={handleDateChange}
            value={{
              startDate: searchParams.checkInDate ? new Date(searchParams.checkInDate) : null,
              endDate: searchParams.checkOutDate ? new Date(searchParams.checkOutDate) : null
            }}
            minDate={new Date()}
          />
        </div>

        {/* Rooms & Guests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rooms
            </label>
            <Dropdown
              options={[
                { value: '1', label: '1 Room' },
                { value: '2', label: '2 Rooms' },
                { value: '3', label: '3 Rooms' },
                { value: '4', label: '4 Rooms' }
              ]}
              value={searchParams.roomQuantity.toString()}
              onChange={(value) => setSearchParams({ ...searchParams, roomQuantity: parseInt(value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guests
            </label>
            <Dropdown
              options={[
                { value: '1', label: '1 Guest' },
                { value: '2', label: '2 Guests' },
                { value: '3', label: '3 Guests' },
                { value: '4', label: '4 Guests' }
              ]}
              value={searchParams.adults.toString()}
              onChange={(value) => setSearchParams({ ...searchParams, adults: parseInt(value) })}
              icon={<Users className="w-5 h-5 text-gray-400" />}
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
              <span>Search Hotels</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default HotelSearch;