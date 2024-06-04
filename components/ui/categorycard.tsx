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
    <View className="mr-4 items-center">
      <Image source={imageSource} className="w-15 h-25 rounded-lg" />
      <Text className="mt-1 text-center text-gray-600">{title}</Text>
    </View>
  );
};

export default FoodCategoryItem;
