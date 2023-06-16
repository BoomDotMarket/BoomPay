export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";


export interface Currency {
  iso: CurrencyIso,
  label: string,
  symbol: string,
  precision: string
}



export type CurrencyIso =
  | "EMTCN"
  | "EUR"
  | "USD"
  | "GBP"
  | "NGN"
  | "INR"
  | "XOF"
  | "ZAR"
  | "GHS"
  | "THB"
  | "IDR"
  | "BRL"
  | "MAD"
  | "TRY"
  | "ILS";

export interface OptionConfiguration {
  apiKey: string;
  sandbox?: boolean
}
