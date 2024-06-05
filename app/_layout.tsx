import "~/global.css";

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useNavigation } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { NAV_THEME } from "~/lib/constants";
import {
  Refrigerator,
  Compass,
  ReceiptText,
  UserCircle,
  LogOut,
} from "lucide-react-native";
import HomeScreen from "./index";
import ProfileScreen from "./profile";
import RefrigeratorScreen from "./refrigerator";
import PurchaseScreen from "./(purchase)/purchase";
import ProductDetailsScreen from "./(product)/productdetails";
import NearbyPage from "./(home)/nearby";
import PromosPage from "./(home)/promo";
import BestSellerPage from "./(home)/bestseller";
import LoginScreen from "./auth/login";
import RegisterScreen from "./auth/register";
import AuthSuccessScreen from "./auth/successful";
import PurchaseSuccessScreen from "./(purchase)/purchase-success";
import MyOrderScreen from "./myorders";
import { PortalHost } from "~/components/primitives/portal";
import { getAuth, signOut } from "firebase/auth";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { Button } from "~/components/ui/button";

const LIGHT_THEME = {
  dark: false,
  colors: NAV_THEME.light,
};

const DARK_THEME = {
  dark: true,
  colors: NAV_THEME.dark,
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type RootStackParamList = {
  "auth/login": undefined;
};

type LogoutStackParamList = NativeStackNavigationProp<
  RootStackParamList,
  "auth/login"
>;

export default function RootLayout() {
  const navigate = useNavigation<LogoutStackParamList>();
  function handleLogout() {
    signOut(getAuth()).then(() => {
      navigate.navigate("auth/login");
    });
  }

  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <Button
                onPress={handleLogout}
                variant="outline"
                className="border-0"
              >
                <LogOut size={24} />
              </Button>
            ),
          }}
        />
        <Stack.Screen
          name="Nearby"
          component={NearbyPage}
          options={{ title: "Nearby" }}
        />
        <Stack.Screen
          name="Promos"
          component={PromosPage}
          options={{ title: "Promos" }}
        />
        <Stack.Screen
          name="BestSeller"
          component={BestSellerPage}
          options={{ title: "Best Sellers" }}
        />
      </Stack.Navigator>
    );
  }

  function RootTabs() {
    return (
      <Tab.Navigator initialRouteName="index">
        <Tab.Screen
          name="home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Compass size={size} color={color} />
            ),
            tabBarLabel: "Home",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="refrigerator"
          component={RefrigeratorScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Refrigerator size={size} color={color} />
            ),
            tabBarLabel: "Kulkasku",
            headerTitle: "Kulkasku",
            headerRight: () => (
              <Button
                onPress={handleLogout}
                variant="outline"
                className="border-0"
              >
                <LogOut size={24} />
              </Button>
            ),
            // headerShown: false,
          }}
        />
        <Tab.Screen
          name="myorder"
          component={MyOrderScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <ReceiptText size={size} color={color} />
            ),
            tabBarLabel: "Pesanan Saya",
            headerTitle: "Pesanan Saya",
            headerRight: () => (
              <Button
                onPress={handleLogout}
                className="border-0"
                variant="outline"
              >
                <LogOut size={24} />
              </Button>
            ),
            // headerShown: false,
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <UserCircle size={size} color={color} />
            ),
            tabBarLabel: "Profile",
            headerTitle: "Profile",
            headerRight: () => (
              <Button
                onPress={handleLogout}
                variant="outline"
                className="border-0"
              >
                <LogOut size={24} />
              </Button>
            ),
            // headerShown: false,
          }}
        />
        {/* <Tab.Screen
          name="purchase"
          component={PurchaseScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <ReceiptText size={size} color={color} />
            ),
            headerShown: false,
          }}
        /> */}
      </Tab.Navigator>
    );
  }

  return (
    <>
      <Stack.Navigator initialRouteName="auth/login">
        <Stack.Screen
          name="index"
          component={RootTabs}
          options={{
            headerShown: false,
            title: "Home",
            headerRight: () => (
              <Button
                onPress={handleLogout}
                variant="outline"
                className="border-0"
              >
                <LogOut size={24} />
              </Button>
            ),
          }}
        />
        <Stack.Screen
          name="(product)/productdetails"
          component={ProductDetailsScreen as any}
          options={{ title: "Product Details" }}
        />
        <Stack.Screen
          name="(purchase)/purchase"
          component={PurchaseScreen as any} // Add PurchaseScreen component here
          options={{ title: "Purchase" }} // Add any options you need
        />
        <Stack.Screen
          name="(purchase)/purchase-success"
          component={PurchaseSuccessScreen}
          options={{
            title: "Purchase Successful",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth/register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth/login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="auth/successful"
          component={AuthSuccessScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>

      <PortalHost />
    </>
  );
}
