'use client';

import Link from 'next/link';
import { CharterFlowLogo } from '@/components/ui/brand/charterflow-logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { href: '/notebooks', label: 'Notebooks' },
        { href: '/uvz', label: 'UVZ Discovery' },
        { href: '/charters', label: 'Product Charters' },
        { href: '/operations', label: 'Operations' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { href: '/docs', label: 'Documentation' },
        { href: '/blog', label: 'Blog' },
        { href: '/templates', label: 'Templates' },
        { href: '/support', label: 'Support' },
      ],
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About' },
        { href: '/careers', label: 'Careers' },
        { href: '/privacy', label: 'Privacy' },
        { href: '/terms', label: 'Terms' },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-secondary-200/40 bg-white/60 backdrop-blur-md supports-[backdrop-filter]:bg-white/40">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 via-transparent to-secondary-50/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-flex items-center space-x-2 transition-transform hover:scale-105">
                <CharterFlowLogo className="h-8 w-8" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  CharterFlow
                </span>
              </Link>
              <p className="mt-4 text-sm text-neutral-600 max-w-md">
                Transform knowledge into products, operations into systems, and insights into impact.
              </p>
              <div className="mt-6 flex space-x-4">
                {/* Social links can be added here */}
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-3 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-neutral-900">{section.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-neutral-600 transition-colors hover:text-primary-600"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-secondary-200/40">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-neutral-600">
                © {currentYear} CharterFlow. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <Link href="/privacy" className="text-sm text-neutral-600 hover:text-primary-600">
                  Privacy
                </Link>
                <Link href="/terms" className="text-sm text-neutral-600 hover:text-primary-600">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
