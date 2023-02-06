import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const CategoriesCard = ({ imageUri, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image source={{ uri: imageUri }} className="w-20 h-20 rounded" />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;

const styles = StyleSheet.create({});
