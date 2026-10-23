# MEHMET KUM — Kişisel Portföy Sitesi Master Planı

> **Domain:** mehmetkum.com  
> **Platform:** Abacus.AI (Next.js hosting)  
> **Dil:** Türkçe & İngilizce (i18n)  
> **Tarih:** Ekim 2026  

---

## 1. Proje Özeti

Bu belge, Mehmet Kum'un kişisel portföy web sitesinin kapsamlı geliştirme planını içerir. Site; bilgisayar mühendisliği, kamu yönetimi ve itfaiyecilik deneyimlerini birleştiren, görsel olarak çarpıcı, immersive bir dijital deneyim sunmayı hedefler.

### Temel Hedefler

| # | Hedef | Açıklama |
|---|-------|----------|
| 1 | **Etkileyici İlk İzlenim** | Lusion.co kalitesinde, sinematik bir landing deneyimi |
| 2 | **Profesyonel Vitrin** | Özgeçmiş, projeler ve makalelerin şık sunumu |
| 3 | **İtfaiye Kimliği** | Ateş, duman, kıvılcım motifleriyle benzersiz estetik |
| 4 | **Çift Dil** | Türkçe ve İngilizce tam destek |
| 5 | **Performans** | Lighthouse 95+ puan hedefi |
| 6 | **Düzenlenebilirlik** | Özgeçmiş ve içerik alanları admin panelinden güncellenebilir |

### Kişi Profili

- **Ad:** Mehmet Kum
- **Eğitim:** Hacettepe Üniversitesi — Bilgisayar Mühendisliği (1999–2005)
- **Kariyer:**
  - 2008–2017: Ankara Büyükşehir Belediyesi İtfaiye Daire Başkanlığı (itfaiyecilik + idari görevler)
  - Aralık 2018 – Nisan 2025: ASKİ Genel Müdürlüğü — Şube Müdürü
  - Ocak 2019 – Ekim 2025: ASKİ Genel Müdürlüğü — Daire Başkanı
  - Ekim 2025 – devam: ASKİ Genel Müdürlüğü — Kıdemli Uzman
- **Yazılım Projeleri:** İPEK Baca CRM (ipekbaca.com), SimaLogistic SaaS (simalogistic.com)

---

## 2. Tasarım Felsefesi & İlham

### 2.1 Referans: Lusion.co

Lusion.co'nun DOM analizinden elde edilen ölçümler tasarımın temelini oluşturur:

| Özellik | Değer |
|---------|-------|
| Baskın arka plan | `#000000` (%61 alan) |
| İkincil arka plan | `#ffffff` (%18), `#2b2e3a` (%12), `#e4e6ef` (%9) |
| Metin renkleri | `#000000`, `#ffffff` |
| Aksan/buton renkleri | `#2b2e3a`, `#e4e6ef`, `#ffffff` |
| Body font | Aeonik |
| Heading font | Aeonik 400 36px |
| Buton border-radius | 87.5px |

### 2.2 Tasarım İlkeleri

1. **Dark-first atmosfer:** Siyah (`#000000`) baskın arka plan, derinlik ve sinematik his
2. **İtfaiye motifi:** Ateş kırmızısı (`#FF4500`) aksanlar, duman partikülleri, kıvılcım mikro-animasyonları — Lusion'un koyu paletine organik şekilde entegre
3. **Smooth scroll:** Tüm sayfada kesintisiz, cinematik kaydırma deneyimi
4. **3D varlık:** Hero bölümünde itfaiye temalı 3D obje veya ateş/duman particle sistemi
5. **Tipografi hakimiyeti:** Aeonik fontu, büyük ve cesur başlıklar, minimal gövde metni
6. **Micro-interaction:** Her etkileşimde hissedilen, incelikli animasyonlar
7. **Immersive geçişler:** Sayfa sonu ve bölüm arası sinematik geçiş efektleri

### 2.3 Renk Sistemi

```
/* Lusion.co Referans Renkleri (DOM Ölçüm) */
--bg-primary:        #000000    /* Ana arka plan — %61 */
--bg-secondary:      #2b2e3a    /* İkincil yüzeyler — %12 */
--bg-light:          #e4e6ef    /* Açık yüzeyler — %9 */
--bg-white:          #ffffff    /* Beyaz bölümler — %18 */
--text-primary:      #ffffff    /* Ana metin (koyu bg üzerinde) */
--text-dark:         #000000    /* Koyu metin (açık bg üzerinde) */

/* İtfaiye Tema Aksanları (Özel) */
--accent-fire:       #FF4500    /* Ateş kırmızısı — CTA, vurgu */
--accent-ember:      #FF6B35    /* Kor — hover durumları */
--accent-tech:       #1E90FF    /* Elektrik mavisi — teknoloji etiketleri */
--text-muted:        #888888    /* Soluk metin */

/* Gradyanlar */
--gradient-fire:     linear-gradient(135deg, #FF4500, #FF6B35)
--gradient-tech:     linear-gradient(135deg, #1E90FF, #00BFFF)
--gradient-dark:     linear-gradient(180deg, #000000, #2b2e3a)
```

### 2.4 Tipografi

| Kullanım | Font | Ağırlık | Boyut | Satır Yüksekliği |
|----------|------|---------|-------|------------------|
| Hero başlık | Aeonik | 700 | 72–96px (clamp) | 1.1 |
| Bölüm başlık | Aeonik | 400 | 36px | 1.2 |
| Alt başlık | Aeonik | 500 | 24px | 1.3 |
| Gövde metni | Aeonik | 400 | 16–18px | 1.6 |
| Etiket/tag | Aeonik | 500 | 12–14px | 1.4 |
| Büyük tipografi (footer) | Aeonik | 900 | 120–200px (clamp) | 1.0 |

