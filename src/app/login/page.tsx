import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="centerContainer">
        <h1>Logg inn</h1>
        <form>
          <div className="loginForm">
            <label htmlFor="username">Brukernavn</label>
            <input id="username"></input>
          </div>

          <div className="loginForm">
            <label htmlFor="password">Passord</label>
            <input id="password"></input>
          </div>

          <div className="gap-2 flex">
            <label htmlFor="persistentLogin">Husk meg?</label>
            <input id="persistentLogin" type="checkbox" />
          </div>
        </form>
      </main>
    </>
  );
}
