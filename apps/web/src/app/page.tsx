'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="font-bold text-neutral-900">CharterFlow</div>
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <Button size="sm" onClick={() => router.push('/dashboard')}>
                  Go to Dashboard
                </Button>
              ) : (
                <Button size="sm" onClick={() => router.push('/login')}>
                  Sign in
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full bg-primary-50 text-primary-700 border border-primary-100 px-3 py-1 text-xs font-medium">
                AI-first Product & Ops Studio
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900">
                Turn knowledge into
                <span className="text-primary-600"> product-grade systems</span>
              </h1>
              <p className="text-neutral-600 text-base sm:text-lg">
                CharterFlow helps you capture research, discover your Unique Value Zone, and generate product charters that turn ideas into execution-ready plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => router.push('/login')} className="w-full sm:w-auto">
                  Get started
                </Button>
                <Button variant="outline" onClick={() => router.push('/notebooks')} className="w-full sm:w-auto">
                  Explore Notebooks
                </Button>
              </div>
              <div className="text-sm text-neutral-500">
                Built for founders, operators, and product strategists.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="animate-fade-in">
                <CardContent className="p-6 space-y-2">
                  <div className="text-sm font-semibold text-neutral-900">Notebooks</div>
                  <div className="text-sm text-neutral-600">Upload docs and organize your research.</div>
                </CardContent>
              </Card>
              <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardContent className="p-6 space-y-2">
                  <div className="text-sm font-semibold text-neutral-900">UVZ Discovery</div>
                  <div className="text-sm text-neutral-600">Map skills to pains and pick a winning wedge.</div>
                </CardContent>
              </Card>
              <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6 space-y-2">
                  <div className="text-sm font-semibold text-neutral-900">Product Charters</div>
                  <div className="text-sm text-neutral-600">Generate frameworks, narratives, and scope.</div>
                </CardContent>
              </Card>
              <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <CardContent className="p-6 space-y-2">
                  <div className="text-sm font-semibold text-neutral-900">Ops Systems</div>
                  <div className="text-sm text-neutral-600">Ship repeatable SOPs and workflows.</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="bg-white border-t border-secondary-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-neutral-900">Fast capture</div>
                <div className="text-sm text-neutral-600">Centralize notes, docs, and assets.</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-neutral-900">Guided discovery</div>
                <div className="text-sm text-neutral-600">Structured prompts to clarify positioning.</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-neutral-900">Actionable outputs</div>
                <div className="text-sm text-neutral-600">From insights to charters you can execute.</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 text-center text-sm text-neutral-500">
        {new Date().getFullYear()} CharterFlow
      </footer>
    </div>
  );
}
