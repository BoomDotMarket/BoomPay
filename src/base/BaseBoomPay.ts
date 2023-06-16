import RequestClient from "./RequestClient";
import { HttpMethod } from "../interfaces";
import url from "url";

export interface RequestOpts {
  method?: HttpMethod;
  uri?: string;
  headers?: Headers;
  params?: object;
  data?: object;
  timeout?: number;
  allowRedirects?: boolean;
  logLevel?: string;
}

export class Client {
  _httpClient: RequestClient;
  apiKey: string;

  constructor(httpClient: RequestClient, apiKey: string) {
    this._httpClient = httpClient;
    this.apiKey = apiKey;
  }

  get httpClient() {
    if (!this._httpClient) {
      this._httpClient = new RequestClient({
        maxRetries: 1,
      });
    }
    return this._httpClient;
  }

  request(opts: RequestOpts): Promise<any> {
    opts = opts || {};

    if (!opts.method) {
      throw new Error("method is required");
    }

    if (!opts.uri) {
      throw new Error("uri is required");
    }

    const apiKey = this.apiKey;
    const headers: any = opts.headers || {};

    var uri = new url.URL(opts.uri);
    uri.hostname = uri.hostname;

    return this.httpClient.request({
      method: opts.method,
      uri: uri.href,
      apiKey: apiKey,
      headers: headers,
      params: opts.params,
      data: opts.data,
      timeout: opts.timeout,
      allowRedirects: opts.allowRedirects,
      logLevel: opts.logLevel,
    });
  }
}
