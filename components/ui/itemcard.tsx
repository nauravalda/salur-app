// ItemCard.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface ItemCardProps {
  imageSource: ImageSourcePropType;
  title: string;
  distance: string;
  price: number;
  discountedPrice: number;
  status: string;
  onPress?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  imageSource,
  title,
  distance,
  price,
  discountedPrice,
  status,
  onPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ProductDetails", {
      imageSource,
      title,
      distance,
      price,
      discountedPrice,
      status,
    });
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View className="flex flex-row items-center p-4 bg-white rounded-lg shadow-md">
        <Image source={imageSource} className="w-20 h-20 rounded-md" />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold">{title}</Text>
          <Text className="text-gray-500">{distance}</Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-green-600 font-semibold">
              {discountedPrice}
            </Text>
            <Text className="text-gray-500 line-through ml-2">{price}</Text>
          </View>
          <Text className="text-gray-500 mt-1">{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
