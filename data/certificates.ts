export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
  featured: boolean;
  category: string;
}

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "UI/UX Design",
    issuer: "Special Skill",
    date: "2026",
    image: "/certificates/asset/uiux.png",
    link: "#",
    featured: true,
    category: "UI/UX Design",
  },
  {
    id: "cert-2",
    title: "Front-End Web Developer",
    issuer: "Dicoding",
    date: "2026",
    image: "/certificates/asset/frontend.png",
    link: "#",
    featured: true,
    category: "Web Development",
  },
  {
    id: "cert-3",
    title: "Web Programing",
    issuer: "Dicoding",
    date: "2026",
    image: "/certificates/asset/webprograming.png",
    link: "#",
    featured: true,
    category: "Web Development",
  },
  {
    id: "cert-4",
    title: "Basic Programing Web",
    issuer: "Dicoding",
    date: "2026",
    image: "/certificates/asset/basicWeb.png",
    link: "#",
    featured: false,
    category: "Web Development",
  },
  {
    id: "cert-5",
    title: "Generative AI",
    issuer: "CODEPOLITAN",
    date: "2025",
    image: "/certificates/asset/generatifAI.png",
    link: "#",
    featured: false,
    category: "AI",
  },
  {
    id: "cert-6",
    title:
      "Kuliah Tamu 'Kecerdasan Buatam Berbasis Algoritma Evolusi - Konsep dan Penerapannya'",
    issuer: "Informatika UPN 'Veteran' Jawa Timur",
    date: "2024",
    image: "/certificates/asset/kuliah-tamu.png",
    link: "#",
    featured: false,
    category: "Other",
  },
  {
    id: "cert-7",
    title: "Pengkaderan Keluarga Himpunan Mahasiswa Informatika 2024/2025",
    issuer: "Informatika UPN 'Veteran' Jawa Timur",
    date: "2024",
    image: "/certificates/asset/kader.jpg",
    link: "#",
    featured: false,
    category: "Other",
  },
  {
    id: "cert-8",
    title:
      "Pemakalah Seminar Nasional Indonesia 'Mitigasi Kejahatan Berbahasa di tahun politik 2024'",
    issuer: "Fakultas Ilmu Sosial dan Ilmu Politik UPN 'Veteran' Jawa Timur",
    date: "2024",
    image: "/certificates/asset/senala.jpg",
    link: "#",
    featured: false,
    category: "Other",
  },
  {
    id: "cert-9",
    title: "Anggota Perlengkapan pada Building Charakter Day 2025",
    issuer: "Informatika UPN 'Veteran' Jawa Timur",
    date: "2025",
    image: "/certificates/asset/bcd.jpg",
    link: "#",
    featured: false,
    category: "Other",
  },
  {
    id: "cert-10",
    title: "Anggota Komdis pada Pekan Mahasiswa Baru (PEMABA) 2025",
    issuer: "Informatika UPN 'Veteran' Jawa Timur",
    date: "2025",
    image: "/certificates/asset/komdis.jpg",
    link: "#",
    featured: false,
    category: "Other",
  },
];

export const certificateCategories = [
  "All",
  "Web Development",
  "UI/UX Design",
  "AI",
  "Other",
];
