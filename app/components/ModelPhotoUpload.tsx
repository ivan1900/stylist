'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Card } from '@heroui/react';

export default function ModelPhotoUpload({ onPhotoChange }: { onPhotoChange?: (url: string | null) => void }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/upload')
      .then((r) => r.json())
      .then((d) => {
        const url = d.url ?? null;
        setPhotoUrl(url);
        onPhotoChange?.(url);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleFile(file: File) {
    setLoading(true);
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: form });
    const data = await res.json();
    const url = data.url ?? null;
    setPhotoUrl(url);
    onPhotoChange?.(url);
    setLoading(false);
  }

  return (
    <section className='h-full border border-gray-200 rounded-2xl p-4 flex flex-col'>
      <h2 className='text-xl font-semibold mb-1'>Foto modelo</h2>
      <p className='text-sm text-slate-600 mb-4'>
        Subí una foto tuya a cuerpo completo para usarla como base del probador
        virtual.
      </p>

      <Card>
        <Card.Content className='flex flex-col items-center gap-4 p-6'>
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt='Foto modelo'
              className='w-full max-h-[480px] object-contain rounded-lg'
            />
          ) : (
            <div className='w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-slate-500 text-sm select-none'>
              Sin foto aún
            </div>
          )}

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

          <Button
            isPending={loading}
            onPress={() => inputRef.current?.click()}
            className='w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-shadow'>
            {photoUrl ? 'Reemplazar foto' : 'Subir foto'}
          </Button>
        </Card.Content>
      </Card>
    </section>
  );
}
