import { db } from "~/config";
import { doc, collection, getDoc, getDocs } from "firebase/firestore";

/**
 * Get all food data from Firestore.
 * @returns {Promise<Array>} An array of food data.
 * @example
 * const foodData = await getAllFood();
 * console.log(foodData);
 * // [
 * //   {
 * //     imageSource: { uri: "https://i.imgur.com/alpENn6.jpg" },
 * //     title: "Nasi Goreng",
 * //     distance: "2 km",
 * //     price: 35000,
 * //     discountedPrice: 30000,
 * //     status: "Available",
 * //   },
 */
const getAllFood = async () => {
  const querySnapshot = await getDocs(collection(db, "fnb"));
  const foodData: any = [];
  querySnapshot.forEach((doc) => {
    foodData.push(doc.data());
  });
  return foodData;
};

/**
 * Get a specific food data from Firestore.
 * @param {string} id - The food ID.
 * @returns {Promise<Object>} A food data.
 * @example
 * const foodData = await getFood("1");
 * console.log(foodData);
 * // {
 * //   imageSource: { uri: "https://i.imgur.com/alpENn6.jpg" },
 * //   title: "Nasi Goreng",
 * //   distance: "2 km",
 * //   price: 35000,
 * //   discountedPrice: 30000,
 * //   status: "Available",
 * // }
 */
const getFood = async (id: string) => {
  const docRef = await getDoc(doc(db, "fnb", id));
  return docRef.data();
};

export { getAllFood, getFood };
