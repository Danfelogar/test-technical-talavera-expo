export interface DummyRes {
  stocks: Stock[];
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  daily_change: number;
}
