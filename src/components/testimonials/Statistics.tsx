import React from 'react';

const stats = [
  { value: '50K+', label: 'Travelers Served' },
  { value: '100+', label: 'Destinations' },
  { value: '4.9', label: 'Average Rating' }
];

const Statistics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
            {stat.value}
          </div>
          <p className="text-gray-400 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Statistics;