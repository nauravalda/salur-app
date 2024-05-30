import React from "react";
import { SafeAreaView, View } from "react-native";
import SearchAndButtons from "components/ui/homebar";
import FoodCategoryList from "./foodlist";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-red-500 p-4">
      <SearchAndButtons />
      <FoodCategoryList />
    </SafeAreaView>
  );
};