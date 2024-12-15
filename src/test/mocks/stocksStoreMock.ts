import { create } from "./zustand";

import { type StateCreator } from "zustand";
import dummyData from "@/src/utils/const/dummyData.json";
import { StockState, StockWithoutAction } from "@/src/store";
import { WaitTime } from "@/src/utils";
import { Stock } from "@/src/types";

export const INITIAL_STATE_STOCK_MOCK: StockWithoutAction = {
  filterStockName: "",
  isLoading: false,
  stockList: [],
  stockPrevent: [],
};

const useStockState: StateCreator<StockState> = (set, get) => ({
  ...INITIAL_STATE_STOCK_MOCK,
  //actions
  changeLoading: (isLoading: boolean) => set({ isLoading }),
  changeFilterStockName: (filterStockName: string) => {
    const currentState = get();
    const { stockPrevent, setStockList } = currentState;
    const filterStockNameLower = filterStockName.toLowerCase();
    const filteredStock = stockPrevent?.filter((stock) =>
      stock.name.toLowerCase().includes(filterStockNameLower)
    );
    setStockList(filteredStock || []);
  },
  getStockList: () => {
    const currentState = get();
    const { changeLoading, setPrevStockList, setStockList } = currentState;
    changeLoading(true);
    setTimeout(() => {
      // mmkvStorage.set(
      //   LocalStoreKey.previoData,
      //   JSON.stringify(dummyData.stocks)
      // );
      setPrevStockList(dummyData.stocks);
      setStockList(dummyData.stocks);
      changeLoading(false);
    }, WaitTime.LONG);
  },
  setStockList: (stockList: Stock[]) => set({ stockList }),
  setPrevStockList: (stockPrevent: Stock[]) => set({ stockPrevent }),
});

export const useStockStateMock = create<StockState>()(useStockState);