> **Font kaynağı:** Aeonik ticari bir font. Alternatif olarak Google Fonts'tan "Inter" veya "Space Grotesk" kullanılabilir. Aeonik erişilebilir değilse Inter tercih edilecek.

### 2.5 Buton & Bileşen Stili

- **Butonlar:** `border-radius: 87.5px` (tam yuvarlak kapsül — Lusion referansı)
- **Kartlar:** `border-radius: 12–16px`, ince gölge, hover'da gölge derinleşmesi
- **Input alanları:** `border-radius: 8px`, odakta ateş kırmızısı (`#FF4500`) border glow
- **Geçişler:** Tüm hover/focus durumlarında `transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`

---

## 3. Sayfa Mimarisi

### 3.1 Site Haritası

```
mehmetkum.com
├── / (Hero + Hakkımda + Öne Çıkanlar)
├── /ozgecmis (Özgeçmiş / CV)
├── /makaleler (Blog listesi)
│   └── /makaleler/[slug] (Makale detay)
├── /galeri (Fotoğraf galerisi)
├── /projeler (Yazılım projeleri)
├── /iletisim (İletişim formu)
├── /admin (Yönetim paneli — auth gerekli)
│   ├── /admin/ozgecmis (Özgeçmiş düzenleme)
│   ├── /admin/makaleler (Makale yönetimi)
│   ├── /admin/galeri (Galeri yönetimi)
│   └── /admin/projeler (Proje yönetimi)
└── /api/...
```

### 3.2 HERO (Ana Sayfa Landing) — `/`

**Amaç:** Ziyaretçiyi ilk saniyede yakalamak, sinematik bir dijital deneyim sunmak.

#### Bölüm A: Full-Screen Intro
- **Arka plan:** `#000000` tam ekran canvas
- **3D Sahne:** İtfaiye temalı floating obje (kask, balta veya soyut ateş küresi) — Three.js ile render
  - Alternatif: Ateş/kıvılcım particle sistemi (tsParticles)
  - Mouse takip eden paralaks efekti
- **Metin:** "MEHMET KUM" — harf harf reveal animasyonu (GSAP SplitText benzeri)
  - Alt satır: "Bilgisayar Mühendisi · Kamu Yöneticisi" — fade-in
- **Scroll göstergesi:** Aşağı ok, floating bounce animasyonu
- **Arka plan partikülleri:** Yavaş hareket eden küçük ateş kıvılcımları

#### Bölüm B: Hakkımda Önizleme (scroll ile)
- Parallax bölünmüş panel:
  - **Sol:** Profil fotoğrafı (yuvarlak kenarlı, ince ateş renkli border glow)
  - **Sağ:** 3-4 cümlelik kişisel tanıtım, tutkular
- Scroll ile soldan/sağdan kayarak giren elemanlar

#### Bölüm C: Öne Çıkan İçerikler
- Son 3 makale kartı (yatay kaydırmalı)
- Son 2 proje kartı
- Her kart hover'da hafif yükselme + gölge derinleşmesi

#### Bölüm D: Footer (Immersive Kapanış)
- Lusion.co tarzı büyük tipografi reveal
- Scroll ile yavaşça ortaya çıkan "MEHMET KUM" metni (font-size: clamp(80px, 15vw, 200px))
- Altında: sosyal linkler, copyright, dil seçici
- Arka planda loş ateş gradient

### 3.3 ÖZGEÇMİŞ — `/ozgecmis`

**Amaç:** Profesyonel kariyer yolculuğunu interaktif ve görsel bir timeline ile sunmak.

#### İçerik Yapısı

```
Timeline (dikey, sol/sağ alternatif)
├── 2025–devam: ASKİ Kıdemli Uzman
├── 2019–2025: ASKİ Daire Başkanı
├── 2018–2025: ASKİ Şube Müdürü
├── 2008–2017: İtfaiye Daire Başkanlığı (çeşitli birimler)
│   └── [itfaiye kartlarında özel ateş/kıvılcım mikro-animasyonu]
└── 1999–2005: Hacettepe Üniversitesi, Bilgisayar Mühendisliği
```

#### Etkileşim
- Her timeline öğesi scroll ile fade-in + slide (soldan/sağdan alternatif)
- Hover ile detay paneli açılır (görev tanımı, başarılar)
- İtfaiye dönemine ait kartların kenarlığında kıvılcım partikülleri
- Skill tag'leri: ilgili yetkinlikler her pozisyonda gösterilir

#### Ek Bölümler
- **Yetkinlikler:** Animasyonlu tag cloud veya kategorize edilmiş skill grid
  - Yazılım: TypeScript, React, Next.js, PostgreSQL, Prisma, Tailwind CSS
  - Yönetim: Proje Yönetimi, Stratejik Planlama, Ekip Liderliği
  - İtfaiye: Acil Durum Yönetimi, Operasyon Koordinasyonu
- **Eğitim:** Minimalist kart
- **CV İndir:** PDF indirme butonu (ateş kırmızısı CTA, kapsül şekli)

#### Admin Düzenleme
- `/admin/ozgecmis` sayfasından tüm timeline öğeleri CRUD ile yönetilebilir
- Her öğe: başlık, kurum, tarih aralığı, açıklama, etiketler, sıra numarası

### 3.4 MAKALELER / BLOG — `/makaleler`

**Amaç:** Teknik ve kişisel yazıları profesyonel bir blog formatında sunmak.

#### Liste Sayfası
- **Filtre bar:** Kategori seçimi (buton grubu, aktif durumda ateş kırmızısı)
  - Tümü | Teknoloji & Yazılım | Kamu Yönetimi | İtfaiyecilik & Acil Durum | Kişisel Gelişim
- **Kart grid:** 2 sütun (masaüstü), 1 sütun (mobil)
  - Her kart: Kapak görseli, başlık, kategori badge, tarih, özet (ilk 2 satır)
  - Hover: Hafif yükselme + gölge artışı
