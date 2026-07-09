// firebase.js

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBmiVoAb6DC18ij1-IFa8rgEvsU3XYd0i0",
  authDomain: "kabanus-cf463.firebaseapp.com",
  // ÖNEMLİ: databaseURL kısmının projenle eşleştiğinden emin ol
  databaseURL: "https://kabanus-cf463-default-rtdb.firebaseio.com",
  projectId: "kabanus-cf463",
  storageBucket: "kabanus-cf463.firebasestorage.app",
  messagingSenderId: "722990798609",
  appId: "1:722990798609:web:fee52848a0a9aa84c1deb0"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Veritabanı referansını al
const db = firebase.database();

// Oturum ID'si oluştur (Her sayfa yenilenmesinde yeni oturum)
function getSessionId() {
    // Sayfa kapatılınca silinmesi için sessionStorage kullanıyoruz
    if (!sessionStorage.getItem('chat_session_id')) {
        sessionStorage.setItem('chat_session_id', 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
    }
    return sessionStorage.getItem('chat_session_id');
}

const sessionId = getSessionId();
