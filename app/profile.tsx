import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Star } from "lucide-react-native";

export default function Screen() {
  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <View className="flex flex-col items-center gap-2">
        <Image
          source={require("../assets/images/profile.png")}
          style={{ width: 120, height: 120 }}
        />
        <View className="flex flex-row justify-center items-center bg-red-500 py-2 px-4 gap-12 rounded-full">
          <Star size={24} className="text-foreground" />
          <Text className="text-center text-white text-lg font-bold">
            Warrior
          </Text>
          {/* <Star size={24} className="text-foreground" /> */}
        </View>
      </View>

      <View>
        <Text className="text-center text-2xl font-bold">
          This is Contribution Section
        </Text>
      </View>

      <View>
        <Text className="text-center text-2xl font-bold">
          This is Menu Section
        </Text>
      </View>
    </ScrollView>
  );
}