- **Arama:** Başlık ve içerikte arama
- **Sayfalama:** Infinite scroll veya klasik pagination

#### Detay Sayfası — `/makaleler/[slug]`
- Tam genişlikte kapak görseli (parallax)
- Başlık, yazar, tarih, okuma süresi, kategori
- MDX ile zengin içerik (kod blokları, görseller, alıntılar)
- Sosyal paylaşım butonları (Web Share API)
- İlgili makaleler bölümü (aynı kategori)

#### Çift Dil
- Her makale `locale` alanına sahip (TR veya EN)
- Varsayılan dil ayarına göre ilgili makaleler gösterilir
- Dil seçimi değiştiğinde makale listesi güncellenir

#### Admin Yönetimi
- Makale oluşturma/düzenleme/silme
- Markdown editör (basit textarea + önizleme)
- Kapak görseli yükleme (S3)
- Kategori, etiket, dil, yayın durumu (taslak/yayında)

### 3.5 GALERİ — `/galeri`

**Amaç:** Fotoğraf ve proje görsellerini etkileyici bir düzende sergilemek.

#### Görünüm
- **Masonry grid:** Farklı boyutlarda kartlar, sonsuz akış hissi
- **Kategori filtresi:** İtfaiye | Yazılım Projeleri | Kişisel
  - Filtre geçişinde Framer Motion layout animasyonu (kartların yeniden dizilmesi)
- **Lightbox:** Tıklanan görsel tam ekran açılır
  - Karanlık overlay
  - Sağ/sol gezinme
  - Pinch-to-zoom (mobil)
  - Başlık + açıklama overlay

#### Admin Yönetimi
- Görsel yükleme (S3 — çoklu dosya)
- Başlık, açıklama, kategori, sıra
- Sürükle-bırak sıralama

### 3.6 PROJELER — `/projeler`

**Amaç:** Yazılım projelerini teknik detaylarıyla sergilemek.

#### İçerik

| Proje | Açıklama | Link | Tech Stack |
|-------|----------|------|------------|
| İPEK Baca CRM | Baca temizlik firması CRM sistemi | ipekbaca.com | Next.js, PostgreSQL, Prisma |
| SimaLogistic SaaS | Lojistik yönetim platformu | simalogistic.com | Next.js, TypeScript, Tailwind |
| Diğer projeler | Sonradan eklenecek | — | — |

#### Görünüm
- Her proje için tam genişlikte showcase kartı
- Kart içeriği: Proje ismi, açıklama, ekran görüntüsü, tech stack tag'leri, canlı link butonu
- Hover'da kart hafif perspektif dönüşü (3D tilt efekti — `transform: perspective(1000px) rotateY(...)` )
- Scroll ile sırayla giren kartlar (Framer Motion stagger)

#### Admin Yönetimi
- Proje ekleme/düzenleme/silme
- Ekran görüntüsü yükleme (S3)
- Tech stack etiketleri (çoklu seçim)
- Canlı link, GitHub linki

### 3.7 İLETİŞİM — `/iletisim`

**Amaç:** Ziyaretçilerden mesaj almak için minimal ve şık bir form.

#### Görünüm
- Tam ekran, koyu arka plan
- Sol taraf: Büyük başlık + kısa açıklama + sosyal medya ikonları (LinkedIn)
- Sağ taraf: İletişim formu
  - Alanlar: Ad Soyad, E-posta, Konu, Mesaj
  - Animasyonlu input: Odakta label yukarı kayar, alt çizgi ateş kırmızısına döner
  - Gönder butonu: Kapsül şekli, ateş gradienti, hover'da parlama efekti
- Başarılı gönderimde: Onay animasyonu (check ikonu + mesaj)

#### Teknik
- Form verisi veritabanına kaydedilir (contact_messages tablosu)
- Admin panelinden mesajlar görüntülenebilir
- Opsiyonel: Admin'e e-posta bildirimi (Abacus notification API)

### 3.8 ADMİN PANELİ — `/admin`

**Amaç:** Site içeriğini tarayıcıdan yönetmek.

#### Erişim
- NextAuth.js ile e-posta/şifre kimlik doğrulama
- Sadece admin rolündeki kullanıcılar erişebilir
- Giriş yapılmamışsa login sayfasına yönlendirme

#### Bölümler
- **Dashboard:** İstatistikler (toplam makale, proje, mesaj sayısı)
- **Özgeçmiş Yönetimi:** Timeline öğelerini CRUD
- **Makale Yönetimi:** Makale CRUD + kapak görseli yükleme
- **Galeri Yönetimi:** Görsel yükleme + CRUD
- **Proje Yönetimi:** Proje CRUD
- **Mesajlar:** İletişim formundan gelen mesajlar (okundu/okunmadı durumu)

---

## 4. Teknik Stack

### 4.1 Çekirdek Framework

| Teknoloji | Versiyon | Kullanım Amacı |
|-----------|---------|----------------|
| Next.js | 16 (App Router) | SSR/SSG, routing, API routes |
| React | 19 | UI bileşenleri |
| TypeScript | 5.6+ | Tip güvenliği |

### 4.2 Animasyon & 3D

| Kütüphane | Kullanım |
|-----------|----------|
| **Framer Motion** | Sayfa geçişleri, layout animasyonları, scroll-triggered reveal, micro-interactions. Projede zaten mevcut. |
| **Three.js / @react-three/fiber** | Hero bölümünde 3D sahne (itfaiye kaskı, ateş küresi). `@react-three/drei` yardımcı araçlarıyla. |
| **GSAP + ScrollTrigger** | Gelişmiş scroll tabanlı animasyonlar — metin reveal, paralaks, pinning. |
| **tsParticles** | Ateş kıvılcımı, duman partikülleri (hero & itfaiye temalı bölümlerde). |

