// firebase.js
// Firebase SDK'larını CDN üzerinden modül olarak içe aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, query, orderByKey, limitToLast } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Senin Firebase Config Bilgilerin
const firebaseConfig = {
  apiKey: "AIzaSyBmiVoAb6DC18ij1-IFa8rgEvsU3XYd0i0",
  authDomain: "kabanus-cf463.firebaseapp.com",
  projectId: "kabanus-cf463",
  storageBucket: "kabanus-cf463.firebasestorage.app",
  messagingSenderId: "722990798609",
  appId: "1:722990798609:web:fee52848a0a9aa84c1deb0"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Dışa aktar (diğer dosyaların kullanabilmesi için)
export { db, ref, push, onChildAdded, query, orderByKey, limitToLast };
