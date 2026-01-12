'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="max-w-md w-full">
        <Card className="animate-fade-in">
          <CardContent className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                Sign in to CharterFlow
              </h2>
              <p className="text-neutral-600">
                Grounded Product & Ops Studio
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                label="Email address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />

              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />

              {error && (
                <div className="text-error-600 text-sm text-center animate-fade-in">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
