'use client';

import { useAuth } from '@/contexts/auth-context';
import { LoginForm } from '@/components/auth/login-form';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CharterFlowLogo } from '@/components/ui/brand/charterflow-logo';
import { GlassCard } from '@/components/ui/glass-card';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="text-lg text-neutral-700">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5">
            <CharterFlowLogo className="h-10 w-10" />
          </div>
        </div>

        {/* Login form card */}
        <GlassCard className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
              Welcome back
            </h1>
            <p className="text-neutral-600 text-sm sm:text-base">
              Sign in to your CharterFlow account
            </p>
          </div>
          <LoginForm />
        </GlassCard>

        {/* Footer links */}
        <div className="text-center mt-6 text-sm text-neutral-500">
          <p>
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
