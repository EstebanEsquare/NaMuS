/**
 * Main Application Module
 * 
 * Uygulama başlatma, ekran yönetimi ve olay dinleyicileri
 */

// Ekran elementleri
let loginScreen, colorScreen, chatScreen;
let passwordInput, loginBtn, loginError;
let blueBtn, pinkBtn;
let logoutBtn, messageInput, sendBtn;
let messagesList, messagesContainer;

// Uygulama durumu
let currentUserColor = null;

/**
 * DOM elementlerini başlat
 */
function initElements() {
    // Ekranlar
    loginScreen = document.getElementById('login-screen');
    colorScreen = document.getElementById('color-screen');
    chatScreen = document.getElementById('chat-screen');
    
    // Login elementleri
    passwordInput = document.getElementById('password-input');
    loginBtn = document.getElementById('login-btn');
    loginError = document.getElementById('login-error');
    
    // Renk seçimi elementleri
    blueBtn = document.getElementById('blue-btn');
    pinkBtn = document.getElementById('pink-btn');
    
    // Chat elementleri
    logoutBtn = document.getElementById('logout-btn');
    messageInput = document.getElementById('message-input');
    sendBtn = document.getElementById('send-btn');
    messagesList = document.getElementById('messages-list');
    messagesContainer = document.getElementById('messages-container');
}

/**
 * Ekran değiştir
 * @param {HTMLElement} screen - Gösterilecek ekran
 */
function showScreen(screen) {
    // Tüm ekranları gizle
    [loginScreen, colorScreen, chatScreen].forEach(s => {
        s.classList.remove('active');
    });
    
    // İstenen ekranı göster
    screen.classList.add('active');
}

/**
 * Giriş ekranını göster
 */
function showLoginScreen() {
    showScreen(loginScreen);
    passwordInput.value = '';
    passwordInput.focus();
    loginError.textContent = '';
}

/**
 * Renk seçim ekranını göster
 */
function showColorScreen() {
    showScreen(colorScreen);
}

/**
 * Sohbet ekranını göster
 */
function showChatScreen() {
    showScreen(chatScreen);
    messageInput.focus();
}

/**
 * Giriş işlemi
 */
function handleLogin() {
    const password = passwordInput.value.trim();
    
    if (verifyPassword(password)) {
        setLoggedIn();
        
        // Daha önce renk seçilmiş mi kontrol et
        const savedColor = getUserColor();
        if (savedColor) {
            currentUserColor = savedColor;
            initializeChat();
        } else {
            showColorScreen();
        }
    } else {
        loginError.textContent = '❌ Yanlış şifre!';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

/**
 * Renk seçimi işlemi
 * @param {string} color - Seçilen renk ('blue' veya 'pink')
 */
function handleColorSelection(color) {
    currentUserColor = color;
    setUserColor(color);
    initializeChat();
}

/**
 * Sohbeti başlat
 */
function initializeChat() {
    // Mesaj dinleyicisini başlat
    startListeningForMessages((messages) => {
        renderMessages(messages, currentUserColor, messagesList);
        scrollToBottom(messagesContainer);
    });
    
    showChatScreen();
}

/**
 * Mesaj gönder
 */
function handleSendMessage() {
    const text = messageInput.value.trim();
    
    if (text) {
        sendMessage(text, currentUserColor);
        messageInput.value = '';
        scrollToBottom(messagesContainer);
    }
}

/**
 * Çıkış yap
 */
function handleLogout() {
    // Mesaj dinleyicisini durdur
    stopListeningForMessages();
    
    // Oturum ID'yi sıfırla (yeni oturum için)
    resetSessionId();
    
    // Kullanıcı verilerini temizle
    logout();
    
    // Renk seçimini sıfırla
    currentUserColor = null;
    
    // Login ekranına dön
    showLoginScreen();
}

/**
 * Olay dinleyicilerini ayarla
 */
function setupEventListeners() {
    // Login events
    loginBtn.addEventListener('click', handleLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
    
    // Renk seçim events
    blueBtn.addEventListener('click', () => handleColorSelection('blue'));
    pinkBtn.addEventListener('click', () => handleColorSelection('pink'));
    
    // Chat events
    sendBtn.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
    
    logoutBtn.addEventListener('click', handleLogout);
    
    // Sayfa kapanırken temizlik
    window.addEventListener('beforeunload', () => {
        stopListeningForMessages();
    });
    
    // Visibility change - sekme değiştiğinde
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Sekme gizlendiğinde dinleyiciyi durdurabiliriz (opsiyonel)
        } else {
            // Sekme tekrar görünür olduğunda
            if (chatScreen.classList.contains('active')) {
                scrollToBottom(messagesContainer);
            }
        }
    });
}

/**
 * Uygulamayı başlat
 */
function initApp() {
    // Elementleri başlat
    initElements();
    
    // Event listener'ları ayarla
    setupEventListeners();
    
    // Giriş yapılmış mı kontrol et
    if (isLoggedIn()) {
        const savedColor = getUserColor();
        if (savedColor) {
            currentUserColor = savedColor;
            initializeChat();
        } else {
            showColorScreen();
        }
    } else {
        showLoginScreen();
    }
    
    console.log('Uygulama başlatıldı');
}

// DOM yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', initApp);
