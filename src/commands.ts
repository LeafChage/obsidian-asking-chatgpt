import { Notice, Value, type App } from "obsidian";
import { ChatGPTPluginSettings } from "./settings";
import { OpenAIClient } from "./chatgpt";
import { Prompt } from "./prompt";
import { SimpleModal } from "./simple-modal";
import type { ResponseError } from "openai/resources/responses/responses.mjs";
import { File } from "./file";
import { FileSuggestModal } from "./file-suggest-modal";

type Command = (app: App, settings: Partial<ChatGPTPluginSettings>) => Promise<any> | any;

export const askChatGPT: Command = async (app, settings) => {
  const targetFile = app.workspace.getActiveFile();
  if (!targetFile) {
    new Notice("not found the file");
    return;
  }

  if (!ChatGPTPluginSettings.is(settings)) {
    new Notice("all settings are required");
    return;
  }

  const apiKey = ChatGPTPluginSettings.fetchChatGPTAPIKey(app, settings);
  if (apiKey === null) {
    new Notice("not found the apikey");
    return;
  }

  const promptDir = app.vault.getAbstractFileByPath(settings.promptDir);
  if (!File.isFolder(promptDir)) {
    new Notice("not found your prompt directory");
    return;
  }

  const files = File.loadFilesInFolder(promptDir);
  new FileSuggestModal(app, files, async (file) => {
    new Notice("Processing...");
    const api = new OpenAIClient(
      apiKey,
      settings.modelName,
    );
    try {
      const prompt = await app.vault.read(file)
        .then(text => new Prompt(text).render({ title: targetFile.basename }));
      const resp = await api.answer(prompt);
      app.vault.append(targetFile, resp);
      new Notice("Done!");
    } catch (e: any) {
      if ("code" in e && "message" in e) {
        new Notice((e as ResponseError).code);
        new Notice((e as ResponseError).message);
      } else {
        new Notice("error");
      }
      console.error(e)
    }
  }).open()
}

export const checkPrompt: Command = (app, settings) => {
  const targetFile = app.workspace.getActiveFile();
  if (!targetFile) {
    new Notice("not found the file");
    return;
  }

  if (!ChatGPTPluginSettings.is(settings)) {
    new Notice("all settings are required");
    return;
  }

  const promptDir = app.vault.getAbstractFileByPath(settings.promptDir);
  if (!File.isFolder(promptDir)) {
    new Notice("not found your prompt directory");
    return;
  }

  const files = File.loadFilesInFolder(promptDir);
  new FileSuggestModal(app, files, async (file) => {
    const prompt = await app.vault.read(file)
      .then(text => new Prompt(text)
        .render({ title: targetFile.basename }));
    new SimpleModal(app, prompt).open()
  }).open()
}

export const debug: Command = (app, settings) => {
  if (!ChatGPTPluginSettings.is(settings)) {
    new Notice("all settings are required");
    return;
  }
  new Notice(ChatGPTPluginSettings.fetchChatGPTAPIKey(app, settings) ?? "???");
}
