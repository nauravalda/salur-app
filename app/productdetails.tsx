import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Plus,Minus } from "lucide-react-native";

const ProductDetailsScreen = () => {
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
    // Handle adding to cart logic here
    console.log(`Adding ${quantity} items with notes: ${notes}`);
    handleCloseModal();
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="relative">
        <Image
          source={require("../assets/images/ojek.png")}
          className="w-full h-64"
        />
        <View className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 p-4">
          <Text className="text-white text-lg font-semibold">
            Korean Garlic Bread Creamcheese
          </Text>
          <Text className="text-white">4 Tersedia | Diskon 50%</Text>
        </View>
      </View>

      <View className="p-4">
        <View className="bg-white rounded-lg p-4 shadow-md">
          <Text className="text-lg font-semibold mb-2">Selamatkan Segera!</Text>
          <Text className="text-xl font-bold text-green-600 mb-2">
            Rp 13.000{" "}
            <Text className="text-gray-500 line-through">Rp 26.000</Text>
          </Text>
          <Text className="text-gray-600 mb-4">
            Waktu pengambilan hari ini, 08:00 - 21:00
          </Text>
          <TouchableOpacity
            onPress={handleAddToCart}
            className="bg-red-600 rounded-lg py-3"
            activeOpacity={0.7}>
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
                  activeOpacity={0.7}>
                  <Minus size={24} color="#333" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold mx-4">{quantity}</Text>
                <TouchableOpacity
                  onPress={handleIncrement}
                  className="bg-gray-200 rounded-full p-2"
                  activeOpacity={0.7}>
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
              activeOpacity={0.7}>
              <Text className="text-white text-center font-semibold">
                Tambahkan ({quantity} item)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductDetailsScreen;
