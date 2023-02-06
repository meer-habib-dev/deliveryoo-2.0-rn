import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restuarantSlice";

const RestaurantScreen = () => {
  const navgiaton = useNavigation();
  const {
    params: {
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
    },
  } = useRoute();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navgiaton.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    dispatch(
      setRestaurant({
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
    );
  }, [dispatch]);
  return (
    <>
      <ScrollView className="relative">
        <View>
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navgiaton.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color={"#00CCBB"} />
          </TouchableOpacity>
        </View>
        <View>
          <View className="p-4 bg-white">
            <Text className="text-2xl font-bold">{title}</Text>
            <View className="flex-row space-x-1 my-1 items-center">
              <StarIcon color={"green"} size={22} opacity={0.5} />
              <Text className="text-xs text-gray-500">
                <Text>{rating}</Text> * {genre}
              </Text>
              <View className="flex-row space-x-1 my-1">
                <LocationMarkerIcon color={"green"} size={22} opacity={0.5} />
                <Text className="text-xs text-gray-500">Nearby {genre}</Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y  bg-white border-gray-300">
            <QuestionMarkCircleIcon color={"gray"} size={20} opacity={0.6} />
            <Text>Have a food allergy?</Text>
            <ChevronRightIcon color={"#00CCBB"} />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 my-5 font-bold text-xl">Menu</Text>
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              short_description={short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
      <BasketIcon />
    </>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({});
