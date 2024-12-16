// setupTests.js

// for zustand
import "@testing-library/jest-dom";

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  ...jest.requireActual("react-native/Libraries/Utilities/Platform"),
  NativeModules: {
    ...jest.requireActual("react-native").NativeModules,
    FontManager: { loadedNativeFonts: [] },
  },
}));

jest.mock("@expo/vector-icons", () => ({
  __esModule: true,
  default: () => <div></div>,
}));

jest.mock("expo-font", () => ({
  useFonts: () => [true],
  isLoaded: jest.fn().mockReturnValue(true),
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  //return depend on the icon you are using in your project
  return {
    MaterialCommunityIcons: ({ name, size, color }) => (
      <span>{`${name} (${size}, ${color})`}</span>
    ),
    Feather: ({ name, size, color }) => (
      <span>{`${name} (${size}, ${color})`}</span>
    ),
  };
});

//this lines is for react-hook-form testing
global.window = {};
global.window = global;
