import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "The AI recommendations were spot-on! Found hidden gems I would've never discovered otherwise.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    name: "Marco Rossi",
    location: "Milan, Italy",
    rating: 5,
    text: "Seamless booking experience and incredible personalization. Every trip feels unique!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  },
  {
    name: "Emma Chen",
    location: "Singapore",
    rating: 5,
    text: "The cultural experiences were perfectly matched to my interests. Truly exceptional service.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  }
];

const TestimonialCarousel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </div>
  );
};

export default TestimonialCarousel;