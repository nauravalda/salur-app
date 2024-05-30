import React from "react";
import { View, ScrollView, Text } from "react-native";
import FoodCategoryItem from "components/ui/categorycard";

const FoodCategoryList: React.FC = () => {
  const categoryItems = [
    { title: "Makanan Berat", imageSource: require("../assets/images/ojek.png") },
    { title: "Roti dan Kue", imageSource: require("../assets/images/ojek.png") },
    { title: "Makanan Vegan", imageSource: require("../assets/images/ojek.png") },
    { title: "Minuman", imageSource: require("../assets/images/ojek.png") },
  ];

  return (
    <View className="mt-4">
      <Text className="text-lg font-semibold mb-2">Kategori</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoryItems.map((item, index) => (
          <FoodCategoryItem
            key={index}
            title={item.title}
            imageSource={item.imageSource}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FoodCategoryList;
