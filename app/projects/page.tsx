import { Metadata } from "next";
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | Muhammad Akmal Firmansyah",
  description: "Kumpulan proyek yang pernah saya bangun mulai dari Web Development, Machine Learning, Desktop, hingga UI/UX Design.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
