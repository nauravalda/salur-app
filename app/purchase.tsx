import { Link } from "expo-router";
import { ChevronRight, Info, MapPin } from "lucide-react-native";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <ScrollView contentContainerClassName="flex-1 w-full items-center gap-2 bg-[#EEEEEE]">
      {/* Address Section */}
      <View className="flex flex-col gap-4 w-full p-6 bg-white">
        {/* Ubah Alamat */}
        <View className="flex flex-row justify-between items-center">
          <View className="flex flex-col">
            <Text className="text-lg text-[#747474] font-bold">Dikirim ke</Text>
            <Text className="text-lg font-bold">Jl. Sukahaji Baru No.18</Text>
          </View>

          <Button
            variant="outline"
            size="sm"
            className="border-red-600 bg-none rounded-full"
          >
            <Text className="text-red-600 font-bold">Ubah Alamat</Text>
          </Button>
        </View>

        {/* Detail Alamat */}
        <View className="flex flex-col gap-4">
          {/* Notice */}
          <View className="flex flex-row justify-center items-center gap-2 w-full px-4 py-2 bg-[#F3E4E4] rounded-xl border-[0.75px] ">
            <Info size={20} color="#ffffff" fill="#D92F2F" />
            <Text className="text-[9px] font-medium">
              Tambahkan detail alamat untuk membantu pengantaran lebih cepat
            </Text>
          </View>

          {/* Input */}
          <View className="flex flex-row items-center justify-start px-2 border border-[#747474] rounded-full max-w-[60%]">
            <MapPin
              size={20}
              color="#747474"
              className="rounded-md max-h-[30%] border-[0.75px] border-[#747474] px-3 items-center py-1 native:text-xs text-xs font-medium"
            />
            <Input
              placeholder="Tambahkan Detail Alamat"
              style={{
                width: "90%",
                borderWidth: 0,
                fontSize: 11,
                overflow: "scroll",
                fontWeight: "600",
                padding: 0,
                maxHeight: 25,
              }}
            />
          </View>
        </View>
      </View>

      {/* Metode Pengiriman */}
      <View className="flex flex-col gap-4 w-full p-6 bg-white">
        <View className="flex flex-row justify-between items-center border border-[#747474] rounded-lg py-4 px-6">
          <Text className="text-lg text-[#747474] font-bold">
            Metode Pengiriman
          </Text>

          <ChevronRight size={26} color="#747474" className="font-bold" />
        </View>
      </View>

      {/* Pesanan */}
      <View className="flex flex-col gap-4 w-full p-6 bg-white">
        <Text>Pesanan Section</Text>
      </View>

      {/* Metode Pembayaran */}
      <View className="flex flex-col gap-4 w-full p-6 bg-white">
        <Text>Metode Pembayaran Section</Text>
      </View>

      {/* Rincian Pembayaran */}
      <View className="flex flex-col gap-4 w-full p-6 bg-white">
        <Text>Rincian Pembayaran Section</Text>
      </View>
    </ScrollView>
  );
}
