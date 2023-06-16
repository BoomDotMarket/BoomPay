import Domain from "./Domain";
import { RequestOpts } from "./BaseBoomPay";
import RestException from "./RestException";

export default class Service {
  _domain: Domain;

  constructor(domain: Domain) {
    this._domain = domain;
  }

  get domain(): Domain {
    return this._domain;
  }

  request(opts: RequestOpts): Promise<any> {
    return this._domain.request(opts);
  }

  /**
   * Create a new record
   *
   * @param opts - return options
   *
   * @throws Error if response returns non 2xx or 201 status code
   *
   * @returns Promise that resolves to created record
   */
  create(opts: RequestOpts): Promise<any> {
    let qResponse = this.request({
      method: "post",
      ...opts
    });

    qResponse = qResponse.then(function success(response) {
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw new RestException(response);
      }

      if (typeof response.body === "string") {
        return JSON.parse(response.body);
      }

      return response.body;
    });

    return qResponse;
  }

  /**
   * Get a record
   *
   * @param opts - return options
   *
   * @throws Error if response returns non 2xx status code
   *
   * @returns Promise that resolves to created record
   */
  get(opts: RequestOpts): Promise<any> {
    let qResponse = this.request({
      method: "get",
      ...opts
    });

    qResponse = qResponse.then(function success(response) {
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw new RestException(response);
      }

      if (typeof response.body === "string") {
        return JSON.parse(response.body);
      }

      return response.body;
    });

    return qResponse;
  }



  setPromiseCallback(operationPromise: any, callback: any): Promise<any> {
    if (typeof callback === "function") {
      operationPromise = operationPromise
        .then((value: any) => callback(null, value))
        .catch((error: any) => callback(error));
    }
    return operationPromise;
  }
}
