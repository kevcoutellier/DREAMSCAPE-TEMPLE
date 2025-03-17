import React, { useState } from 'react';
import { 
  Compass, 
  Hotel, 
  Users, 
  Camera, 
  Utensils, 
  Mountain, 
  ShoppingBag, 
  Globe,
  Calendar,
  DollarSign,
  Sun,
  Building2,
  Heart,
  Languages,
  Sparkles,
  Save
} from 'lucide-react';

interface TravelPreferences {
  travelStyle: {
    pace: 'relaxed' | 'moderate' | 'fast-paced';
    accommodation: string[];
    groupSize: string;
  };
  interests: string[];
  tripParameters: {
    averageDuration: string;
    dailyBudget: number;
    preferredSeasons: string[];
    mobilityRequirements: string;
  };
  destinationPreferences: {
    favoritePlaces: string[];
    dreamDestinations: string[];
    climatePreference: string[];
    urbanRuralPreference: number;
  };
  specialRequirements: {
    dietaryRestrictions: string[];
    accessibilityNeeds: string[];
    languages: string[];
    mustHaveAmenities: string[];
  };
}

interface TravelPreferencesFormProps {
  initialPreferences?: TravelPreferences;
  onSave: (preferences: TravelPreferences) => void;
}

const TravelPreferencesForm: React.FC<TravelPreferencesFormProps> = ({
  initialPreferences,
  onSave
}) => {
  const [preferences, setPreferences] = useState<TravelPreferences>(
    initialPreferences || {
      travelStyle: {
        pace: 'moderate',
        accommodation: [],
        groupSize: 'solo'
      },
      interests: [],
      tripParameters: {
        averageDuration: 'week',
        dailyBudget: 200,
        preferredSeasons: [],
        mobilityRequirements: ''
      },
      destinationPreferences: {
        favoritePlaces: [],
        dreamDestinations: [],
        climatePreference: [],
        urbanRuralPreference: 3
      },
      specialRequirements: {
        dietaryRestrictions: [],
        accessibilityNeeds: [],
        languages: [],
        mustHaveAmenities: []
      }
    }
  );

  const handleSave = () => {
    onSave(preferences);
  };

  const updatePreference = (
    category: keyof TravelPreferences,
    subcategory: string,
    value: any
  ) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: value
      }
    }));
  };

  const toggleArrayItem = (
    category: keyof TravelPreferences,
    subcategory: string,
    item: string
  ) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: prev[category][subcategory].includes(item)
          ? prev[category][subcategory].filter(i => i !== item)
          : [...prev[category][subcategory], item]
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Travel Preferences</h1>
        </div>
        <p className="text-white/90">
          Help us personalize your travel experiences by sharing your preferences
        </p>
      </div>

      {/* Travel Style */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Travel Style</h2>
        
        {/* Travel Pace */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Travel Pace
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['relaxed', 'moderate', 'fast-paced'].map((pace) => (
              <button
                key={pace}
                onClick={() => updatePreference('travelStyle', 'pace', pace)}
                className={`p-4 rounded-lg text-center transition-colors ${
                  preferences.travelStyle.pace === pace
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="capitalize">{pace}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accommodation Types */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accommodation Preferences
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Luxury', 'Mid-range', 'Budget', 'Mixed'].map((type) => (
              <button
                key={type}
                onClick={() => toggleArrayItem('travelStyle', 'accommodation', type)}
                className={`flex items-center gap-2 p-4 rounded-lg transition-colors ${
                  preferences.travelStyle.accommodation.includes(type)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Hotel className="w-5 h-5" />
                <span>{type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Group Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Group Size
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Solo', 'Couple', 'Family', 'Group'].map((size) => (
              <button
                key={size}
                onClick={() => updatePreference('travelStyle', 'groupSize', size.toLowerCase())}
                className={`flex items-center gap-2 p-4 rounded-lg transition-colors ${
                  preferences.travelStyle.groupSize === size.toLowerCase()
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>{size}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Interests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Cultural Experiences', icon: Globe },
            { label: 'Nature & Outdoors', icon: Mountain },
            { label: 'Food & Culinary', icon: Utensils },
            { label: 'Adventure Sports', icon: Compass },
            { label: 'Shopping & Entertainment', icon: ShoppingBag },
            { label: 'Photography', icon: Camera },
            { label: 'Local Community', icon: Users }
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => toggleArrayItem('interests', 'interests', label)}
              className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                preferences.interests.includes(label)
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trip Parameters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Trip Parameters</h2>
        
        {/* Average Duration */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Trip Duration
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'weekend', label: 'Weekend' },
              { value: 'week', label: '1 Week' },
              { value: 'extended', label: '2+ Weeks' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => updatePreference('tripParameters', 'averageDuration', value)}
                className={`flex items-center gap-2 p-4 rounded-lg transition-colors ${
                  preferences.tripParameters.averageDuration === value
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Budget */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Daily Budget (USD)
          </label>
          <div className="relative">
            <input
              type="number"
              value={preferences.tripParameters.dailyBudget}
              onChange={(e) => updatePreference('tripParameters', 'dailyBudget', parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              placeholder="Enter your daily budget"
              min="0"
              step="10"
            />
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Preferred Seasons */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Seasons
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Spring', 'Summer', 'Fall', 'Winter'].map((season) => (
              <button
                key={season}
                onClick={() => toggleArrayItem('tripParameters', 'preferredSeasons', season)}
                className={`flex items-center gap-2 p-4 rounded-lg transition-colors ${
                  preferences.tripParameters.preferredSeasons.includes(season)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span>{season}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobility Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobility Requirements
          </label>
          <textarea
            value={preferences.tripParameters.mobilityRequirements}
            onChange={(e) => updatePreference('tripParameters', 'mobilityRequirements', e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            placeholder="Describe any mobility requirements or restrictions..."
            rows={3}
          />
        </div>
      </div>

      {/* Destination Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Destination Preferences</h2>

        {/* Favorite Places */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Favorite Destinations
          </label>
          <div className="flex flex-wrap gap-2">
            {preferences.destinationPreferences.favoritePlaces.map((place, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm flex items-center gap-1"
              >
                <Heart className="w-4 h-4" />
                {place}
                <button
                  onClick={() => {
                    const newPlaces = preferences.destinationPreferences.favoritePlaces.filter(
                      (_, i) => i !== index
                    );
                    updatePreference('destinationPreferences', 'favoritePlaces', newPlaces);
                  }}
                  className="ml-1 hover:text-orange-700"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add destination..."
              className="px-3 py-1 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value.trim()) {
                    const newPlaces = [...preferences.destinationPreferences.favoritePlaces, input.value];
                    updatePreference('destinationPreferences', 'favoritePlaces', newPlaces);
                    input.value = '';
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Dream Destinations */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dream Destinations
          </label>
          <div className="flex flex-wrap gap-2">
            {preferences.destinationPreferences.dreamDestinations.map((place, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-sm flex items-center gap-1"
              >
                <Sparkles className="w-4 h-4" />
                {place}
                <button
                  onClick={() => {
                    const newPlaces = preferences.destinationPreferences.dreamDestinations.filter(
                      (_, i) => i !== index
                    );
                    updatePreference('destinationPreferences', 'dreamDestinations', newPlaces);
                  }}
                  className="ml-1 hover:text-pink-700"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add dream destination..."
              className="px-3 py-1 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value.trim()) {
                    const newPlaces = [...preferences.destinationPreferences.dreamDestinations, input.value];
                    updatePreference('destinationPreferences', 'dreamDestinations', newPlaces);
                    input.value = '';
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Climate Preferences */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Climate Preferences
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Tropical', 'Mediterranean', 'Alpine', 'Desert', 'Temperate', 'Arctic'].map((climate) => (
              <button
                key={climate}
                onClick={() => toggleArrayItem('destinationPreferences', 'climatePreference', climate)}
                className={`flex items-center gap-2 p-4 rounded-lg transition-colors ${
                  preferences.destinationPreferences.climatePreference.includes(climate)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span>{climate}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Urban vs Rural Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urban vs Rural Preference
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="5"
              value={preferences.destinationPreferences.urbanRuralPreference}
              onChange={(e) => updatePreference(
                'destinationPreferences',
                'urbanRuralPreference',
                parseInt(e.target.value)
              )}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Rural</span>
              <span>Mixed</span>
              <span>Urban</span>
            </div>
          </div>
        </div>
      </div>

      {/* Special Requirements */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Special Requirements</h2>

        {/* Dietary Restrictions */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dietary Restrictions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Vegetarian',
              'Vegan',
              'Gluten-free',
              'Halal',
              'Kosher',
              'Dairy-free'
            ].map((diet) => (
              <button
                key={diet}
                onClick={() => toggleArrayItem('specialRequirements', 'dietaryRestrictions', diet)}
                className={`flex items-center gap-2 p-4 rounded-lg transition-colors ${
                  preferences.specialRequirements.dietaryRestrictions.includes(diet)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Utensils className="w-5 h-5" />
                <span>{diet}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language Preferences
          </label>
          <div className="flex flex-wrap gap-2">
            {preferences.specialRequirements.languages.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm flex items-center gap-1"
              >
                <Languages className="w-4 h-4" />
                {lang}
                <button
                  onClick={() => {
                    const newLangs = preferences.specialRequirements.languages.filter(
                      (_, i) => i !== index
                    );
                    updatePreference('specialRequirements', 'languages', newLangs);
                  }}
                  className="ml-1 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add language..."
              className="px-3 py-1 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const input = e.target as HTMLInputElement;
                  if (input.value.trim()) {
                    const newLangs = [...preferences.specialRequirements.languages, input.value];
                    updatePreference('specialRequirements', 'languages', newLangs);
                    input.value = '';
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Must-Have Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Must-Have Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Wi-Fi',
              'Air Conditioning',
              'Private Bathroom',
              'Kitchen',
              'Elevator',
              'Parking'
            ].map((amenity) => (
              <button
                key={amenity}
                onClick={() => toggleArrayItem('specialRequirements', 'mustHaveAmenities', amenity)}
                className={`flex items-center gap-2 p-4 rounded-lg transition-colors ${
                  preferences.specialRequirements.mustHaveAmenities.includes(amenity)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>{amenity}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Save className="w-5 h-5" />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );
};

export default TravelPreferencesForm;