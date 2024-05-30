import { Link } from "expo-router";
import { ChevronRight, Info, MapPin } from "lucide-react-native";
import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function PurchasePage() {
  const [payment, setPayment] = React.useState("OVO");
  const [address, setAddress] = React.useState("Jl. Sukahaji Baru No.18");
  const [orderMethod, setOrderMethod] = React.useState("Gojek");

  function onLabelPress(label: string) {
    return () => {
      setPayment(label);
    };
  }

  function onButtonPress(label: string) {
    return () => {
      setOrderMethod(label);
    };
  }

  const orderData = [
    {
      id: 1,
      name: "Korean Garlic Bread Creamcheese",
      amount: 1,
      price: 3000,
      image: require("../assets/images/food.png"),
      available: true,
    },
    {
      id: 2,
      name: "Roti isi Coklat",
      amount: 2,
      price: 13000,
      image: require("../assets/images/food.png"),
      available: false,
    },
  ];

  function onChangeAddress(text: string) {
    setAddress(text);
  }

  return (
    <View className="flex-1">
      <ScrollView contentContainerClassName="flex-grow w-full items-center gap-2 bg-[#EEEEEE]">
        {/* Address Section */}
        <View className="flex flex-col gap-4 w-full p-6 bg-white">
          {/* Ubah Alamat */}
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-col">
              <Text className="text-lg text-[#747474] font-bold">
                Dikirim ke
              </Text>
              <Text className="text-lg font-bold">{address}</Text>
            </View>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-600 bg-none rounded-full">
                  <Text className="text-red-600 font-bold">Ubah Alamat</Text>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw]">
                <DialogHeader>
                  <DialogTitle className="font-bold">Ubah Alamat</DialogTitle>
                </DialogHeader>
                <Input
                  placeholder={address}
                  style={{
                    // width: "90%",
                    // borderWidth: 0,
                    fontSize: 14,
                    overflow: "scroll",
                    // fontWeight: "600",
                    // padding: 0,
                    // maxHeight: 25,
                  }}
                  onChangeText={onChangeAddress}
                />
              </DialogContent>
            </Dialog>
          </View>

          {/* Detail Alamat */}
          <View className="flex flex-col gap-4">
            {/* Notice */}
            <View className="flex flex-row justify-center items-center gap-2 w-full px-4 py-2 bg-[#F3E4E4] rounded-xl">
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
          <View className="flex flex-row justify-between items-center border border-muted-foreground rounded-lg py-4 px-6">
            <Text className="text-lg text-muted-foreground font-bold">
              Metode Pengiriman
            </Text>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  size="sm"
                  className="border-none bg-none ring-none">
                  <ChevronRight
                    size={26}
                    color="#747474"
                    className="font-bold"
                  />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw]">
                <DialogHeader>
                  <DialogTitle className="font-bold">
                    Metode Pengiriman
                  </DialogTitle>
                  <DialogDescription>
                    <Text className="text-sm">
                      Pilih metode pengiriman yang diinginkan
                    </Text>
                  </DialogDescription>
                </DialogHeader>

                <RadioGroup
                  value={orderMethod}
                  onValueChange={setOrderMethod}
                  className="gap-3">
                  <RadioGroupItemWithButton
                    value="Gojek"
                    onButtonPress={onButtonPress("Gojek")}
                  />
                  <RadioGroupItemWithButton
                    value="Grab"
                    onButtonPress={onButtonPress("Grab")}
                  />
                  <RadioGroupItemWithButton
                    value="Sicepat"
                    onButtonPress={onButtonPress("Sicepat")}
                  />
                </RadioGroup>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button className="rounded-full bg-[#D92F2F]">
                      <Text className="text-white font-bold">Simpan</Text>
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </View>
        </View>

        {/* Pesanan */}
        <View className="flex flex-col gap-4 w-full p-6 bg-white">
          <Text className="font-bold">Pesanan</Text>
          {/* Card */}
          {orderData.map((item) => (
            <View
              key={item.id}
              className="flex flex-row justify-between items-start">
              <View className="flex flex-row items-start gap-2 flex-1">
                <Image
                  className="rounded-md"
                  source={require("../assets/images/food.png")}
                  style={{ width: 64, height: 64 }}
                />
                <View className="flex flex-col justify-between gap-1 max-w-[50%] flex-grow">
                  <Badge variant="outline" className="rounded-md max-w-[60%]">
                    <Text
                      className={
                        item.available ? "text-turquoise-600" : "text-red-600"
                      }>
                      {item.available ? "Tersedia" : "Habis"}
                    </Text>
                  </Badge>
                  <Text className="text-xs text-ellipsis" numberOfLines={1}>
                    <Text className="text-sm font-bold">{item.amount}x </Text>
                    {item.name}
                  </Text>
                </View>
              </View>
              <View className="flex flex-col justify-between items-end">
                <Text className="font-bold">
                  Rp
                  {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Text>
                <View className="flex flex-row gap-2 items-center justify-end">
                  <Text className="text-red-600 text-sm">Delete</Text>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Text className="text-turquoise-700 text-sm">
                        Edit Item
                      </Text>
                    </DialogTrigger>
                    <DialogContent className="w-[90vw]">
                      <DialogHeader>
                        <DialogTitle className="font-bold">
                          Edit Item
                        </DialogTitle>
                        <DialogDescription>Ubah jumlah item</DialogDescription>
                      </DialogHeader>
                      <Input
                        placeholder={String(item.amount)}
                        onChangeText={(e) => {
                          item.amount = Number(e);
                        }}
                        style={{
                          // width: "90%",
                          // borderWidth: 0,
                          fontSize: 14,
                          overflow: "scroll",
                          // fontWeight: "600",
                          // padding: 0,
                          // maxHeight: 25,
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Metode Pembayaran */}
        <View className="flex flex-col gap-4 w-full p-6 bg-white">
          <Text className="font-bold">Metode Pembayaran</Text>
          <RadioGroup
            value={payment}
            onValueChange={setPayment}
            className="gap-3">
            <RadioGroupItemWithLabel
              value="OVO"
              onLabelPress={onLabelPress("OVO")}
            />
            <RadioGroupItemWithLabel
              value="DANA"
              onLabelPress={onLabelPress("DANA")}
            />
            <RadioGroupItemWithLabel
              value="GOPAY"
              onLabelPress={onLabelPress("GOPAY")}
            />
            <RadioGroupItemWithLabel
              value="SHOPEEPAY"
              onLabelPress={onLabelPress("SHOPEEPAY")}
            />
          </RadioGroup>
        </View>

        {/* Rincian Pembayaran */}
        <View className="flex flex-col gap-4 w-full p-6 bg-white">
          <Text className="font-bold mb-6">Rincian Pembayaran</Text>
          <Separator />
          <View className="flex flex-col gap-1">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-muted-foreground">Subtotal</Text>
              <View className="flex flex-row gap-2">
                <Text className="text-muted-foreground line-through">
                  Rp32.000
                </Text>
                <Text className="text-red-700">Rp16.000</Text>
              </View>
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-muted-foreground">Biaya Pengiriman</Text>

              <Text className="text-muted-foreground">Rp4.000</Text>
            </View>
          </View>
        </View>

        {/* Confirmation Section */}
        <View className="flex-1 flex-col w-full px-6 py-4 gap-4 bg-white">
          <View className="flex flex-row justify-between items-start">
            <Text className="text-muted-foreground text-sm">Grand Total</Text>
            <View className="flex flex-col gap-1">
              <Text className="text-muted-foreground line-through text-right">
                Rp36.000
              </Text>
              <Text className="font-bold text-xl">Rp20.000</Text>
            </View>
          </View>

          <Button className="rounded-full bg-[#D92F2F]">
            <Text className="text-white font-bold">
              Pilih Metode Pembayaran
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) {
  return (
    <View className={"flex-row gap-2 items-center"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {value}
      </Label>
    </View>
  );
}

function RadioGroupItemWithButton({
  value,
  onButtonPress,
}: {
  value: string;
  onButtonPress: () => void;
}) {
  return (
    <View className={"flex-row gap-2 items-center"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <View
        nativeID={`label-for-${value}`}
        className="flex flex-row flex-grow justify-between items-center border border-muted-foreground rounded-lg py-4 px-6">
        <Text className="text-sm text-muted-foreground font-bold">{value}</Text>

        <Text className="text-sm text-muted-foreground font-bold">
          12.000 - 26.000
        </Text>
      </View>
    </View>
  );
}
