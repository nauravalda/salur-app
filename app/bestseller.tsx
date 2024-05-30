import React from "react";
import {
  View,
  // Text,
  // ScrollView,
  // Image,
  StyleSheet,
  Dimensions,
} from "react-native";
// import { Stack } from "expo-router";
import ItemCard from "~/components/ui/itemcard";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  interpolate,
} from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 286;

const foodAndBeverages = [
  {
    imageSource: { uri: "https://i.imgur.com/DEsk1Is.jpeg" },
    title: "Sushi",
    distance: "2.7 km",
    price: 45000, // Rp 45,000
    discountedPrice: 32000, // Rp 32,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/9MZVHIx.jpeg" },
    title: "Pizza",
    distance: "3.5 km",
    price: 35000, // Rp 35,000
    discountedPrice: 24000, // Rp 24,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/2ACdlbK.jpeg" },
    title: "Burger",
    distance: "1.8 km",
    price: 25000, // Rp 25,000
    discountedPrice: 15000, // Rp 15,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/FyiwZ76.png" },
    title: "Tacos",
    distance: "2.5 km",
    price: 30000, // Rp 30,000
    discountedPrice: 18000, // Rp 18,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/GQrSjY7.jpeg" },
    title: "Kebab",
    distance: "3.2 km",
    price: 20000, // Rp 20,000
    discountedPrice: 12000, // Rp 12,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/PNPYCuX.jpeg" },
    title: "Bubble Tea",
    distance: "2.7 km",
    price: 15000, // Rp 15,000
    discountedPrice: 9000, // Rp 9,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/0ii4ots.jpeg" },
    title: "Smoothie",
    distance: "1.2 km",
    price: 12000, // Rp 12,000
    discountedPrice: 7000, // Rp 7,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/GGdyFqO.jpeg" },
    title: "Milkshake",
    distance: "3.8 km",
    price: 16000, // Rp 16,000
    discountedPrice: 10000, // Rp 10,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/sdVAvC1.jpeg" },
    title: "Lemonade",
    distance: "2.4 km",
    price: 14000, // Rp 14,000
    discountedPrice: 8000, // Rp 8,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/GX03j85.jpg" },
    title: "Iced Latte",
    distance: "3.5 km",
    price: 11000, // Rp 11,000
    discountedPrice: 6000, // Rp 6,000
    status: "Available",
  },
];

type RootStackParamList = {
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

type BestSellerScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BestSeller"
>;

export default function BestSellerScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOfset = useScrollViewOffset(scrollRef);
  const navigation = useNavigation<BestSellerScreenNavigationProp>();
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOfset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOfset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const handleCardPress = (item: any) => {
    // Handle press event here
    navigation.navigate("ProductDetails", item);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={require("../assets/images/terlarisbg.png")}
          style={[styles.image, imageAnimatedStyle]}
        />
        <View style={{ backgroundColor: "#fff" }}>
          {foodAndBeverages.map((food, index) => (
            <ItemCard
              key={index}
              {...food}
              onPress={() => handleCardPress(food)}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width,
    height: IMG_HEIGHT,
  },
});
