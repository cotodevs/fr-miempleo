import { NEXTCLOUD_ENDPOINT, NEXTCLOUD_SERVER } from "@/shared/config/env";
import { FileData } from "@/shared/interfaces/nextcloud";
import { DOMParser } from "xmldom";

export class WebDAV {
  private username: string;
  private token: string;

  constructor(username: string, token: string) {
    this.username = username;
    this.token = token;
  }

  getElementText(element: Element, tagName: string): string | null {
    const nodes = element.getElementsByTagName(tagName);
    if (nodes.length > 0 && nodes[0].textContent) {
      return nodes[0].textContent.trim();
    }
    return null;
  }

  getResourceType(element: Element): "file" | "directory" {
    const resourceTypeNodes = element.getElementsByTagName("d:resourcetype");
    if (resourceTypeNodes.length > 0) {
      const resourceType = resourceTypeNodes[0];
      // Verificar si contiene el elemento d:collection
      const collectionNodes = resourceType.getElementsByTagName("d:collection");
      return collectionNodes.length > 0 ? "directory" : "file";
    }
    return "file"; // Por defecto, si no hay resourcetype, es un archivo
  }

  async listFiles(folder: string): Promise<FileData[]> {
    try {
      const response = await fetch(
        `${NEXTCLOUD_SERVER}/${NEXTCLOUD_ENDPOINT}/${folder}`,
        {
          method: "PROPFIND",
          headers: {
            Authorization: `Basic ${btoa(`${this.username}:${this.token}`)}`,
            "Content-Type": "application/xml",
            Depth: "2",
          },
          body: `<?xml version="1.0"?>
          <d:propfind xmlns:d="DAV:">
              <d:prop>
                  <d:displayname/>
                  <d:getcontentlength/>
                  <d:getcontenttype/>
                  <d:getlastmodified/>
                  <d:resourcetype/>
              </d:prop>
          </d:propfind>`,
          cache: "no-cache",
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to list files: ${response.statusText}`);
      }

      // Obtenemos el contenido de la respuesta en formato XML
      const text = await response.text();

      // Creamos un parser XML para analizar la respuesta
      const parser = new DOMParser();
      // Parseamos el texto XML a un documento XML, para poder manipularlo
      const xmlDoc = parser.parseFromString(text, "application/xml");

      // Variable para almacenar los archivos
      const files: FileData[] = [];

      // Obtenemos todos los nodos de recursos
      const items = xmlDoc.getElementsByTagName("d:response");

      // Iteramos sobre cada nodo de recurso
      for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];

        const displayName = this.getElementText(currentItem, "d:displayname");
        const href = this.getElementText(currentItem, "d:href");
        const contentType = this.getElementText(
          currentItem,
          "d:getcontenttype",
        );


        const fileData: FileData = {
          name: displayName || "",
          path: href || "",
          type: this.getResourceType(currentItem),
          contentType: contentType || undefined,
        };
        // Añadimos el archivo a la lista
        files.push(fileData);
      }

      // Devolvemos la lista de archivos
      return files;
    } catch (error) {
      console.error("Error listing files:", error);
      throw error;
    }
  }

  async getImageBuffer(filePath: string): Promise<Buffer> {
    try {
      const response = await fetch(`${NEXTCLOUD_SERVER}${filePath}`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${this.username}:${this.token}`)}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get image buffer: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      return Buffer.from(buffer);
    } catch (error) {
      console.error("Error getting image buffer:", error);
      throw error;
    }
  }
}
