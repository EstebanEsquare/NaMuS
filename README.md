# Sohbet Uygulaması

GitHub Pages üzerinde çalışan, Firebase Realtime Database kullanan güvenli bir PWA sohbet uygulaması.

## Özellikler

- 🔐 Tek ortak şifre ile giriş (`nmkbn`)
- 🎨 Mavi veya Pembe renk seçimi
- 💬 WhatsApp benzeri modern arayüz
- 📱 Tam PWA desteği (Ana ekrana eklenebilir)
- 🔄 Gerçek zamanlı mesajlaşma (Firebase)
- 🗑️ Otomatik mesaj temizleme (her oturum temiz başlar)
- 📴 Çevrimdışı destek
- 📲 Mobil ve masaüstü uyumlu

---

## Kurulum

### 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com) adresine gidin
2. **"Add project"** butonuna tıklayın
3. Proje adını girin (örn: `sohbet-app`)
4. Google Analytics'i etkinleştirebilir veya atlayabilirsiniz
5. **"Create project"** butonuna tıklayın

### 2. Web App Ekleme

1. Proje özet sayfasında **Web app** ekleyin (</> ikonu)
2. App nickname girin (örn: `Sohbet Web`)
3. **"Register app"** butonuna tıklayın
4. Size verilen Firebase config bilgilerini kopyalayın

### 3. Firebase Realtime Database Yapılandırma

1. Firebase Console'da sol menüden **"Build" → "Realtime Database"** seçin
2. **"Create database"** butonuna tıklayın
3. Lokasyon seçin (varsayılan yeterli)
4. **Security Rules** kısmında test modunu seçin veya aşağıdaki kuralları ekleyin:

```json
{
  "rules": {
    "chats": {
      "$sessionId": {
        "messages": {
          ".read": true,
          ".write": true
        }
      }
    }
  }
}
```

> ⚠️ **Not:** Bu kurallar herkese okuma/yazma izni verir. Sadece şifreli erişim olduğu için kabul edilebilirdir. Daha güvenli olması için Firebase Authentication kullanılabilir.

### 4. Config Dosyasını Güncelleme

`firebase.js` dosyasını açın ve kendi Firebase config bilgilerinizi girin:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

---

## GitHub Pages ile Yayınlama

### 1. Repository'ye Push

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. GitHub Pages Ayarları

1. GitHub repository'nizde **Settings** sekmesine gidin
2. Sol menüden **Pages** seçin
3. **Source** altında:
   - Branch: `main` (veya `master`)
   - Folder: `/ (root)`
4. **"Save"** butonuna tıklayın

### 3. Erişim

Birkaç dakika içinde uygulamanız şu adreste yayında olacak:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

---

## Kullanım

1. Uygulamayı açın
2. Şifreyi girin: `nmkbn`
3. Renk seçin (Mavi veya Pembe)
4. Sohbet etmeye başlayın!

### Mesaj Geçmişi Davranışı

- **Önemli:** Mesajlar kalıcı değildir
- Sayfa kapatıldığında/tarayıcı kapatıldığında/PWA'dan çıkıldığında tüm mesajlar silinir
- Her yeni oturum temiz başlar
- Mesajlar sadece her iki kullanıcı da uygulama açıkken görülebilir

---

## PWA Olarak Yükleme

### Android (Chrome)

1. Uygulamayı Chrome'da açın
2. Menü (⋮) → **"Ana ekrana ekle"**
3. İsmi onaylayın ve **"Ekle"** deyin
4. Ana ekranınızda uygulama ikonu belirecek

### iOS (Safari)

1. Uygulamayı Safari'de açın
2. Paylaş butonuna (📤) tıklayın
3. **"Ana Ekrana Ekle"** seçeneğini seçin
4. İsmi onaylayın ve **"Ekle"** deyin

---

## Güvenlik Uyarısı

⚠️ **ÖNEMLİ GÜVENLİK BİLGİSİ:**

Bu uygulamada kullanılan şifre koruması **istemci tarafında (client-side)** yapılmaktadır. Bu nedenle:

- ❌ Yüksek güvenlik sağlamaz
- ❌ Kaynak kodlarını inceleyen biri şifreyi görebilir
- ❌ Ağ trafiğini izleyen biri mesajları görebilir (HTTPS kullanılsa bile Firebase kuralları düzgün ayarlanmalı)

**Kullanım Önerisi:**
- Sadece güvenilen kişilerle kullanın
- Hassas bilgiler paylaşmayın
- Şirket içi kullanım için ağ güvenliği önlemlerini alın

Daha yüksek güvenlik için:
- Firebase Authentication kullanılabilir
- Backend tabanlı şifre doğrulama eklenebilir
- End-to-end şifreleme uygulanabilir

---

## Dosya Yapısı

```
/
├── index.html          # Ana HTML dosyası
├── manifest.json       # PWA manifest dosyası
├── service-worker.js   # Service Worker (offline destek)
├── offline.html        # Çevrimdışı sayfası
├── firebase.js         # Firebase yapılandırması
├── auth.js             # Kimlik doğrulama modülü
├── chat.js             # Sohbet işlevleri modülü
├── app.js              # Ana uygulama mantığı
├── styles.css          # Stil dosyası
├── icons/              # PWA ikonları
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
└── README.md           # Bu dosya
```

---

## Güncelleme Yapma

Kodda değişiklik yaptıktan sonra:

```bash
git add .
git commit -m "Güncelleme açıklaması"
git push origin main
```

GitHub Pages otomatik olarak güncellenecektir (1-2 dakika).

### Service Worker Cache Temizleme

Kullanıcıların yeni versiyonu görmesi için:

1. Service Worker versiyon numarasını değiştirin (`service-worker.js`):
   ```javascript
   const CACHE_NAME = 'sohbet-cache-v2'; // v1 → v2
   ```
2. Değişiklikleri push edin

Veya kullanıcılar:
- Tarayıcı cache'ini temizleyebilir
- Uygulamayı ana ekrandan kaldırıp tekrar ekleyebilir

---

## Teknik Detaylar

### Kullanılan Teknolojiler

- **HTML5, CSS3, Vanilla JavaScript** - Framework olmadan saf kod
- **Firebase Realtime Database** - Gerçek zamanlı mesajlaşma
- **Service Worker** - Offline destek ve PWA
- **Web App Manifest** - Ana ekrana eklenebilirlik

### Performans

- Gereksiz kütüphane yok
- Minimal dosya boyutu
- Hızlı yükleme süresi
- Mobil optimize edilmiş

### Tarayıcı Desteği

- ✅ Chrome/Edge (tam destek)
- ✅ Safari (iOS 11.4+)
- ✅ Firefox
- ✅ Opera

---

## Sorun Giderme

### Uygulama Açılmıyor

1. Firebase config bilgilerinizi kontrol edin
2. Browser console'da hata var mı bakın (F12)
3. Firebase Realtime Database aktif mi kontrol edin

### Mesajlar Gönderilmiyor

1. Firebase Security Rules doğru mu kontrol edin
2. Internet bağlantınızı kontrol edin
3. Firebase Console'da usage limitlerini kontrol edin

### PWA Çalışmıyor

1. HTTPS kullanıldığından emin olun (GitHub Pages otomatik sağlar)
2. `manifest.json` ve `service-worker.js` doğru yolda mı kontrol edin
3. Tarayıcı cache'ini temizleyin

---

## Lisans

Bu proje eğitim amaçlı hazırlanmıştır. Kişisel ve ticari kullanım için özgürce kullanılabilir.

---

## Katkıda Bulunma

Sorularınız veya önerileriniz için issue açabilirsiniz.NaMuS