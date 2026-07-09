/**
 * Authentication Module
 * * Kullanıcı girişi ve şifre kontrolü işlemleri
 */

// Ortak şifre
const CORRECT_PASSWORD = 'nmkbn';

// LocalStorage anahtarları
const STORAGE_KEYS = {
    IS_LOGGED_IN: 'chat_is_logged_in',
    USER_COLOR: 'chat_user_color'
};

/**
 * Şifreyi doğrula
 * @param {string} password - Girilen şifre
 * @returns {boolean} Şifre doğru mu?
 */
function verifyPassword(password) {
    return password === CORRECT_PASSWORD;
}

/**
 * Giriş yapılmış olarak işaretle
 */
function setLoggedIn() {
    localStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, 'true');
}

/**
 * Giriş durumunu kontrol et
 * @returns {boolean} Giriş yapılmış mı?
 */
function isLoggedIn() {
    return localStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN) === 'true';
}

/**
 * Çıkış yap (tüm oturum verilerini temizle)
 */
function logout() {
    // Tüm localStorage verilerini temizle
    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
    
    // Session storage'u temizle
    sessionStorage.clear();
}

/**
 * Kullanıcı rengini kaydet
 * @param {string} color - Seçilen renk ('blue' veya 'pink')
 */
function setUserColor(color) {
    localStorage.setItem(STORAGE_KEYS.USER_COLOR, color);
}

/**
 * Kullanıcı rengini al
 * @returns {string|null} Kaydedilmiş renk veya null
 */
function getUserColor() {
    return localStorage.getItem(STORAGE_KEYS.USER_COLOR);
}

/**
 * Renk kodunu al
 * @param {string} color - Renk adı ('blue' veya 'pink')
 * @returns {string} Renk kodu (hex)
 */
function getColorCode(color) {
    const colors = {
        blue: '#4A90D9',
        pink: '#E573A8'
    };
    return colors[color] || colors.blue;
}

// DİĞER DOSYALARIN BU FONKSİYONLARA ERİŞEBİLMESİ İÇİN GLOBAL (WINDOW) OBJESİNE AKTARIYORUZ
window.verifyPassword = verifyPassword;
window.setLoggedIn = setLoggedIn;
window.isLoggedIn = isLoggedIn;
window.logout = logout;
window.setUserColor = setUserColor;
window.getUserColor = getUserColor;
window.getColorCode = getColorCode;
