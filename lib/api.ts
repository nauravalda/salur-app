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
    const id = doc.id;
    const data = {
      id,
      ...doc.data(),
    };

    foodData.push(data);
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
      peringkat: "Warrior",
      impactReduce: 0,
      impactSaving: 0,
      impactTotal: 0,
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
const makePurchase = async ({
  foodId,
  address,
  addressDetail,
  orderMethod,
  paymentMethod,
  total,
  quantity,
}: any) => {
  const user = getAuth().currentUser;
  const userQuery = await query(
    collection(db, "users"),
    where("uid", "==", user?.uid)
  );

  const userDoc = await getDocs(userQuery).then((querySnapshot) => {
    return querySnapshot.docs[0];
  });

  const foodDoc = await getDoc(doc(db, "fnb", foodId));
  const foodData = foodDoc.data();

  return addDoc(collection(db, "order"), {
    user: userDoc.ref,
    address,
    addressDetail,
    status: "Sedang Diantar",
    estimasiTiba: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    orderMethod,
    paymentMethod,
    total,
    quantity,
    fnb: foodDoc.ref,
  });
};

const getAllOrder = async (userId: any) => {
  const orderQuery = await query(
    collection(db, "order"),
    where("user", "==", userId)
  );

  const orderRef = await getDocs(orderQuery).then((querySnapshot) => {
    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  });

  return orderRef;
};

export { getAllFood, getFood, loginUser, registerUser, getSelf, makePurchase };
