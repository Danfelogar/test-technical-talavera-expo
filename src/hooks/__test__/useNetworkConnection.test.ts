import { useNetworkConnection } from "../useNetworkConnection";
import * as Network from "expo-network";
import { act, renderHook, waitFor } from "@/src/test";

jest.mock("expo-network");

describe("useNetworkConnection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize with correct default values", async () => {
    const { result } = renderHook(() => useNetworkConnection());
    //it's necessary to call the function to check the initial state because the useEffect is called in the renderHook
    const checkConnectionMock = jest.fn(result.current.checkConnection);

    expect(result.current).toEqual({
      isLoading: true,
      isConnected: null,
      checkConnection: expect.any(Function),
    });

    await act(async () => await checkConnectionMock());
  });

  test("should update isConnected and isLoading when network state changes", async () => {
    // Mock Response of getNetworkStateAsync
    (Network.getNetworkStateAsync as jest.Mock).mockResolvedValue({
      isConnected: true,
    });

    const { result } = renderHook(() => useNetworkConnection());

    //catching the function checkConnection for mocking
    const checkConnectionMock = jest.fn(result.current.checkConnection);

    await act(async () => await checkConnectionMock());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isConnected).toBe(true);

    expect(checkConnectionMock).toHaveBeenCalled();
  });

  test("should update isConnected failure and isLoading when network state changes", async () => {
    // Mock Response of getNetworkStateAsync
    (Network.getNetworkStateAsync as jest.Mock).mockRejectedValue(new Error());

    const { result } = renderHook(() => useNetworkConnection());

    //catching the function checkConnection for mocking
    const checkConnectionMock = jest.fn(result.current.checkConnection);

    await act(async () => await checkConnectionMock());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current).toEqual({
      isLoading: false,
      isConnected: false,
      checkConnection: expect.any(Function),
    });

    expect(checkConnectionMock).toHaveBeenCalled();
  });
});
