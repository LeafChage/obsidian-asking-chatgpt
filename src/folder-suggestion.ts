import {
  AbstractInputSuggest,
  App,
  TFolder
} from "obsidian";

export class FolderSuggest extends AbstractInputSuggest<TFolder> {
  public constructor(
    public readonly app: App,
    private readonly inputEl: HTMLInputElement,
    private readonly onChange: (v: string) => any
  ) {
    super(app, inputEl);
  }

  public getSuggestions = (query: string): TFolder[] => {
    const q = query.toLowerCase();

    return this.app.vault
      .getAllLoadedFiles()
      .filter(
        (f): f is TFolder =>
          f instanceof TFolder &&
          f.path.toLowerCase().includes(q)
      );
  }

  public renderSuggestion = (folder: TFolder, el: HTMLElement) => {
    el.createEl("div", { text: folder.path });
  }

  public selectSuggestion = (folder: TFolder) => {
    this.inputEl.value = folder.path;
    this.onChange(folder.path)
    this.close();
  }
}
