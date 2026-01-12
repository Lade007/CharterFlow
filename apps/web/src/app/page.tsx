'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { CharterFlowLogo } from '@/components/ui/brand/charterflow-logo';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-100/10 to-secondary-100/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center py-12 sm:py-16">
            <div className="text-center space-y-8">
              {/* Logo */}
              <div className="flex justify-center">
                <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5 transition-transform hover:scale-105">
                  <CharterFlowLogo className="h-16 w-16" />
                </div>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 border border-primary-100 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                ✨ AI-first Product & Ops Studio
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent">
                  CharterFlow
                </span>
                <br />
                <span className="text-3xl sm:text-4xl lg:text-5xl text-neutral-900 font-normal">
                  Transform knowledge into
                  <span className="text-primary-600 font-semibold"> products</span>
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                Capture research, discover your Unique Value Zone, and generate product charters that turn ideas into execution-ready systems.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => router.push('/login')}
                  className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => router.push('/notebooks')}
                  className="border-primary-200 text-primary-700 hover:bg-primary-50 transition-all duration-300"
                >
                  Explore Notebooks
                </Button>
              </div>

              {/* Social Proof */}
              <div className="text-sm text-neutral-500">
                Built for founders, operators, and product strategists.
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
                Everything you need to build and scale
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                From idea to execution, CharterFlow provides the tools to capture insights, discover opportunities, and ship products.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Notebooks',
                  description: 'Upload docs and organize your research with AI-powered search.',
                  icon: '📚',
                },
                {
                  title: 'UVZ Discovery',
                  description: 'Map skills to pains and pick a winning market wedge.',
                  icon: '🎯',
                },
                {
                  title: 'Product Charters',
                  description: 'Generate frameworks, narratives, and execution-ready plans.',
                  icon: '📋',
                },
                {
                  title: 'Operations',
                  description: 'Ship repeatable SOPs and client delivery systems.',
                  icon: '⚙️',
                },
              ].map((feature, index) => (
                <GlassCard
                  key={feature.title}
                  className="p-6 space-y-4 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
                    <p className="text-sm text-neutral-600 mt-2">{feature.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Value Props */}
          <section className="py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Fast Capture',
                  description: 'Centralize notes, docs, and assets in one searchable workspace.',
                  icon: '⚡',
                },
                {
                  title: 'Guided Discovery',
                  description: 'Structured prompts to clarify positioning and find your wedge.',
                  icon: '🧭',
                },
                {
                  title: 'Actionable Outputs',
                  description: 'From insights to charters you can execute immediately.',
                  icon: '🚀',
                },
              ].map((prop) => (
                <div key={prop.title} className="text-center space-y-4">
                  <div className="text-4xl">{prop.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">{prop.title}</h3>
                    <p className="text-sm text-neutral-600 mt-2">{prop.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
