export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "kios-sehat",
    title: "Kios Sehat",
    description:
      "Platform manajemen toko kesehatan berbasis web. Mengelola produk, transaksi, dan laporan keuangan dengan antarmuka yang intuitif.",
    tech: ["Laravel", "MySQL", "Bootstrap", "JavaScript"],
    github: "https://github.com/malfrmnsyah",
    demo: "#",
    featured: true,
  },
  {
    id: "mountix",
    title: "Mountix",
    description:
      "Aplikasi pemesanan tiket pendakian gunung secara online. Dilengkapi sistem verifikasi, manajemen kuota, dan notifikasi real-time.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    github: "https://github.com/malfrmnsyah",
    demo: "#",
    featured: true,
  },
  {
    id: "sikampus",
    title: "SiKampus",
    description:
      "Sistem informasi kampus terintegrasi untuk manajemen akademik: jadwal, nilai, absensi, dan pengumuman dalam satu platform.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/malfrmnsyah",
    demo: "#",
    featured: true,
  },
  {
    id: "ml-classifier",
    title: "Image Classifier",
    description:
      "Model klasifikasi gambar menggunakan Convolutional Neural Network. Dilatih pada dataset kustom dengan akurasi validasi 92%.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV"],
    github: "https://github.com/malfrmnsyah",
    demo: "#",
  },
  {
    id: "todo-app",
    title: "Task Manager Pro",
    description:
      "Aplikasi manajemen tugas dengan fitur drag-and-drop, kategori, deadline, dan sinkronisasi data real-time.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    github: "https://github.com/malfrmnsyah",
    demo: "#",
  },
  {
    id: "api-gateway",
    title: "REST API Gateway",
    description:
      "Gateway API modular dengan autentikasi JWT, rate limiting, logging, dan dokumentasi Swagger otomatis.",
    tech: ["Node.js", "Express", "Redis", "Docker"],
    github: "https://github.com/malfrmnsyah",
    demo: "#",
  },
];
