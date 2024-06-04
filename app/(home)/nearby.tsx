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
    imageSource: { uri: "https://i.imgur.com/alpENn6.jpg" },
    title: "Nasi Goreng",
    distance: "2 km",
    price: 35000, // Rp 35,000
    discountedPrice: 30000, // Rp 30,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/mwDTf48.jpg" },
    title: "Sate Ayam",
    distance: "3.5 km",
    price: 25000, // Rp 25,000
    discountedPrice: 20000, // Rp 20,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/2Ktrvoo.jpg" },
    title: "Gado-Gado",
    distance: "1 km",
    price: 30000, // Rp 30,000
    discountedPrice: 25000, // Rp 25,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/VMVK7k0.jpg" },
    title: "Mie Ayam",
    distance: "4 km",
    price: 20000, // Rp 20,000
    discountedPrice: 18000, // Rp 18,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/rYiDfor.jpg" },
    title: "Nasi Padang",
    distance: "2.5 km",
    price: 40000, // Rp 40,000
    discountedPrice: 35000, // Rp 35,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/XFS5UCM.jpg" },
    title: "Es Teh",
    distance: "1.5 km",
    price: 10000, // Rp 10,000
    discountedPrice: 8000, // Rp 8,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/MwnpRqb.jpg" },
    title: "Es Jeruk",
    distance: "2 km",
    price: 12000, // Rp 12,000
    discountedPrice: 10000, // Rp 10,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/jldb7G3.jpg" },
    title: "Es Campur",
    distance: "3 km",
    price: 15000, // Rp 15,000
    discountedPrice: 12000, // Rp 12,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/achg0Bj.jpg" },
    title: "Jus Alpukat",
    distance: "4.5 km",
    price: 18000, // Rp 18,000
    discountedPrice: 15000, // Rp 15,000
    status: "Available",
  },
  {
    imageSource: { uri: "https://i.imgur.com/GX03j85.jpg" },
    title: "Es Kopi",
    distance: "3.5 km",
    price: 13000, // Rp 13,000
    discountedPrice: 11000, // Rp 11,000
    status: "Available",
  },
];

type RootStackParamList = {
  "(product)/productdetails": {
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

type NearbyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Nearby"
>;

export default function NearbyScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOfset = useScrollViewOffset(scrollRef);
  const navigation = useNavigation<NearbyScreenNavigationProp>();
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
    navigation.navigate("(product)/productdetails", item);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image
          source={require("../../assets/images/ojek.png")}
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
