import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DestinationDetail from '@/components/destination/DestinationDetail';

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: {
    from: number;
    currency: string;
  };
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  pointsOfInterest: Array<{
    name: string;
    type: string;
    description: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  }>;
}

export default function DestinationPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      setLoading(true);
      try {
        // For now, we'll use mock data
        // In a real app, this would be an API call
        const mockDestination: Destination = {
          id: id || 'paris-1',
          name: 'Paris Magic',
          location: 'Paris, France',
          description: 'Experience the magic of the City of Light with its iconic landmarks, world-class cuisine, and rich cultural heritage. From the majestic Eiffel Tower to the charming streets of Montmartre, Paris offers an unforgettable journey through history, art, and romance.',
          rating: 4.8,
          reviewCount: 1250,
          price: {
            from: 299,
            currency: '€'
          },
          images: [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1493707553966-283afac8c358?auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80'
          ],
          coordinates: {
            lat: 48.8566,
            lng: 2.3522
          },
          pointsOfInterest: [
            {
              name: 'Eiffel Tower',
              type: 'Landmark',
              description: 'Iconic iron lattice tower on the Champ de Mars',
              coordinates: {
                lat: 48.8584,
                lng: 2.2945
              }
            },
            {
              name: 'Louvre Museum',
              type: 'Museum',
              description: 'World\'s largest art museum and historic monument',
              coordinates: {
                lat: 48.8606,
                lng: 2.3376
              }
            },
            {
              name: 'Notre-Dame Cathedral',
              type: 'Religious Site',
              description: 'Medieval Catholic cathedral on the Île de la Cité',
              coordinates: {
                lat: 48.8530,
                lng: 2.3499
              }
            }
          ]
        };

        setDestination(mockDestination);
        setError(null);
      } catch (err) {
        setError('Failed to load destination details');
        console.error('Error fetching destination:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDestination();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Destination Not Found</h2>
          <p className="text-gray-600">The destination you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <DestinationDetail destination={destination} />
    </main>
  );
}