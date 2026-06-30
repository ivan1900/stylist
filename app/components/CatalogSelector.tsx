'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export type Photo = { id: number; url: string };

type Props = {
  onSelectionChange?: (photos: Photo[]) => void;
};

export default function CatalogSelector({ onSelectionChange }: Props) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    fetch('/api/catalog')
      .then((r) => r.json())
      .then((d) => setPhotos(d.photos ?? []));
  }, []);

  function toggle(id: number) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) {
        toast.error('Máximo 4 prendas seleccionadas');
        return prev;
      }
      return [...prev, id];
    });
  }

  useEffect(() => {
    onSelectionChange?.(photos.filter((p) => selected.includes(p.id)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <section className='h-full border border-gray-200 rounded-2xl p-4 flex flex-col'>
      <div className='mb-4'>
        <h2 className='text-xl font-semibold'>Seleccionar prendas</h2>
        <p className='text-sm text-slate-600'>
          Elegí hasta 4 prendas del catálogo.{' '}
          <span className={selected.length === 4 ? 'text-pink-500 font-medium' : ''}>
            {selected.length}/4
          </span>
        </p>
      </div>

      {photos.length === 0 ? (
        <div className='flex-1 flex items-center justify-center text-slate-500 text-sm text-center px-4'>
          Sin fotos en el catálogo. Subí prendas desde el Baúl.
        </div>
      ) : (
        <div className='flex-1 overflow-y-auto grid grid-cols-3 gap-3 content-start'>
          {photos.map((photo, i) => {
            const isSelected = selected.includes(photo.id);
            const selIdx = selected.indexOf(photo.id);
            return (
              <button
                key={photo.id}
                onClick={() => toggle(photo.id)}
                className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-pink-500 shadow-md shadow-pink-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={photo.url}
                  alt={`Prenda ${i + 1}`}
                  className='w-full aspect-square object-cover'
                />
                {isSelected && (
                  <div className='absolute top-1.5 right-1.5 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow'>
                    {selIdx + 1}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
