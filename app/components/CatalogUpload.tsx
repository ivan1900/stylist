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
    <section>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h2 className='text-xl font-semibold'>Catálogo de ropa</h2>
          <p className='text-sm text-default-500'>
            Subí fotos de prendas para armar tu catálogo.
          </p>
        </div>
        <Button
          variant='primary'
          isPending={uploading}
          onPress={() => inputRef.current?.click()}>
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
        <Card>
          <Card.Content className='flex items-center justify-center h-40 text-default-400 text-sm'>
            Sin fotos aún. ¡Subí la primera prenda!
          </Card.Content>
        </Card>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
          {photos.map((photo) => (
            <div key={photo.id} className='relative group rounded-lg overflow-hidden border border-default-200'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt='Prenda'
                className='w-full aspect-square object-cover'
              />
              <button
                onClick={() => handleDelete(photo.id)}
                className='absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity'
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
