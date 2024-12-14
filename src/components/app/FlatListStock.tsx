import { Fragment, useEffect, useRef } from "react";
import {
  Animated,
  Image,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useForm } from "react-hook-form";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import {
  Colors,
  heightFullScreen,
  ITEM_SIZE,
  SPACING,
  widthFullScreen,
} from "@/src/utils";
import { StockCard } from "../ui";
import useStockState from "@/src/store/stock";
import { useNetworkConnection } from "@/src/hooks";
import { InputGeneric } from "../ui/InputGeneric";

export const FlatListStock = () => {
  const {
    //states
    stockList,
    isLoading,
    //actions
    changeFilterStockName,
    getStockList,
  } = useStockState();
  const {
    //states
    isConnected,
    //methods
    //actions
  } = useNetworkConnection();
  const { voidWrapper, imgWrapper, title, btn, inputStyles } = styles;
  const scrollY = useRef(new Animated.Value(0)).current;

  const { control, watch } = useForm<{
    filterName: string;
  }>();

  const filterName = watch("filterName");

  useEffect(() => {
    if (filterName === undefined) return;
    changeFilterStockName(filterName);
  }, [filterName]);

  useEffect(() => {
    if (isConnected) {
      getStockList();
    }
  }, [isConnected]);

  return (
    <Fragment>
      {isLoading ? (
        <View style={voidWrapper}>
          <ActivityIndicator size="large" color={Colors.brand.default} />
        </View>
      ) : (
        <Fragment>
          <Text style={{ fontSize: 24, fontWeight: "bold", margin: "7%" }}>
            Stocks
          </Text>
          <InputGeneric
            control={control}
            firstIcon={
              <Feather name="search" size={25} color={Colors.gray["500"]} />
            }
            name={"filterName"}
            inputStyle={inputStyles}
            placeholder="search by name stock..."
            keyboardType="default"
            placeholderTextColor={Colors.gray["700"]}
            inputColor={Colors.black}
            autoCorrect={false}
          />
          <Animated.FlatList
            testID="stock-list"
            data={stockList}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            contentContainerStyle={{
              padding: SPACING,
              paddingTop: StatusBar.currentHeight || 42,
            }}
            keyExtractor={(item) => item.symbol}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 2),
              ];

              const opacityInputRange = [
                -1,
                0,
                ITEM_SIZE * index,
                ITEM_SIZE * (index + 1),
              ];

              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const opacity = scrollY.interpolate({
                inputRange: opacityInputRange,
                outputRange: [1, 1, 1, 0],
              });

              return <StockCard scale={scale} opacity={opacity} {...item} />;
            }}
            ListFooterComponent={<View style={{ marginBottom: 60 }} />}
            ListEmptyComponent={
              <View style={voidWrapper}>
                <Image
                  style={imgWrapper}
                  source={require("@/assets/images/noData.png")}
                />
                <MaterialCommunityIcons
                  name="wifi-off"
                  size={50}
                  color={Colors.gray["700"]}
                />
                <Text style={title}>No Network Connection</Text>

                <TouchableOpacity
                  onPress={() => {
                    //simulate charge from backup
                    getStockList();
                  }}
                  activeOpacity={0.8}
                  style={btn}
                >
                  <Text style={{ color: Colors.white }}>
                    Try to Reload backup
                  </Text>
                </TouchableOpacity>
              </View>
            }
            showsVerticalScrollIndicator={false}
            updateCellsBatchingPeriod={2000}
            onEndReachedThreshold={0.25}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  voidWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgWrapper: {
    width: widthFullScreen * 1,
    height: heightFullScreen * 0.35,
  },
  title: {
    color: Colors.gray["700"],
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    backgroundColor: Colors.gray["700"],
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  inputStyles: {
    backgroundColor: Colors.white,
    borderRadius: 90,
    width: widthFullScreen * 0.9,
    height: heightFullScreen * 0.07,

    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
