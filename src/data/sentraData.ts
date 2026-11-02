export interface SentraActivity {
  title: string;
  desc: string;
  image: string;
  badge?: string;
}

export interface SentraItem {
  id: string;
  number: number;
  name: string;
  fullName: string;
  subtitle: string;
  themeColor: string;
  badgeColor: string;
  accentBg: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  philosophy: string;
  coreSkills: string[];
  materials: string[];
  featuredImage: string;
  gallery: {
    src: string;
    caption: string;
    activity: string;
  }[];
  quote: string;
}

export const SEVEN_SENTRA_DATA: SentraItem[] = [
  {
    id: 'sentra-alam-cair',
    number: 1,
    name: 'Sentra Alam Cair',
    fullName: 'Sentra Alam Cair & Bahan Alam',
    subtitle: 'Sensori Sains, Fluida, Pasir Kinetik & Keajaiban Ciptaan Allah',
    themeColor: 'from-sky-600 to-cyan-700',
    badgeColor: 'bg-sky-500 text-white',
    accentBg: 'bg-sky-50 border-sky-200 text-sky-900',
    iconName: 'Droplets',
    shortDesc:
      'Eksplorasi sensorik air, pasir kinetik, viskositas cairan, memindahkan air dengan spons, mengamati ikan hidup, serta meneliti koin di bebatuan kali.',
    fullDesc:
      'Sentra Alam Cair memberikan ruang terbuka bagi ananda untuk berinteraksi langsung dengan aneka bahan alam basah dan kering. Melalui air, pasir, bebatuan, dan cairan pewarna alami, santri melatih kepekaan indera peraba, konsentrasi, serta pemahaman sains dasar tentang gravitasi, volume, dan sifat zat ciptaan Allah SWT.',
    philosophy:
      'Air dan alam adalah laboratorium hidup paling kaya. Anak belajar konsep fisika dan biologi melalui sentuhan langsung dan rasa takjub.',
    coreSkills: [
      'Stimulasi sensori taktil dan kepekaan indera',
      'Pemahaman konsep sains: volume, penyerapan & viskositas',
      'Koordinasi motorik halus (memeras spons, memegang pinset)',
      'Menumbuhkan rasa syukur atas anugerah alam ciptaan Allah',
    ],
    materials: [
      'Baskom air & bebatuan kali alami',
      'Pasir kinetik warna ramah anak',
      'Ikan hias kecil dalam baskom edukasi',
      'Spons pemindah air & corong takar',
      'Larutan pewarna makanan aman & cotton bud',
    ],
    featuredImage:
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51_76a8e247.jpeg',
    gallery: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51_76a8e247.jpeg',
        caption: 'Santri antusias mengamati dan menangkap ikan hias di baskom air',
        activity: 'Observasi Biologi & Satwa Air',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.53_daac45a0.jpeg',
        caption: 'Bermain dan mencetak pasir kinetik di baki sensori ceria',
        activity: 'Sensori Pasir Kinetik & Motorik Halus',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.08_2c03e9fe.jpeg',
        caption: 'Eksperimen menyerap dan memindahkan air menggunakan spons ke wadah',
        activity: 'Fisika Fluida & Spons Air',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.10_c463d25f.jpeg',
        caption: 'Tantangan: "Ayo temukan harta karun di dalam batu!" dalam baskom air jernih',
        activity: 'Pencarian Koin di Bebatuan Kali',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.05_5552a4a8.jpeg',
        caption: 'Menyelamatkan cangkang kerang dan butir mutiara di lumpur cair menggunakan penjepit',
        activity: 'Lumpur Sensori & Penyelamatan Kerang',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.04_4fba7cc6.jpeg',
        caption: 'Mencampur sendok pewarna alami dan mengamati gradasi cairan',
        activity: 'Eksperimen Percampuran Warna Alami',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.47_c3fc0d83.jpeg',
        caption: 'Menanam kangkung dan mengamati kelembapan tanah basah',
        activity: 'Botanika Dasar & Tanaman Air',
      },
    ],
    quote:
      '"Air mengajarkan ketenangan, keluwesan, dan keajaiban sains yang selalu membuat mata anak berbinar."',
  },
  {
    id: 'sentra-balok',
    number: 2,
    name: 'Sentra Balok',
    fullName: 'Sentra Balok & Rancang Bangun',
    subtitle: 'Konstruksi Arsitektur, Logika Spasial & Geometri 3 Dimensi',
    themeColor: 'from-amber-600 to-yellow-600',
    badgeColor: 'bg-amber-500 text-white',
    accentBg: 'bg-amber-50 border-amber-200 text-amber-900',
    iconName: 'Box',
    shortDesc:
      'Merakit model rangka geometris 3D dengan stik kayu dan bulir plastisin, menyusun balok kayu unpainted Montessori, dan melatih daya cipta arsitektural.',
    fullDesc:
      'Di Sentra Balok, anak berperan sebagai arsitek dan insinyur cilik. Dengan ribuan balok kayu natural, stik kayu presisi, dan plastisin pemersatu, ananda belajar konsep kestabilan, keseimbangan beban, simetri bentuk, serta visualisasi spasial tiga dimensi.',
    philosophy:
      'Membangun menara balok melatih kesabaran jiwa. Ketika roboh, anak belajar bangkit merancang ulang dengan strategi yang lebih kokoh.',
    coreSkills: [
      'Kecerdasan visual-spasial & pemahaman bentuk 3D',
      'Konsep fisika dasar: gravitasi, keseimbangan & simetri',
      'Ketelitian, fokus konsentrasi, dan regulasi emosi',
      'Perencanaan strategis dan pemecahan masalah (problem solving)',
    ],
    materials: [
      'Balok kayu natural unpainted Montessori (Unit Blocks)',
      'Stik kayu dowel & tusuk bulat ramah anak',
      'Bulir plastisin warna penopang sudut sendi geometris',
      'Alas karpet bermotif kota & denah jalan',
      'Rak kayu terbuka berlabel bentuk memudahkan anak merapikan',
    ],
    featuredImage:
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.14_f4ff428a.jpeg',
    gallery: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.14_f4ff428a.jpeg',
        caption: 'Santri fokus merakit kerangka kubus dan piramida 3D dengan stik kayu & plastisin',
        activity: 'Konstruksi Geometri 3 Dimensi',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.15_635834f7.jpeg',
        caption: 'Membangun sambungan rangka jembatan balok dengan ketelitian tinggi',
        activity: 'Arsitektur Rangka Jembatan',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.58_cda64cc5.jpeg',
        caption: 'Eksplorasi konstruksi dan susunan pola balok di atas lantai kelas',
        activity: 'Kestabilan Pondasi Balok',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.59_4e859023.jpeg',
        caption: 'Menghubungkan simpul plastisin warna untuk menciptakan bentuk bangun',
        activity: 'Simpul Geometri & Ketangkasan Jari',
      },
      {
        src: '/src/assets/images/sentra_balok_montessori_1790826050585.jpg',
        caption: 'Ruang Sentra Balok ber-AC lengkap dengan ribuan keping balok kayu Montessori',
        activity: 'Ruang Kelas Sentra Balok Ber-AC',
      },
    ],
    quote:
      '"Dari sebatang stik dan sebiji balok, lahir daya cipta agung tentang rumah, jembatan, dan impian masa depan."',
  },
  {
    id: 'sentra-olah-tubuh',
    number: 3,
    name: 'Sentra Olah Tubuh',
    fullName: 'Sentra Olah Tubuh & Kinestetik',
    subtitle: 'Motorik Kasar, Senam Santri Sehat, Hula Hoop & Kelincahan Fisik',
    themeColor: 'from-emerald-600 to-teal-700',
    badgeColor: 'bg-emerald-600 text-white',
    accentBg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    iconName: 'Activity',
    shortDesc:
      'Latihan kebugaran fisik ceria, rotasi hula hoop, titian keseimbangan, matras senam ketangkasan, dan koordinasi motorik kasar pembentuk imun kuat.',
    fullDesc:
      'Islam mencintai mukmin yang kuat fisiknya. Sentra Olah Tubuh memfasilitasi kebutuhan gerak aktif anak usia dini melalui rintangan ketangkasan, senam irama ceria, loncat simpai hula hoop, serta latihan vestibular yang merangsang perkembangan otak secara optimal.',
    philosophy:
      'Gerak tubuh anak adalah kunci neuron otak bekerja. Santri yang sehat dan tangguh tumbuh menjadi pribadi percaya diri dan bersemangat.',
    coreSkills: [
      'Keseimbangan vestibular & postur tubuh tegap',
      'Kelincahan motorik kasar, melompat, merangkak & berlari',
      'Kebugaran kardiovaskular dan daya tahan imun',
      'Sportivitas, keberanian mengambil tantangan & antre tertib',
    ],
    materials: [
      'Simpai Hula Hoop warna-warni terstandar',
      'Matras senam ketangkasan berlapis busa empuk',
      'Papan titian balok keseimbangan kayu',
      'Terowongan kain merayap & kerucut rintangan',
      'Sound system senam irama ceria santri',
    ],
    featuredImage:
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.06_acbd8824.jpeg',
    gallery: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.06_acbd8824.jpeg',
        caption: 'Peralatan Sentra Olah Tubuh: hula hoop warna-warni dan matras senam siap digunakan santri',
        activity: 'Persiapan Fasilitas Olah Tubuh',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.56_c1c56ff2.jpeg',
        caption: 'Santri antusias bergerak lincah mengikuti instruksi ustadzah',
        activity: 'Kelincahan Gerak & Refleks Anak',
      },
      {
        src: '/assets/gallery/foto9-jembatan-motorik.jpg',
        caption: 'Titian jembatan gantung outdoor melatih keseimbangan dan keberanian',
        activity: 'Keseimbangan Outdoor Playground',
      },
    ],
    quote:
      '"Anak yang banyak bergerak dengan gembira adalah anak yang otaknya bertumbuh mekar."',
  },
  {
    id: 'sentra-peran',
    number: 4,
    name: 'Sentra Peran',
    fullName: 'Sentra Peran (Mikro & Makro)',
    subtitle: 'Sosio-Emosional, Simulasi Koki Cilik, Pasar Mini & Adab Islami',
    themeColor: 'from-rose-600 to-pink-700',
    badgeColor: 'bg-rose-500 text-white',
    accentBg: 'bg-rose-50 border-rose-200 text-rose-900',
    iconName: 'Users',
    shortDesc:
      'Simulasi memasak sup herbal menggunakan lesung kayu, bermain peran koki cilik, transaksi pasar santri, merawat keluarga sakinah, dan melatih empati sosial.',
    fullDesc:
      'Sentra Peran dibagi menjadi Peran Makro (anak menjadi tokohnya langsung) dan Peran Mikro (anak menggerakkan miniatur). Anak mengekspresikan peran profesi, menumbuk bahan jamu dengan lesung kayu, menata hidangan sup biji, serta membiasakan komunikasi santun dengan kawan sebaya.',
    philosophy:
      'Bermain peran adalah cermin kehidupan nyata. Di sinilah empati ditumbuhkan, bahasa diasah, dan adab bermuamalah dipraktikkan.',
    coreSkills: [
      'Empati sosial, toleransi, dan memahami sudut pandang orang lain',
      'Kemampuan bahasa ekspresif, kosa kata dialogis & negosiasi',
      'Kemandirian mengelola peran dan tanggung jawab tugas',
      'Pembiasaan adab Islami: senyum, salam, tolong, terima kasih, maaf',
    ],
    materials: [
      'Lesung kayu tradisional dan alu penumbuk daun',
      'Set mangkok saji, centong sup, piring & sendok plastik',
      'Bahan main konkret: aneka biji-bijian, daun herbal, air teh',
      'Kostum profesi (koki, dokter, pedagang, pemadam kebakaran)',
      'Pojok kasir & replika uang koin edukatif',
    ],
    featuredImage:
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51__1__7aecc258.jpeg',
    gallery: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51__1__7aecc258.jpeg',
        caption: 'Santriwati bermain peran koki cilik menata sup biji hangat di mangkok makan',
        activity: 'Simulasi Koki Cilik & Jamuan Santun',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.49__1__dbe157c7.jpeg',
        caption: 'Santri menumbuk dedaunan segar menggunakan lesung kayu tradisional',
        activity: 'Eksplorasi Meracik Herbal Alami',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.49_7575f5ef.jpeg',
        caption: 'Membuat stik es krim dari plastisin dan papan kardus bersama kawan',
        activity: 'Toko Es Krim & Makanan Ceria',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.00_48e67e8d.jpeg',
        caption: 'Diskusi peran dan pembagian tugas antar santri dengan bimbingan ustadzah',
        activity: 'Kerjasama Kelompok & Dialog Peran',
      },
    ],
    quote:
      '"Saat anak bermain peran dengan sungguh-sungguh, ia sedang mempersiapkan diri menjadi insan berakhlak mulia di masyarakat."',
  },
  {
    id: 'sentra-seni',
    number: 5,
    name: 'Sentra Seni',
    fullName: 'Sentra Seni & Kreativitas Anak',
    subtitle: 'Melukis Wadah Kertas, Kolase Bahan Alam, Batik Jumputan & Kriya Tangan',
    themeColor: 'from-purple-600 to-indigo-700',
    badgeColor: 'bg-purple-600 text-white',
    accentBg: 'bg-purple-50 border-purple-200 text-purple-900',
    iconName: 'Palette',
    shortDesc:
      'Melukis mangkuk kertas dengan cat air berpalet, menyusun kolase biji kacang hijau dan daun alami, membuat batik jumputan kromatografi, serta kriya ekspresif.',
    fullDesc:
      'Sentra Seni membebaskan daya kreasi anak tanpa takut salah. Di sini santri memadukan media 3 dimensi (mangkuk kertas), kanvas 2 dimensi, dedaunan gugur, biji-bijian, dan pewarna basah untuk menghasilkan karya unik yang dihargai keistimewaannya.',
    philosophy:
      'Seni bagi anak usia dini bukan tentang kesempurnaan produk, melainkan kebahagiaan proses mengekspresikan rasa keindahan yang Allah titipkan.',
    coreSkills: [
      'Sensitivitas estetika, apresiasi keindahan & gradasi warna',
      'Koordinasi mata dan tangan (menggores kuas halus, memotong)',
      'Daya cipta orisinal tanpa terbelenggu pola kaku',
      'Rasa bangga dan percaya diri atas karya ciptaan sendiri',
    ],
    materials: [
      'Wadah mangkuk kertas (paper bowl) siap lukis',
      'Kuas lukis lembut aneka ukuran & palet bunga cat air',
      'Biji kacang hijau, beras warna, dan biji jagung kolase',
      'Daun-daun alami dengan aneka bentuk dan tekstur',
      'Kertas tisu kromatografi batik jumputan & pewarna alami',
    ],
    featuredImage:
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.01_031c3324.jpeg',
    gallery: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.01_031c3324.jpeg',
        caption: 'Santri dengan fokus tinggi melukis mangkuk kertas menggunakan kuas dan cat palet',
        activity: 'Melukis Media 3D Paper Bowl',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.11_fbca1cba.jpeg',
        caption: 'Eksplorasi melukis didampingi ustadzah dengan suasana kelas santai berlesehan',
        activity: 'Bimbingan Kriya Kreatif Ustadzah',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.54_771d2bb2.jpeg',
        caption: 'Karya kolase detail: menempel biji kacang hijau dan daun pada pola gambar kereta',
        activity: 'Kolase Bahan Alam Multi-Tekstur',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.03_06b97f80.jpeg',
        caption: 'Menggunting daun segar mengikuti kontur pola seni',
        activity: 'Eksplorasi Gunting Daun & Tekstur',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.06_acbd8824.jpeg',
        caption: 'Membuat pola batik jumputan cerah dengan teknik serap pewarna cotton bud',
        activity: 'Batik Kromatografi Jumputan Cilik',
      },
    ],
    quote:
      '"Setiap anak adalah seniman sejati. Tugas kita adalah menjaga agar rasa seni itu terus menyala seiring ia tumbuh besar."',
  },
  {
    id: 'sentra-persiapan-1',
    number: 6,
    name: 'Sentra Persiapan 1',
    fullName: 'Sentra Persiapan 1 (Literasi Awal & Fonik Dasar)',
    subtitle: 'Keaksaraan Menyenangkan, Berburu Huruf di Playdough & Pra-Menulis',
    themeColor: 'from-blue-600 to-indigo-700',
    badgeColor: 'bg-blue-600 text-white',
    accentBg: 'bg-blue-50 border-blue-200 text-blue-900',
    iconName: 'BookOpen',
    shortDesc:
      'Berburu manik-manik huruf alfabet di dalam adonan playdough, pengenalan bunyi fonik gembira, kartu kata bergambar, dan penguatan otot jari tangan.',
    fullDesc:
      'Sentra Persiapan 1 memupuk kecintaan ananda pada aksara dan kata tanpa paksaan. Dengan media taktil sensori seperti playdough, santri memilin dan mencari huruf yang tersembunyi, mencocokkan bunyi huruf dengan benda nyata, serta melatih genggaman jemari (pincer grasp) sebagai bekal menulis indah.',
    philosophy:
      'Literasi dimulai dari rasa gembira mendengar kisah dan menyentuh huruf. Fondasi yang manis melahirkan anak yang haus membaca sepanjang hayat.',
    coreSkills: [
      'Pengenalan bentuk huruf alfabet & hijaiyah secara kinestetik',
      'Kesadaran fonologis (mendengar dan menirukan bunyi huruf)',
      'Kekuatan otot halus jemari tangan (pincer grasp) pra-menulis',
      'Kemampuan fokus menyimak dan mengikuti instruksi berurutan',
    ],
    materials: [
      'Adonan playdough buatan ramah anak beraneka warna',
      'Manik-manik huruf alfabet timbul warna-warni',
      'Baskom sensori perburuan huruf tersembunyi',
      'Kartu kata bergambar kosakata Islami',
      'Papan jepit kertas dan krayon ergonomis segitiga',
    ],
    featuredImage:
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.48_df009c44.jpeg',
    gallery: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.48_df009c44.jpeg',
        caption: 'Santriwati riang meremas adonan playdough dan menemukan manik-manik huruf alfabet',
        activity: 'Berburu Huruf dalam Playdough',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.01__1__8276c776.jpeg',
        caption: 'Mencocokkan huruf yang ditemukan dengan pola kata di meja belajar',
        activity: 'Pencocokan Simbol Fonik',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.03__1__ffc569e0.jpeg',
        caption: 'Melatih kelenturan jemari dengan meremas dan membentuk huruf sendiri',
        activity: 'Olah Jemari Pra-Menulis',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.09_de778084.jpeg',
        caption: 'Menyusun huruf menjadi kata-kata bermakna bersama teman sebaya',
        activity: 'Rangkaian Kata Awal',
      },
    ],
    quote:
      '"Membaca bukanlah kewajiban yang menegangkan, melainkan petualangan menemukan rahasia kata yang mengasyikkan."',
  },
  {
    id: 'sentra-persiapan-2',
    number: 7,
    name: 'Sentra Persiapan 2',
    fullName: 'Sentra Persiapan 2 (Kognitif, Berhitung & Kesiapan Masuk SD)',
    subtitle: 'Numerasi Kontekstual, Menakar Biji, Pola Selotip & Logika Mandiri',
    themeColor: 'from-teal-600 to-emerald-700',
    badgeColor: 'bg-teal-600 text-white',
    accentBg: 'bg-teal-50 border-teal-200 text-teal-900',
    iconName: 'Calculator',
    shortDesc:
      'Menghitung dan memola butir biji di garis selotip melingkar, menakar biji dengan sendok ke kantong klip, klasifikasi benda konkret, dan pematangan tuntas tugas.',
    fullDesc:
      'Sentra Persiapan 2 menyiapkan santri Kelompok B agar matang dan percaya diri menyongsong jenjang Sekolah Dasar (SD/MI). Pembelajaran berhitung dikemas konkret: anak menakar butir biji dengan sendok takar, menempel biji mengikuti garis simetris pada selotip baskom, mengelompokkan ukuran, serta melatih daya tahan konsentrasi menyelesaikan tugas hingga tuntas.',
    philosophy:
      'Matematika anak usia dini harus hadir dari benda yang bisa dipegang, dihitung, dan ditakar. Dari sanalah logika berpikir logis bertunas kuat.',
    coreSkills: [
      'Konsep bilangan, membilang satu-satu & korespondensi 1 to 1',
      'Pengukuran takaran (banyak-sedikit, penuh-setengah-kosong)',
      'Ketepatan koordinasi tangan menyendok dan memasukkan ke kantong klip',
      'Daya tahan fokus belajar (kemandirian tuntas tugas mandiri)',
    ],
    materials: [
      'Biji saga / kacang merah / biji kedelai putih bersih',
      'Baskom biru dengan jejaring selotip pola geometris melingkar',
      'Sendok takar putih & penjepit ergonomis',
      'Kantong plastik klip bening bersegel',
      'Timbangan sederhana & mangkuk klasifikasi warna',
    ],
    featuredImage:
      '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.55_945243a3.jpeg',
    gallery: [
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.55_945243a3.jpeg',
        caption: 'Santriwati teliti menyusun dan menghitung butiran biji di atas jaring selotip baskom',
        activity: 'Pola Melingkar & Berhitung Butir Biji',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.08__1__337a2408.jpeg',
        caption: 'Menakar biji dengan sendok ke dalam kantong plastik klip untuk melatih presisi',
        activity: 'Takaran Sendok & Pengemasan Klip',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.11__1__f52492cf.jpeg',
        caption: 'Mengelompokkan biji berdasarkan ukuran dan jumlah takaran bersama ustadzah',
        activity: 'Klasifikasi Konsep Jumlah',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.12_d92e3ada.jpeg',
        caption: 'Latihan konsentrasi tuntas tugas dengan pendampingan penuh kehangatan',
        activity: 'Pematangan Kesiapan Belajar SD',
      },
      {
        src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.13_6dcad265.jpeg',
        caption: 'Eksplorasi matematika konkret menggunakan benda alam sekitar',
        activity: 'Numerasi Konkret Berbasis Bahan Alam',
      },
    ],
    quote:
      '"Ketika anak mampu menyelesaikan tugasnya dengan gembira dan tuntas, sesungguhnya ia telah siap menaklukkan jenjang sekolah berikutnya."',
  },
];

