import { Metadata } from "next";
import CertificateClient from "./CertificateClient";

export const metadata: Metadata = {
  title: "Certificates | Portfolio",
  description: "A collection of my professional certificates and milestones.",
};

export default function CertificatePage() {
  return <CertificateClient />;
}
