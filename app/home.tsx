import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import FoodCategoryList from "./foodlist";
import { Input } from "~/components/ui/input";
import { Utensils, Search } from "lucide-react-native";
import ItemCard from "~/components/ui/itemcard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Home: undefined;
  ProductDetails: {
    imageSource: { uri: string };
    title: string;
    distance: string;
    price: number;
    discountedPrice: number;
    status: string;
  };
  Nearby: undefined;
  Promos: undefined;
  BestSeller: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const exampleItem = {
  imageSource: { uri: "https://example.com/image.jpg" },
  title: "Sample Item",
  distance: "5 km",
  price: 100,
  discountedPrice: 80,
  status: "Available",
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [search, setSearch] = React.useState("");
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const handleCardPress = () => {
    navigation.navigate("ProductDetails", exampleItem);
  };

  const handleNavigateToNearby = () => {
    navigation.navigate("Nearby");
  };

  const handleNavigateToPromos = () => {
    navigation.navigate("Promos");
  };

  const handleNavigateToBestSeller = () => {
    navigation.navigate("BestSeller");
  };

  return (
    <View className="flex-1 gap-5 p-6">
      <View className="flex flex-row items-center justify-center px-4 bg-white border border-[#747474] rounded-full">
        <Utensils size={20} color="#CF2B2A" />
        <Input
          placeholder="Mau selamatkan makanan apa hari ini?"
          style={{
            width: "90%",
            borderWidth: 0,
            fontSize: 14,
            overflow: "scroll",
            padding: 0,
          }}
        />
        <Search size={20} color="#747474" />
      </View>

      <View className="flex flex-row justify-around my-4">
        <TouchableOpacity
          onPress={handleNavigateToNearby}
          className="items-center"
        >
          <Image
            source={require("../assets/images/sekitarmu.png")}
            className="w-16 h-16"
          />
          <Text>Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigateToPromos}
          className="items-center"
        >
          <Image
            source={require("../assets/images/promo.png")}
            className="w-16 h-16"
          />
          <Text>Promos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigateToBestSeller}
          className="items-center"
        >
          <Image
            source={require("../assets/images/terlaris.png")}
            className="w-16 h-16"
          />
          <Text>Best Sellers</Text>
        </TouchableOpacity>
      </View>

      <ItemCard {...exampleItem} onPress={handleCardPress} />
      <FoodCategoryList />
    </View>
  );
};

export default HomeScreen;
