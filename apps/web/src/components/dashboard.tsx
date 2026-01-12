'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';

export function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const modules = [
    {
      title: 'Notebooks',
      description: 'Research and knowledge management',
      icon: '📚',
      href: '/notebooks',
      color: 'primary',
    },
    {
      title: 'UVZ Discovery',
      description: 'Find your unique value zone',
      icon: '🎯',
      href: '/uvz',
      color: 'accent',
    },
    {
      title: 'Product Charters',
      description: 'Generate product frameworks',
      icon: '📋',
      href: '/charters',
      color: 'success',
    },
    {
      title: 'Operations',
      description: 'System design and workflows',
      icon: '⚙️',
      href: '/operations',
      color: 'warning',
    },
  ];

  const colorClasses: Record<string, string> = {
    primary: 'bg-primary-100 text-primary-600',
    accent: 'bg-accent-100 text-accent-600',
    success: 'bg-success-100 text-success-600',
    warning: 'bg-warning-100 text-warning-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Welcome Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
              Welcome back, {user?.firstName || user?.email?.split('@')[0]}
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
              CharterFlow Grounded Product & Ops Studio
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {modules.map((module, index) => (
              <GlassCard
                key={module.title}
                className="p-4 sm:p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => router.push(module.href)}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${colorClasses[module.color]} rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl`}>
                    {module.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                    {module.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    {module.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 sm:mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: 'Notebooks', value: '0', change: '+0 this week' },
                { label: 'Documents', value: '0', change: '+0 this week' },
                { label: 'Charters', value: '0', change: '+0 this week' },
                { label: 'Workflows', value: '0', change: '+0 this week' },
              ].map((stat) => (
                <GlassCard key={stat.label} className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-neutral-900">{stat.value}</div>
                    <div className="text-sm font-medium text-neutral-700 mt-1">{stat.label}</div>
                    <div className="text-xs text-neutral-500 mt-1">{stat.change}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
