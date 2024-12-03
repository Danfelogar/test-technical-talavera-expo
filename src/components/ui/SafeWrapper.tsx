import { ReactNode } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import { Colors, isIOS } from "@/src/utils";

export const StandardWrapper = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { containerStandardWrapper, safeAreaContent, childContainer } = styles;
  return (
    <View style={containerStandardWrapper}>
      <SafeAreaView style={{ ...safeAreaContent }}>
        <StatusBar
          backgroundColor={Colors.black}
          showHideTransition="slide"
          barStyle={isIOS() ? "dark-content" : "light-content"}
        />
        <View style={childContainer}>{children}</View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStandardWrapper: {
    flex: 1,
    flexDirection: "column",
  },
  safeAreaContent: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  childContainer: {
    width: "100%",
    height: "100%",
  },
});
