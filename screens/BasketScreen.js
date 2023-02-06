import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurants } from "../features/restuarantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectedBasketTotal,
} from "../features/basketSlice";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurants);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectedBasketTotal);

  useMemo(() => {
    const groupedItem = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItem);
  }, [items]);
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 items-center border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-sm font-bold text-center"> Basket </Text>
            <Text className="text-gray-400 text-center">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 top-3 right-5 absolute"
          >
            <XCircleIcon size={50} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-2 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Delivery in 50-75 mins</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-300">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-3 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={+items[0]?.price} currency="BDT" />
              </Text>
              <TouchableOpacity>
                <Text
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                  className="text-xs text-[#00CCBB]"
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Sub Total</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="BDT" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={30} currency="BDT" />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="font-extrabold">Delivery Fee</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 30} currency="BDT" />
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-center font-bold text-white text-sm">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({});
