import { Link } from "expo-router";
import * as React from "react";
import { View } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Text className="text-center text-2xl font-bold">Hello, world!</Text>
      <Button>
        <Link href="/auth/login">
          <Text className="text-center text-lg font-bold">Login Page</Text>
        </Link>
      </Button>
      <Button>
        <Link href="/auth/register">
          <Text className="text-center text-lg font-bold">Register Page</Text>
        </Link>
      </Button>
    </View>
  );
}
