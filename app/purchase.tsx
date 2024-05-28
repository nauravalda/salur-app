import { Link } from "expo-router";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <ScrollView contentContainerClassName="flex-1 items-center gap-5 p-6 bg-[#EEEEEE]">
      <Text className="text-center text-2xl font-bold">
        This is purchase page
      </Text>
    </ScrollView>
  );
}
