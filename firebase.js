/**
 * Firebase Configuration
 * 
 * Bu dosyayı kendi Firebase ayarlarınızla güncelleyin.
 * 
 * Firebase Projesi Oluşturma:
 * 1. https://console.firebase.google.com adresine gidin
 * 2. "Add project" butonuna tıklayın
 * 3. Proje adını girin ve devam edin
 * 4. Google Analytics'i etkinleştirebilir veya atlayabilirsiniz
 * 5. Proje oluşturulduktan sonra, proje özet sayfasına gidin
 * 6. Web app ekleyin (</> ikonu)
 * 7. App nickname girin ve kaydedin
 * 8. Size verilen config bilgilerini aşağıya kopyalayın
 */

const firebaseConfig = {
    // Aşağıdaki değerleri kendi Firebase proje bilgilerinizle değiştirin
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Realtime Database referansı
const database = firebase.database();

// Oturum ID'si - her oturum için benzersiz bir kimlik
// Bu sayede her yeni oturum temiz başlar
let sessionId = null;

/**
 * Yeni bir oturum ID'si oluştur
 * @returns {string} Benzersiz oturum ID'si
 */
function createSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Mevcut oturum ID'sini al veya yeni oluştur
 * @returns {string} Oturum ID'si
 */
function getSessionId() {
    if (!sessionId) {
        sessionId = createSessionId();
    }
    return sessionId;
}

/**
 * Oturum ID'yi sıfırla (çıkış yaparken)
 */
function resetSessionId() {
    sessionId = null;
}

/**
 * Mesajlar için Firebase referansı
 * @returns {firebase.database.Reference} Mesajlar referansı
 */
function getMessagesRef() {
    const currentSessionId = getSessionId();
    return database.ref(`chats/${currentSessionId}/messages`);
}

/**
 * Aktif oturumları temizle (eski oturumları kaldır)
 * Not: Firebase Rules'da bu tür temizlik kuralları eklenebilir
 */
function cleanupOldSessions() {
    // İsteğe bağlı: Eski oturumları temizlemek için kullanılabilir
    // Bu örnek implementasyonda kullanılmıyor
    console.log('Eski oturum temizliği yapılabilir');
}

export {
    database,
    getSessionId,
    resetSessionId,
    getMessagesRef,
    createSessionId
};
