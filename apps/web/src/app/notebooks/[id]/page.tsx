'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DocumentUpload } from '@/components/notebooks/document-upload';

interface Document {
  id: string;
  title: string;
  fileName: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

interface Notebook {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

export default function NotebookDetailPage() {
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const router = useRouter();
  const notebookId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && notebookId) {
      fetchNotebook();
      fetchDocuments();
    }
  }, [isAuthenticated, notebookId]);

  const fetchNotebook = async () => {
    try {
      const response = await fetch(`/api/notebooks/${notebookId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotebook(data);
      }
    } catch (error) {
      console.error('Failed to fetch notebook:', error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`/api/notebooks/${notebookId}/documents`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Please sign in to access this notebook
          </h1>
        </div>
      </div>
    );
  }

  if (!notebook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Notebook not found
          </h1>
          <Button onClick={() => router.push('/notebooks')}>
            Back to Notebooks
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/notebooks')}
          >
            ← Back to Notebooks
          </Button>
          <h1 className="text-3xl font-bold text-neutral-900">
            {notebook?.title}
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-200"></div>
            <p className="mt-4 text-neutral-600">Loading notebook...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Documents
                  </h3>
                </CardHeader>
                <CardContent>
                  <DocumentUpload notebookId={notebookId} onUploadComplete={(document) => {
                    setDocuments([document, ...documents]);
                  }} />
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  Document List
                </h3>
                {documents.length === 0 ? (
                  <div className="text-center py-12 text-neutral-600">
                    No documents uploaded yet
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc, index) => (
                      <Card key={doc.id} hover className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CardContent>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-neutral-900">{doc.title}</h4>
                              <p className="text-sm text-neutral-500">{doc.fileName}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-neutral-500">
                                {new Date(doc.createdAt).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-neutral-500">
                                {(doc.size / 1024).toFixed(1)} KB
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
