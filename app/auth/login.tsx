import { Link, useNavigation } from "expo-router";
import { FirebaseError } from "firebase/app";
import * as React from "react";
import { Image, Platform, ScrollView, TextInput, View, BackHandler } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Text } from "~/components/ui/text";
import { loginUser } from "~/lib/api";
import { cn } from "~/lib/utils";
import { useFocusEffect } from '@react-navigation/native';

type RootStackParamList = {
  "auth/login": undefined;
  "auth/register": undefined;
  "auth/successful": undefined;
  "index": undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "auth/register"
>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const inputRef = React.useRef<TextInput>(null);
  const [err, setErr] = React.useState<string | null>(null);

  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  function handleOnLabelPress() {
    if (!inputRef.current) {
      return;
    }
    if (inputRef.current.isFocused()) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }

  function onChangeUsername(text: string) {
    if (err) {
      setErr(null);
    }
    setUsername(text);
  }

  function onChangePassword(text: string) {
    if (err) {
      setErr(null);
    }
    setPassword(text);
  }

  function onSubmitEditing() {
    setErr("Write more stuff to remove this error message.");
  }

  function handleLogin() {
    if (!username || !password) {
      setErr("Please fill in all fields.");
      return;
    }

    loginUser(username, password)
      .then(() => {
        alert("Login successful!");
        navigation.navigate("auth/successful");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setErr("User not found.");
          return;
        }
        if (error.code === "auth/invalid-credential") {
          setErr("Wrong Email or Password.");
          return;
        }
        if (error.code === "auth/too-many-requests") {
          setErr("Too many login tries. Try again later.");
          return;
        }

        setErr("An error occurred. Please try again.");
      });
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("index");
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center">
      <View className="web:max-w-xs w-full p-12 gap-6">
        <View className="flex flex-row justify-center items-center">
          <Image
            source={require("../../assets/images/icon.png")}
            style={{ width: 240, height: 240 }}
          />
        </View>
        <View>
          <Label
            className={cn(err && "text-destructive", "pb-2 native:pb-1 pl-0.5")}
            nativeID="inputLabel"
            onPress={handleOnLabelPress}
          >
            Username
          </Label>
          <Input
            ref={inputRef}
            placeholder="Username"
            autoCapitalize="none"
            value={username}
            onChangeText={onChangeUsername}
            onSubmitEditing={onSubmitEditing}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
          />
        </View>
        <View>
          <Label
            className={cn(err && "text-destructive", "pb-2 native:pb-1 pl-0.5")}
            nativeID="inputLabel"
            onPress={handleOnLabelPress}
          >
            Password
          </Label>
          <Input
            ref={inputRef}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={onChangePassword}
            onSubmitEditing={onSubmitEditing}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
          />
        </View>
        {err && <ErrorMessage msg={err} />}
        <Text className="text-sm text-gray-400 text-right">
          Forgot Password?
        </Text>
        <Button className="bg-blue-400" onPress={handleLogin}>
          <Text className="font-bold">Login</Text>
        </Button>
        {/* <View className="flex flex-row justify-between items-center w-full">
          <Separator className="w-1/3" />
          <Text className="text-gray-500 text-center font-semibold">
            Or login with
          </Text>
          <Separator className="w-1/3" />
        </View>
        <View className="flex flex-row justify-center items-center">
          <Button variant="outline">
            <Image
              source={require("../../assets/images/google.png")}
              style={{ width: 24, height: 24 }}
            />
          </Button>
        </View> */}
        <Text className="text-center">
          Don't have an account?{" "}
          <Link href="/auth/register">
            <Text className="font-bold">Register Now!</Text>
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
}

function ErrorMessage({ msg }: { msg: string }) {
  if (Platform.OS === "web") {
    return (
      <Text
        className="text-destructive text-sm native:px-1 py-1.5 web:animate-in web:zoom-in-95"
        aria-invalid="true"
        id="inputError"
      >
        {msg}
      </Text>
    );
  }
  return (
    <Animated.Text
      entering={FadeInDown}
      exiting={FadeOut.duration(275)}
      className="text-destructive text-sm native:px-1 py-1.5"
      aria-invalid="true"
      id="inputError"
    >
      {msg}
    </Animated.Text>
  );
}
