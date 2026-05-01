import { Notice, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, type ChatGPTPluginSettings } from './settings';
import { ChatGPTPluginSettingTab } from './settings-tab';
import { askChatGPT, checkPrompt } from './commands';

export class ChatGPTPlugin extends Plugin {
  settings: Partial<ChatGPTPluginSettings> = {};

  public onload = async () => {
    await this.loadSettings();

    this.addCommand({
      id: 'chatgpt-ask-update-file',
      name: 'Ask ChatGPT',
      callback: async () => {
        await askChatGPT(this.app, this.settings)
      },
    });

    this.addCommand({
      id: 'chatgpt-check-promopt',
      name: 'Check Prompt',
      callback: () => checkPrompt(this.app, this.settings),
    });

    // this.addCommand({
    //   id: 'chatgpt-debuf',
    //   name: 'Debug',
    //   callback: () => debug(this.app, this.settings),
    // });
    this.addSettingTab(new ChatGPTPluginSettingTab(this.app, this));
  }

  public onunload = async () => {
  }

  public loadSettings = async () => {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<ChatGPTPluginSettings>);
  }

  public saveSettings = async () => {
    await this.saveData(this.settings);
  }
}

export default ChatGPTPlugin;


