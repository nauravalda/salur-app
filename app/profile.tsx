import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { PencilIcon, Star } from "lucide-react-native";

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerClassName="flex-1 items-center gap-5 mt-12 p-6 bg-secondary/30">
      {/* Profile */}
      <View className="flex flex-col items-center gap-2">
        <Image
          source={require("../assets/images/profile.png")}
          style={{ width: 120, height: 120 }}
        />
        <View className="flex flex-row justify-between items-center bg-[#D92F2F] px-3 py-2 gap-4 rounded-full">
          <Star size={24} fill="white" color="none" />
          <Text className="text-center text-white font-bold">Warrior</Text>
          <Star disabled size={24} color="none" />
        </View>
        <View className="flex flex-row justify-between items-center gap-5">
          <View aria-disabled className="bg-none p-2 rounded-full">
            <PencilIcon disabled size={16} color="none" />
          </View>
          <Text className="font-bold text-center">claraafs</Text>
          <View className="bg-[#D92F2F] p-2 rounded-full">
            <PencilIcon size={16} color="white" />
          </View>
        </View>

        <View className="flex flex-col">
          <Text className="text-center text-sm text-gray-400">
            claraafs@gemastik.com
          </Text>
          <Text className="text-center text-sm text-gray-400">081234567</Text>
        </View>
      </View>

      <View>
        <View className="border-gray-400 rounded-md border">
          <View className="bg-red-300 rounded-md p-3">
            <Text className="text-left font-bold text-black min-w-full">
              Dampak yang telah kamu buat
            </Text>
          </View>

          <View className="flex flex-col gap-2 px-3 pt-2 pb-3">
            <Text className="text-left text-gray-400 font-medium min-w-full">
              Kamu telah menyelamatkan{" "}
              <Text className="font-bold text-red-700">12 makanan</Text>
            </Text>
            <Text className="text-left text-gray-400 font-medium min-w-full">
              Kamu menghemat{" "}
              <Text className="font-bold text-red-700">Rp131.500</Text>
            </Text>
            <Text className="text-left text-gray-400 font-medium min-w-full">
              Kamu mengurangi{" "}
              <Text className="font-bold text-red-700">2.1 kgCo</Text>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