> **Not:** Locomotive Scroll, Next.js App Router ile uyum sorunu yaşayabilir. Alternatif olarak Lenis (smooth scroll) + GSAP ScrollTrigger kombinasyonu tercih edilecek.

### 4.3 Stil & UI

| Kütüphane | Kullanım |
|-----------|----------|
| **Tailwind CSS** | v3 (projede mevcut). Utility-first stil sistemi |
| **Shadcn/UI** | Form bileşenleri, dialog, toast, select — admin paneli için |
| **clsx + tailwind-merge** | Dinamik sınıf birleştirme |
| **CSS Custom Properties** | Tema değişkenleri (renk, tipografi) |
| **Lucide React** | İkon seti |

### 4.4 Veritabanı & ORM

| Teknoloji | Kullanım |
|-----------|----------|
| **PostgreSQL** | İlişkisel veritabanı (Abacus.AI hosted) |
| **Prisma** | ORM — tip güvenli sorgular, migration |

### 4.5 Kimlik Doğrulama

| Teknoloji | Kullanım |
|-----------|----------|
| **NextAuth.js v5** | E-posta/şifre auth, JWT strategy |
| **@auth/prisma-adapter** | Prisma ile session yönetimi |
| **bcryptjs** | Şifre hashleme |

### 4.6 Dosya Yükleme

| Teknoloji | Kullanım |
|-----------|----------|
| **AWS SDK v3** | S3 presigned URL ile dosya yükleme |
| **Abacus Cloud Storage** | Galeri görselleri, makale kapak resimleri, proje ekran görüntüleri |

### 4.7 İçerik & i18n

| Teknoloji | Kullanım |
|-----------|----------|
| **next-intl** | Çoklu dil desteği (TR/EN) — routing, çeviri dosyaları |
| **MDX / next-mdx-remote** | Makale içerikleri — zengin markdown |
| **gray-matter** | Frontmatter ayrıştırma |

### 4.8 SEO & Performans

| Teknoloji | Kullanım |
|-----------|----------|
| **Next.js Metadata API** | Sayfa bazlı meta etiketleri |
| **JSON-LD** | Yapısal veri (Person, Article, WebSite) |
| **next/image** | Görsel optimizasyonu |
| **Dynamic OG images** | Paylaşım görselleri |

---

## 5. Animasyon & Etkileşim Planı

### 5.1 Genel Prensipler

- Tüm animasyonlar **client-side only** (`"use client"` bileşenlerde)
- Hydration güvenliği: Animasyonlar `useEffect` veya Framer Motion'ın deklaratif API'si ile
- Performans: `will-change`, `transform` ve `opacity` tabanlı animasyonlar (GPU hızlandırma)
- Erişilebilirlik: `prefers-reduced-motion` medya sorgusuna saygı

### 5.2 Sayfa Bazlı Animasyon Haritası

#### Hero `/`
| Eleman | Animasyon | Kütüphane | Tetikleyici |
|--------|-----------|-----------|-------------|
| 3D Sahne | Floating rotation + mouse parallax | Three.js | Sürekli + mousemove |
| İsim metni | Harf harf reveal (clip-path) | GSAP | Sayfa yüklenme |
| Unvan | Fade-in + translateY | Framer Motion | Gecikme ile yüklenme |
| Scroll oku | Bounce loop | CSS animation | Sürekli |
| Partiküller | Ateş kıvılcımları, yavaş yüzen | tsParticles | Sürekli |
| Hakkımda panel | Sol/sağdan slide-in | Framer Motion | Scroll (viewport giriş) |
| İçerik kartları | Stagger fade-in | Framer Motion | Scroll |
| Footer tipografi | Scale + opacity reveal | GSAP ScrollTrigger | Scroll (pin) |

#### Özgeçmiş `/ozgecmis`
| Eleman | Animasyon | Kütüphane | Tetikleyici |
|--------|-----------|-----------|-------------|
| Timeline çizgisi | Dikey çizim (draw) | GSAP/CSS | Scroll |
| Timeline kartları | Sol/sağ alternatif slide-in | Framer Motion | Scroll (viewport) |
| İtfaiye kartları | Kenar kıvılcım partikülleri | tsParticles/CSS | Hover |
| Skill tag'leri | Stagger pop-in | Framer Motion | Scroll |
| Sayısal değerler | Count-up animasyonu | Custom hook | Scroll (viewport) |

#### Makaleler `/makaleler`
| Eleman | Animasyon | Kütüphane | Tetikleyici |
|--------|-----------|-----------|-------------|
| Filtre butonları | Active state geçişi | Framer Motion layoutId | Tıklama |
| Makale kartları | Layout animasyonu (grid reflow) | Framer Motion | Filtre değişimi |
| Kart hover | Scale + shadow deepen | Framer Motion whileHover | Hover |

#### Galeri `/galeri`
| Eleman | Animasyon | Kütüphane | Tetikleyici |
|--------|-----------|-----------|-------------|
| Masonry grid | Stagger fade-in | Framer Motion | Sayfa yüklenme |
| Lightbox | Scale-up + backdrop fade | Framer Motion AnimatePresence | Tıklama |
| Filtre geçişi | Layout reflow | Framer Motion layout | Filtre değişimi |

#### İletişim `/iletisim`
| Eleman | Animasyon | Kütüphane | Tetikleyici |
|--------|-----------|-----------|-------------|
| Form inputları | Label float + underline glow | CSS/Framer Motion | Focus |
| Gönder butonu | Gradient shimmer + press scale | CSS + Framer Motion | Hover + tıklama |
| Başarı mesajı | Check ikonu draw + fade-in | Framer Motion | Gönderim başarısı |

### 5.3 Özel Efektler

