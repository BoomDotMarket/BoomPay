import { Client as BaseBoomPay, RequestOpts } from "./BaseBoomPay";

export default class Domain {
  constructor(public boomPay: BaseBoomPay, public baseUrl: string) {}

  request(opts: RequestOpts): Promise<any> {
    return this.boomPay.request({
      ...opts,
      uri: this.baseUrl + opts.uri,
    });
  }
}
