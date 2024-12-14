import { Stock } from "@/src/types";

export interface StockState {
  //states
  filterStockName: string;
  isLoading: boolean;
  stockList?: Stock[];
  stockPrevent?: Stock[];
  //actions
  changeFilterStockName: (filterStockName: string) => void;
  getStockList: () => void;
  setStockList: (stockList: Stock[]) => void;
  setPrevStockList: (stockList: Stock[]) => void;
  changeLoading: (isLoading: boolean) => void;
}

export interface StockWithoutAction
  extends Omit<
    StockState,
    | "changeFilterStockName"
    | "getStockList"
    | "setStockList"
    | "setPrevStockList"
    | "changeLoading"
  > {}
