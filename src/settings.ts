import type { App } from "obsidian";

export interface ChatGPTPluginSettings {
  chatGPTAPIKeyID: string;
  modelName: string;

  // directory
  // prompt can be Eta template engine with <%= it.title %>
  promptDir: string;
}

export const DEFAULT_SETTINGS: Partial<ChatGPTPluginSettings> = {
  modelName: "gpt-5.4-mini",
}

type Self = ChatGPTPluginSettings;
export const ChatGPTPluginSettings = {
  is: (self: Partial<Self>): self is Self =>
    (self.chatGPTAPIKeyID ?? "") !== ""
    && (self.modelName ?? "") !== ""
    && (self.promptDir ?? "") !== "",

  fetchChatGPTAPIKey: (app: App, self: Self): string | null =>
    app.secretStorage.getSecret(self.chatGPTAPIKeyID)
} as const;

