import { WebDAV } from "@/shared/lib/webdav";
import { NEXTCLOUD_TOKEN, NEXTCLOUD_USERNAME } from "@/shared/config/env";
import { DirectoryFilesType, FileData } from "@/shared/interfaces/nextcloud";

const webDAVClient = new WebDAV(NEXTCLOUD_USERNAME, NEXTCLOUD_TOKEN);

export const webDAVService = {
  async getFoldersAndFiles(folder: string) {
    const files = await webDAVClient.listFiles(folder);

    const folders: DirectoryFilesType[] = files
      .filter((file: FileData) => file.type === "directory")
      .map((directory) => {
        return {
          name: directory.name,
          type: "directory",
        };
      });

    const filteredFiles = files.filter(
      (file: FileData) =>
        file.type !== "directory" && file.contentType?.startsWith("image/"),
    );

    return {
      folders,
      files: filteredFiles,
    };
  },

  async getImageBuffer(filePath: string): Promise<Buffer> {
    try {
      return await webDAVClient.getImageBuffer(filePath);
    } catch (error) {
      console.error("Error getting image buffer:", error);
      throw error;
    }
  },
};
