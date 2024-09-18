import AboutCards from "./components/AboutCards";
import Alert from "./components/Alert";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center overflow-x-hidden'>
      <Header />
      <AboutCards />
      {/* <Alert /> */}
    </main>
  );
}
