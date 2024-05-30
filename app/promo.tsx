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
    imageSource: { uri: "https://example.com/food6.jpg" },
    title: "Bakso",
    distance: "2.3 km",
    price: 30000, // Rp 30,000
    discountedPrice: 22000, // Rp 22,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://example.com/food7.jpg" },
    title: "Ayam Goreng",
    distance: "3 km",
    price: 35000, // Rp 35,000
    discountedPrice: 25000, // Rp 25,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://example.com/food8.jpg" },
    title: "Soto Ayam",
    distance: "1.8 km",
    price: 28000, // Rp 28,000
    discountedPrice: 20000, // Rp 20,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://example.com/food9.jpg" },
    title: "Rendang",
    distance: "2.5 km",
    price: 40000, // Rp 40,000
    discountedPrice: 28000, // Rp 28,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://example.com/food10.jpg" },
    title: "Martabak",
    distance: "3.2 km",
    price: 25000, // Rp 25,000
    discountedPrice: 18000, // Rp 18,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://example.com/drink6.jpg" },
    title: "Es Cincau",
    distance: "2.7 km",
    price: 12000, // Rp 12,000
    discountedPrice: 8000, // Rp 8,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://example.com/drink7.jpg" },
    title: "Es Kelapa Muda",
    distance: "1.2 km",
    price: 15000, // Rp 15,000
    discountedPrice: 10000, // Rp 10,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://example.com/drink8.jpg" },
    title: "Jus Mangga",
    distance: "3.8 km",
    price: 16000, // Rp 16,000
    discountedPrice: 11000, // Rp 11,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://example.com/drink9.jpg" },
    title: "Es Leci",
    distance: "2.4 km",
    price: 14000, // Rp 14,000
    discountedPrice: 9000, // Rp 9,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://example.com/drink10.jpg" },
    title: "Teh Tarik",
    distance: "3.5 km",
    price: 11000, // Rp 11,000
    discountedPrice: 7000, // Rp 7,000
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
  Promo: undefined;
  BestSeller: undefined;
};

type PromoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Promo"
>;

export default function PromoScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOfset = useScrollViewOffset(scrollRef);
  const navigation = useNavigation<PromoScreenNavigationProp>();
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
          source={require("../assets/images/promobg.png")}
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
