import Domain from "../../base/Domain";
import Service from "../../base/Service";

export interface WalletInstance {
  address: string;
  balance: number;
}

export default class Wallet extends Service {
  _uri: string;

  constructor(domain: Domain) {
    super(domain);
    this._uri = "/v1/boompay/wallet";
  }

  getDefaultWallet(
    callback?: (error: Error | null, item: WalletInstance) => any
  ): Promise<WalletInstance> {
    let walletPromise: Promise<WalletInstance> = this.get({
      uri: this._uri,
    });

    walletPromise = this.setPromiseCallback(walletPromise, callback);

    return walletPromise;
  }
}
