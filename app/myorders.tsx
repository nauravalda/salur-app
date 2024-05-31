import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import MyOrderCard from "components/ui/myordercard";

export default function RefrigeratorScreen() {
  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-grow bg-red-500 px-4 py-8 gap-6">
        <MyOrderCard
          title="Salad Buah"
          date="33.750"
          imageSource={require("../assets/images/food.png")}
        />
        <MyOrderCard
          title="Roti Unyil"
          date="3.000"
          imageSource={require("../assets/images/food.png")}
        />
        <MyOrderCard
          title="Susu Kuda"
          date="3.000"
          imageSource={require("../assets/images/food.png")}
        />
      </ScrollView>
    </View>
  );
}
