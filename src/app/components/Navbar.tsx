import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="p-2 bg-slate-100 flex justify-between">
      <Link href="/">Hjem</Link>
      <div className="flex gap-4">
        <Link href="/login">Logg inn</Link>
        <Link href="/register">Opprett bruker</Link>
      </div>
    </nav>
  );
};

export default Navbar;
