// setupTests.js
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
  return {
    MaterialCommunityIcons: ({ name, size, color }) => (
      <span>{`${name} (${size}, ${color})`}</span>
    ),
  };
});
