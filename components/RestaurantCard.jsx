import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LocationMarkerIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCard = ({
  id,
  title,
  address,
  imgUrl,
  dishes,
  rating,
  long,
  lat,
  genre,
  short_description,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-white shadow mr-3"
      onPress={() =>
        navigation.navigate("Restaurant", {
          id,
          title,
          address,
          imgUrl,
          dishes,
          rating,
          long,
          lat,
          genre,
          short_description,
        })
      }
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-36 w-64 rounded"
      />
      <View className="px-3 pb-2">
        <Text className="font-bold text-lg pt-2 ">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color={"green"} opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> * {genre}
          </Text>
        </View>
        <View className="flex-row space-x-1 items-center">
          <LocationMarkerIcon color={"green"} opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500 truncate">
            Nearby * {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({});
