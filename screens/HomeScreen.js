import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ChevronDownIcon,
  UserIcon,
  SearchIcon,
  AdjustmentsIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { client } from "../sanity";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCateories, setFeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    client
      .fetch(
        ` *[_type == 'featured'] {
   ...,
   restaurants[]->{
     ...,
     dishes[]->
   }
 } `
      )
      .then((data) => setFeaturedCategories(data));
  }, []);
  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row items-center pb-4 space-x-4 mx-4">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="bg-gray-300 p-4 rounded-full h-7 w-7"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-sm">
            Current Location
            <ChevronDownIcon color="#00CCBB" size={20} />
          </Text>
        </View>
        <UserIcon color={"#00CCBB"} size={35} />
      </View>
      <View className="flex-row items-center pb-2 mx-4 space-x-2">
        <View className="flex-row items-center p-3 sapce-x-2 bg-gray-200 flex-1 rounded-md">
          <SearchIcon color={"gray"} size={20} />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <View className="mx-2">
          <AdjustmentsIcon />
        </View>
      </View>
      <ScrollView>
        <Categories />
        {featuredCateories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
