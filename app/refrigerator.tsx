import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import FridgeCard from "components/ui/fridgecard";

export default function RefrigeratorScreen() {
  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-grow bg-red-500 px-4 py-8 gap-6">
        <FridgeCard
          title="Salad Buah"
          date="07/09/2023"
          imageSource={require("../assets/images/food.png")}
        />
        <FridgeCard
          title="Roti Unyil"
          date="13/09/2023"
          imageSource={require("../assets/images/food.png")}
        />
        <FridgeCard
          title="Susu Kuda"
          date="21/09/2023"
          imageSource={require("../assets/images/food.png")}
        />
      </ScrollView>
    </View>
  );
}