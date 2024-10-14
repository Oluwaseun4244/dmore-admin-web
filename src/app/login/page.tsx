import { Suspense } from "react";
import LoginForm from "./login-form";

export default function Login() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center">Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}
