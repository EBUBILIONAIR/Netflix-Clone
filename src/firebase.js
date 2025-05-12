// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

// ✅ Your Firebase config (ensure no typos in keys or values)
const firebaseConfig = {
  apiKey: "AIzaSyCrM6S5wRVr8iamBac0FKKpnCtv8OqI3VU",
  authDomain: "netflix-clone-9e74a.firebaseapp.com",
  projectId: "netflix-clone-9e74a",
  storageBucket: "netflix-clone-9e74a.appspot.com",
  messagingSenderId: "558452699881",
  appId: "1:558452699881:web:28ebf5314e1f13c0f3f678",
  measurementId: "G-ZEYG5RB057"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Signup function
export const signup = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
    displayName: name,
  });
  return userCredential;
};

// ✅ Login function
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// ✅ Optional: logout function
export const logout = async () => {
  return await auth.signOut();
};
