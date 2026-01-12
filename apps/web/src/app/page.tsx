'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { CharterFlowLogo } from '@/components/ui/brand/charterflow-logo';
import { ParallaxSection } from '@/components/ui/parallax-section';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-x-hidden">
      {/* Multi-layer parallax background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Slowest */}
        <ParallaxSection speed={0.2}>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-200/30 to-primary-300/20 rounded-full blur-3xl" />
        </ParallaxSection>
        
        {/* Layer 2: Medium speed */}
        <ParallaxSection speed={0.4}>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-secondary-200/30 to-secondary-300/20 rounded-full blur-3xl" />
        </ParallaxSection>
        
        {/* Layer 3: Fastest */}
        <ParallaxSection speed={0.6}>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-primary-100/20 to-secondary-100/20 rounded-full blur-2xl" />
        </ParallaxSection>
        
        {/* Layer 4: Floating elements */}
        <ParallaxSection speed={0.3}>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-100/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-secondary-100/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </ParallaxSection>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center py-12 sm:py-16">
            <ParallaxSection speed={0.5}>
              <div className="text-center space-y-6 sm:space-y-8">
                {/* Logo */}
                <div className="flex justify-center">
                  <div className="p-4 sm:p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/20 shadow-lg shadow-black/5 transition-all duration-500 hover:scale-105 hover:shadow-xl">
                    <CharterFlowLogo className="h-12 w-12 sm:h-16 sm:w-16" />
                  </div>
                </div>

                {/* Badge */}
                <div className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 border border-primary-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium backdrop-blur-sm">
                  ✨ AI-first Product & Ops Studio
                </div>

                {/* Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight px-4">
                  <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent">
                    CharterFlow
                  </span>
                  <br />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-neutral-900 font-normal">
                    Transform knowledge into
                    <span className="text-primary-600 font-semibold"> products</span>
                  </span>
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
                  Capture research, discover your Unique Value Zone, and generate product charters that turn ideas into execution-ready systems.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  <Button 
                    size="lg" 
                    onClick={() => router.push('/login')}
                    className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                  >
                    Get Started
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => router.push('/notebooks')}
                    className="border-primary-200 text-primary-700 hover:bg-primary-50 transition-all duration-300 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                  >
                    Explore Notebooks
                  </Button>
                </div>

                {/* Social Proof */}
                <div className="text-sm text-neutral-500 px-4">
                  Built for founders, operators, and product strategists.
                </div>
              </div>
            </ParallaxSection>
          </section>

          {/* Features Grid */}
          <section className="py-16 sm:py-24">
            <div className="text-center mb-12 sm:mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Everything you need to build and scale
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
                From idea to execution, CharterFlow provides the tools to capture insights, discover opportunities, and ship products.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
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
                  className="p-4 sm:p-6 space-y-3 sm:space-y-4 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl">{feature.icon}</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1 sm:mt-2">{feature.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          {/* Value Props */}
          <section className="py-16 sm:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4">
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
                <div key={prop.title} className="text-center space-y-3 sm:space-y-4">
                  <div className="text-3xl sm:text-4xl">{prop.icon}</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900">{prop.title}</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1 sm:mt-2">{prop.description}</p>
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