#### Custom Cursor
- Varsayılan cursor gizlenir
- Özel dairesel cursor (küçük beyaz nokta + büyük takip eden halka)
- Link/buton hover'da büyüme efekti
- Galeri görseli hover'da "Görüntüle" metni
- Sadece masaüstünde aktif (touch cihazlarda devre dışı)

#### Smooth Scroll
- **Lenis** kütüphanesi ile tüm sayfada smooth scrolling
- GSAP ScrollTrigger ile entegre
- Mobilde native scroll korunur (performans)

#### Sayfa Geçişleri
- Framer Motion ile route değişimlerinde fade + slide animasyonu
- AnimatePresence ile çıkış animasyonları

---

## 6. İçerik Planı

### 6.1 Özgeçmiş Verileri

Veritabanında `resume_entries` tablosu:

```prisma
model ResumeEntry {
  id          String   @id @default(cuid())
  titleTr     String   // Türkçe başlık
  titleEn     String   // İngilizce başlık
  orgTr       String   // Kurum adı TR
  orgEn       String   // Kurum adı EN
  descTr      String?  // Açıklama TR
  descEn      String?  // Açıklama EN
  startDate   DateTime
  endDate     DateTime?
  isCurrent   Boolean  @default(false)
  category    String   // WORK | EDUCATION
  tags        String[] // Yetkinlik etiketleri
  sortOrder   Int      @default(0)
  isFireTheme Boolean  @default(false) // İtfaiye temalı kart
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 6.2 Makale Verileri

```prisma
model Article {
  id          String   @id @default(cuid())
  slug        String   @unique
  titleTr     String
  titleEn     String?
  summaryTr   String?
  summaryEn   String?
  contentTr   String   // MDX içerik TR
  contentEn   String?  // MDX içerik EN
  locale      String   @default("tr") // Birincil dil
  category    String   // TECH | PUBLIC_ADMIN | FIRE | PERSONAL
  tags        String[]
  coverImage  String?  // S3 cloud_storage_path
  isPublic    Boolean  @default(false) // cover image public flag
  published   Boolean  @default(false)
  readMinutes Int      @default(5)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 6.3 Galeri Verileri

```prisma
model GalleryImage {
  id              String   @id @default(cuid())
  titleTr         String?
  titleEn         String?
  descriptionTr   String?
  descriptionEn   String?
  category        String   // FIRE | SOFTWARE | PERSONAL
  imagePath       String   // S3 cloud_storage_path
  isPublic        Boolean  @default(true)
  sortOrder       Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### 6.4 Proje Verileri

```prisma
model Project {
  id            String   @id @default(cuid())
  titleTr       String
  titleEn       String?
  descriptionTr String
  descriptionEn String?
  liveUrl       String?
  githubUrl     String?
  screenshotPath String?  // S3 cloud_storage_path
  isPublic      Boolean  @default(true)
  techStack     String[] // ["Next.js", "PostgreSQL", "Prisma"]
  sortOrder     Int      @default(0)
  featured      Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### 6.5 İletişim Mesajları

```prisma
model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

### 6.6 Seed Verileri (İlk Yükleme)

Özgeçmiş timeline öğeleri, 2 örnek proje (İPEK Baca + SimaLogistic) ve bir admin hesabı seed script ile yüklenecek.

---

## 7. i18n Planı (TR/EN)

### 7.1 Strateji

- **Kütüphane:** `next-intl`
- **Routing:** URL prefix tabanlı — `/tr/...` ve `/en/...`
- **Varsayılan dil:** Türkçe (`tr`)
- **Dil algılama:** Tarayıcı dil tercihine göre otomatik yönlendirme + manuel seçim

### 7.2 Çeviri Dosya Yapısı

```
messages/
├── tr.json
└── en.json
```

### 7.3 Çeviri Kapsamı

| Alan | TR | EN |
|------|----|----|  
| Navigasyon | ✅ | ✅ |
| Hero metin | ✅ | ✅ |
| Sayfa başlıkları | ✅ | ✅ |
| Buton etiketleri | ✅ | ✅ |
| Form placeholder | ✅ | ✅ |
| Hata mesajları | ✅ | ✅ |
| Footer | ✅ | ✅ |
| Meta/SEO | ✅ | ✅ |

### 7.4 Dinamik İçerik Dil Desteği

- Özgeçmiş, makale, galeri, proje modellerinin tümünde `titleTr`/`titleEn`, `descTr`/`descEn` ikili alan yapısı
- Aktif dile göre ilgili alan render edilir
- İngilizce çeviri yoksa Türkçe fallback gösterilir

### 7.5 Dil Seçici Bileşeni

- Header'da ve footer'da TR/EN toggle
- Globe ikonu (Lucide) ile minimal tasarım
- Seçim anında sayfa yeniden yüklenmeden dil değişimi (client-side)

---

## 8. SEO & Performans Planı

### 8.1 SEO

#### Meta Etiketleri
- Her sayfa için özel `title` ve `description`
- Open Graph etiketleri (og:title, og:description, og:image)
- Twitter Card etiketleri
- Canonical URL
- Hreflang (TR/EN alternatifleri)

#### Yapısal Veri (JSON-LD)
- **Ana sayfa:** `Person` + `WebSite`
- **Makaleler:** `Article` + `BreadcrumbList`
- **Özgeçmiş:** `Person` + `Organization`

#### Teknik SEO
- `robots.ts` — dinamik robots.txt
- `sitemap.ts` — dinamik sitemap.xml (tüm sayfalar + makaleler)
- Favicon & OG image (build zamanı oluşturma)

### 8.2 Performans Hedefleri

| Metrik | Hedef |
|--------|-------|
| Lighthouse Performance | 95+ |
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTI (Time to Interactive) | < 3.5s |

### 8.3 Performans Stratejileri

1. **3D/Animasyon lazy loading:** Three.js canvas'ı `next/dynamic` ile `ssr: false` olarak yükleme
2. **Görsel optimizasyonu:** `next/image` ile otomatik format (WebP/AVIF) ve boyut optimizasyonu
3. **Code splitting:** Her sayfa otomatik code split (App Router)
4. **Font optimizasyonu:** `next/font` ile Aeonik (veya fallback Inter) preload
5. **Animasyon performansı:** GPU-accelerated properties (`transform`, `opacity`) kullanımı
6. **Veritabanı:** İlgili sütunlarda index, eager/lazy loading dengesi
7. **Caching:** ISR (Incremental Static Regeneration) makale ve proje sayfalarında

---

## 9. Geliştirme Aşamaları

### Faz 1: Temel Altyapı (Gün 1–2)

- [ ] Proje scaffold (Next.js App Router)
- [ ] Tailwind CSS tema konfigürasyonu (renk paleti, tipografi)
- [ ] Veritabanı şeması (Prisma) — tüm modeller
- [ ] Kimlik doğrulama kurulumu (NextAuth.js)
- [ ] Cloud storage yapılandırması (S3)
- [ ] i18n altyapısı (next-intl, çeviri dosyaları)
- [ ] Layout bileşeni (header, footer, smooth scroll)
- [ ] Favicon & OG image oluşturma

### Faz 2: Ana Sayfalar (Gün 3–5)

- [ ] Hero bölümü (3D sahne, metin reveal, partiküller)
- [ ] Hakkımda bölümü (parallax panel)
- [ ] Özgeçmiş sayfası (interaktif timeline)
- [ ] İletişim sayfası (animasyonlu form)
- [ ] Footer (immersive kapanış)
- [ ] Navigasyon (sticky header, mobil menü)
- [ ] Custom cursor

### Faz 3: İçerik Sayfaları (Gün 6–7)

- [ ] Makale listesi + detay sayfaları (MDX)
- [ ] Galeri sayfası (masonry grid, lightbox)
- [ ] Projeler sayfası (showcase kartları)
- [ ] Seed script (özgeçmiş + projeler)

### Faz 4: Admin & Polish (Gün 8–9)

- [ ] Admin paneli (dashboard, CRUD sayfaları)
- [ ] Dosya yükleme entegrasyonu
- [ ] SEO optimizasyonu (meta, JSON-LD, sitemap)
- [ ] Performans optimizasyonu
- [ ] Responsive test (mobil, tablet, masaüstü)
- [ ] Erişilebilirlik kontrolü
- [ ] Cross-browser test
- [ ] Deploy & domain konfigürasyonu

---

## 10. Klasör Yapısı

```
mehmetkum_plan/nextjs_space/
├── app/
│   ├── [locale]/                    # i18n routing (tr, en)
│   │   ├── layout.tsx               # Locale-aware layout
│   │   ├── page.tsx                 # Hero + Hakkımda + Öne Çıkanlar
│   │   ├── ozgecmis/
│   │   │   └── page.tsx             # Özgeçmiş timeline
│   │   ├── makaleler/
│   │   │   ├── page.tsx             # Makale listesi
│   │   │   └── [slug]/
│   │   │       └── page.tsx         # Makale detay
│   │   ├── galeri/
│   │   │   └── page.tsx             # Galeri masonry
│   │   ├── projeler/
│   │   │   └── page.tsx             # Proje showcase
│   │   ├── iletisim/
│   │   │   └── page.tsx             # İletişim formu
│   │   └── admin/
│   │       ├── layout.tsx           # Admin korumalı layout
│   │       ├── page.tsx             # Dashboard
│   │       ├── ozgecmis/
│   │       │   └── page.tsx
│   │       ├── makaleler/
│   │       │   └── page.tsx
│   │       ├── galeri/
│   │       │   └── page.tsx
│   │       ├── projeler/
│   │       │   └── page.tsx
│   │       └── mesajlar/
│   │           └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/
│   │   │   │   └── route.ts
│   │   │   └── login/
│   │   │       └── route.ts
│   │   ├── signup/
│   │   │   └── route.ts
│   │   ├── resume/
│   │   │   └── route.ts
│   │   ├── articles/
│   │   │   └── route.ts
│   │   ├── gallery/
│   │   │   └── route.ts
│   │   ├── projects/
│   │   │   └── route.ts
│   │   ├── contact/
│   │   │   └── route.ts
│   │   └── upload/
│   │       ├── presigned/
│   │       │   └── route.ts
│   │       └── complete/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx                   # Root layout
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── hero/
│   │   ├── hero-scene.tsx           # 3D sahne (client)
│   │   ├── hero-text.tsx            # Animasyonlu metin
│   │   ├── particle-system.tsx      # Ateş partikülleri
│   │   └── scroll-indicator.tsx     # Scroll oku
│   ├── layout/
│   │   ├── header.tsx               # Sticky header
│   │   ├── footer.tsx               # Immersive footer
│   │   ├── nav-menu.tsx             # Navigasyon
│   │   ├── mobile-menu.tsx          # Mobil menü
│   │   ├── language-switcher.tsx    # TR/EN toggle
│   │   └── smooth-scroll.tsx        # Lenis wrapper
│   ├── about/
│   │   └── about-section.tsx        # Parallax bio
│   ├── resume/
│   │   ├── timeline.tsx             # Dikey timeline
│   │   ├── timeline-card.tsx        # Tek timeline kartı
│   │   ├── fire-sparkle.tsx         # İtfaiye kıvılcım efekti
│   │   └── skill-tags.tsx           # Yetkinlik etiketleri
│   ├── articles/
│   │   ├── article-card.tsx         # Makale kartı
│   │   ├── article-filter.tsx       # Kategori filtresi
│   │   └── mdx-renderer.tsx         # MDX render
│   ├── gallery/
│   │   ├── masonry-grid.tsx         # Masonry layout
│   │   └── lightbox.tsx             # Lightbox modal
│   ├── projects/
│   │   └── project-card.tsx         # Proje showcase kartı
│   ├── contact/
│   │   └── contact-form.tsx         # Animasyonlu form
│   ├── admin/
│   │   ├── admin-sidebar.tsx        # Admin navigasyon
│   │   ├── data-table.tsx           # Genel veri tablosu
│   │   ├── editor.tsx               # İçerik editörü
│   │   └── file-upload.tsx          # Dosya yükleme bileşeni
│   ├── shared/
│   │   ├── section-heading.tsx      # Bölüm başlığı
│   │   ├── animated-counter.tsx     # Sayı sayma animasyonu
│   │   ├── custom-cursor.tsx        # Özel cursor
│   │   └── page-transition.tsx      # Sayfa geçiş animasyonu
│   └── ui/                          # Shadcn/UI bileşenleri
│       ├── button.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       ├── toast.tsx
│       └── ...
├── lib/
│   ├── prisma.ts                    # Prisma singleton
│   ├── aws-config.ts                # S3 konfigürasyonu
│   ├── s3.ts                        # S3 işlemleri
│   ├── utils.ts                     # Yardımcı fonksiyonlar
│   └── animations.ts               # GSAP/Framer preset'leri
├── auth.ts                          # NextAuth konfigürasyonu
├── i18n.ts                          # next-intl konfigürasyonu
├── messages/
│   ├── tr.json                      # Türkçe çeviriler
│   └── en.json                      # İngilizce çeviriler
├── prisma/
│   └── schema.prisma                # Veritabanı şeması
├── scripts/
│   └── seed.ts                      # Seed script
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── fonts/                       # Özel fontlar (Aeonik)
│   └── models/                      # 3D modeller (glb/gltf)
└── types/
    └── index.ts                     # Ortak TypeScript tipleri
```

---

## Ekler

### Ek A: Veritabanı İndeks Planı

```prisma
// Article
@@index([slug])
@@index([category])
@@index([published])
@@index([locale])

// GalleryImage
@@index([category])
@@index([sortOrder])

// Project
@@index([featured])
@@index([sortOrder])

// ContactMessage
@@index([isRead])
@@index([createdAt])

// ResumeEntry
@@index([category])
@@index([sortOrder])
```

### Ek B: API Endpoint Özeti

| Method | Endpoint | Açıklama | Auth |
|--------|----------|----------|------|
| GET | `/api/resume` | Tüm özgeçmiş öğeleri | Hayır |
| POST | `/api/resume` | Özgeçmiş öğesi ekle | Admin |
| PUT | `/api/resume/[id]` | Özgeçmiş öğesi güncelle | Admin |
| DELETE | `/api/resume/[id]` | Özgeçmiş öğesi sil | Admin |
| GET | `/api/articles` | Makale listesi (filtreli) | Hayır |
| GET | `/api/articles/[slug]` | Makale detay | Hayır |
| POST | `/api/articles` | Makale oluştur | Admin |
| PUT | `/api/articles/[id]` | Makale güncelle | Admin |
| DELETE | `/api/articles/[id]` | Makale sil | Admin |
| GET | `/api/gallery` | Galeri görselleri | Hayır |
| POST | `/api/gallery` | Görsel ekle | Admin |
| DELETE | `/api/gallery/[id]` | Görsel sil | Admin |
| GET | `/api/projects` | Projeler | Hayır |
| POST | `/api/projects` | Proje ekle | Admin |
| PUT | `/api/projects/[id]` | Proje güncelle | Admin |
| DELETE | `/api/projects/[id]` | Proje sil | Admin |
| POST | `/api/contact` | İletişim mesajı gönder | Hayır |
| GET | `/api/contact` | Mesaj listesi | Admin |
| PUT | `/api/contact/[id]` | Mesaj durumu güncelle | Admin |
| POST | `/api/upload/presigned` | Presigned URL oluştur | Admin |
| POST | `/api/upload/complete` | Yükleme tamamla | Admin |
| POST | `/api/signup` | Kullanıcı kaydı | Hayır |
| POST | `/api/auth/login` | Giriş | Hayır |

### Ek C: Performans Bütçesi

| Kaynak Türü | Maks. Boyut |
|-------------|-------------|
| JavaScript (gzip) | 250 KB |
| CSS (gzip) | 30 KB |
| Hero 3D model | 500 KB |
| Font dosyaları | 100 KB |
| İlk yükleme toplamı | < 1 MB |

---

> **Bu plan dosyası, geliştirme aşamasında referans olarak kullanılacaktır.**  
> **Geliştirme bu plan onaylandıktan sonra başlayacaktır.**

---

## Ek D: Subdomain Demo Mimarisi

### D.1 Genel Yaklaşım

`mehmetkum.com` ana domaininin yanı sıra proje demolarının yayınlanacağı **4 adet subdomain** planlanmaktadır. Her subdomain bağımsız bir Next.js uygulaması olarak Abacus.AI platformunda ayrı ayrı deploy edilir; ancak ana sitedeki **Projeler** sayfasında bir showcase kartı olarak bağlantı verilir.

```
mehmetkum.com                    → Ana kişisel portföy sitesi
├── ipekbaca.mehmetkum.com       → İPEK Baca CRM demo (veya direkt ipekbaca.com)
├── simalogistic.mehmetkum.com   → SimaLogistic SaaS demo (veya simalogistic.com)
├── demo3.mehmetkum.com          → Gelecekteki proje 3
└── demo4.mehmetkum.com          → Gelecekteki proje 4
```

> **Not:** İPEK Baca ve SimaLogistic'in kendi domainleri (ipekbaca.com, simalogistic.com) zaten mevcut. Bu subdomain'ler, o projeleri yine ana site üzerinden keşfedilebilir kılmak için yönlendirme (redirect) olarak kullanılabilir.

---

### D.2 DNS & Domain Yapılandırması

| Subdomain | Tür | Hedef | Açıklama |
|-----------|-----|-------|----------|
| `mehmetkum.com` | A / CNAME | Abacus.AI | Ana site |
| `ipekbaca.mehmetkum.com` | CNAME | Abacus.AI veya ipekbaca.com | İPEK Baca yönlendirme/demo |
| `simalogistic.mehmetkum.com` | CNAME | Abacus.AI veya simalogistic.com | SimaLogistic yönlendirme/demo |
| `demo3.mehmetkum.com` | CNAME | Abacus.AI | Gelecekteki proje |
| `demo4.mehmetkum.com` | CNAME | Abacus.AI | Gelecekteki proje |

Abacus.AI platformu her uygulama için custom domain bağlamayı destekler. Her subdomain için ayrı bir uygulama oluşturulur ve domain bağlama işlemi yapılır.

---

### D.3 Her Demo Uygulaması İçin Geliştirme Yaklaşımı

```
Ana site: mehmetkum.com
  └── Projeler sayfasında her projeye ait:
        • Ekran görüntüleri / video önizleme
        • Tech stack bilgisi
        • "Canlı Demo →" butonu (subdomain'e yönlendirir)
        • "Kaynak Kod" (opsiyonel GitHub linki)
```

Her demo uygulaması bağımsız deploy edildiğinden:
- Kendi veritabanına sahip olabilir (Abacus.AI hosted PostgreSQL)
- Kendi environment variable'larını kullanır
- Ana sitenin güncellemelerinden etkilenmez

---

### D.4 Mevcut Projeler için Subdomain Planı

#### `ipekbaca.mehmetkum.com`
| Özellik | Detay |
|---------|-------|
| **Gerçek uygulama** | ipekbaca.com (zaten deploy edilmiş) |
| **Subdomain kullanımı** | ipekbaca.com'a yönlendirme (301 redirect) **VEYA** aynı uygulamanın Abacus.AI üzerindeki önizleme URL'si |
| **Ana sitede gösterim** | CRM demo kartı, ekran görüntüleri, özellik listesi |

#### `simalogistic.mehmetkum.com`
| Özellik | Detay |
|---------|-------|
| **Gerçek uygulama** | simalogistic.com (geliştirme aşamasında) |
| **Subdomain kullanımı** | Geliştirme tamamlandığında simalogistic.com'a yönlendirme **VEYA** Abacus.AI'da ayrı demo deploy |
| **Ana sitede gösterim** | SaaS demo kartı, roadmap, özellik listesi |

#### `demo3.mehmetkum.com` & `demo4.mehmetkum.com`
| Özellik | Detay |
|---------|-------|
| **Kullanım** | Gelecekteki projelere rezerve |
| **Yapılandırma** | Proje hazır olduğunda DNS kaydı eklenip Abacus.AI'da uygulama oluşturulur |
| **Ana sitede gösterim** | "Yakında" kartı olarak yer tutucu |

---

### D.5 Ana Sitede Projeler Sayfası Bileşeni

```tsx
// Proje kartı veri yapısı
interface Project {
  id: string
  title: string
  description: { tr: string; en: string }
  techStack: string[]
  liveUrl: string          // subdomain veya kendi domain'i
  sourceUrl?: string       // opsiyonel GitHub
  screenshots: string[]
  status: 'live' | 'demo' | 'coming-soon'
  category: 'crm' | 'saas' | 'other'
  featured: boolean
}

// Örnek veri
const projects: Project[] = [
  {
    id: 'ipekbaca',
    title: 'İPEK Baca CRM',
    liveUrl: 'https://ipekbaca.mehmetkum.com',   // → ipekbaca.com'a yönlendirir
    status: 'live',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    // ...
  },
  {
    id: 'simalogistic',
    title: 'SimaLogistic SaaS',
    liveUrl: 'https://simalogistic.mehmetkum.com', // → simalogistic.com'a yönlendirir
    status: 'demo',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    // ...
  },
  {
    id: 'demo3',
    title: 'Yeni Proje',
    liveUrl: 'https://demo3.mehmetkum.com',
    status: 'coming-soon',
    techStack: [],
    // ...
  },
]
```

---

### D.6 Geliştirme & Deploy Akışı

```
1. mehmetkum.com satın alınır / Abacus.AI'da tanımlanır
2. Ana Next.js uygulaması deploy edilir → mehmetkum.com bağlanır
3. Her demo için:
   a. Abacus.AI'da yeni uygulama oluşturulur
   b. DNS panelinde CNAME kaydı eklenir: demo.mehmetkum.com → Abacus.AI URL
   c. Abacus.AI'da custom domain olarak subdomain tanımlanır
   d. SSL otomatik sağlanır (Abacus.AI Let's Encrypt)
4. Ana sitedeki proje kartı güncellenir (liveUrl alanı)
```

---

### D.7 Özet Tablo

| # | Subdomain | Uygulama | Durum | Platform |
|---|-----------|----------|-------|----------|
| 1 | `mehmetkum.com` | Kişisel portföy sitesi | Planlama | Abacus.AI |
| 2 | `ipekbaca.mehmetkum.com` | İPEK Baca CRM | Canlı (yönlendirme) | Abacus.AI |
| 3 | `simalogistic.mehmetkum.com` | SimaLogistic SaaS | Geliştirme | Abacus.AI |
| 4 | `demo3.mehmetkum.com` | TBD | Rezerve | Abacus.AI |
| 5 | `demo4.mehmetkum.com` | TBD | Rezerve | Abacus.AI |
