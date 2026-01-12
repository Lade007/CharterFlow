'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Notebook {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  documentCount: number;
}

export default function NotebooksPage() {
  const { isAuthenticated } = useAuth();
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

  const createNotebook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotebookTitle.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch('/api/notebooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: newNotebookTitle }),
      });
      
      if (response.ok) {
        const newNotebook = await response.json();
        setNotebooks([newNotebook, ...notebooks]);
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
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Please sign in to access your notebooks
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            My Notebooks
          </h1>
          <Button
            onClick={createNotebook}
            disabled={isCreating}
            className="animate-fade-in"
          >
            {isCreating ? 'Creating...' : '+ New Notebook'}
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-200"></div>
            <p className="mt-4 text-neutral-600">Loading notebooks...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notebooks.map((notebook, index) => (
              <Card key={notebook.id} hover className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-neutral-900 pr-2">
                      {notebook.title}
                    </h3>
                    <div className="text-sm text-neutral-500">
                      {new Date(notebook.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {notebook.description && (
                    <p className="text-neutral-600 mb-4">
                      {notebook.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-500">
                      {notebook.documentCount || 0} documents
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      Open →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
