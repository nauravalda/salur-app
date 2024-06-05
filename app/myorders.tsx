import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import MyOrderCard from "components/ui/myordercard";

export default function RefrigeratorScreen() {
  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-grow bg-red-500 px-4 py-8 gap-6">
        <MyOrderCard
          title="Nasi Goreng"
          date="Sudah Dibayar"
          imageSource={{ uri: "https://i.imgur.com/alpENn6.jpg" }}
        />
        <MyOrderCard
          title="Korean Garlic Cheese Bread"
          date="Sedang Diantar"
          imageSource={{ uri: "https://i.imgur.com/MwHi3ui.jpeg" }}
        />
        <MyOrderCard
          title="Susu Kuda"
          date="Kurir Hilang"
          imageSource={{ uri: "https://i.imgur.com/KUQxIVFb.jpg" }}
        />
      </ScrollView>
    </View>
  );
}
