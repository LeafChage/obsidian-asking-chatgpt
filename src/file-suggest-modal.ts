import { App, SuggestModal, TFile } from "obsidian";

export class FileSuggestModal extends SuggestModal<TFile> {
  constructor(
    app: App,
    private readonly files: TFile[],
    private readonly onSelect: (file: TFile) => void
  ) {
    super(app);
  }

  public getSuggestions = (query: string): TFile[] => {
    const q = query.toLowerCase();
    return this.files.filter(file =>
      file.basename.toLowerCase().includes(q)
    );
  }

  public renderSuggestion = (file: TFile, el: HTMLElement) => {
    el.createEl("div", { text: file.basename, });
  }

  onChooseSuggestion(file: TFile) {
    this.onSelect(file);
  }
}
