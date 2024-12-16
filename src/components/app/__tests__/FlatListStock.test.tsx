import { MockDummyData, render, screen } from "@/src/test";
import { FlatListStock } from "../FlatListStock";
import useStockState from "@/src/store/stock";
import { useNetworkConnection } from "@/src/hooks";

jest.mock("expo-network");
jest.mock("@/src/store/stock");

jest.mock("@/src/hooks/useNetworkConnection", () => ({
  useNetworkConnection: jest.fn(() => ({
    isConnected: true,
  })),
}));

describe("FlatListStock Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (
      useStockState as jest.MockedFunction<typeof useStockState>
    ).mockReturnValue({
      stockList: [],
      isLoading: false,
      changeFilterStockName: jest.fn(),
      getStockList: jest.fn(),
    });

    (useNetworkConnection as jest.Mock).mockReturnValue({
      isConnected: true,
    });
  });

  test("shold active indicator when is loading zustand", () => {
    (
      useStockState as jest.MockedFunction<typeof useStockState>
    ).mockReturnValue({
      stockList: [],
      isLoading: true,
      changeFilterStockName: jest.fn(),
      getStockList: jest.fn(),
    });
    render(<FlatListStock />);
    const activityIndicator = screen.getByTestId("activity-indicator");

    expect(activityIndicator).toBeTruthy();
  });

  test("should render the title correctly", () => {
    const { getByText } = render(<FlatListStock />);
    const title = getByText("Stocks");
    expect(title).toBeTruthy();
  });
  test("should render the list of stocks correctly", () => {
    const { getByTestId } = render(<FlatListStock />);
    const stockList = getByTestId("stock-list");
    expect(stockList).toBeTruthy();
  });

  test("should show  message of No Network Connection", () => {
    (useNetworkConnection as jest.Mock).mockReturnValue({
      isConnected: false,
    });
    const { getByText } = render(<FlatListStock />);
    const noNetworkConnection = getByText("No Network Connection");
    expect(noNetworkConnection).toBeTruthy();
  });

  test("should show list off stocks", () => {
    (
      useStockState as jest.MockedFunction<typeof useStockState>
    ).mockReturnValue({
      stockList: MockDummyData.stocks,
      isLoading: false,
      changeFilterStockName: jest.fn(),
      getStockList: jest.fn(),
    });

    const { getByTestId, getAllByTestId } = render(<FlatListStock />);

    const stockList = getByTestId("stock-list");
    expect(stockList).toBeTruthy();

    const stockItems = getAllByTestId("stock-item");

    expect(stockItems.length).toBe(MockDummyData.stocks.length);
  });
});
