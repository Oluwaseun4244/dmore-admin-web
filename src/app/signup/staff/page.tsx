import { Suspense } from "react";
import StaffSignupForm from "./staff-signup-form";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StaffSignupForm />
    </Suspense>
  );
}