import OpenAI from "openai";

export class OpenAIClient {
  private client: OpenAI;

  public constructor(
    apiKey: string,
    private readonly model: string,
  ) {
    this.client = new OpenAI({
      apiKey,
      // this is needed because openai can identify our request from browser.
      // But, in this situation, this request is not as dangerous as that.
      dangerouslyAllowBrowser: true
    });
  }

  public answer = async (prompt: string): Promise<string> => {
    const response = await this.client.responses.create({
      model: this.model,
      input: prompt,
    });
    if (response.error != null) {
      throw response.error;
    } else {
      return response.output_text
    }
  }
}


