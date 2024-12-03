import { Stock } from "@/src/types";

export interface StockState {
  //states
  isLoading: boolean;
  stockList?: Stock[];
  stockPrevent?: Stock[];
  //actions
  getStockList: () => void;
  setStockList: (stockList: Stock[]) => void;
  setPrevStockList: (stockList: Stock[]) => void;
  changeLoading: (isLoading: boolean) => void;
}

export interface StockWithoutAction
  extends Omit<
    StockState,
    "getStockList" | "setStockList" | "setPrevStockList" | "changeLoading"
  > {}
