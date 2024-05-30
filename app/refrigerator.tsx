import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import FridgeCard from 'components/ui/fridgecard';

export default function RefrigeratorScreen() {
  return (
    <SafeAreaView className="flex-1 bg-red-500 p-4 gap-2">
      <FridgeCard
        title="Susu Sapi"
        date="2021-08-12"
        imageSource={require('../assets/images/ojek.png')}
      />
        <FridgeCard
            title="Susu Kambing"
            date="2021-08-12"
            imageSource={require('../assets/images/ojek.png')}
        />
        <FridgeCard
            title="Susu Kuda"
            date="2021-08-12"
            imageSource={require('../assets/images/ojek.png')}
        />
    </SafeAreaView>
  );
};