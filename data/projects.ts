export interface Project {
  slug: string;
  name: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  category: "web" | "ml" | "desktop" | "design";
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "kios-sehat",
    name: "Kios Sehat",
    description:
      "Platform manajemen toko kesehatan berbasis web. Mengelola produk, transaksi, dan laporan keuangan dengan antarmuka yang intuitif.",
    thumbnail: "/projects/kios-sehat.png",
    techStack: ["PHP Native", "MySQL", "Bootstrap", "JavaScript"],
    githubUrl: "https://github.com/Malfrmnsyhh/Kios-sehat",
    category: "web",
    featured: false,
  },
  {
    slug: "mountix",
    name: "Mountix",
    description:
      "Aplikasi pemesanan tiket pendakian gunung secara online. Dilengkapi sistem verifikasi, manajemen kuota, dan notifikasi real-time.",
    thumbnail: "/projects/mountix.png",
    techStack: ["Laravel", "Blade", "Tailwind", "MySQL"],
    githubUrl: "https://github.com/Malfrmnsyhh/Mountix",
    category: "web",
    featured: true,
  },
  {
    slug: "todoi",
    name: "TODOI",
    description:
      "Aplikasi manajemen tugas yang efisien dengan fitur pengelompokan, deadline, dan antarmuka modern yang responsif.",
    thumbnail: "/projects/todoi.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    githubUrl: "https://github.com/Malfrmnsyhh/TODOI",
    liveUrl: "https://todoi-app.vercel.app/",
    category: "web",
    featured: true,
  },
  {
    slug: "sikampus",
    name: "SiKampus",
    description:
      "SiKampus dirancang khusus untuk memudahkan administrator kampus dalam mengelola data civitas akademika secara terpusat.",
    thumbnail: "/projects/sikampus.png",
    techStack: ["PHP", "MySQL", "Bootstrap", "JavaScript", "Laragon"],
    githubUrl: "https://github.com/Malfrmnsyhh/dahsboard_admin",
    category: "web",
    featured: false,
  },
  {
    slug: "prediksi-harga-beras",
    name: "Rice Price Predictor",
    description:
      "Model klasifikasi dan prediksi harga beras di Jawa Timur menggunakan metode ANN Backpropagation.",
    thumbnail: "/projects/ANN.png",
    techStack: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    githubUrl: "https://github.com/Malfrmnsyhh/ANN-Backpropagation-Beras-Jatim",
    liveUrl:
      "https://ann-backpropagation-beras-jatim-t3psywvcas8i2sjkddxfme.streamlit.app/",
    category: "ml",
    featured: true,
  },
  {
    slug: "amera-coffee",
    name: "Amera Coffee POS",
    description:
      "Aplikasi Point of Sales (POS) berbasis desktop, mendukung manajemen stok dan cetak struk.",
    thumbnail: "/projects/POS.jpeg",
    techStack: ["Java", "Swing", "MySQL", "Netbeans"],
    githubUrl: "https://github.com/Malfrmnsyhh/amera-coffee-POS-java",
    category: "desktop",
    featured: false,
  },
  {
    slug: "studytrack",
    name: "StudyTrack",
    description:
      "Desain UI/UX untuk aplikasi pelacak kebiasaan belajar mahasiswa, fokus pada gamifikasi dan retensi pengguna.",
    thumbnail: "/projects/prototype.png",
    techStack: ["Figma", "Prototyping", "Wireframing"],
    githubUrl: "",
    liveUrl:
      "https://www.figma.com/proto/M77H09jtfWvCokPoBvAMrj/Project-UAS-UI-UX?page-id=9%3A125&node-id=64-2889&viewport=537%2C279%2C0.45&t=4P67QXZrwcDzPlMo-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=24%3A948",
    category: "design",
    featured: false,
  },
  {
    slug: "trackerio",
    name: "Traker.io",
    description:
      "Aplikasi ini memungkinkan pengguna untuk mencatat arus kas pemasukan dan pengeluaran, melihat ringkasan saldo, serta mengelola riwayat transaksi dengan antarmuka yang modern, dinamis, dan responsif.",
    thumbnail: "/projects/tracker.io.png",
    techStack: ["Html", "Javascripts", "CSS vanila"],
    githubUrl: "https://github.com/Malfrmnsyhh/expense-tracker-app",
    category: "web",
    featured: false,
  },
];
