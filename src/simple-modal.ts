import { App, Component, MarkdownRenderer, Modal, } from 'obsidian';

export class SimpleModal extends Modal {
  private component = new Component();

  constructor(
    app: App,
    private readonly text: string
  ) {
    super(app);
  }

  public onOpen = async () => {
    this.contentEl.empty();
    this.component.load();
    await MarkdownRenderer.render(
      this.app,
      this.text,
      this.contentEl,
      "",
      this.component,
    );
  }

  onClose() {
    this.component.unload();
    this.contentEl.empty();
  }
}

