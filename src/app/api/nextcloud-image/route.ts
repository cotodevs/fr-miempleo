import { NextRequest, NextResponse } from "next/server";
import { webDAVService } from "@/app/(main)/(home)/services/nextcloudService";

// Cache del lado del servidor
const serverCache = new Map<
  string,
  {
    buffer: Buffer;
    timestamp: number;
    contentType: string;
  }
>();

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (!path) {
      return new NextResponse("Path parameter is required", { status: 400 });
    }

    // Verificar caché del servidor
    const cached = serverCache.get(path);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return new NextResponse(cached.buffer, {
        headers: {
          "Content-Type": cached.contentType,
          "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
        },
      });
    }

    try {
      // Usar tu servicio WebDAV existente
      const imageBuffer = await webDAVService.getImageBuffer(path);
      const contentType = getContentType(path);

      // Guardar en caché
      serverCache.set(path, {
        buffer: imageBuffer,
        timestamp: Date.now(),
        contentType,
      });

      return new NextResponse(imageBuffer, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
        },
      });
    } catch (serviceError) {
      console.error("Error with webDAVService:", serviceError);
      return new NextResponse("Error loading image from NextCloud", {
        status: 500,
      });
    }
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

function getContentType(path: string): string {
  const ext = path.toLowerCase().split(".").pop();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
}
