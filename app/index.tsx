import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import FoodCategoryList from "./(home)/foodlist";
import { Input } from "~/components/ui/input";
import { Utensils, Search } from "lucide-react-native";
import ItemCard from "~/components/ui/itemcard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { MapPin } from "lucide-react-native";

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

// const exampleItem = {
//   imageSource: { uri: "https://example.com/image.jpg" },
//   title: "Sample Item",
//   distance: "5 km",
//   price: 100,
//   discountedPrice: 80,
//   status: "Available",
// };

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [search, setSearch] = React.useState("");
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  // const handleCardPress = () => {
  //   navigation.navigate("ProductDetails", exampleItem);
  // };

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
      <View className="flex flex-row items-center justify-start px-2 border border-[#747474] rounded-full">
        <MapPin
          size={20}
          color="#747474"
          className="rounded-md max-h-[30%] border-[0.75px] border-[#747474] px-3 items-center py-1 native:text-xs text-xs font-medium"
        />
        <Input
          placeholder="Jl. Sukahaji Baru No.18"
          style={{
            width: "90%",
            borderWidth: 0,
            fontSize: 11,
            overflow: "scroll",
            fontWeight: "600",
            padding: 0,
            maxHeight: 25,
          }}
        />
      </View>
      <Image
        source={require("../assets/images/carousel.png")}
        className="w-full h-40"
      />
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
            className="w-20 h-20"
          />
          <Text>Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigateToPromos}
          className="items-center"
        >
          <Image
            source={require("../assets/images/promo.png")}
            className="w-20 h-20"
          />
          <Text>Promos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNavigateToBestSeller}
          className="items-center"
        >
          <Image
            source={require("../assets/images/terlaris.png")}
            className="w-20 h-20"
          />
          <Text>Best Sellers</Text>
        </TouchableOpacity>
      </View>
      {/* 
      <ItemCard {...exampleItem} onPress={handleCardPress} /> */}
      <FoodCategoryList />
    </View>
  );
};

export default HomeScreen;
