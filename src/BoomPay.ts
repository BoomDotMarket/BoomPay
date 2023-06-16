import { Client } from "./base/BaseBoomPay";
import RequestClient from "./base/RequestClient";
import Domain from "./base/Domain";
import { OptionConfiguration } from "./interfaces";
import { PaymentService, WalletService } from "./rest";
import Webhook from "./webhooks";

/**
 * Main BoomPay SDK class
 *
 * @export
 * @class BoomPay
 */
class BoomPay {
  payments: PaymentService.default;
  wallets: WalletService.default;
  webhooks: Function;
  /**
   * Creates an instance of BoomPay's SDK.
   *
   * @constructor
   * @param {Object} [options] Configuration options
   */
  constructor(options: OptionConfiguration) {
    const httpClient = new RequestClient();

    if (!options) {
      throw new Error(
        "Missing configuration options. Please provide a valid options object."
      );
    }

    if (!options.apiKey) {
      throw new Error(
        "Missing BoomPay API key. Please provide a valid API key in the options."
      );
    }

    const baseBoomPay = new Client(httpClient, options.apiKey);

    const domain = new Domain(
      baseBoomPay,
      options.sandbox ? "https://sapi.boom.market" : "https://api.boom.market"
    );

    this.payments = new PaymentService.default(domain);
    this.wallets = new WalletService.default(domain);
    this.webhooks = Webhook(options.apiKey);
  }
}

export = BoomPay;
