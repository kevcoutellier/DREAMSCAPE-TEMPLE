import React from 'react';
import { DollarSign, CreditCard, Wallet, PieChart } from 'lucide-react';

const TripBudget = () => {
  const budget = {
    total: 2500,
    spent: 1200,
    categories: [
      { name: 'Accommodation', amount: 800, color: 'bg-orange-500' },
      { name: 'Transportation', amount: 300, color: 'bg-pink-500' },
      { name: 'Activities', amount: 400, color: 'bg-cyan-500' },
      { name: 'Food & Dining', amount: 200, color: 'bg-purple-500' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Budget Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Wallet className="w-4 h-4" />
              <span>Total Budget</span>
            </div>
            <div className="text-2xl font-bold">€{budget.total}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <CreditCard className="w-4 h-4" />
              <span>Spent</span>
            </div>
            <div className="text-2xl font-bold">€{budget.spent}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <DollarSign className="w-4 h-4" />
              <span>Remaining</span>
            </div>
            <div className="text-2xl font-bold">€{budget.total - budget.spent}</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Spending by Category</h2>
          <button className="text-orange-500 hover:text-orange-600 transition-colors">
            Add Expense
          </button>
        </div>
        <div className="space-y-4">
          {budget.categories.map((category) => (
            <div key={category.name} className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-gray-600">€{category.amount}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color}`}
                    style={{ width: `${(category.amount / budget.total) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripBudget;