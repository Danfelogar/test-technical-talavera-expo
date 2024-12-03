import { FlatListStock } from "@/src/components/app";
import { StandardWrapper } from "@/src/components/ui";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { mainWrapper } = styles;
  return (
    <StandardWrapper>
      <View style={mainWrapper}>
        <FlatListStock />
      </View>
    </StandardWrapper>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
