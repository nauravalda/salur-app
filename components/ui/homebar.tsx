import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

const SearchAndButtons = () => {
  return (
    <View className="flex-1 bg-red-500 p-4">
      <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-4">
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Mau selamatkan makanan apa hari ini?"
          placeholderTextColor="#888"
        />
      </View>
      <View className="flex-row justify-between">
        <TouchableOpacity className="bg-white rounded-lg p-4">
          <View className="flex-row items-center">
            <Text className="text-base ml-2 text-gray-600">Sekitarmu</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white rounded-lg p-4">
          <View className="flex-row items-center">
            <Text className="text-base ml-2 text-gray-600">Promo Jumbo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-white rounded-lg p-4">
          <View className="flex-row items-center">
            <Text className="text-base ml-2 text-gray-600">Terlaris</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center bg-green-500 rounded-full px-4 py-2 mt-4">
        <Text className="text-base ml-2 text-white">
          Tanam Pohon-mu Sekarang!
        </Text>
      </View>
    </View>
  );
};

export default SearchAndButtons;
