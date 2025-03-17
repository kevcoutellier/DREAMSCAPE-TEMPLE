import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Briefcase, Compass, Sparkles } from 'lucide-react';

interface SignupFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  onSwitchToLogin: () => void;
  isLoading?: boolean;
}

type UserType = 'business' | 'leisure' | 'bleisure';

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, onSwitchToLogin, isLoading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    userType?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!userType) {
      newErrors.userType = 'Please select a profile type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(name, email, password, userType!);
    }
  };

  const userTypes = [
    {
      type: 'business',
      icon: Briefcase,
      title: 'Business Traveler',
      description: 'Optimize for work trips with expense tracking and meeting integration'
    },
    {
      type: 'leisure',
      icon: Compass,
      title: 'Leisure Explorer',
      description: 'Discover unique experiences and authentic adventures'
    },
    {
      type: 'bleisure',
      icon: Sparkles,
      title: 'Bleisure Enthusiast',
      description: 'Balance work and leisure with flexible planning tools'
    }
  ];

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Create Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter your name"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter your email"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Create a password"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Confirm your password"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Profile Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Your Profile Type
            </label>
            <div className="grid grid-cols-1 gap-4">
              {userTypes.map(({ type, icon: Icon, title, description }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setUserType(type as UserType)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    userType === type
                      ? 'bg-orange-50 border-2 border-orange-500'
                      : 'bg-gray-50 border-2 border-transparent hover:border-orange-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      userType === type ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">{title}</div>
                      <div className="text-sm text-gray-600">{description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {errors.userType && (
              <p className="mt-1 text-sm text-red-500">{errors.userType}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            ) : (
              'Create Account'
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-orange-500 hover:text-orange-600"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;