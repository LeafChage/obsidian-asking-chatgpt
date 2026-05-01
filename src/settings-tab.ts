import { App, PluginSettingTab, SecretComponent, Setting } from "obsidian";
import { ChatGPTPlugin } from "./main";
import { FolderSuggest } from "./folder-suggestion";

export class ChatGPTPluginSettingTab extends PluginSettingTab {
  plugin: ChatGPTPlugin;

  constructor(app: App, plugin: ChatGPTPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  public display = () => {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("ChatGPTAPIKey")
      .addComponent((e) =>
        new SecretComponent(this.app, e)
          .setValue(this.plugin.settings.chatGPTAPIKeyID ?? "")
          .onChange(async (value) => {
            this.plugin.settings.chatGPTAPIKeyID = value;
            await this.plugin.saveSettings();
          }))

    new Setting(containerEl)
      .setName("ChatGPTModelName")
      .setDesc("refer to: https://developers.openai.com/api/docs/models/all")
      .addText(text => text
        .setPlaceholder("Enter model-name (ex: gpt-5.4-mini)")
        .setValue(this.plugin.settings.modelName ?? "")
        .onChange(async (value) => {
          this.plugin.settings.modelName = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName("Prompt Directory")
      .addText(text => {
        const onChange = async (value: string) => {
          this.plugin.settings.promptDir = value;
          await this.plugin.saveSettings();
        };
        text.setPlaceholder("where is your prompt directory")
          .setValue(this.plugin.settings.promptDir ?? "")
          .onChange(onChange)

        new FolderSuggest(this.app, text.inputEl, onChange);
      });
  }
}

