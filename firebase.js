// firebase.js

// Firebase yapılandırması
// Not: Bu anahtarlar sadece bu proje için geçerlidir.
const firebaseConfig = {
  apiKey: "AIzaSyBmiVoAb6DC18ij1-IFa8rgEvsU3XYd0i0",
  authDomain: "kabanus-cf463.firebaseapp.com",
  databaseURL: "https://kabanus-cf463-default-rtdb.firebaseio.com", // Realtime Database URL'i otomatik ekledim
  projectId: "kabanus-cf463",
  storageBucket: "kabanus-cf463.firebasestorage.app",
  messagingSenderId: "722990798609",
  appId: "1:722990798609:web:fee52848a0a9aa84c1deb0"
};

// Firebase'i başlat (Compat versiyonu kullanıyoruz çünkü HTML'de compat scriptleri var)
firebase.initializeApp(firebaseConfig);

// Veritabanı referansını dışarı aktar
const db = firebase.database();

// Oturum ID'si oluştur (Her sayfa yenilendiğinde yeni bir sohbet odası oluşması için)
// Bu sayede sayfayı kapattığınızda eski mesajlar gelmez.
function getSessionId() {
    // Tarayıcı kapatılınca silinecek geçici bir ID
    if (!sessionStorage.getItem('chat_session_id')) {
        sessionStorage.setItem('chat_session_id', 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9));
    }
    return sessionStorage.getItem('chat_session_id');
}

export const sessionId = getSessionId();
export { db };
