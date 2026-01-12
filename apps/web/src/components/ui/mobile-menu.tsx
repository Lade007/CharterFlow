'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { CharterFlowLogo } from '@/components/ui/brand/charterflow-logo';
import { cn } from '@/lib/utils';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard', protected: true },
    { href: '/notebooks', label: 'Notebooks', protected: true },
    { href: '/uvz', label: 'UVZ', protected: true },
    { href: '/charters', label: 'Charters', protected: true },
    { href: '/operations', label: 'Operations', protected: true },
  ];

  const visibleItems = navItems.filter(item => !item.protected || isAuthenticated);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 relative flex flex-col justify-center">
          <span
            className={cn(
              'absolute h-0.5 w-6 bg-current transition-all duration-300',
              isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-2'
            )}
          />
          <span
            className={cn(
              'absolute h-0.5 w-6 bg-current transition-all duration-300',
              isOpen ? 'opacity-0' : ''
            )}
          />
          <span
            className={cn(
              'absolute h-0.5 w-6 bg-current transition-all duration-300',
              isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-2'
            )}
          />
        </div>
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu panel */}
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-white/95 backdrop-blur-md border-l border-neutral-200/50 shadow-2xl z-50 md:hidden">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-200/50">
                <div className="flex items-center space-x-2">
                  <CharterFlowLogo className="h-8 w-8" />
                  <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                    CharterFlow
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {visibleItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                      pathname === item.href
                        ? 'bg-primary-50 text-primary-700 border border-primary-200'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Auth section */}
              <div className="p-4 border-t border-neutral-200/50">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="text-sm text-neutral-600">
                      Hi, {user?.firstName || user?.email}
                    </div>
                    <Button size="sm" variant="outline" onClick={logout} className="w-full">
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button size="sm" variant="ghost" className="w-full">
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button size="sm" className="w-full">
                        Get started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
