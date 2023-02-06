import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import { client } from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
      *[_type == 'featured' && _id == $id] {
        ...,
        restaurants[]->{
            ...,
            dishes[]->,
            type -> {
                name
            }
        }
     }[0]
  `,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, [id]);
  return (
    <View>
      <View className="flex-row justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color={"#00CCBB"} />
      </View>
      <Text className="text-xs px-4 text-gray-500">{description}</Text>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        className="py-4"
      >
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            title={restaurant.name}
            long={restaurant.long}
            lat={restaurant.lat}
            dishes={restaurant.dishes}
            short_description={restaurant.short_description}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            imgUrl={restaurant.image}
            address={restaurant.address}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;

const styles = StyleSheet.create({});
