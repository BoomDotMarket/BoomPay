import Domain from "../../base/Domain";
import Service from "../../base/Service";
import { URL } from "url";
import { isValidUUID } from "../../base/util";

export interface PaymentIntentCreateOptions {
  amount: number;
  metadata?: Object;
  successUrl: string;
  failureUrl: string;
  label: string;
}

export interface PaymentIntentInstance {
  id: string;
  walletAddress: string;
  amount: number;
  link: string;
  metadata?: any;
  state: string;
  createdAt: string;
  paidAt: string;
  successUrl: string;
  failureUrl: string;
  label: string;
  isSent?: Boolean;
}

export default class Payment extends Service {
  _uri: string;

  constructor(domain: Domain) {
    super(domain);
    this._uri = "/v1/boompay/paymentIntent";
  }

  createIntent(
    params: PaymentIntentCreateOptions,
    callback?: (error: Error | null, item: PaymentIntentInstance) => any
  ): Promise<PaymentIntentInstance> {
    if (params === null || params === undefined) {
      throw new Error('Required parameter "params" missing.');
    }

    if (params["amount"] === null || params["amount"] === undefined) {
      throw new Error("Required parameter \"params['amount']\" missing.");
    }

    if (params["successUrl"] === null || params["successUrl"] === undefined) {
      throw new Error("Required parameter \"params['sucessUrl']\" missing.");
    }

    if (params["failureUrl"] === null || params["failureUrl"] === undefined) {
      throw new Error("Required parameter \"params['failureUrl']\" missing.");
    }

    if (params["label"] === null || params["label"] === undefined) {
      throw new Error("Required parameter \"params['label']\" missing.");
    }

    if (typeof params["amount"] !== "number") {
      throw new Error("Invalid amount, required a number.");
    }

    if (typeof params["successUrl"] !== "string") {
      throw new Error("Invalid successUrl, required a string.");
    }

    if (typeof params["failureUrl"] !== "string") {
      throw new Error("Invalid failureUrl, required a string.");
    }

    if (typeof params["label"] !== "string") {
      throw new Error("Invalid label, required a string.");
    }

    try {
      new URL(params["successUrl"]);
    } catch (_) {
      throw new Error("sucesssUrl is not a valid URL.");
    }

    try {
      new URL(params["failureUrl"]);
    } catch (_) {
      throw new Error("failureUrl is not a valid URL.");
    }

    let paymentPromise: Promise<PaymentIntentInstance> = this.create({
      uri: this._uri,
      data: params,
    }).then((payment) => {
      return payment
    });
    paymentPromise = this.setPromiseCallback(paymentPromise, callback);

    return paymentPromise;
  }

  getPayment(
    id: string,
    callback?: (error: Error | null, item: PaymentIntentInstance) => any
  ): Promise<PaymentIntentInstance> {
    if (!isValidUUID(id)) {
      throw new Error("Invalid id, expected an UUID.");
    }

    let paymentPromise: Promise<PaymentIntentInstance> = this.get({
      uri: this._uri + `/${id}`,
    });

    paymentPromise = this.setPromiseCallback(paymentPromise, callback);

    return paymentPromise;
  }
}
