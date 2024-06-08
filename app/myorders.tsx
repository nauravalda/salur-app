import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import MyOrderCard from "components/ui/myordercard";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAuth } from "firebase/auth";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

type RootStackParamList = {
  myorders: undefined;
  "auth/login": undefined;
};

type MyOrderScreenProp = NativeStackNavigationProp<RootStackParamList, "myorders">;

export default function MyOrdersScreen() {
  const navigation = useNavigation<MyOrderScreenProp>();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    // } else {
    //   navigation.navigate("auth/login");
    }
  }, []);

  return (
    <View className="flex-1">
      {user ? (
        <ScrollView contentContainerClassName="flex-grow bg-red-500 px-4 py-8 gap-6">
          <MyOrderCard
            title="Nasi Goreng"
            date="Sudah Dibayar"
            imageSource={{ uri: "https://i.imgur.com/alpENn6.jpg" }}
          />
          <MyOrderCard
            title="Korean Garlic Cheese Bread"
            date="Sedang Diantar"
            imageSource={{ uri: "https://i.imgur.com/MwHi3ui.jpeg" }}
          />
          <MyOrderCard
            title="Susu Kuda"
            date="Kurir Hilang"
            imageSource={{ uri: "https://i.imgur.com/KUQxIVFb.jpg" }}
          />
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-lg font-bold">
            Anda harus login terlebih dahulu untuk melihat pesanan anda.
          </Text>
          <Button className="mt-4 bg-blue-400" onPress={() => navigation.navigate("auth/login")}>
            <Text className="font-bold text-white">Login</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
