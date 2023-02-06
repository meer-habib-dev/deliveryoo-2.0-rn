import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectedBasketTotal,
} from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const total = useSelector(selectedBasketTotal);
  if (items.length === 0) return null;
  return (
    <View className="absolute bottom-10 z-50 w-full">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="bg-[#00CCBB] mx-5 p-4  rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-sm bg-[#01A296] py-1 px-2 ">
          {items.length}
        </Text>
        <Text className="text-center flex-1 text-white font-extrabold text-sm">
          View Basket
        </Text>
        <Text className="text-sm text-white font-extrabold">
          <Currency quantity={total} currency="BDT" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;

const styles = StyleSheet.create({});
