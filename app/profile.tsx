import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { PencilIcon, Star } from "lucide-react-native";
import { getAuth } from "firebase/auth";
import { collection, getDoc } from "firebase/firestore";
import { db } from "~/config";
import { getSelf } from "~/lib/api";

export default function ProfileScreen() {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      getSelf().then((data) => {
        setUser(data as any);
      });
    }
  }, []);

  return (
    <View className="flex-1 items-center gap-5 mt-12 p-6">
      {/* Profile */}
      <View className="flex flex-col items-center gap-2">
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${
              user?.username ?? "G"
            }&background=${
              user?.username ? "d92f2f" : "random"
            }&color=fff&size=128&rounded=true&bold=true&length=1&font-size=0.33`,
          }}
          style={{ width: 120, height: 120, borderRadius: 100 }}
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
          <Text className="font-bold text-center">
            {user?.username ?? "Guest"}
          </Text>
          <View className="bg-[#D92F2F] p-2 rounded-full">
            <PencilIcon size={16} color="white" />
          </View>
        </View>

        <View className="flex flex-col">
          <Text className="text-center text-sm text-gray-400">
            {user?.email ?? ""}
          </Text>
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
    </View>
  );
}
