'use client';
import Image from 'next/image';
import { useState } from 'react';

type imageLoaderProps = {
  src: string;
  alt: string;
  customClass?: string;
};

export default function ImageLoader({
  src,
  alt,
  customClass = '',
}: imageLoaderProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative h-full w-full">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        onLoadingComplete={() => setLoading(false)}
        className={`${customClass} ${loading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}
