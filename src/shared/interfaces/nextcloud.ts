export interface FileData {
  name: string;
  path: string;
  type: "file" | "directory";
  contentType?: string;
}

export interface DirectoryFilesType {
  name: string;
  type: "directory";
}

export interface FoldersAndFilesType {
  folders: DirectoryFilesType[];
  files: FileData[];
}

export type FilesByFolderType = {
  [key:string]: Array<{
    name: string;
    path: string;
    type: "file" | "directory";
    contentType?: string;
    base64?: string;
  }>
}
