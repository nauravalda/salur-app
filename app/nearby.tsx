import React from 'react';
import { View,Text,ScrollView,Image,StyleSheet,Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import ItemCard from '~/components/ui/itemcard';
import Animated,{ useAnimatedRef, useAnimatedStyle, useScrollViewOffset, interpolate } from 'react-native-reanimated';

const { width } = Dimensions.get("window");
const IMG_HEIGHT = 286;

export default function Screen() {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOfset = useScrollViewOffset(scrollRef);

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY:interpolate(
                        scrollOfset.value,
                        [-IMG_HEIGHT,0,IMG_HEIGHT],
                        [-IMG_HEIGHT/2,0,IMG_HEIGHT*0.75]
                    )
                },
                {
                    scale: interpolate(
                        scrollOfset.value,
                        [-IMG_HEIGHT,0,IMG_HEIGHT],
                        [2,1,1]
                    )
                }
            ],
        };
    
    })

    return (
      <View style={styles.container}>
        <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
          <Animated.Image
            source={require("../assets/images/ojek.png")}
            style={[styles.image, imageAnimatedStyle]}
          />
          <View style={{ backgroundColor: "#fff" }}>
            <ItemCard
              imageSource={require("../assets/images/ojek.png")}
              title="Korean Garlic Bread Creamcheese"
              distance="1.3 Km"
              price={26000}
              discountedPrice={13000}
              status="Ambil hari ini, 08:00 - 21:00"
              onPress={() => {}}
            />
          </View>
        </Animated.ScrollView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width,
        height: IMG_HEIGHT,
    }
})