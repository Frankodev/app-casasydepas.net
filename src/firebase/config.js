// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDERID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Analytics
export const analytics = getAnalytics(app);
// Initialize Auth
export const auth = getAuth(app);
// Initialize Firestore DB
export const db = getFirestore(app);
// Initialize Storage
export const storage = getStorage()
export const storageRef = (imagesRef) => ref(storage, imagesRef)
// función que carga la imagen en el storage
export const uploadImages = (storageRef, imagesUpload) => uploadBytes(storageRef, imagesUpload)
// función que trae la url a la app
export const getUrl = (imagesUrl) => getDownloadURL(imagesUrl)
// función para eliminar imágenes en el storage
export const deleteToImg = (imagesDelete) => deleteObject(ref(storage, imagesDelete))

// función para eliminar una propiedad
export const deletePropertie = (idPropertie) => deleteDoc(doc(db, 'properties', idPropertie))