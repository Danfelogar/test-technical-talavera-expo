import { create } from "zustand";
import { StockState, StockWithoutAction } from "./types";
import dummyData from "../utils/const/dummyData.json";
import { Stock } from "../types";
import { WaitTime } from "../utils";

const INITIAL_STATE: StockWithoutAction = {
  isLoading: false,
  stockList: [],
  stockPrevent: [],
};

const useStockState = create<StockState>((set, get) => ({
  ...INITIAL_STATE,
  //actions
  changeLoading: (isLoading: boolean) => set({ isLoading }),
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
}));

export default useStockState;
