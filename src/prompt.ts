import { Eta } from "eta/core"

export class Prompt {
  private eta: Eta;

  public constructor(
    private readonly prompt: string
  ) {
    this.eta = new Eta();
  }

  public render = (params: {
    title: string,
  }): string => {
    return this.eta.renderString(this.prompt, params);
  }
}

