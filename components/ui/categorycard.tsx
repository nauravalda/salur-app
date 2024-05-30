import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";

interface FoodCategoryItemProps {
  title: string;
  imageSource: ImageSourcePropType;
}

const FoodCategoryItem: React.FC<FoodCategoryItemProps> = ({
  title,
  imageSource,
}) => {
  return (
    <View className="mr-4">
      <Image source={imageSource} className="w-20 h-20 rounded-lg" />
      <Text className="mt-1 text-center text-gray-600">{title}</Text>
    </View>
  );
};

export default FoodCategoryItem;
