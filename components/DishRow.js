import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBashketItemsWithId,
  selectBasketItems,
} from "../features/basketSlice";
const DishRow = ({ id, dish, image, short_description, name, price }) => {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBashketItemsWithId(state, id));
  const dispatch = useDispatch();
  const addItemToBashket = () => {
    dispatch(addToBasket({ id, price, image, name, short_description }));
  };
  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`p-4 bg-white border border-gray-200 flex-row items-center ${
          isPressed && "border-0"
        }`}
      >
        <View className="flex-1 pr-2">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-gray-400 text-xs">{short_description}</Text>
          <Text className="text-gray-400 text-xs">
            Price: <Currency quantity={+price} currency="BDT" />
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: urlFor(image).url() }}
            className="h-20 w-20 bg-gray-300 p-4"
            style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
          />
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4  ">
          <View className="flex-row justify-center items-center space-x-4 pb-4">
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemsFromBasket}
            >
              <MinusCircleIcon
                size={40}
                color={items.length > 0 ? "#00CCBB" : "gray"}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBashket}>
              <PlusCircleIcon size={40} color={"#00CCBB"} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;

const styles = StyleSheet.create({});
