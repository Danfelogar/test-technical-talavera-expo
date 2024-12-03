import { useEffect, useState } from "react";

import * as Network from "expo-network";
import { WaitTime } from "../utils";

export const useNetworkConnection = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  const checkConnection = async () => {
    try {
      setIsLoading(true);
      const { isConnected } = await Network.getNetworkStateAsync();
      setIsConnected(isConnected as boolean);
    } catch (e) {
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();

    const interval = setInterval(() => {
      checkConnection();
    }, WaitTime.VERY_LONG);

    return () => clearInterval(interval);
  }, []);

  return {
    //states
    isLoading,
    isConnected,
    //methods
    //actions
  };
};
