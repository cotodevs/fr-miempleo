export interface FileData {
  name: string;
  path: string;
  type: "file" | "directory";
  contentType?: string;
}

export interface DirectoryFilesType {
  name: string;
  type: string;
}

export type FilesByFolderType = {
  [key: string]: Array<{
    name: string;
    path: string;
    type: "file" | "directory";
    contentType?: string;
    base64?: string;
  }>;
};
