import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Minus, Plus } from "lucide-react-native";

type RootStackParamList = {
  Home: undefined;
  "(product)/productdetails": {
    imageSource: { uri: string };
    title: string;
    distance: string;
    price: number;
    discountedPrice: number;
    status: string;
  };
  "(purchase)/purchase": {
    imageSource: { uri: string };
    title: string;
    price: number;
    quantity: number;
  };
};

type ProductDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "(product)/productdetails"
>;

export default function ProductDetailsScreen({
  route,
}: {
  route: {
    params: {
      imageSource: { uri: string };
      title: string;
      price: number;
      discountedPrice: number;
      status: string;
    };
  };
}) {
  const navigation = useNavigation<ProductDetailsNavigationProp>();
  const { imageSource, title, price, discountedPrice, status } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState("");

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNotes("");
  };

  const handleAddToCartConfirm = () => {
    console.log("Add to cart", quantity, notes, price, discountedPrice, title);
    navigation.navigate("(purchase)/purchase", {
      imageSource,
      title,
      price,
      quantity,
    });
    handleCloseModal();
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="relative">
        <Image source={imageSource} className="w-full h-64" />
        <View className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 p-4">
          <Text className="text-white text-lg font-semibold">{title}</Text>
          <Text className="text-white">{status}</Text>
        </View>
      </View>

      <View className="p-4">
        <View className="bg-white rounded-lg p-4 shadow-md">
          <Text className="text-lg font-semibold mb-2">Selamatkan Segera!</Text>
          <Text className="text-xl font-bold text-green-600 mb-2">
            Rp {discountedPrice.toLocaleString()}{" "}
            <Text className="text-gray-500 line-through">
              Rp {price.toLocaleString()}
            </Text>
          </Text>
          <Text className="text-gray-600 mb-4">
            Waktu pengambilan hari ini, 08:00 - 21:00
          </Text>
          <TouchableOpacity
            onPress={handleAddToCart}
            className="bg-red-600 rounded-lg py-3"
            activeOpacity={0.7}
          >
            <Text className="text-white text-center font-semibold">
              Tambah ke keranjang
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showModal} animationType="slide" transparent>
        <View className="flex-1 bg-black bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-lg p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold">Jumlah</Text>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={handleDecrement}
                  className="bg-gray-200 rounded-full p-2"
                  activeOpacity={0.7}
                >
                  <Minus size={24} color="#333" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold mx-4">{quantity}</Text>
                <TouchableOpacity
                  onPress={handleIncrement}
                  className="bg-gray-200 rounded-full p-2"
                  activeOpacity={0.7}
                >
                  <Plus size={24} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              placeholder="Catatan (opsional)"
              value={notes}
              onChangeText={setNotes}
              className="bg-gray-100 rounded-lg p-2 mb-4"
              multiline
            />
            <TouchableOpacity
              onPress={handleAddToCartConfirm}
              className="bg-red-600 rounded-lg py-3"
              activeOpacity={0.7}
            >
              <Text className="text-white text-center font-semibold">
                Tambahkan ({quantity} item)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
