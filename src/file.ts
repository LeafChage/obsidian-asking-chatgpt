import { TAbstractFile, TFile, TFolder } from "obsidian";

export namespace File {
  // search 1 level nest only
  export const loadFilesInFolder = (folder: TFolder): TFile[] => {
    const files: TFile[] = [];

    for (const child of folder.children) {
      if (child instanceof TFile) {
        files.push(child);
      }
    }

    return files;
  }

  export const isFolder = (folder: TAbstractFile | null): folder is TFolder =>
    folder !== null && folder instanceof TFolder
}

