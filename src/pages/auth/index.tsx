import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import { useAuth } from '@/services/auth/AuthService';
import { AlertCircle } from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, signup } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (name: string, email: string, password: string, userType: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await signup(name, email, password, userType);
      navigate('/profile/setup');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Test Users Info */}
          <div className="mb-8 p-6 bg-orange-50 rounded-xl">
            <div className="flex items-center gap-2 text-orange-600 mb-4">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-semibold">Test Users</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-medium">Business Traveler</div>
                <div className="text-gray-600">
                  Email: business@example.com<br />
                  Password: business123
                </div>
              </div>
              <div>
                <div className="font-medium">Leisure Traveler</div>
                <div className="text-gray-600">
                  Email: leisure@example.com<br />
                  Password: leisure123
                </div>
              </div>
              <div>
                <div className="font-medium">Bleisure Traveler</div>
                <div className="text-gray-600">
                  Email: bleisure@example.com<br />
                  Password: bleisure123
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-600 font-medium">Authentication Error</p>
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            </div>
          )}

          {isLogin ? (
            <LoginForm
              onSubmit={handleLogin}
              onSwitchToSignup={() => setIsLogin(false)}
              isLoading={isLoading}
            />
          ) : (
            <SignupForm
              onSubmit={handleSignup}
              onSwitchToLogin={() => setIsLogin(true)}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}