import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Plane, AlertCircle, Sparkles, ArrowRight, ArrowDown, ArrowUp, Cloud, Sun, Umbrella, Wind } from 'lucide-react';
import DateRangePicker from '../shared/DateRangePicker';
import Dropdown from '../shared/Dropdown';

interface PriceAnalysis {
  currentPrice: number;
  historicalAverage: number;
  priceQuartiles: {
    min: number;
    q1: number;
    median: number;
    q3: number;
    max: number;
  };
  recommendation: {
    action: 'book' | 'wait';
    reason: string;
    confidence: number;
  };
  priceHistory: {
    date: string;
    price: number;
  }[];
  seasonalFactors: {
    weather: {
      condition: string;
      temperature: number;
      impact: 'positive' | 'negative' | 'neutral';
    };
    events: {
      name: string;
      impact: number;
    }[];
    demand: 'high' | 'medium' | 'low';
  };
}

const FlightPriceAnalysis = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [cabinClass, setCabinClass] = useState('economy');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<PriceAnalysis | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // Simulated API response
      const mockAnalysis: PriceAnalysis = {
        currentPrice: 850,
        historicalAverage: 920,
        priceQuartiles: {
          min: 650,
          q1: 780,
          median: 900,
          q3: 1050,
          max: 1200
        },
        recommendation: {
          action: 'book',
          reason: 'Current price is 7.6% below historical average with an upward trend expected due to upcoming peak season',
          confidence: 85
        },
        priceHistory: [
          { date: '2024-01-01', price: 920 },
          { date: '2024-01-15', price: 890 },
          { date: '2024-02-01', price: 850 }
        ],
        seasonalFactors: {
          weather: {
            condition: 'sunny',
            temperature: 22,
            impact: 'positive'
          },
          events: [
            { name: 'Spring Festival', impact: 15 },
            { name: 'Tech Conference', impact: 10 }
          ],
          demand: 'high'
        }
      };

      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Failed to analyze prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriceIndicator = (current: number, average: number) => {
    const difference = ((current - average) / average) * 100;
    if (difference <= -5) {
      return {
        icon: ArrowDown,
        color: 'text-green-500',
        text: `${Math.abs(difference).toFixed(1)}% below average`
      };
    }
    if (difference >= 5) {
      return {
        icon: ArrowUp,
        color: 'text-red-500',
        text: `${difference.toFixed(1)}% above average`
      };
    }
    return {
      icon: ArrowRight,
      color: 'text-orange-500',
      text: 'Near average price'
    };
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-500';
    if (confidence >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return Sun;
      case 'cloudy': return Cloud;
      case 'rainy': return Umbrella;
      default: return Wind;
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Analyze Flight Prices</h2>
        <div className="space-y-6">
          {/* Origin & Destination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Enter city or airport"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter city or airport"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90" />
              </div>
            </div>
          </div>

          {/* Date & Cabin Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departure Date
              </label>
              <DateRangePicker
                onChange={({ startDate }) => setDepartureDate(startDate)}
                value={{ startDate: departureDate, endDate: null }}
                minDate={new Date()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cabin Class
              </label>
              <Dropdown
                options={[
                  { value: 'economy', label: 'Economy' },
                  { value: 'business', label: 'Business' },
                  { value: 'first', label: 'First Class' }
                ]}
                value={cabinClass}
                onChange={(value) => setCabinClass(value)}
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading || !origin || !destination || !departureDate}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                <span>Analyze Prices</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Price Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Price Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Current Price</span>
                  <span className="text-2xl font-bold">${analysis.currentPrice}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {(() => {
                    const indicator = getPriceIndicator(analysis.currentPrice, analysis.historicalAverage);
                    const Icon = indicator.icon;
                    return (
                      <div className={`flex items-center gap-1 ${indicator.color}`}>
                        <Icon className="w-4 h-4" />
                        <span>{indicator.text}</span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Historical Average</span>
                  <span className="text-2xl font-bold">${analysis.historicalAverage}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Based on last 6 months</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Price Range</span>
                  <span className="text-2xl font-bold">
                    ${analysis.priceQuartiles.min} - ${analysis.priceQuartiles.max}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>Median: ${analysis.priceQuartiles.median}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Seasonal Factors */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Seasonal Factors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Weather Impact */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  {(() => {
                    const WeatherIcon = getWeatherIcon(analysis.seasonalFactors.weather.condition);
                    return <WeatherIcon className="w-6 h-6 text-blue-500" />;
                  })()}
                  <h4 className="font-medium">Weather Impact</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Condition</span>
                    <span className="capitalize">{analysis.seasonalFactors.weather.condition}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Temperature</span>
                    <span>{analysis.seasonalFactors.weather.temperature}°C</span>
                  </div>
                </div>
              </div>

              {/* Events */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-6 h-6 text-purple-500" />
                  <h4 className="font-medium">Local Events</h4>
                </div>
                <div className="space-y-2">
                  {analysis.seasonalFactors.events.map((event, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{event.name}</span>
                      <span className="text-orange-500">+{event.impact}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demand */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <h4 className="font-medium">Demand Level</h4>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Demand</span>
                  <span className={`capitalize font-medium ${
                    analysis.seasonalFactors.demand === 'high' ? 'text-red-500' :
                    analysis.seasonalFactors.demand === 'medium' ? 'text-orange-500' :
                    'text-green-500'
                  }`}>
                    {analysis.seasonalFactors.demand}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-semibold">Our Recommendation</h3>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-orange-900 mb-1">
                  {analysis.recommendation.action === 'book' ? 'Book Now' : 'Wait for Better Price'}
                </div>
                <p className="text-orange-700 mb-2">{analysis.recommendation.reason}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-orange-600">Confidence:</span>
                  <span className={`font-medium ${getConfidenceColor(analysis.recommendation.confidence)}`}>
                    {analysis.recommendation.confidence}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Price Distribution</h3>
            <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div
                className="absolute inset-y-0 left-0 bg-green-500"
                style={{ width: '20%' }}
              />
              <div
                className="absolute inset-y-0 bg-blue-500"
                style={{ left: '20%', width: '30%' }}
              />
              <div
                className="absolute inset-y-0 bg-orange-500"
                style={{ left: '50%', width: '30%' }}
              />
              <div
                className="absolute inset-y-0 right-0 bg-red-500"
                style={{ width: '20%' }}
              />
              <div
                className="absolute top-1/2 w-4 h-4 -translate-y-1/2 -translate-x-1/2 bg-white border-2 border-gray-900 rounded-full"
                style={{ left: `${((analysis.currentPrice - analysis.priceQuartiles.min) / (analysis.priceQuartiles.max - analysis.priceQuartiles.min)) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>${analysis.priceQuartiles.min}</span>
              <span>${analysis.priceQuartiles.q1}</span>
              <span>${analysis.priceQuartiles.median}</span>
              <span>${analysis.priceQuartiles.q3}</span>
              <span>${analysis.priceQuartiles.max}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightPriceAnalysis;