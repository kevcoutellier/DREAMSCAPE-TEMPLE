// API Base Configuration
export const API_CONFIG = {
  baseURL: 'https://test.api.amadeus.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// API Endpoints
export const ENDPOINTS = {
  auth: {
    token: '/v1/security/oauth2/token'
  },
  flights: {
    search: '/v2/shopping/flight-offers',
    pricing: '/v1/shopping/flight-offers/pricing',
    orders: '/v1/booking/flight-orders',
    seatmaps: '/v1/shopping/seatmaps',
    prediction: '/v2/shopping/flight-offers/prediction',
    inspiration: '/v1/shopping/flight-destinations',
    cheapestDates: '/v1/shopping/flight-dates',
    availability: '/v1/shopping/availability/flight-availabilities',
    priceAnalysis: '/v1/analytics/itinerary-price-metrics',
    delayPrediction: '/v1/travel/predictions/flight-delay',
    onTime: '/v1/airport/predictions/on-time'
  },
  hotels: {
    search: '/v3/shopping/hotel-offers',
    details: '/v3/shopping/hotel-offers/{offerId}',
    booking: '/v2/booking/hotel-orders',
    ratings: '/v2/e-reputation/hotel-sentiments',
    byCity: '/v1/reference-data/locations/hotels/by-city',
    byGeocode: '/v1/reference-data/locations/hotels/by-geocode',
    byHotels: '/v1/reference-data/locations/hotels/by-hotels',
    autocomplete: '/v1/reference-data/locations/hotel'
  },
  experiences: {
    search: '/v1/shopping/activities',
    byId: '/v1/shopping/activities/{id}',
    bySquare: '/v1/shopping/activities/by-square'
  },
  transfers: {
    search: '/v1/shopping/transfer-offers',
    booking: '/v1/ordering/transfer-orders',
    management: '/v1/ordering/transfer-orders/{orderId}/transfers/cancellation'
  },
  locations: {
    search: '/v1/reference-data/locations',
    byId: '/v1/reference-data/locations/{locationId}',
    airports: '/v1/reference-data/locations/airports',
    cities: '/v1/reference-data/locations/cities'
  },
  insights: {
    mostTraveled: '/v1/travel/analytics/air-traffic/traveled',
    mostBooked: '/v1/travel/analytics/air-traffic/booked',
    busiestPeriod: '/v1/travel/analytics/air-traffic/busiest-period',
    tripPurpose: '/v1/travel/predictions/trip-purpose'
  },
  airlines: {
    checkinLinks: '/v2/reference-data/urls/checkin-links',
    lookup: '/v1/reference-data/airlines',
    routes: '/v1/airline/destinations'
  }
};