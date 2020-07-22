import fetch from "node-fetch";
import * as vscode from "vscode";

interface IResponse {
  result: any;
  error: any;
}

export class AnkiService {
  private url: string;
  private version = 6;

  constructor(url: string) {
    this.url = url;
  }

  async invoke(action: string, params?: object): Promise<IResponse> {
    const req = { action, version: this.version, ...params };
    const response = await fetch(this.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  }

  // https://github.com/FooSoft/anki-connect/blob/master/actions/miscellaneous.md
  /** Synchronizes the local Anki collections with AnkiWeb. */
  async syncGui() {
    await this.invoke("sync");
  }
}
