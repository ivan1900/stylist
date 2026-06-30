'use client';

import { useState } from 'react';
import { Accordion, Button } from '@heroui/react';
import { toast } from 'sonner';
import ModelPhotoUpload from './ModelPhotoUpload';
import CatalogUpload from './CatalogUpload';
import CatalogSelector, { type Photo } from './CatalogSelector';
import AppBar from './AppBar';

type Props = { userName: string };

export default function DashboardClient({ userName }: Props) {
  const [modelPhotoUrl, setModelPhotoUrl] = useState<string | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>([]);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const canGenerate = !!modelPhotoUrl && selectedPhotos.length > 0;

  async function generateOutfit() {
    if (!canGenerate) return;
    setAiLoading(true);
    setAiResult(null);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelImageUrl: modelPhotoUrl,
          catalogImageUrls: selectedPhotos.map((p) => p.url),
        }),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: 'Error desconocido' }));
        toast.error(error ?? 'Error al generar el outfit');
        return;
      }
      const { imageUrl } = await res.json();
      setAiResult(imageUrl);
    } catch {
      toast.error('Error de red al contactar la IA');
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar />
      <main className="max-w-4xl mx-auto py-12 px-4 font-sans space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-slate-600">Bienvenido, {userName}!</p>
        </div>

        <Accordion variant="surface" defaultExpandedKeys={['baul', 'combinacion']}>
          <Accordion.Item id="baul">
            <Accordion.Heading>
              <Accordion.Trigger>
                Baúl
                <Accordion.Indicator className="text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                <div className="flex gap-8 items-stretch h-[560px]">
                  <div className="shrink-0 w-72 h-full">
                    <ModelPhotoUpload onPhotoChange={setModelPhotoUrl} />
                  </div>
                  <div className="flex-1 min-w-0 h-full">
                    <CatalogUpload />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item id="combinacion">
            <Accordion.Heading>
              <Accordion.Trigger>
                Combinación
                <Accordion.Indicator className="text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                <div className="flex gap-8 items-stretch h-[560px]">
                  <div className="flex-1 min-w-0 h-full">
                    <CatalogSelector onSelectionChange={setSelectedPhotos} />
                  </div>
                  <div className="shrink-0 w-72 h-full">
                    <section className="h-full border border-gray-200 rounded-2xl p-4 flex flex-col">
                      <h2 className="text-xl font-semibold mb-1">Preview</h2>
                      <p className="text-sm text-slate-600 mb-4">Resultado del outfit.</p>

                      <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
                        {aiResult ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={aiResult}
                            alt="Outfit generado"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-slate-400 text-sm select-none text-center px-4">
                            {aiLoading ? 'Generando outfit...' : 'El resultado aparecerá aquí'}
                          </span>
                        )}
                      </div>

                      <div className="mt-4 space-y-2">
                        <Button
                          isPending={aiLoading}
                          isDisabled={!canGenerate}
                          onPress={generateOutfit}
                          className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-shadow disabled:opacity-50"
                        >
                          {aiLoading ? 'Generando...' : 'Generar outfit'}
                        </Button>
                        {!modelPhotoUrl && (
                          <p className="text-xs text-slate-400 text-center">
                            Falta la foto del modelo (Baúl)
                          </p>
                        )}
                        {modelPhotoUrl && selectedPhotos.length === 0 && (
                          <p className="text-xs text-slate-400 text-center">
                            Seleccioná al menos una prenda
                          </p>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </main>
    </div>
  );
}
