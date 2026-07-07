import { Metadata } from "next";
import { ProjectsClient } from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | Muhammad Akmal Firmansyah",
  description: "A collection of projects. Built by Muhammad Akmal Firmansyah",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