// Flat list of all 31 real photos from client for the full school documentation gallery
export const ALL_SENTRA_CLIENT_PHOTOS = [
  {
    id: 'photo-1',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.47_c3fc0d83.jpeg',
    sentraId: 'sentra-alam-cair',
    sentraName: 'Sentra Alam Cair',
    title: 'Media Tanam & Air',
    desc: 'Santri belajar kelembapan media tanam kangkung dan air di baki oranye.',
  },
  {
    id: 'photo-2',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.48_df009c44.jpeg',
    sentraId: 'sentra-persiapan-1',
    sentraName: 'Sentra Persiapan 1',
    title: 'Berburu Huruf Playdough',
    desc: 'Mencari manik-manik huruf alfabet di dalam adonan playdough lembut.',
  },
  {
    id: 'photo-3',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.49_7575f5ef.jpeg',
    sentraId: 'sentra-peran',
    sentraName: 'Sentra Peran',
    title: 'Koki Es Krim Santri',
    desc: 'Bermain peran membuat stik es krim lezat dengan plastisin dan stik kayu.',
  },
  {
    id: 'photo-4',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.49__1__dbe157c7.jpeg',
    sentraId: 'sentra-peran',
    sentraName: 'Sentra Peran & Bahan Alam',
    title: 'Menumbuk Lesung Kayu',
    desc: 'Menumbuk dedaunan herbal dengan lesung kayu tradisional khas Nusantara.',
  },
  {
    id: 'photo-5',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51_76a8e247.jpeg',
    sentraId: 'sentra-alam-cair',
    sentraName: 'Sentra Alam Cair',
    title: 'Eksplorasi Ikan Hidup',
    desc: 'Mengamati gerakan lincah ikan hias di baskom air dan melatih kelembutan hati.',
  },
  {
    id: 'photo-6',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.51__1__7aecc258.jpeg',
    sentraId: 'sentra-peran',
    sentraName: 'Sentra Peran',
    title: 'Jamuan Sup Biji Koki Cilik',
    desc: 'Menata mangkok sup biji dan meracik sajian lezat dalam simulasi keluarga.',
  },
  {
    id: 'photo-7',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.53_daac45a0.jpeg',
    sentraId: 'sentra-alam-cair',
    sentraName: 'Sentra Alam Cair',
    title: 'Pasir Kinetik Warna',
    desc: 'Sensasi menyentuh dan mencetak pasir kinetik hijau di baki pink ceria.',
  },
  {
    id: 'photo-8',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.54_771d2bb2.jpeg',
    sentraId: 'sentra-seni',
    sentraName: 'Sentra Seni',
    title: 'Kolase Biji & Daun',
    desc: 'Menempelkan kacang hijau dan daun alami pada sketsa kereta api berseri.',
  },
  {
    id: 'photo-9',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.55_945243a3.jpeg',
    sentraId: 'sentra-persiapan-2',
    sentraName: 'Sentra Persiapan 2',
    title: 'Pola Biji Selotip Baskom',
    desc: 'Berhitung butir biji dan menyusunnya simetris di atas garis selotip.',
  },
  {
    id: 'photo-10',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.56_c1c56ff2.jpeg',
    sentraId: 'sentra-olah-tubuh',
    sentraName: 'Sentra Olah Tubuh',
    title: 'Gerak Ceria Santri',
    desc: 'Aktivitas motorik kasar santri bergerak aktif dan ceria di ruang kelas.',
  },
  {
    id: 'photo-11',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.57_0c110b75.jpeg',
    sentraId: 'sentra-alam-cair',
    sentraName: 'Sentra Alam Cair',
    title: 'Eksperimen Air & Takaran',
    desc: 'Mengalirkan air melalui corong dan pipa takar sains sederhana.',
  },
  {
    id: 'photo-12',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.58_cda64cc5.jpeg',
    sentraId: 'sentra-balok',
    sentraName: 'Sentra Balok',
    title: 'Susunan Balok Lantai',
    desc: 'Membangun denah pondasi balok dan jembatan di area karpet kelas.',
  },
  {
    id: 'photo-13',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.52.59_4e859023.jpeg',
    sentraId: 'sentra-balok',
    sentraName: 'Sentra Balok',
    title: 'Simpul Rangka Geometri',
    desc: 'Menyambungkan stik dowel dengan bulir plastisin warna penopang.',
  },
  {
    id: 'photo-14',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.00_48e67e8d.jpeg',
    sentraId: 'sentra-peran',
    sentraName: 'Sentra Peran',
    title: 'Interaksi Santun Kawan',
    desc: 'Berbagi peran dan saling menyapa ramah dalam setting interaksi sosial.',
  },
  {
    id: 'photo-15',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.01_031c3324.jpeg',
    sentraId: 'sentra-seni',
    sentraName: 'Sentra Seni',
    title: 'Melukis Paper Bowl Cantik',
    desc: 'Goresan kuas halus santri mewarnai mangkuk kertas dengan cat air berpalet.',
  },
  {
    id: 'photo-16',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.01__1__8276c776.jpeg',
    sentraId: 'sentra-persiapan-1',
    sentraName: 'Sentra Persiapan 1',
    title: 'Klasifikasi Kartu Huruf',
    desc: 'Mencocokkan simbol huruf dengan kartu kata bergambar berwarna.',
  },
  {
    id: 'photo-17',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.03_06b97f80.jpeg',
    sentraId: 'sentra-seni',
    sentraName: 'Sentra Seni & Bahan Alam',
    title: 'Kriya Daun & Gunting Anak',
    desc: 'Membentuk daun alami menjadi ragam hiasan kreasi tangan santri.',
  },
  {
    id: 'photo-18',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.03__1__ffc569e0.jpeg',
    sentraId: 'sentra-persiapan-1',
    sentraName: 'Sentra Persiapan 1',
    title: 'Pincer Grasp Training',
    desc: 'Melatih kekuatan ujung tiga jari untuk memegang pensil secara ergonomis.',
  },
  {
    id: 'photo-19',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.04_4fba7cc6.jpeg',
    sentraId: 'sentra-alam-cair',
    sentraName: 'Sentra Alam Cair',
    title: 'Larutan Warna & Percikan',
    desc: 'Mencampur sendok warna ke piring saji dan memperhatikan difusi cairan.',
  },
  {
    id: 'photo-20',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.05_5552a4a8.jpeg',
    sentraId: 'sentra-alam-cair',
    sentraName: 'Sentra Alam Cair',
    title: 'Penyelamatan Cangkang Kerang',
    desc: 'Mengambil kerang di dalam lumpur cair menggunakan penjepit biru khusus.',
  },
  {
    id: 'photo-21',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.06_acbd8824.jpeg',
    sentraId: 'sentra-seni',
    sentraName: 'Sentra Seni',
    title: 'Batik Kromatografi Jumputan',
    desc: 'Warna-warni kromatografi mekar di kertas tisu dengan cotton bud lembut.',
  },
  {
    id: 'photo-22',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.08_2c03e9fe.jpeg',
    sentraId: 'sentra-alam-cair',
    sentraName: 'Sentra Alam Cair',
    title: 'Tantangan Spons Pemindah Air',
    desc: 'Menyerap air warna di baskom dan memerasnya tuntas ke wadah lain.',
  },
  {
    id: 'photo-23',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.08__1__337a2408.jpeg',
    sentraId: 'sentra-persiapan-2',
    sentraName: 'Sentra Persiapan 2',
    title: 'Sendok Takar Biji ke Plastik',
    desc: 'Konsentrasi menyendok butiran biji putih ke dalam plastik klip transparan.',
  },
  {
    id: 'photo-24',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.09_de778084.jpeg',
    sentraId: 'sentra-persiapan-1',
    sentraName: 'Sentra Persiapan 1',
    title: 'Mengenal Suku Kata Ceria',
    desc: 'Mengeja dan merangkai kata dengan media visual konkret yang ramah anak.',
  },
  {
    id: 'photo-25',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.10_c463d25f.jpeg',
    sentraId: 'sentra-alam-cair',
    sentraName: 'Sentra Alam Cair',
    title: 'Harta Karun Bebatuan Kali',
    desc: 'Santri mencari koin logam di antara bebatuan kali putih dalam baskom air.',
  },
  {
    id: 'photo-26',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.11__1__f52492cf.jpeg',
    sentraId: 'sentra-persiapan-2',
    sentraName: 'Sentra Persiapan 2',
    title: 'Klasifikasi Biji & Takaran',
    desc: 'Mengelompokkan biji ke dalam mangkuk merah dan hijau secara cermat.',
  },
  {
    id: 'photo-27',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.11_fbca1cba.jpeg',
    sentraId: 'sentra-seni',
    sentraName: 'Sentra Seni',
    title: 'Kreasi Seni Lesehan Bersama',
    desc: 'Melukis wadah cangkir kertas dan mengkreasikan daun bersama ustadzah.',
  },
  {
    id: 'photo-28',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.12_d92e3ada.jpeg',
    sentraId: 'sentra-persiapan-2',
    sentraName: 'Sentra Persiapan 2',
    title: 'Fokus Mandiri Tuntas Tugas',
    desc: 'Membiasakan anak berkonsentrasi hingga aktivitas pembelajaran selesai tuntas.',
  },
  {
    id: 'photo-29',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.13_6dcad265.jpeg',
    sentraId: 'sentra-persiapan-2',
    sentraName: 'Sentra Persiapan 2',
    title: 'Eksplorasi Takaran & Angka',
    desc: 'Memahami makna angka melalui benda konkret dan media takar sendok.',
  },
  {
    id: 'photo-30',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.14_f4ff428a.jpeg',
    sentraId: 'sentra-balok',
    sentraName: 'Sentra Balok',
    title: 'Konstruksi 3D Balok & Stik',
    desc: 'Merakit model kubus tiga dimensi dari tusuk dowel dan plastisin sendi.',
  },
  {
    id: 'photo-31',
    src: '/assets/aistudio/WhatsApp_Image_2026-10-21_at_12.53.15_635834f7.jpeg',
    sentraId: 'sentra-balok',
    sentraName: 'Sentra Balok',
    title: 'Arsitektur Rangkaian Geometri',
    desc: 'Santri membangun struktur geometris rumit dengan kesabaran luar biasa.',
  },
];
