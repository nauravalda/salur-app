import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { AlarmClock } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface FridgeCardProps {
  title: string;
  date: string;
  imageSource: any;
}

type RootStackParamList = {
  Home: undefined;
  FridgeDetails: { title: string; date: string; imageSource: any };
};

type FridgeDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

const FridgeCard: React.FC<FridgeCardProps> = ({ title, date, imageSource }) => {
  const navigation = useNavigation<FridgeDetailsNavigationProp>();

  const handlePress = () => {
    navigation.navigate("FridgeDetails", { title, date, imageSource });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View className="bg-white rounded-lg p-4 flex-row items-center shadow-md">
        <Image source={imageSource} className="w-24 h-24 rounded-lg" />
        <View className="ml-4">
          <Text className="text-lg font-semibold">{title}</Text>
          <View className="flex-row items-center mt-2">
            <AlarmClock size={16} color="black" />
            <Text className="text-gray-600 ml-2">{date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FridgeCard;
