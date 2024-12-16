import { AVATAR_SIZE, Colors, SPACING, widthFullScreen } from "@/src/utils";
import { FC } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

interface Props {
  name: string;
  symbol: string;
  price: number;
  daily_change: number;
  scale: Animated.AnimatedInterpolation<string | number>;
  opacity: Animated.AnimatedInterpolation<string | number>;
}

export const StockCard: FC<Props> = ({
  daily_change,
  name,
  price,
  symbol,
  opacity,
  scale,
}) => {
  const { wrapperCard, link, subtitle, title } = styles;

  return (
    <Animated.View
      testID="stock-item"
      style={{ ...wrapperCard, opacity, transform: [{ scale }] }}
    >
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/768px-Bitcoin.svg.png",
        }}
        style={{
          width: AVATAR_SIZE,
          height: AVATAR_SIZE,
          borderRadius: AVATAR_SIZE,
          marginRight: SPACING / 2,
        }}
      />
      <View>
        <Text numberOfLines={1} style={title}>
          {name}
        </Text>
        <Text numberOfLines={1} style={subtitle}>
          {symbol}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            ...link,
            color:
              daily_change < 0 ? Colors.danger.default : Colors.brand["700"],
          }}
        >
          $ {price}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapperCard: {
    flex: 1,
    width: widthFullScreen * 0.9,
    flexDirection: "row",
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: "rgba(232, 237, 237, 0.8)",
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  title: {
    width: widthFullScreen * 0.58,
    fontSize: 22,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  link: {
    fontSize: 14,
    opacity: 0.8,
  },
});
