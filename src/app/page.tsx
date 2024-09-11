import Header from "./components/Header";
import AboutCards from "./components/AboutCards";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-x-hidden">
      <Header />
      <AboutCards />
    </main>
  );
}
