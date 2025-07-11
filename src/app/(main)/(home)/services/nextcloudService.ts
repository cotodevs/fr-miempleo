import { WebDAV } from "@/shared/lib/webdav";
import { NEXTCLOUD_TOKEN, NEXTCLOUD_USERNAME } from "@/shared/config/env";
import { DirectoryFilesType, FileData } from "@/shared/interfaces/nextcloud";

const webDAVClient = new WebDAV(NEXTCLOUD_USERNAME, NEXTCLOUD_TOKEN);

export const webDAVService = {
  async getPhotos(folder: string) {
    const files = await webDAVClient.listFiles(folder);

    return files.filter(
      (file: FileData) =>
        file.type !== "directory" && file.contentType?.startsWith("image/"),
    );
  },

  async getDirectoryFiles(mainFolder: string): Promise<DirectoryFilesType[]> {
    const files = await webDAVClient.listFiles(mainFolder);

    return files
      .filter((file: FileData) => file.type === "directory")
      .map((directory) => {
        return {
          name: directory.name,
          type: "directory",
        };
      });
  },

  async getFoldersAndFiles(folder: string) {
    const files = await webDAVClient.listFiles(folder);
    console.log(files);

    const folders = files
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

  async getImageBase64(filePath: string): Promise<string> {
    const buffer = await webDAVClient.getImageBuffer(filePath);
    return buffer.toString("base64");
  },
};
