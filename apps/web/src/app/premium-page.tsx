'use client';

import { PremiumHeroSection } from '@/components/ui/brand/premium-hero';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function PremiumLanding() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <PremiumHeroSection
      title="Transform knowledge into products"
      subtitle="AI-powered platform for founders, operators, and product strategists"
      ctaText="Get Started"
      onCtaClick={() => router.push('/login')}
      variant="default"
    />
  );
}
