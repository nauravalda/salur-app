import React from "react";
import { View } from "react-native";
import FoodCategoryList from "./foodlist";
import { Input } from "~/components/ui/input";
import { Utensils, Search } from "lucide-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NearbyScreen from "./nearby";

type RootStackParamList = {
  Nearby: undefined;
  Promo: undefined;
  BestSeller: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeScreen() {
  const [search, setSearch] = React.useState("");
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View>
      <View className="bg-white pt-1 pb-1 gap-2 flex flex-row items-center justify-start px-2 border border-[#747474] rounded-full">
        <Utensils size={15} color="#CF2B2A" />
        <Input
          placeholder="Mau selamatkan makanan apa hari ini?"
          value={search}
          onChangeText={handleSearch}
          style={{ borderWidth: 0, padding: 0 }}
        />
        <Search size={20} color="#747474" />
      </View>
      <Stack.Navigator>
        <Stack.Screen name="Nearby" component={NearbyScreen} />
      </Stack.Navigator>
      <FoodCategoryList />
    </View>
  );
};