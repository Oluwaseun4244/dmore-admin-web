import { Suspense } from "react";
import LoginForm from './login/login-form';
import Spinner from "./components/generic/Spinner";


export default function Home() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><Spinner /></div>}>
      <LoginForm />
    </Suspense>
  );
}

