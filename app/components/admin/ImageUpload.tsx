'use client';

import { useState, useRef, DragEvent } from 'react';
import Image from 'next/image';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  suggestion?: string;
  placeholder?: string;
  previewLabel?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  required = false,
  suggestion,
  placeholder = 'https://example.com/image.jpg',
  previewLabel,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La taille de l\'image ne doit pas dépasser 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload to your image hosting service
      // For now, we'll convert to base64 for demonstration
      // In production, you'd upload to a service like Cloudinary, AWS S3, etc.
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
        setIsUploading(false);
      };
      reader.onerror = () => {
        alert('Erreur lors du chargement de l\'image');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);

      // Example for external upload service:
      /*
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.url);
      } else {
        throw new Error('Upload failed');
      }
      */
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors du téléchargement de l\'image');
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {suggestion && (
        <p className="text-xs text-sky-600 mb-2">
          💡 {suggestion}
        </p>
      )}

      {/* Drag and Drop Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg transition-all ${
          isDragging
            ? 'border-sky-500 bg-sky-50'
            : 'border-slate-300 hover:border-sky-400 bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!value ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-8 text-center cursor-pointer"
          >
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                isDragging ? 'bg-sky-100' : 'bg-slate-100'
              }`}>
                <Upload className={`w-8 h-8 ${isDragging ? 'text-sky-600' : 'text-slate-400'}`} />
              </div>
              <p className="text-sm font-medium text-slate-700 mb-1">
                Glissez-déposez une image ici
              </p>
              <p className="text-xs text-slate-500 mb-3">ou cliquez pour parcourir</p>
              <p className="text-xs text-slate-400">PNG, JPG, GIF jusqu'à 5MB</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={value}
                alt="Preview"
                fill
                style={{ objectFit: 'contain' }}
                sizes="100vw"
                className="bg-slate-100"
              />
              {previewLabel && (
                <div className="absolute bottom-2 left-2 bg-slate-900/75 text-white text-xs px-2 py-1 rounded">
                  {previewLabel}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm font-medium text-slate-700">Téléchargement...</p>
            </div>
          </div>
        )}
      </div>

      {/* URL Input Fallback */}
      <div className="mt-3">
        <p className="text-xs text-slate-500 mb-2">Ou entrez une URL d'image :</p>
        <input
          type="url"
          required={required && !value}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
