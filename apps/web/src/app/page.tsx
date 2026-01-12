'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { GlassCard } from '@/components/ui/glass-card';
import { PremiumHeroSection } from '@/components/ui/brand/premium-hero';
import { TextReveal } from '@/components/ui/text-reveal';

// Premium SVG Icons
const Icons = {
  Notebooks: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><rect width="16" height="20" x="4" y="2" rx="2" /><path d="M16 2v20" /></svg>
  ),
  Target: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
  ),
  Charter: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M12 18v-6" /><path d="M8 15h8" /></svg>
  ),
  Settings: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  Zap: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
  Compass: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
  ),
  Rocket: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
  ),
};

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
      <section className="py-20 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextReveal delay={800}>
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
                Everything you need to <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">build and scale</span>
              </h2>
              <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                From idea to execution, CharterFlow provides the tools to capture insights, discover opportunities, and ship products.
              </p>
            </div>
          </TextReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                title: 'Notebooks',
                description: 'Upload docs and organize your research with AI-powered search.',
                icon: <Icons.Notebooks className="w-8 h-8 text-indigo-600" />,
              },
              {
                title: 'UVZ Discovery',
                description: 'Map skills to pains and pick a winning market wedge.',
                icon: <Icons.Target className="w-8 h-8 text-purple-600" />,
              },
              {
                title: 'Product Charters',
                description: 'Generate frameworks, narratives, and execution-ready plans.',
                icon: <Icons.Charter className="w-8 h-8 text-pink-600" />,
              },
              {
                title: 'Operations',
                description: 'Ship repeatable SOPs and client delivery systems.',
                icon: <Icons.Settings className="w-8 h-8 text-indigo-600" />,
              },
            ].map((feature, index) => (
              <TextReveal key={feature.title} delay={1000 + index * 100}>
                <GlassCard
                  className="p-8 h-full cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl border-white/40"
                  onClick={() => router.push('/notebooks')}
                  variant="subtle"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-2xl bg-white/50 shadow-inner">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600">
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
      <section className="py-20 sm:py-32 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <TextReveal delay={1200}>
            <div className="text-center mb-16 sm:mb-24">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
                Built for modern product teams
              </h2>
            </div>
          </TextReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                title: 'Fast Capture',
                description: 'Centralize notes, docs, and assets in one searchable workspace.',
                icon: <Icons.Zap className="w-10 h-10 text-amber-500" />,
              },
              {
                title: 'Guided Discovery',
                description: 'Structured prompts to clarify positioning and find your wedge.',
                icon: <Icons.Compass className="w-10 h-10 text-indigo-500" />,
              },
              {
                title: 'Actionable Outputs',
                description: 'From insights to charters you can execute immediately.',
                icon: <Icons.Rocket className="w-10 h-10 text-emerald-500" />,
              },
            ].map((prop, index) => (
              <TextReveal key={prop.title} delay={1400 + index * 100}>
                <div className="flex flex-col items-center text-center space-y-6 p-6 rounded-3xl transition-colors hover:bg-white/40">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-white/50 shadow-lg border border-white/20">
                    {prop.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {prop.title}
                    </h3>
                    <p className="text-base text-neutral-600 leading-relaxed max-w-xs mx-auto">
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
