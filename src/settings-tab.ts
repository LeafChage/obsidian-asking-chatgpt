import { App, PluginSettingTab, SecretComponent, Setting } from "obsidian";
import { ChatGPTPlugin } from "./main";

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
      .setName("Prompt")
      .setDesc("What do you want to order to ChatGPT")
      .addTextArea(text => text
        .setPlaceholder("you can use <%= it.title %> to include title name")
        .setValue(this.plugin.settings.prompt ?? "")
        .onChange(async (value) => {
          this.plugin.settings.prompt = value;
          await this.plugin.saveSettings();
        })
      );
  }
}

