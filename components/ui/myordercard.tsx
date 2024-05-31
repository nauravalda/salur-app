import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Banknote } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

interface MyOrderCardProps {
  title: string;
  date: string;
  imageSource: any;
}

type RootStackParamList = {
  Home: undefined;
  MyOrderDetails: { title: string; date: string; imageSource: any };
};

type MyOrderDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

const MyOrderCard: React.FC<MyOrderCardProps> = ({
  title,
  date,
  imageSource,
}) => {
  const navigation = useNavigation<MyOrderDetailsNavigationProp>();

  const handlePress = () => {
    console.log(`Navigating to MyOrderDetails: ${title}`);
    // navigation.navigate("MyOrderDetails", { title, date, imageSource });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View className="bg-white rounded-lg p-4 flex-row items-center shadow-md">
        <Image source={imageSource} className="w-24 h-24 rounded-lg" />
        <View className="ml-4">
          <Text className="text-lg font-semibold">{title}</Text>
          <View className="flex-row items-center mt-2">
            <Banknote size={16} color="black" />
            <Text className="text-gray-200 ml-2">{date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyOrderCard;
