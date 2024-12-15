import {
  act,
  INITIAL_STATE_STOCK_MOCK,
  MockDummyData,
  renderHook,
  useStockStateMock,
} from "@/src/test";
import { WaitTime } from "@/src/utils";

describe("Testing stock.ts file", () => {
  test("should return the initial state", () => {
    const { result } = renderHook(() => useStockStateMock());

    // Get the actions from the actual hook
    const actions = {
      changeLoading: expect.any(Function),
      changeFilterStockName: expect.any(Function),
      getStockList: expect.any(Function),
      setStockList: expect.any(Function),
      setPrevStockList: expect.any(Function),
    };
    expect(result.current).toEqual({
      ...INITIAL_STATE_STOCK_MOCK,
      ...actions,
    });
  });

  test("should change the loading state", () => {
    const { result } = renderHook(() => useStockStateMock());
    act(() => result.current.changeLoading(true));
    expect(result.current.isLoading).toBe(true);
    act(() => result.current.changeLoading(false));
    expect(result.current.isLoading).toBe(false);
  });

  test("should set stocks", async () => {
    // jest.useFakeTimers(); // Enable fake timers
    // const { result } = renderHook(() => useStockStateMock());
    // await act(async () => {
    //   await result.current.getStockList();
    //   jest.runAllTimers(); // Fast-forward all timers
    // });
    // jest.setTimeout(5100); // Increase timeout to 10 seconds
    // expect(result.current.stockList).toHaveLength(15);
    const { result } = renderHook(() => useStockStateMock());

    await act(
      async () => await result.current.setStockList(MockDummyData.stocks)
    );
    await act(
      async () => await result.current.setPrevStockList(MockDummyData.stocks)
    );

    expect(result.current.stockList).toHaveLength(MockDummyData.stocks.length);
    expect(result.current.stockPrevent).toHaveLength(
      MockDummyData.stocks.length
    );
  });

  test("should filter stocks by name", async () => {
    const { result } = renderHook(() => useStockStateMock());
    await act(
      async () => await result.current.setStockList(MockDummyData.stocks)
    );
    await act(
      async () => await result.current.setPrevStockList(MockDummyData.stocks)
    );

    act(() => result.current.changeFilterStockName("alphabet inc"));
    expect(result.current.stockList).toHaveLength(1);

    act(() => result.current.changeFilterStockName("MICROSOFT"));
    expect(result.current.stockList).toHaveLength(1);

    act(() => result.current.changeFilterStockName("APPLE"));
    expect(result.current.stockList).toHaveLength(1);
  });
});
