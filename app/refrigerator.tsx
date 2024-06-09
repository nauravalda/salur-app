import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import FridgeCard from "components/ui/fridgecard";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAuth } from "firebase/auth";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { getAllOrder, getSelf } from "~/lib/api";

type RootStackParamList = {
  refrigerator: undefined;
  "auth/login": undefined;
};

type RefrigeratorScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "refrigerator"
>;

export default function RefrigeratorScreen() {
  const navigation = useNavigation<RefrigeratorScreenProp>();
  const [user, setUser] = React.useState<any>(null);
  const [orders, setOrders] = React.useState<any>([]);

  React.useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      getSelf().then((data) => {
        setUser(data as any);

        getAllOrder(currentUser.uid).then((data) => {
          setOrders(data);
        });
      });
    }
  }, []);

  return (
    <View className="flex-1">
      {user ? (
        <ScrollView contentContainerClassName="flex-grow bg-red-500 px-4 py-8 gap-6">
          {orders.map((order: any) => {
            console.log(order);
            return (
              <FridgeCard
                key={order.id}
                title={order.fnb.title}
                date={new Date(
                  order.estimasiTiba.seconds * 1000 +
                    order.estimasiTiba.nanoseconds / 1000000
                ).toLocaleDateString()}
                imageSource={order.fnb.imageSource}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-lg font-bold">
            Silakan login untuk menampilkan estimasi tanggal kadaluwarasa
            makanan yang kamu miliki
          </Text>
          <Button
            className="mt-4 bg-blue-400"
            onPress={() => navigation.navigate("auth/login")}
          >
            <Text className="font-bold text-white">Login</Text>
          </Button>
        </View>
      )}
    </View>
  );
}
