'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-neutral-900">
                CharterFlow
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-700">
                Welcome, {user?.firstName} {user?.lastName}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Welcome to CharterFlow Dashboard
            </h2>
            <p className="text-neutral-600 text-lg">
              Grounded Product & Ops Studio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card hover className="animate-slide-up">
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5c-1.588 0-3.087.39-4.242.9L1.236 6.13a15.68 15.68 0 0 1-8.132 3.636l4.204 3.636c.676 0 1.362-.088 1.988-.727L15.754 14.242c.616-.637 1.047-1.911 1.047-3.242s-.43-2.605-1.047-3.242L8.132 3.636c-.676-.636-1.312-.727-1.988-.727zm3.636 13.977L7.243 21.242c-.626.626-1.312.887-1.312.887 0 0 .488-.363.876-.724L12.638 18.477c.625-.626 1.372-1.372 1.372-1.998 0-.626-.374-1.372-.887L8.762 14.25c-.626-.626-1.37-.887-1.37-.887z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Notebooks</h3>
                <p className="text-neutral-600 text-sm">
                  Research and knowledge management
                </p>
              </CardContent>

            <Card hover className="animate-slide-up" style={{ animationDelay: '0.1s' }} onClick={() => console.log('UVZ Discovery clicked')}>
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m0 16v-1m-6.637 6.682a8.97 8.97 0 014.326-6.682M4 5h8a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707L19.586 6.414A1 1 0 0119.293 5.121L16.464 8.464a1 1 0 01-1.423 0l8 8V9a1 1 0 00-1 1H4a1 1 0 011-1h4a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">UVZ Discovery</h3>
                <p className="text-neutral-600 text-sm">
                  Find your unique value zone
                </p>
              </CardContent>
            </Card>

            <Card hover className="animate-slide-up" style={{ animationDelay: '0.2s' }} onClick={() => console.log('Product Charters clicked')}>
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2 2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707L19.586 6.414A1 1 0 0119.293 5.121L16.464 8.464a1 1 0 01-1.423 0l8 8V9a1 1 0 00-1 1H4a1 1 0 011-1h4a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Product Charters</h3>
                <p className="text-neutral-600 text-sm">
                  Generate product frameworks
                </p>
              </CardContent>
            </Card>

            <Card hover className="animate-slide-up" style={{ animationDelay: '0.3s' }} onClick={() => console.log('Operations clicked')}>
              <CardContent className="text-center">
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.824 1.824 0 002.923 1.824h2.922c.426 0 .834.286 1.312.286.834 0 1.312-.286 1.312-.286.834 0-1.312.286-1.312zm0 3.39a6.95 6.95 0 01-13.9 0v2.17c0 .532.106 1.032.286 1.032.286 0 1.032-.286 1.032zm1.032-.286H16.16a5.95 5.95 0 00-.596-1.04l4.775-4.627a5.95 5.95 0 00-.596-1.04l-4.775-4.627a5.95 5.95 0 00.596 1.04l-4.775-4.627z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Operations</h3>
                <p className="text-neutral-600 text-sm">
                  System design and workflows
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
