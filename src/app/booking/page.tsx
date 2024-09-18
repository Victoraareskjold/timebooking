import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import React from "react";

// Type for en klinikk
interface Clinic {
  name: string;
}

// Props som sendes til komponenten
interface ClinicsPageProps {
  clinics: { slug: string; name: string }[];
}

const ClinicsPage: React.FC<ClinicsPageProps> = ({ clinics }) => {
  return (
    <div>
      <Link href="/">Tilbake</Link>

      <h1>Available Clinics</h1>
      <ul>
        {clinics.map((clinic, index) => (
          <li key={index}>
            <Link href={`/booking/${clinic.slug}`}>{clinic.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Genererer alle mulige statiske ruter for klinikkene
export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), "src", "data");
  const files = await fs.readdir(dataDir);

  // Generer statiske params for alle JSON-filer
  const paths = files
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      slug: file.replace(".json", ""),
    }));

  return paths.map((path) => ({
    params: path,
  }));
}

// Henter klinikkdata for den statiske siden
export async function fetchClinics() {
  const dataDir = path.join(process.cwd(), "src", "data");
  const files = await fs.readdir(dataDir);

  // Hent klinikkdata fra alle JSON-filer
  const clinics = await Promise.all(
    files
      .filter((file) => file.endsWith(".json")) // Filtrer kun JSON-filer
      .map(async (file) => {
        const filePath = path.join(dataDir, file);
        const fileContents = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(fileContents);
        return {
          slug: file.replace(".json", ""),
          name: data.name,
        };
      })
  );

  return clinics;
}

export default async function Page() {
  const clinics = await fetchClinics();

  return <ClinicsPage clinics={clinics} />;
}
