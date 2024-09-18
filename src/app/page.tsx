import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mainContainer">
        <div>
          <h1>Timebookeren er et SAAS-verktøy som gir deg...</h1>
          <Link className="p-2 bg-orange-200 rounded-md" href="/booking">
            Kom i gang!
          </Link>
        </div>
      </main>
    </>
  );
}
