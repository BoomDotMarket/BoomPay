import Domain from "../../base/Domain";
import Service from "../../base/Service";
import { Currency, CurrencyIso } from "../../interfaces";
import { isAddress } from "web3-utils";

export interface CreateWalletOptions {
  currency: CurrencyIso;
}

export interface WalletInstance {
  address: string;
  balance: number;
  currency: Currency;
}

export default class Wallet extends Service {
  _uri: string;

  constructor(domain: Domain) {
    super(domain);
    this._uri = "/v1/boompay/wallet";
  }

  createWallet(
    params: CreateWalletOptions,
    callback?: (error: Error | null, item: WalletInstance) => any
  ): Promise<WalletInstance> {
    if (params === null || params === undefined) {
      throw new Error('Required parameter "params" missing.');
    }

    if (params["currency"] === null || params["currency"] === undefined) {
      throw new Error("Required parameter \"params['currency']\" missing.");
    }

    if (typeof params["currency"] !== "string") {
      throw new Error("Invalid currency, required a string.");
    }

    let walletPromise: Promise<WalletInstance> = this.create({
      uri: this._uri,
      data: params,
    });
    walletPromise = this.setPromiseCallback(walletPromise, callback);

    return walletPromise;
  }

  getWallet(
    address: string,
    callback?: (error: Error | null, item: WalletInstance) => any
  ): Promise<WalletInstance> {
    if (!isAddress(address.replace("Bx", ""))) {
      throw new Error("Invalid wallet address.");
    }

    let walletPromise: Promise<WalletInstance> = this.get({
      uri: this._uri + `/${address}`,
    });

    walletPromise = this.setPromiseCallback(walletPromise, callback);

    return walletPromise;
  }

  getDefaultWallet(
    callback?: (error: Error | null, item: WalletInstance) => any
  ): Promise<WalletInstance> {
    let walletPromise: Promise<WalletInstance> = this.get({
      uri: this._uri + "/default",
    });
    walletPromise = this.setPromiseCallback(walletPromise, callback);

    return walletPromise;
  }
}
