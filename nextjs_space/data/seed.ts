import type { LocalDatabase } from '@/lib/content-types';

export const seedData: LocalDatabase = {
  resume: [
    {
      id: 'resume-1',
      titleTr: 'Kıdemli Uzman',
      titleEn: 'Senior Specialist',
      orgTr: 'ASKİ Genel Müdürlüğü',
      orgEn: 'ASKI General Directorate',
      descTr:
        'ASKİ Genel Müdürlüğü bünyesinde su ve atıksu altyapısının operasyonel yönetimi, kurumsal dijitalleşme programları ve stratejik planlama çalışmaları bu görevin kapsamında. Saha verisini karar mekanizmasına taşıyan iç araçların tasarımı ve yönetimi de aynı kapsamda yürüyor.',
      descEn:
        'At ASKI, this role covers operational management of water and wastewater infrastructure, corporate digitalisation programmes and strategic planning — including the design and upkeep of internal tools that turn field data into decisions.',
      startDate: '2025-10-01',
      endDate: null,
      isCurrent: true,
      category: 'WORK',
      tags: ['Dijitalleşme', 'Stratejik Planlama', 'Veri Analizi', 'Süreç Tasarımı'],
      sortOrder: 1,
      isFireTheme: false,
    },
    {
      id: 'resume-2',
      titleTr: 'Bilgi İşlem Dairesi Başkanı',
      titleEn: 'Head of Information Technology Department',
      orgTr: 'ASKİ Genel Müdürlüğü',
      orgEn: 'ASKI General Directorate',
      descTr:
        'Bilgi İşlem Dairesi Başkanlığı döneminde kurumun bilişim stratejisi, altyapı yatırımları ve yazılım ekipleri bu görevin sorumluluk alanındaydı. Kurumsal dijital dönüşüm programlarının yol haritası ve kritik sistemlerin sürekliliği de aynı dönemde yürütüldü.',
      descEn:
        'As Head of IT, the institution’s technology strategy, infrastructure investments and software teams sat within the role. The roadmap for corporate digital transformation and the continuity of critical systems were carried out in the same period.',
      startDate: '2024-01-01',
      endDate: '2025-10-01',
      isCurrent: false,
      category: 'WORK',
      tags: ['BT Stratejisi', 'Ekip Yönetimi', 'Dijital Dönüşüm', 'Altyapı'],
      sortOrder: 2,
      isFireTheme: false,
    },
    {
      id: 'resume-3',
      titleTr: 'Yazılım Uygulama ve Geliştirme Şube Müdürü',
      titleEn: 'Software Application & Development Branch Manager',
      orgTr: 'ASKİ Genel Müdürlüğü',
      orgEn: 'ASKI General Directorate',
      descTr:
        'Yazılım uygulama ve geliştirme şubesi müdürlüğü döneminde iç ürün portföyünün tamamı bu göreve bağlıydı: ürün önceliklendirme, geliştirme süreçleri, entegrasyon projeleri ve saha ekipleriyle ortak çalışma düzeni.',
      descEn:
        'As branch manager for software applications and development, the entire internal product portfolio sat with the role: prioritisation, development processes, integration projects and the working rhythm with field teams.',
      startDate: '2022-01-01',
      endDate: '2024-01-01',
      isCurrent: false,
      category: 'WORK',
      tags: ['Yazılım Geliştirme', 'Ürün Yönetimi', 'Ekip Yönetimi', 'Süreç Tasarımı'],
      sortOrder: 3,
      isFireTheme: false,
    },
    {
      id: 'resume-7',
      titleTr: 'Yazılım Geliştirme Şefi',
      titleEn: 'Software Development Chief',
      orgTr: 'ASKİ Genel Müdürlüğü',
      orgEn: 'ASKI General Directorate',
      descTr:
        'Yazılım geliştirme şefliği döneminde geliştirici ekiplerin teknik liderliği, kod standartları, sürüm yönetimi ve kurumsal sistem entegrasyonları bu görevin ana başlıklarıydı.',
      descEn:
        'In the software development chief role, technical leadership of the developer teams, coding standards, release management and enterprise system integrations were the core themes.',
      startDate: '2020-01-01',
      endDate: '2022-01-01',
      isCurrent: false,
      category: 'WORK',
      tags: ['Yazılım Geliştirme', 'Teknik Liderlik', 'Kod İnceleme', 'Entegrasyon'],
      sortOrder: 4,
      isFireTheme: false,
    },
    {
      id: 'resume-8',
      titleTr: 'Proje Yöneticisi',
      titleEn: 'Project Manager',
      orgTr: 'ASKİ Genel Müdürlüğü',
      orgEn: 'ASKI General Directorate',
      descTr:
        'ASKİ\'deki proje yöneticiliği döneminde sayaç, tahsilat ve saha hizmetlerine yönelik yazılım projeleri uçtan uca yürütüldü: gereksinim analizi, tedarikçi koordinasyonu, takvim ve bütçe takibi.',
      descEn:
        'As project manager at ASKI, software projects for metering, collection and field services were run end to end: requirements analysis, vendor coordination, schedule and budget tracking.',
      startDate: '2018-01-01',
      endDate: '2020-01-01',
      isCurrent: false,
      category: 'WORK',
      tags: ['Proje Yönetimi', 'Paydaş Yönetimi', 'Planlama', 'Raporlama'],
      sortOrder: 5,
      isFireTheme: false,
    },
    {
      id: 'resume-4',
      titleTr: 'İtfaiye Daire Başkanlığı',
      titleEn: 'Head of Fire Department',
      orgTr: 'Ankara Büyükşehir Belediyesi',
      orgEn: 'Ankara Metropolitan Municipality',
      descTr:
        'Daire Başkanlığı döneminde yangın önleme, söndürme ve kurtarma hizmetlerinin yürütülmesi bu görevin sorumluluğundaydı. Ekip ve araç-kısa personel planlaması, tatbikat programları ve çağrı merkezi operasyonları da aynı dönemde yürütüldü.',
      descEn:
        'As head of department, prevention, suppression and rescue services sat within the role, alongside staffing and fleet planning, drill programmes and call-centre operations.',
      startDate: '2013-01-01',
      endDate: '2017-12-31',
      isCurrent: false,
      category: 'WORK',
      tags: ['Yangın Operasyonu', 'Komuta Yönetimi', 'Tatbikat Planlaması', 'Kaynak Yönetimi'],
      sortOrder: 6,
      isFireTheme: true,
    },
    {
      id: 'resume-5',
      titleTr: 'İtfaiye Müdahale Şube Müdürlüğü',
      titleEn: 'Fire Response Branch Manager',
      orgTr: 'Ankara Büyükşehir Belediyesi',
      orgEn: 'Ankara Metropolitan Municipality',
      descTr:
        'İtfaiye müdahale şube müdürlüğü yıllarında teşkilatın modernleşmesi gündemin ana başlığıydı: yeni istasyonların kurulması, teknik ekipman yönetiminin kurumsallaştırılması ve genç personel için yetkinlik programları.',
      descEn:
        'During the fire response branch manager years, modernisation was the main theme: opening new stations, institutionalising technical equipment management and building competence programmes for young staff.',
      startDate: '2008-03-01',
      endDate: '2012-12-31',
      isCurrent: false,
      category: 'WORK',
      tags: ['Acil Durum Yönetimi', 'Ekip Kurma', 'Eğitim', 'Teknik Altyapı'],
      sortOrder: 7,
      isFireTheme: true,
    },
    {
      id: 'resume-6',
      titleTr: 'Bilgisayar Mühendisliği',
      titleEn: 'Computer Engineering',
      orgTr: 'Hacettepe Üniversitesi',
      orgEn: 'Hacettepe University',
      descTr:
        'Bilgisayar mühendisliği lisans eğitimi Hacettepe Üniversitesi\'nde tamamlandı. Yazılım mühendisliği, sistem tasarımı ve yapay zekâ dersleri, sonraki yıllarda sahadaki problemleri yazılıma çevirme yaklaşımının temelini oluşturdu.',
      descEn:
        'Undergraduate studies in Computer Engineering were completed at Hacettepe University; software engineering, systems design and artificial intelligence coursework formed the basis for turning field problems into software.',
      startDate: '1999-09-01',
      endDate: '2005-06-30',
      isCurrent: false,
      category: 'EDUCATION',
      tags: ['Yazılım Mühendisliği', 'Sistem Tasarımı', 'Yapay Zekâ'],
      sortOrder: 8,
      isFireTheme: false,
    },
  ],

  articles: [
    {
      id: 'article-1',
      slug: 'itfaiyenin-dilini-kod-yazmak',
      titleTr: 'İtfaiyenin dilini konuşan yazılım nasıl kurulur?',
      titleEn: 'Building software that speaks the language of firefighters',
      summaryTr:
        'Sahada çalışan bir ekibin ihtiyaçlarını anlamadan yazılan her sistem, ilk tatbikatta çöpe gider. Sahadan ürüne giden yolun dört kuralı.',
      summaryEn:
        'Any system written without understanding the team operating it fails at the first drill. Four rules for turning field experience into product.',
      contentTr: `Bir yazılım projesinin ilk haftasında en sık duyulan cümle şudur: *"Biz sadece ekranın tam olarak neyi göstereceğini bilmek istiyoruz."* Bu cümle, projenin en tehlikeli başlangıcıdır. Çünkü ekran, bir kurumun dilinin en son çıktısıdır; en başlangıç noktası değil.

## Başlangıç noktası: olay, değil belge

İtfaiyede bir çağrı geldiğinde ilk yazılı yapan şey rapor değildir. İlk yazılı yapılması gereken şey karar zinciridir:

1. Çağrı alınır ve sınıflandırılır.
2. Hangi birim, hangi ekipman, kaç kişi gidecek?
3. Kim karar veriyor, kimin onayına gidiyor?
4. Olay bittiğinde hangi veri gerçekten işe yaradı?

Bu dört sorunun cevabı, uygulamanın ekran düzenini belirler. "Rapor ekranı" en sonda çıkar; en başta gelir.

> Ekrana başlamak, kurumun hangi sorulara ihtiyaç duyduğunu sormadan yazılım yazmaktır. Sorular önce gelir.

## Kural 1: Sahada yazılan kod, sahada ölçülür

Her yeni sürüm, sahada en az bir ekibin gerçek bir vardiyasında kullanılmadan yayına alınmaz. Bu süreç yavaştır ama alternatifi daha yavaştır: kullanılmayan bir sistem.

## Kural 2: Veri modeli kurumun modelini yansıtmalı

İtfaiye bir "vaka" açar, ASKİ bir "abone" açar. Bu iki kavramı tek bir tabloya sıkıştırmak, altı ay sonra her iki tarafın da verisini bozar. Alan adları, kurumun konuştuğu kelimeler olmalıdır.

\`\`\`ts
// Kötü: herkes için geçerli görünen, kimse için doğru olmayan model
type Ticket = {
  type: string
  subject: string
  body: string
}
\`\`\`

\`\`\`ts
// İyi: kurumun dilini modele taşıyan yapı
type FireCall = {
  reportedAt: Date
  district: District
  callType: 'STRUCTURE' | 'VEHICLE' | 'RESCUE' | 'OTHER'
  dispatchedUnits: Unit[]
  commanderId: PersonId
  decisionLog: Decision[]
}
\`\`\`

## Kural 3: Giriş ekranı, ihtiyaç duyulan yerde olmalı

Sahadaki operasyoncu eldivenli, karanlıkta ve aceleyle çalışıyor. Üç saniyede iki dokunuşla ekran değiştiremezseniz, kimse kullanmaz. Bu yüzden ilk ekran "tek kart, tek eylem, tek büyük buton" prensibiyle kurulur.

## Kural 4: Ölçülebilir olmayan hiçbir iyileştirme yayına giremez

"Kullanıcılar memnun" bir argüman değildir. Çağrı kabul süresi, form doldurma süresi, hatalı kayıt oranı — bunlar tartışmayı bitirir.

---

Sahadan yazılıma giden bu yol, kamu kurumlarında neden bu kadar zor? Çünkü kurumun bilinmeyen değişken sayısı fazla ve karar yetkisi dağınık. Ama yazılım, dağınık kararı tekrarlanabilir bir akışa dönüştürebilen en güçlü araç.`,
      contentEn: null,
      locale: 'tr',
      category: 'TECH',
      tags: ['Kurumsal Yazılım', 'Saha Operasyonu', 'Veri Modeli'],
      coverImage: '/images/covers/article-1.svg',
      published: true,
      readMinutes: 7,
      createdAt: '2026-02-11T09:00:00.000Z',
      updatedAt: '2026-02-18T09:00:00.000Z',
    },
    {
      id: 'article-2',
      slug: 'saha-gercegi-ile-ofis-arzinin-catismasi',
      titleTr: 'Saha gerçeği ile ofis arzının çatışması',
      titleEn: 'When field reality collides with office demand',
      summaryTr:
        'Kurumlar dijitalleşme ister, saha ise ek bir iş yükü olarak görür. Bu makale, ikisini aynı hikâyeye bağlamanın pratik yollarını anlatıyor.',
      summaryEn:
        'Institutions ask for digitalisation while the field sees it as extra workload. Practical ways to align both.',
      contentTr: `Kurumun talebi ile sahanın algısı arasındaki fark, dijitalleşme projelerinin en sık görülen başarısızlık nedenidir. Kurum "veriye dayalı yönetim" ister; saha "yeni bir form" diye okur. İkisi de haklı, ikisi de yanlış yerde duruyor.

## Yanlış soru: "Sistemi nasıl kullandırırız?"

Doğru soru: *"Bu sistemin saha için ürettiği zaman kazancı nedir?"* Eğer cevap yoksa, sistem ne kadar şık olursa olsun sahada kaybolur.

## Üç kural

**1. Önce eksikten başla.** Saha zaten kağıtla çalışıyor. Kağıdın yerine geçen ilk ekran kazandırır; altıncı ekran değil.

**2. Veri girişini azalt, karar desteğini artır.** Her ek alan, sahada bir saniye daha demektir. Formun amacı kayıt toplamak değil, o kayıttan sonra kararı desteklemek olmalı.

**3. Geri bildirimi aynı döngüye koy.** Veri giren kişinin emeği karşılığını görmesi gerekir; aksi hâlde bir sonraki sürümde formlar boş kalır.

## Kurum içi iletişim, en büyük teknik borç

Bende en çok zaman alan konu altyapı değil, aslında **karar zincirinin nerede olduğunu bilmek**. Kim neyi onaylıyor, hangi veri hangi karara bağlı, bu bilgi yazılı değilse hiçbir yazılım onu doğru temsil edemez. O yüzden işi yazılımdan önce süreç haritası çıkarmak, yazılımın en değerli yatırımıdır.

\`\`\`text
Saha → Şef → Daire → Genel Müdürlük
         ↑         ↑
      rapor     onay
\`\`\`

Bu harita çıkarıldıktan sonra, veri modeli neredeyse kendiliğinden belirir.`,
      contentEn: null,
      locale: 'tr',
      category: 'PUBLIC_ADMIN',
      tags: ['Dijitalleşme', 'Yönetim', 'Saha', 'İletişim'],
      coverImage: '/images/covers/article-2.svg',
      published: true,
      readMinutes: 6,
      createdAt: '2026-01-22T09:00:00.000Z',
      updatedAt: '2026-01-30T09:00:00.000Z',
    },
    {
      id: 'article-3',
      slug: 'yangin-sonrasi-ilk-60-dakika',
      titleTr: 'Yangın sonrası ilk 60 dakika: komuta yapısı',
      titleEn: 'The first 60 minutes after a fire: the command structure',
      summaryTr:
        'Büyük bir yangında ilk saat, sonraki her şeyi belirler. Yöneticiler için pratik bir komuta çerçevesi.',
      summaryEn:
        'In a major fire the first hour determines everything that follows. A practical command framework for managers.',
      contentTr: `Büyük yangınlarda en sık yapılan hata, ilk saatte "herkes her şeyi yönetmeye çalışması"dır. Sonuç, hiçbir kararın net olmamasıdır.

## Komuta kademeleri

- **Olay komutanı:** İlk gelen en kıdemli amir. Görev tek: emniyet ve ilk yönlendirme.
- **Operasyon bölümü:** Söndürme, kurtarma, koruma ekipleri.
- **Planlama bölümü:** Kaynak takibi, durum raporu, hava durumu, yedek güç.
- **Lojistik/finans:** Araç, yakıt, yemek, personel rotasyonu.

## İlk 60 dakika için kontrol listesi

1. **0–5 dakika:** Can kaybı kontrolü, tahliye, rüzgâr yönü değerlendirmesi.
2. **5–15 dakika:** Su kaynakları, hidrant ve tanker planı, komuta hattı kurulması.
3. **15–30 dakika:** Bölge güvenliği, yapı stabilitesi, tahliye rotaları.
4. **30–45 dakika:** Yedek güç çağırma, hava tüpü takviyesi, rotasyon planı.
5. **45–60 dakika:** Durum raporunun ilk versiyonu, basın ve vatandaş iletişimi planı.

> İlk saatin çıktısı, sonraki altı saatin yol haritasıdır. Bu saat, teknik değil, disiplinin saatidir.

## Yöneticiler için not

Bu çerçeveyi kendi kurumuna taşımak, sahada komuta etmekten zordur. Yangında herkesin görevi baştan yazılıdır: kim karar verir, kim söndürür, kim rapor yazar; kimse bunu olay anında birbirine sormaz. Kurum içinde ise görevler çoğu zaman yazısızdır; olay geldiğinde iş "biri ilgilenir" geçer ve kimse sorumluluğu almaz.

Çözüm iki dünyada aynıdır: görevliliği yazıya geçirmek. Kriz anında kimi arayacaksın, kim neye karar verecek, kimi bilgilendirecek — bunları tek sayfada tanımla. Çerçeve kurumda ancak o sayfa yazıldıktan sonra çalışır.`,
      contentEn: null,
      locale: 'tr',
      category: 'FIRE',
      tags: ['Komuta', 'Acil Durum', 'Yönetim'],
      coverImage: '/images/covers/article-3.svg',
      published: true,
      readMinutes: 8,
      createdAt: '2025-12-09T09:00:00.000Z',
      updatedAt: '2025-12-15T09:00:00.000Z',
    },
    {
      id: 'article-4',
      slug: 'yasayan-sistemlerde-urun-onceliklendirme',
      titleTr: 'Teknik borç: yaşayan sistemlerde ürün önceliklendirme',
      titleEn: 'Technical debt: prioritising features in living systems',
      summaryTr:
        'Bakımı yapılan sistemler büyür, bakımı yapılmayan sistemler yakılır. Önceliklendirmeyi "istek listesi" yerine maliyet-kanıt üzerinden kurmak.',
      summaryEn:
        'Systems that are maintained grow; systems that are not burn. Prioritise by cost and evidence instead of a wish list.',
      contentTr: `Bir SaaS ürününde en pahalı hata, "yanlış özellik" değil; "doğru özellik ama yanlış sırada" hatasıdır. Yanlış özellik bir haftada düzeltilir, yanlış sıra bir çeyrek yıl kaybettirir.

## Önceliklendirme çerçevesi

Her aday için dört soru:

1. **Etki:** Kaç kullanıcı, hangi sıklıkla etkilenecek?
2. **Kanıt:** Bu etkiyi ölçebildiğimiz veri var mı?
3. **Maliyet:** Gerçekte ne kadar sürer — bakımıyla birlikte?
4. **Risk:** Yanlış yaparsak ne kaybederiz?

> "Bunu istiyoruz" bir başlangıç noktası değil, bir varsayımdır. Doğrulanması gerekir.

## Bakım, özellik değildir

Bunu söylemek zor ama önemli: bir hata düzeltmesi, yeni bir özellik kadar değerlidir. Ağırlıklı kullanıcı yolunu kıran bir hata, on özellikten daha fazla zarar verir. Ürün ekiplerinin çoğu bunu "iş değeri" olarak görmez; oysa bakım borcu biriktikçe her yeni özellik daha pahalı hâle gelir.

## Pratik bir düzen

- Her çeyrek, özellik kapasitesinin en az %20'sini bakıma ayırın.
- Bakım borcunu görünür kılın: teknik borç listesi her ay güncellensin.
- Ölçün: "ortalama yanıt süresi", "hata oranı", "destek yükü" — bunlar bakımın bedelidir.

İyi yazılmış yazılım, kodu değil, kararları optimize eder.`,
      contentEn: null,
      locale: 'tr',
      category: 'TECH',
      tags: ['SaaS', 'Ürün Yönetimi', 'Teknik Borç'],
      coverImage: '/images/covers/article-4.svg',
      published: true,
      readMinutes: 5,
      createdAt: '2025-11-04T09:00:00.000Z',
      updatedAt: '2025-11-20T09:00:00.000Z',
    },
    {
      id: 'article-5',
      slug: 'farkli-disiplinler-ayni-pratikler',
      titleTr: 'Farklı Disiplinler - Aynı Pratikler',
      titleEn: 'Different Disciplines, Same Practices',
      summaryTr:
        'Dört kimlik, tek disiplin: belirsizlik altında karar vermek ve sonucunu taşımak. Kişisel bir deneme.',
      summaryEn:
        'Four identities, one discipline: deciding under uncertainty and carrying the result. A personal essay.',
      contentTr: `Yirmi yıldır aynı amacın farklı yüzlerini yaşıyorum: mühendis, programcı, itfaiyeci ve yönetici. Aralarındaki tek fark, kararın bedelidir.

## Mühendis olmak

Mühendislik, yapı inşa etmekten önce bir düşünme düzenidir. Önce sorunun sınırlarını çiz: ne biliyoruz, ne bilmiyoruz, neyi öğrenebiliriz? Sonra en küçük deneyi kur: ölç, değerlendir, yanlışsa hipotezi düzelt. Yanlış bir test sonucu bile değerlidir; çünkü bir şey öğretir. Test edilmemiş varsayım ise hiçbir şey öğretmez.

## Programcı olmak

Programcılık, bu düzenin en somut halidir. Kod, niyetin çalıştırılabilir biçimidir; kararı önce zihinde verir, sonra satırlara döker. Makine yazılandan şaşmaz. Bu yüzden ölçmeyen bir sistem karar değil, tahmin üretir; ölçümün olmadığı yerde düzeltme de olmaz.

## İtfaiyeci olmak

İtfaiyecilik, aynı düzeni en pahalı ortamda uygulamaktır. Zaman azdır, bilgi eksiktir, yanlışın bedeli geri alınamaz. Sahada belirsizliği azaltmanın tek yolu alışkanlık ve yazılı prosedürdür: komut net, adım belli, kontroller listeli. Karar sürpriz olmamalı; alışkanlık olmalıdır.

## Yönetici olmak

Yöneticilik, aynı düzenin ölçek büyütmesidir: kararları tek başına vermek yerine rolleri dağıtmaktır. Kim karar verir, kim uygular, kim ölçer, kim rapor eder. Kriz anında kurumdan istenen, sahada ekipten istenenle aynıdır: net komut, yazılı rol, zamanında rapor.

*Özünde ve aslında her bir rol, bir diğerine girdi sağlayarak çıktıyı zenginleştirir. Fakat kendi geçmiş rollerimizle bile empati yapmayı unutabiliyoruz. Empatiyi kaybetmediğimizde değişim gelişime dönüşebiliyor.*`,
      contentEn: `For twenty years I have been living different faces of the same purpose: engineer, programmer, firefighter and manager. The only difference between them is the cost of a decision.

## Being an engineer

Engineering is, before building anything, a discipline of thinking. First map the boundaries of the problem: what do we know, what do we not know, what can we learn? Then set up the smallest possible experiment: measure, evaluate, correct the hypothesis when it fails. Even a false test result is valuable, because it teaches something. An untested assumption teaches nothing.

## Being a programmer

Programming is the most concrete form of that discipline. Code is intention in executable form; you make the decision first in your mind, then pour it into lines. The machine never deviates from what is written. That is why a system that does not measure produces guesses, not decisions; where measurement is missing, there is no correction either.

## Being a firefighter

Firefighting is applying the same discipline in the most expensive environment. Time is short, information is scarce, and the cost of a mistake cannot be undone. In the field, the only way to reduce uncertainty is habit and written procedure: a clear command, a defined step, listed checks. A decision should not come as a surprise; it should come as a habit.

## Being a manager

Management is that same discipline at scale: instead of making every decision alone, you distribute the roles. Who decides, who implements, who measures, who reports. What an organisation is asked for in a crisis is what a team is asked for in the field: a clear command, a written role, on-time reporting.

*At the core, each role feeds the others and enriches the output. Yet we forget to empathise even with our own past roles. When we do not lose that empathy, change turns into improvement.*`,
      locale: 'tr',
      category: 'PERSONAL',
      tags: ['Kişisel', 'Mühendislik', 'Yazılım', 'Yönetim'],
      coverImage: '/images/covers/article-5.svg',
      published: true,
      readMinutes: 4,
      createdAt: '2025-10-02T09:00:00.000Z',
      updatedAt: '2026-10-27T10:00:00.000Z',
    },
  ],

  gallery: [
    {
      id: 'gallery-1',
      titleTr: 'Gece tatbikatı',
      titleEn: 'Night drill',
      descriptionTr: 'Fabrika bölgesinde gerçekleştirilen gece tatbikatı, 03:00 itibarıyla sahada.',
      descriptionEn: 'A night drill in the industrial district, on site by 03:00.',
      category: 'FIRE',
      imagePath: '/images/gallery-01.svg',
      sortOrder: 1,
      createdAt: '2025-12-01T09:00:00.000Z',
    },
    {
      id: 'gallery-2',
      titleTr: 'Kontrol kulesi ekranı',
      titleEn: 'Control tower screen',
      descriptionTr: 'Çağrı yönetimi ekranı: vaka, ekip ve araç durumu tek ekranda.',
      descriptionEn: 'The dispatch screen: incident, crew and fleet status on one screen.',
      category: 'SOFTWARE',
      imagePath: '/images/gallery-02.svg',
      sortOrder: 2,
      createdAt: '2025-11-18T09:00:00.000Z',
    },
    {
      id: 'gallery-3',
      titleTr: 'İPEK Baca CRM',
      titleEn: 'İPEK Baca CRM',
      descriptionTr: 'Fatura, iş emri ve tahsilat akışının tek ekrandan yönetimi.',
      descriptionEn: 'Invoicing, work orders and collections managed from a single screen.',
      category: 'SOFTWARE',
      imagePath: '/images/projeler/ipek-panel.jpg',
      sortOrder: 3,
      createdAt: '2025-10-28T09:00:00.000Z',
    },
    {
      id: 'gallery-4',
      titleTr: 'Müdürlük bahçesi',
      titleEn: 'Department courtyard',
      descriptionTr: 'Kış öncesi araç ve ekipman kontrolü.',
      descriptionEn: 'Pre-winter vehicle and equipment inspection.',
      category: 'FIRE',
      imagePath: '/images/gallery-04.svg',
      sortOrder: 4,
      createdAt: '2025-10-05T09:00:00.000Z',
    },
    {
      id: 'gallery-5',
      titleTr: 'Sahadan notlar',
      titleEn: 'Field notes',
      descriptionTr: 'Her toplantıdan sonra doldurulan defter.',
      descriptionEn: 'The notebook filled in after every meeting.',
      category: 'PERSONAL',
      imagePath: '/images/gallery-05.svg',
      sortOrder: 5,
      createdAt: '2025-09-12T09:00:00.000Z',
    },
    {
      id: 'gallery-6',
      titleTr: 'Suda yansıyan ışık',
      titleEn: 'Light reflected on water',
      descriptionTr: 'Gece vardiyasında şebeke bakımı.',
      descriptionEn: 'Network maintenance during the night shift.',
      category: 'PERSONAL',
      imagePath: '/images/gallery-06.svg',
      sortOrder: 6,
      createdAt: '2025-08-30T09:00:00.000Z',
    },
    {
      id: 'gallery-7',
      titleTr: 'Mobil saha yönetimi',
      titleEn: 'Mobile field management',
      descriptionTr: 'Sahadaki ekibin iş emri, müşteri ve tahsilatı telefondan yönettiği ekran.',
      descriptionEn: 'The screen where the field crew runs work orders, customers and collections from a phone.',
      category: 'SOFTWARE',
      imagePath: '/images/projeler/ipek-mobil-yonetimi.jpg',
      sortOrder: 7,
      createdAt: '2025-08-12T09:00:00.000Z',
    },
    {
      id: 'gallery-8',
      titleTr: 'Aylık planlama takvimi',
      titleEn: 'Monthly planning calendar',
      descriptionTr: 'Ekip ve araç planlamasının ay bazında tek takvimden yürütülmesi.',
      descriptionEn: 'Crew and fleet planning run from a single month calendar.',
      category: 'SOFTWARE',
      imagePath: '/images/projeler/ipek-takvim.jpg',
      sortOrder: 8,
      createdAt: '2025-07-21T09:00:00.000Z',
    },
    {
      id: 'gallery-9',
      titleTr: 'Sevkiyat paneli',
      titleEn: 'Shipment panel',
      descriptionTr: 'SimaLogistic operasyon paneli: sevkiyat, araç ve müşteri durumu.',
      descriptionEn: 'The SimaLogistic operations panel: shipments, fleet and customer status.',
      category: 'SOFTWARE',
      imagePath: '/images/projeler/sima-panel.jpg',
      sortOrder: 9,
      createdAt: '2025-06-30T09:00:00.000Z',
    },
  ],

  projects: [
    {
      id: 'project-1',
      titleTr: 'İPEK Baca CRM',
      titleEn: 'İPEK Baca CRM',
      descriptionTr:
        'Baca temizlik ve bakım hizmeti veren firmalar için operasyonun uçtan uca yönetimi: iş emri, ekip planlama, maliyet hesaplama, tahsilat ve müşteri takibi. Saha ekipleri için tasarlanmış tek ekranlı, düşük bant genişliğinde çalışan bir arayüz.',
      descriptionEn:
        'End-to-end operations for chimney cleaning firms: work orders, crew planning, costing, collections and customer tracking. A single-screen, low-bandwidth interface designed for field crews.',
      liveUrl: 'https://ipekbaca.com',
      githubUrl: null,
      screenshotPath: '/images/projeler/ipek-mobil-yonetimi.jpg',
      techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      sortOrder: 1,
      featured: true,
      createdAt: '2025-06-01T09:00:00.000Z',
    },
    {
      id: 'project-2',
      titleTr: 'SimaLogistic SaaS',
      titleEn: 'SimaLogistic SaaS',
      descriptionTr:
        'Küçük ve orta ölçekli lojistik firmaları için abonelik tabanlı sevkiyat yönetim platformu: araç planlama, güzergâh optimizasyonu, müşteri portalı ve faturalandırma. Kurum içi süreçlerden doğrudan çıkarılmış bir veri modeliyle tasarlandı.',
      descriptionEn:
        'A subscription-based shipment management platform for small and mid-sized logistics firms: fleet planning, route optimisation, customer portal and billing. Designed on a data model extracted directly from internal operations.',
      liveUrl: 'https://simalogistic.com',
      githubUrl: null,
      screenshotPath: '/images/projeler/sima-anasayfa.jpg',
      techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      sortOrder: 2,
      featured: true,
      createdAt: '2025-09-14T09:00:00.000Z',
    },
    {
      id: 'project-3',
      titleTr: 'Saha Yönetim Modülü',
      titleEn: 'Field Operations Module',
      descriptionTr:
        'Kamu kurumları için saha ekiplerinin vardiya, görev ve araç kullanımını tek panelden yönetecek modül. Şu anda pilot uygulama aşamasında.',
      descriptionEn:
        'A module for public institutions to manage shifts, tasks and vehicle usage of field teams from a single panel. Currently in pilot phase.',
      liveUrl: null,
      githubUrl: null,
      screenshotPath: '/images/project-03.svg',
      techStack: ['Next.js', 'TypeScript', 'PostgreSQL'],
      sortOrder: 3,
      featured: false,
      createdAt: '2026-01-08T09:00:00.000Z',
    },
    {
      id: 'docx-fire-investigation',
      titleTr: 'İtfaiye Olay Yeri İnceleme Çalışmaları',
      titleEn: 'Fire Scene Investigation Programme',
      descriptionTr:
        'Ankara İtfaiyesi bünyesinde olay yeri inceleme biriminin kuruluşu ve mesleki işleyişi: saha prosedürleri, delil ve görüntü toplama standartları, ekip eğitimi ve raporlama düzeni.',
      descriptionEn:
        'Founding and professional operation of the fire scene investigation unit at Ankara Fire Department: field procedures, evidence and image capture standards, crew training and reporting discipline.',
      liveUrl: null,
      githubUrl: null,
      screenshotPath: null,
      techStack: ['Saha Prosedürleri', 'Raporlama', 'Eğitim'],
      sortOrder: 4,
      featured: false,
      createdAt: '2016-03-01T09:00:00.000Z',
    },
    {
      id: 'docx-scene-archive',
      titleTr: 'Olay Yeri İnceleme Görüntü Arşiv Yönetimi Sistemi',
      titleEn: 'Scene Investigation Image Archive',
      descriptionTr:
        'Olay yeri inceleme fotoğraflarının olay, tarih ve ekip bazında sınıflandırıldığı; arama, yetkilendirme ve arşivleme akışlarını kapsayan görüntü yönetim sistemi.',
      descriptionEn:
        'An image management system classifying investigation photos by incident, date and crew, with search, authorisation and archiving flows.',
      liveUrl: null,
      githubUrl: null,
      screenshotPath: null,
      techStack: ['Arşiv Yönetimi', 'Metadata', 'Yetkilendirme'],
      sortOrder: 5,
      featured: false,
      createdAt: '2017-05-01T09:00:00.000Z',
    },
    {
      id: 'docx-aski-card-meter',
      titleTr: 'Kartlı Su Satış Programı',
      titleEn: 'Card Meter Water Sales Programme',
      descriptionTr:
        'Ön ödemeli kartlı sayaçlar için yükleme, satış ve mutabakat süreçlerini yöneten sistem; kiosk ve abone kayıtlarıyla entegre çalışır.',
      descriptionEn:
        'A system managing top-up, sales and reconciliation for prepaid card meters, integrated with kiosks and subscriber records.',
      liveUrl: null,
      githubUrl: null,
      screenshotPath: null,
      techStack: ['Kiosk Entegrasyonu', 'Mutabakat', 'Abone Yönetimi'],
      sortOrder: 6,
      featured: false,
      createdAt: '2019-02-01T09:00:00.000Z',
    },
    {
      id: 'docx-aski-meter-field',
      titleTr: 'Sayaç Operasyonları Saha Yazılımı',
      titleEn: 'Meter Operations Field Software',
      descriptionTr:
        'Sayaç sökme, takma ve bakım işlerinin iş emri olarak açıldığı; ekip atama, saha durumu ve kapanış kontrollerini kapsayan saha hizmet akışı.',
      descriptionEn:
        'A field service workflow that opens meter removal, installation and maintenance jobs as work orders, with crew assignment, field status and closure checks.',
      liveUrl: null,
      githubUrl: null,
      screenshotPath: null,
      techStack: ['İş Emri', 'Saha Ekibi', 'SLA'],
      sortOrder: 7,
      featured: false,
      createdAt: '2020-04-01T09:00:00.000Z',
    },
    {
      id: 'docx-aski-odi-obi',
      titleTr: 'Oracle Data Integrator & BI Kurulumu',
      titleEn: 'Oracle Data Integrator & BI',
      descriptionTr:
        'ASKİ veri kaynaklarının Oracle Data Integrator ile entegre edilmesi ve Oracle Business Intelligence üzerinde raporlama katmanının kurulup yönetilmesi.',
      descriptionEn:
        'Integration of ASKİ data sources with Oracle Data Integrator, and setup and management of the reporting layer on Oracle Business Intelligence.',
      liveUrl: null,
      githubUrl: null,
      screenshotPath: null,
      techStack: ['Oracle ODI', 'Oracle BI', 'ETL', 'Raporlama'],
      sortOrder: 8,
      featured: false,
      createdAt: '2021-06-01T09:00:00.000Z',
    },
    {
      id: 'docx-geo-finance-dss',
      titleTr: 'Coğrafi ve Mali Veriler Karar Destek Sistemi',
      titleEn: 'Geospatial & Financial Decision Support',
      descriptionTr:
        'Coğrafi veriler ile mali kayıtları aynı ekranda birleştirerek yatırım ve bütçe kararlarını destekleyen analitik sistem.',
      descriptionEn:
        'An analytical system combining geospatial data with financial records on one screen to support investment and budget decisions.',
      liveUrl: null,
      githubUrl: null,
      screenshotPath: null,
      techStack: ['GIS', 'Karar Destek', 'Veri Analizi'],
      sortOrder: 9,
      featured: false,
      createdAt: '2022-09-01T09:00:00.000Z',
    },
    {
      id: 'docx-attendance',
      titleTr: 'Personel Devam Kontrol Sistemi',
      titleEn: 'Personnel Attendance Control',
      descriptionTr:
        'Kart okuyucu ve terminal kayıtlarından personel giriş-çıkışlarını toplayan, vardiya ve devamsızlık raporlarını üreten devam kontrol sistemi.',
      descriptionEn:
        'An attendance system collecting entry and exit records from card readers and terminals, producing shift and absence reports.',
      liveUrl: null,
      githubUrl: null,
      screenshotPath: null,
      techStack: ['Devam Kontrol', 'Raporlama', 'Entegrasyon'],
      sortOrder: 10,
      featured: false,
      createdAt: '2023-03-01T09:00:00.000Z',
    },
  ],

  messages: [
    {
      id: 'message-1',
      name: 'Deniz Aksoy',
      email: 'deniz.aksoy@example.com',
      subject: 'Saha yazılımı hakkında',
      message:
        'Merhaba, tarım sulama takibi için benzer bir çözüm arıyoruz. Önceki bir yazınızda bahsettiğiniz veri modeli yaklaşımını paylaşabilir misiniz?',
      isRead: false,
      createdAt: '2026-03-02T08:15:00.000Z',
    },
    {
      id: 'message-2',
      name: 'Ayşe Yıldırım',
      email: 'ayse.yildirim@example.com',
      subject: 'İPEK Baca CRM — demo talebi',
      message: 'Baca temizlik firmaları için CRM arıyorum. Demo için uygun musunuz?',
      isRead: true,
      createdAt: '2026-02-19T11:40:00.000Z',
    },
  ],

  about: {
    dataTr: {
      eyebrow: 'Hakkımda',
      title: 'Kodun, yangının ve şehir yönetiminin kesişiminde bir mühendislik pratiği.',
      cta: 'Özgeçmişi incele',
      body: [
        "2005'te Hacettepe Üniversitesi Bilgisayar Mühendisliği bölümünden mezun oldum; 2008'de Ankara Büyükşehir Belediyesi İtfaiyesi'ne katıldım. Yaklaşık on yıl süren itfaiyecilik dönemi, ekiplerin kurulması, operasyonların yürütülmesi ve acil durumlarda karar sorumluluğuyla geçti.",
        "2018'de ASKİ Genel Müdürlüğü'ne geçtim. Programcı ve proje yönetici olarak başlayan ASKİ kariyerimin Şube Müdürlüğü ve Daire Başkanlığı dönemlerinde su ve atıksu altyapısının yönetimi, kurumun operasyonel dönüşümü ve dijitalleşme süreçleri gündemin merkezindeydi. Bugün ASKİ'de Kıdemli Uzman olarak çalışıyorum.",
        "Bu yıllar boyunca yazılım da sürdü. İPEK Baca CRM ve SimaLogistic SaaS, sahadan gelen ihtiyaçların doğrudan ürüne dönüşmesiyle ortaya çıktı.",
      ],
      stats: [
        { value: 18, suffix: '+', label: 'Yıl Kamu Sektörü' },
        { value: 9, suffix: '+', label: 'Yıl İtfaiye Yönetimi' },
        { value: 7, suffix: '+', label: 'Yıl ASKİ Yönetimi' },
        { value: 4, suffix: '', label: 'Yayında SaaS Ürün' },
      ],
    },
    dataEn: {
      eyebrow: 'About',
      title: 'An engineering practice where code, fire and city management meet.',
      cta: 'Read the resume',
      body: [
        "I graduated from Hacettepe University in Computer Engineering in 2005 and joined the Ankara Metropolitan Municipality Fire Department in 2008. Nearly a decade of firefighting followed: building teams, running operations and carrying decision responsibility in emergencies.",
        "In 2018 I moved to ASKI, the city's water and wastewater utility. In the branch-management and department-head years of the ASKİ career that started as a programmer and project manager, water and wastewater infrastructure, operational transformation and digitalisation were at the centre of the agenda. Today I serve as a Senior Specialist at ASKI.",
        "Software continued alongside all of this. İPEK Baca CRM and SimaLogistic SaaS emerged from turning field needs directly into product.",
      ],
      stats: [
        { value: 18, suffix: '+', label: 'Years in Public Sector' },
        { value: 9, suffix: '+', label: 'Years Leading Fire Ops' },
        { value: 7, suffix: '+', label: 'Years in ASKI Leadership' },
        { value: 4, suffix: '', label: 'SaaS Products Live' },
      ],
    },
  },
};
