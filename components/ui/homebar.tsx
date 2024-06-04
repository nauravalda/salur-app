import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Sekitarmu: undefined;
  PromoJumbo: undefined;
  Terlaris: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const BottomButtons = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-row justify-around mt-4">
      <TouchableOpacity
        className="items-center"
        onPress={() => navigation.navigate("Sekitarmu")}>
        <Image
          source={require("./assets/sekitarmu.png")}
          className="w-12 h-12 mb-2"
        />
        <Text className="text-gray-600">Sekitarmu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="items-center"
        onPress={() => navigation.navigate("PromoJumbo")}>
        <Image
          source={require("./assets/iamgespromo.png")}
          className="w-12 h-12 mb-2"
        />
        <Text className="text-gray-600">Promo Jumbo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="items-center"
        onPress={() => navigation.navigate("Terlaris")}>
        <Image
          source={require("./assets/terlaris.png")}
          className="w-12 h-12 mb-2"
        />
        <Text className="text-gray-600">Terlaris</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButtons;
