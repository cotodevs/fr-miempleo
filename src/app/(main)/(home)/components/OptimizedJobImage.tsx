"use client";

import { useEffect, useRef, useState } from "react";
import { Image } from "antd";
import { FileData } from "@/shared/interfaces/nextcloud";

interface OptimizedJobImageProps {
  photo: FileData;
  priority?: boolean;
}

const imageCache = new Map<string, string>();

const OptimizedJobImage = ({
  photo,
  priority = false,
}: OptimizedJobImageProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Cargar cuando el 10% de la imagen sea visible
        rootMargin: "100px", // expandir el área de observación para cargar antes
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Cargar imagen cuando está en vista
  useEffect(() => {
    // Si no está en vista, ya tiene imagen cargada o está cargando, no hacer nada
    if (!isInView || imageSrc || loading) return;

    const loadImage = async () => {
      try {
        setLoading(true);
        setError(false);

        // Verificar caché primero
        if (imageCache.has(photo.path)) {
          setImageSrc(imageCache.get(photo.path)!);
          setLoading(false);
          return;
        }

        // Llamar al API endpoint
        const response = await fetch(
          `/api/nextcloud-image?path=${encodeURIComponent(photo.path)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load image");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        // Guardar en caché
        imageCache.set(photo.path, imageUrl);
        setImageSrc(imageUrl);
      } catch (err) {
        console.error("Error loading image:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImage();
  }, [isInView, photo.path, imageSrc, loading]);

  // Cleanup URL objects
  useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith("blob:")) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  return (
    <div
      ref={imgRef}
      className="relative h-[240px] w-[210px] overflow-hidden rounded-lg"
    >
      {loading && (
        <div className="flex h-full w-full animate-pulse items-center justify-center rounded-lg bg-gray-200">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cotoneb border-t-transparent"></div>
        </div>
      )}

      {error && (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-100">
          <span className="mb-2 text-sm text-gray-500">⚠️</span>
          <span className="px-2 text-center text-xs text-gray-500">
            Error al cargar
          </span>
          <button
            onClick={() => {
              setError(false);
              setIsInView(true);
            }}
            className="mt-2 text-xs text-cotoneb underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {imageSrc && !loading && !error && (
        <Image
          src={imageSrc}
          alt={photo.name}
          className="rounded-lg object-contain"

        />
      )}
    </div>
  );
};

export default OptimizedJobImage;
