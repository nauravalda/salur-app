import React from "react";
import { SafeAreaView, View } from "react-native";
import SearchAndButtons from "components/ui/homebar";
import FoodCategoryList from "./foodlist";

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-red-500 p-4">
      <SearchAndButtons />
      <FoodCategoryList />
    </SafeAreaView>
  );
};

export default HomeScreen;
