'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/glass-card';
import { CharterFlowLogo } from '@/components/ui/brand/charterflow-logo';

interface Notebook {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  documentCount: number;
}

export default function NotebooksPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newNotebookTitle, setNewNotebookTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotebooks();
    }
  }, [isAuthenticated]);

  const fetchNotebooks = async () => {
    try {
      const response = await fetch('/api/notebooks', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setNotebooks(data);
    } catch (error) {
      console.error('Failed to fetch notebooks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createNotebook = async () => {
    if (!newNotebookTitle.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch('/api/notebooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: newNotebookTitle.trim() }),
      });

      if (response.ok) {
        const newNotebook = await response.json();
        setNotebooks(prev => [...prev, { ...newNotebook, documentCount: 0 }]);
        setNewNotebookTitle('');
      }
    } catch (error) {
      console.error('Failed to create notebook:', error);
    } finally {
      setIsCreating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <div className="text-center">
          <CharterFlowLogo className="h-16 w-16 mx-auto mb-4" />
          <p className="text-neutral-600">Please sign in to view your notebooks.</p>
          <Button onClick={() => router.push('/login')} className="mt-4">
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            My Notebooks
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl">
            Capture research, upload documents, and organize your knowledge.
          </p>
        </div>

        {/* Create Notebook */}
        <GlassCard className="p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newNotebookTitle}
              onChange={(e) => setNewNotebookTitle(e.target.value)}
              placeholder="New notebook title..."
              className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && createNotebook()}
            />
            <Button
              onClick={createNotebook}
              disabled={!newNotebookTitle.trim() || isCreating}
              loading={isCreating}
              className="w-full sm:w-auto"
            >
              Create Notebook
            </Button>
          </div>
        </GlassCard>

        {/* Notebooks Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-neutral-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : notebooks.length === 0 ? (
          <GlassCard className="p-8 sm:p-12 text-center">
            <div className="text-4xl sm:text-5xl mb-4">📚</div>
            <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2">
              No notebooks yet
            </h3>
            <p className="text-neutral-600 mb-6">
              Create your first notebook to start organizing your research.
            </p>
            <Button onClick={() => setNewNotebookTitle('My First Notebook')}>
              Create Your First Notebook
            </Button>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {notebooks.map((notebook) => (
              <GlassCard
                key={notebook.id}
                className="p-4 sm:p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                onClick={() => router.push(`/notebooks/${notebook.id}`)}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2 line-clamp-2">
                      {notebook.title}
                    </h3>
                    {notebook.description && (
                      <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                        {notebook.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-500">
                    <span>{notebook.documentCount} documents</span>
                    <span>{new Date(notebook.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
