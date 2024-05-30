import { Link } from "expo-router";
import * as React from "react";
import { ScrollView } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Text className="text-center text-2xl font-bold">Hello, world!</Text>
      <Button>
        <Link href="/auth/login">
          <Text className="text-center text-lg font-bold">Login Page</Text>
        </Link>
      </Button>
      <Button>
        <Link href="/auth/register">
          <Text className="text-center text-lg font-bold">Register Page</Text>
        </Link>
      </Button>
      <Button>
        <Link href="/profile">
          <Text className="text-center text-lg font-bold">Profile Page</Text>
        </Link>
      </Button>
      <Button>
        <Link href="/purchase">
          <Text className="text-center text-lg font-bold">Purchase Page</Text>
        </Link>
      </Button>
      <Button>
        <Link href="/nearby">
          <Text className="text-center text-lg font-bold">Nearby Page</Text>
        </Link>
      </Button>
      <Button>
        <Link href="/home">
          <Text className="text-center text-lg font-bold">Home Page</Text>
        </Link>
      </Button>
      <Button>
        <Link href="/refrigerator">
          <Text className="text-center text-lg font-bold">
            Refrigerator Page
          </Text>
        </Link>
      </Button>
      <Button>
        <Link href="/productdetails">
          <Text className="text-center text-lg font-bold">
            Product Details Page
          </Text>
        </Link>
      </Button>
      <Button>
        <Link href="/page">
          <Text className="text-center text-lg font-bold">Navigation Test</Text>
        </Link>
      </Button>
      <Button>
        <Link href="/bestseller">
          <Text className="text-center text-lg font-bold">Terlaris Page</Text>
        </Link>
      </Button>
    </ScrollView>
  );
}
