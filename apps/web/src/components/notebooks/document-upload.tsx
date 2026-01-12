'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface DocumentUploadProps {
  notebookId: string;
  onUploadComplete: (document: any) => void;
}

export function DocumentUpload({ notebookId, onUploadComplete }: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('notebookId', notebookId);

    try {
      const xhr = new XMLHttpRequest();
      
      // Upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });
      
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          const response = JSON.parse(xhr.responseText);
          onUploadComplete(response);
          setUploadProgress(100);
          setIsUploading(false);
          return;
        }

        console.error('Upload failed', xhr.status, xhr.responseText);
        setIsUploading(false);
        setUploadProgress(0);
      };
      
      xhr.onerror = () => {
        console.error('Upload failed');
        setIsUploading(false);
        setUploadProgress(0);
      };
      
      xhr.open('POST', `/api/notebooks/${notebookId}/documents`, true);
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      xhr.send(formData);
      
    } catch (error) {
      console.error('Upload error:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-lg font-semibold text-neutral-900">
          Upload Documents
        </h3>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            isDragging ? 'border-primary-400 bg-primary-50' : 'border-neutral-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            id="file-upload"
            aria-label="Upload documents"
          />
          
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a10 10 0 011-10 10H3a10 10 0 00-10 10v6a10 10 0 011-10 10h6a10 10 0 011-10 10v10a10 10 0 011-10 10z" />
              </svg>
            </div>
            
            <div>
              <p className="text-lg font-medium text-neutral-900 mb-2">
                {isUploading ? 'Uploading...' : 'Drag & drop files here'}
              </p>
              <p className="text-sm text-neutral-600 mb-4">
                Any file type (development)
              </p>
            </div>
            
            {isUploading && (
              <>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-neutral-600 mt-2">
                  {uploadProgress}% complete
                </p>
              </>
            )}
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full"
            >
              {isUploading ? 'Uploading...' : 'Choose Files'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
