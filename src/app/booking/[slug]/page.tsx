import { promises as fs } from "fs";
import path from "path";
import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Clinic {
  name?: string;
  openingHours?: { day: string; hours: string }[];
  services?: { name: string; price: number; dutation: number }[];
}

// Props som sendes til komponenten
interface ClinicPageProps {
  clinic: Clinic;
}

const ClinicPage: React.FC<ClinicPageProps> = ({ clinic }) => {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/booking">Tilbake</Link>
      <h1>{clinic.name || "No name available"}</h1>
      {clinic.openingHours && clinic.openingHours.length > 0 ? (
        <ul>
          {clinic.openingHours.map((entry, index) => (
            <li key={index}>
              <strong>{entry.day}:</strong> {entry.hours}
            </li>
          ))}
        </ul>
      ) : (
        <p>No opening hours available</p>
      )}

      {clinic.services && clinic.services.length > 0 ? (
        <div>
          <h2 className="mb-1 underline">Services:</h2>
          <ul>
            {clinic.services.map((entry, index) => (
              <li key={index}>
                <strong>{entry.name}:</strong> {entry.price} kr
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No services available</p>
      )}
    </div>
  );
};

// Genererer alle mulige statiske ruter for klinikkene
export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), "src", "data");
  const files = await fs.readdir(dataDir);

  // Generer statiske params for alle JSON-filer
  const paths = files
    .filter((file) => file.endsWith(".json")) // Filtrer for å kun inkludere JSON-filer
    .map((file) => ({
      slug: file.replace(".json", ""),
    }));

  return paths.map((path) => ({
    params: path,
  }));
}

// Henter klinikkdata for en spesifikk rute
export async function fetchClinic(slug: string) {
  const filePath = path.join(process.cwd(), "src", "data", `${slug}.json`);

  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    const clinic = JSON.parse(fileContents);
    return clinic;
  } catch {
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const clinic = await fetchClinic(params.slug);

  if (!clinic) {
    notFound();
  }

  return <ClinicPage clinic={clinic} />;
}
