// firebase.js

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBmiVoAb6DC18ij1-IFa8rgEvsU3XYd0i0",
  authDomain: "kabanus-cf463.firebaseapp.com",
  databaseURL: "https://kabanus-cf463-default-rtdb.firebaseio.com",
  projectId: "kabanus-cf463",
  storageBucket: "kabanus-cf463.firebasestorage.app",
  messagingSenderId: "722990798609",
  appId: "1:722990798609:web:fee52848a0a9aa84c1deb0"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Oturum ID'si oluştur (Her sayfa yenilemede yeni bir oturum gibi davranmak için)
function getSessionId() {
    // Sayfa her yenilendiğinde yeni bir session ID üretelim ki eski mesajlar gelmesin
    // AMA aynı sekme açık kaldığı sürece aynı ID'yi kullanalım
    if (!sessionStorage.getItem('chat_session_id')) {
        sessionStorage.setItem('chat_session_id', 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
    }
    return sessionStorage.getItem('chat_session_id');
}

// Değişkenleri global pencereye atıyoruz ki diğer dosyalar erişebilsin
window.db = db;
window.sessionId = getSessionId();
