import { db } from "~/config";
import {
  doc,
  collection,
  query,
  getDoc,
  getDocs,
  addDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

/***
 * Food API
 */

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

/***
 * Users API
 */
const loginUser = async (username: string, password: string) => {
  const userQuery = await query(
    collection(db, "users"),
    where("username", "==", username)
  );
  const user: any = await getDocs(userQuery).then((querySnapshot) => {
    return querySnapshot.docs[0].data();
  });

  const auth = getAuth();
  await setPersistence(auth, getReactNativePersistence(AsyncStorage));
  return signInWithEmailAndPassword(auth, user.email, password);
};

const registerUser = async (
  email: string,
  username: string,
  password: string
) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password).then((user) => {
    return addDoc(collection(db, "users"), {
      uid: user.user.uid,
      email: user.user.email,
      username,
    });
  });
};

const getSelf = async () => {
  const user = getAuth().currentUser;
  const userQuery = await query(
    collection(db, "users"),
    where("uid", "==", user?.uid)
  );
  return getDocs(userQuery).then((querySnapshot) => {
    return querySnapshot.docs[0].data();
  });
};

/***
 * Purchase API
 */
// 1. Create Cart
// 2. Purchase

export { getAllFood, getFood, loginUser, registerUser, getSelf };
