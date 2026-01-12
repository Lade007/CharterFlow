'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumHeroSection } from '@/components/ui/brand/premium-hero';
import { TextReveal, StaggeredTextReveal } from '@/components/ui/text-reveal';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      <PremiumHeroSection
        title="Transform knowledge into products"
        subtitle="AI-powered platform for founders, operators, and product strategists"
        ctaText="Get Started"
        onCtaClick={() => router.push('/login')}
        variant="default"
      />

      {/* Features Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextReveal delay={800}>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Everything you need to build and scale
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
                From idea to execution, CharterFlow provides the tools to capture insights, discover opportunities, and ship products.
              </p>
            </div>
          </TextReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
              <TextReveal key={feature.title} delay={1000 + index * 200}>
                <GlassCard
                  className="p-4 sm:p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                  onClick={() => router.push('/notebooks')}
                >
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl mb-4">{feature.icon}</div>
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600">
                      {feature.description}
                    </p>
                  </div>
                </GlassCard>
              </TextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextReveal delay={1800}>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                Built for modern product teams
              </h2>
            </div>
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
            ].map((prop, index) => (
              <TextReveal key={prop.title} delay={2000 + index * 200}>
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="text-3xl sm:text-4xl">{prop.icon}</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                      {prop.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600">
                      {prop.description}
                    </p>
                  </div>
                </div>
              </TextReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
