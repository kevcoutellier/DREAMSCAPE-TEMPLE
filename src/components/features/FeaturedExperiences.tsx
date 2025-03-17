import React from 'react';
import ExperienceCard from './ExperienceCard';
import SectionTitle from '../shared/SectionTitle';

const experiences = [
  {
    id: "paris-123",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80",
    title: "Paris City Lights",
    location: "Paris, France",
    type: "Cultural Tour",
    duration: "3 hours",
    priceRange: "120-150",
    rating: 4.9
  },
  {
    id: "swiss-alps-456",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80",
    title: "Alpine Retreat",
    location: "Swiss Alps",
    type: "Adventure",
    duration: "2 days",
    priceRange: "400-600",
    rating: 4.8
  },
  {
    id: "venice-789",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80",
    title: "Venice Canals",
    location: "Venice, Italy",
    type: "Romantic",
    duration: "4 hours",
    priceRange: "200-250",
    rating: 4.7
  },
  {
    id: "dubai-101",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80",
    title: "Dubai Nights",
    location: "Dubai, UAE",
    type: "Luxury",
    duration: "5 hours",
    priceRange: "300-400",
    rating: 4.9
  }
];

const FeaturedExperiences = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Trending Experiences"
          subtitle="Curated destinations based on your interests"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;