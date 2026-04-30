import { Notice, type App } from "obsidian";
import { ChatGPTPluginSettings } from "./settings";
import { OpenAIClient } from "./chatgpt";
import { Prompt } from "./prompt";
import { SimpleModal } from "./simple-modal";
import type { ResponseError } from "openai/resources/responses/responses.mjs";

type Command = (app: App, settings: Partial<ChatGPTPluginSettings>) => Promise<any> | any;

export const askChatGPT: Command = async (app, settings) => {
  try {
    const file = app.workspace.getActiveFile();
    if (!file) {
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

    const api = new OpenAIClient(
      apiKey,
      settings.modelName,
    );
    const prompt = new Prompt(settings.prompt).render({ title: file.basename });
    const resp = await api.answer(prompt);
    app.vault.append(file, resp);
  } catch (e: any) {
    if ("code" in e && "message" in e) {
      new Notice((e as ResponseError).code);
      new Notice((e as ResponseError).message);
    } else {
      new Notice("error");
    }
    console.error(e)
  }
}

export const checkPrompt: Command = (app, settings) => {
  const file = app.workspace.getActiveFile();
  if (!file) {
    new Notice("not found the file");
    return;
  }

  if (!ChatGPTPluginSettings.is(settings)) {
    new Notice("all settings are required");
    return;
  }

  const prompt = new Prompt(settings.prompt);
  new SimpleModal(app, prompt.render({ title: file.basename })).open()
}

export const debug: Command = (app, settings) => {
  if (!ChatGPTPluginSettings.is(settings)) {
    new Notice("all settings are required");
    return;
  }
  new Notice(ChatGPTPluginSettings.fetchChatGPTAPIKey(app, settings) ?? "???");
}
