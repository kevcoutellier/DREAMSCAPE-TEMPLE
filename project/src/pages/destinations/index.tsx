import React from 'react';
import { useNavigate } from 'react-router-dom';
import DestinationCard from '@/components/DestinationCard';

const destinations = [
  {
    id: 'paris-1',
    title: "Paris Magic",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80",
    description: "Experience the city of lights"
  },
  {
    id: 'tokyo-1',
    title: "Tokyo Explorer",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80",
    description: "Discover modern Japan"
  },
  {
    id: 'bali-1',
    title: "Bali Paradise",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
    description: "Tropical island getaway"
  },
  {
    id: 'santorini-1',
    title: "Santorini Dreams",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80",
    description: "Mediterranean beauty"
  },
  {
    id: 'nyc-1',
    title: "New York City",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80",
    description: "The city that never sleeps"
  },
  {
    id: 'dubai-1',
    title: "Dubai Luxury",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
    description: "Modern desert oasis"
  }
];

export default function DestinationsPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Popular Destinations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => navigate(`/destination/${destination.id}`)}
              className="cursor-pointer"
            >
              <DestinationCard {...destination} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}