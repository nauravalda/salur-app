import "~/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, Theme, ThemeProvider } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "~/components/primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import {
  Refrigerator,
  Compass,
  ReceiptText,
  UserCircle,
} from "lucide-react-native";
const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

import HomeScreen from "./home";
import ProfileScreen from "./profile";
import RefrigeratorScreen from "./refrigerator";
import PurchaseScreen from "./purchase";

const homeName = "Home";
const profileName = "Akun";
const refrigeratorName = "Kulkasku";
const purchaseName = "Pesanan Saya";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
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

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <Tab.Navigator initialRouteName="home">
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Compass size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="refrigerator"
        component={RefrigeratorScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Refrigerator size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <UserCircle size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="purchase"
        component={PurchaseScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ReceiptText size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    // <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
    //   <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
    //   <Stack>
    //     <Stack.Screen
    //       name="index"
    //       options={{
    //         title: "Home",
    //         headerShown: false,
    //         // headerRight: () => <ThemeToggle />,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="profile"
    //       options={{
    //         title: "Profile",
    //         headerShown: true,
    //         // headerRight: () => <ThemeToggle />,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="purchase"
    //       options={{
    //         title: "Complete Purchase",
    //         headerShown: true,
    //         // headerRight: () => <ThemeToggle />,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="auth/login"
    //       options={{
    //         title: "Login",
    //         headerShown: false,
    //         // headerRight: () => <ThemeToggle />,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="auth/register"
    //       options={{
    //         title: "Register",
    //         headerShown: false,
    //         // headerRight: () => <ThemeToggle />,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="auth/successful"
    //       options={{
    //         title: "Successful Login",
    //         headerShown: false,
    //         // headerRight: () => <ThemeToggle />,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="auth/home"
    //       options={{
    //         title: "Home",
    //         headerShown: false,
    //         // headerRight: () => <ThemeToggle />,
    //       }}
    //     />
    //   </Stack>
    //   <PortalHost />
    // </ThemeProvider>
  );
}
