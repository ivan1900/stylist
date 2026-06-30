'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Card } from '@heroui/react';
import { toast } from 'sonner';

type Photo = { id: number; url: string };

export default function CatalogUpload() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/catalog')
      .then((r) => r.json())
      .then((d) => setPhotos(d.photos ?? []));
  }, []);

  async function handleFile(file: File) {
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/catalog', { method: 'POST', body: form });
    if (!res.ok) {
      toast.error('Error al subir la foto');
    } else {
      const data: Photo = await res.json();
      setPhotos((prev) => [data, ...prev]);
      toast.success('Foto agregada al catálogo');
    }
    setUploading(false);
  }

  async function handleDelete(id: number) {
    const res = await fetch(`/api/catalog?id=${id}`, { method: 'DELETE' });
    if (!res.ok) {
      toast.error('Error al eliminar la foto');
      return;
    }
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    toast.success('Foto eliminada');
  }

  return (
    <section className='h-full border border-gray-200 rounded-2xl p-4 flex flex-col'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h2 className='text-xl font-semibold'>Catálogo de ropa</h2>
          <p className='text-sm text-slate-600'>
            Subí fotos de prendas para armar tu catálogo.
          </p>
        </div>
        <Button
          isPending={uploading}
          onPress={() => inputRef.current?.click()}
          className='bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-shadow'>
          Subir foto
        </Button>
      </div>

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = '';
        }}
      />

      {photos.length === 0 ? (
        <div className='flex-1 flex items-center justify-center text-slate-500 text-sm'>
          Sin fotos aún. ¡Subí la primera prenda!
        </div>
      ) : (
        <div className='flex-1 overflow-y-auto flex flex-col gap-2'>
          {photos.map((photo, i) => (
            <div key={photo.id} className='flex items-center gap-3 rounded-lg border border-gray-200 p-2 group'>
              <img src={photo.url} alt='Prenda' className='w-12 h-12 object-cover rounded-md shrink-0' />
              <span className='flex-1 text-sm truncate text-slate-700'>Prenda {i + 1}</span>
              <button
                onClick={() => handleDelete(photo.id)}
                className='text-slate-400 hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1'
                aria-label='Eliminar foto'>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
