'use client';

import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  currentUrl?: string;
  onUpload: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ currentUrl, onUpload, label = 'Photo' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    setError('');
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setError('Only JPEG, PNG, or WebP images are allowed.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB.');
      return;
    }

    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      onUpload(url);
    } catch {
      setError('Upload failed. Please try again.');
      setPreview(currentUrl ?? null);
    } finally {
      setIsUploading(false);
    }
  }, [currentUrl, onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-stone-700">{label}</label>
      <div
        className={`relative border-2 border-dashed rounded-xl transition-colors ${
          isDragging ? 'border-stone-500 bg-stone-100' : 'border-stone-300 hover:border-stone-400'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative h-48 rounded-xl overflow-hidden">
            <Image src={preview} alt="Preview" fill className="object-cover" />
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
            {!isUploading && (
              <button
                type="button"
                onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = ''; }}
                className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors"
                aria-label="Remove image"
              >
                <X className="w-4 h-4 text-stone-700" />
              </button>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-3 py-10 text-stone-500 hover:text-stone-700"
          >
            <Upload className="w-8 h-8" />
            <span className="text-sm">Click or drag & drop to upload</span>
            <span className="text-xs">JPEG, PNG, WebP · max 10 MB</span>
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}
