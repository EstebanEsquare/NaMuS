/**
 * Chat Module
 * 
 * Mesajlaşma işlemleri: gönderme, alma, görüntüleme
 */

// Mesaj dinleyicisi için değişken
let messagesListener = null;

/**
 * Mesaj gönder
 * @param {string} text - Mesaj metni
 * @param {string} color - Kullanıcı rengi
 */
function sendMessage(text, color) {
    if (!text.trim()) return;
    
    const message = {
        text: text.trim(),
        color: color,
        timestamp: Date.now(),
        createdAt: new Date().toISOString()
    };
    
    // Firebase'e mesajı ekle
    getMessagesRef().push(message)
        .then(() => {
            console.log('Mesaj gönderildi');
        })
        .catch((error) => {
            console.error('Mesaj gönderme hatası:', error);
        });
}

/**
 * Mesajları dinlemeye başla
 * @param {function} onMessageUpdate - Yeni mesaj geldiğinde çağrılacak fonksiyon
 */
function startListeningForMessages(onMessageUpdate) {
    const messagesRef = getMessagesRef();
    
    // Önceki dinleyiciyi kaldır
    if (messagesListener) {
        messagesRef.off('value', messagesListener);
    }
    
    // Yeni dinleyici ekle
    messagesListener = (snapshot) => {
        const messages = [];
        
        snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val();
            message.id = childSnapshot.key;
            messages.push(message);
        });
        
        // Mesajları zamana göre sırala
        messages.sort((a, b) => a.timestamp - b.timestamp);
        
        onMessageUpdate(messages);
    };
    
    messagesRef.on('value', messagesListener);
}

/**
 * Mesaj dinlemeyi durdur
 */
function stopListeningForMessages() {
    if (messagesListener) {
        const messagesRef = getMessagesRef();
        messagesRef.off('value', messagesListener);
        messagesListener = null;
    }
}

/**
 * Zaman damgasını okunabilir formata çevir
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatlanmış zaman (HH:MM)
 */
function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

/**
 * Mesaj HTML'i oluştur
 * @param {object} message - Mesaj objesi
 * @param {string} userColor - Kullanıcının rengi
 * @returns {string} Mesaj HTML string'i
 */
function createMessageHTML(message, userColor) {
    const isSent = message.color === userColor;
    const time = formatTime(message.timestamp);
    
    return `
        <div class="message ${isSent ? 'sent' : 'received'}" 
             style="${isSent ? '--user-message-color: ' + message.color : ''}">
            <div class="message-text">${escapeHTML(message.text)}</div>
            <div class="message-time">${time}</div>
        </div>
    `;
}

/**
 * HTML injection'ı önlemek için özel karakterleri escape et
 * @param {string} text - Kaçış yapılacak metin
 * @returns {string} Escape edilmiş metin
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Mesaj listesini render et
 * @param {Array} messages - Mesajlar dizisi
 * @param {string} userColor - Kullanıcının rengi
 * @param {HTMLElement} container - Mesajların ekleneceği container
 */
function renderMessages(messages, userColor, container) {
    if (!container) return;
    
    if (messages.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>Henüz mesaj yok</p>
                <p>İlk mesajı göndererek sohbeti başlat!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = messages.map(msg => 
        createMessageHTML(msg, userColor)
    ).join('');
}

/**
 * Mesaj container'ını en alta kaydır
 * @param {HTMLElement} container - Scroll edilecek container
 */
function scrollToBottom(container) {
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}
