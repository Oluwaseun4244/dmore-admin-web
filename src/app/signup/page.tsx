"use client";

import BuyerSignupForm from "@/app/ui/onboarding/buyer-signup-form";
import EnterOTP from "@/app/ui/onboarding/enter-otp";
import StaffSignupForm from "@/app/ui/onboarding/staff-signup-form";
import Welcome from "@/app/ui/onboarding/welcome";
import { useState } from "react";
import { OnboardingStage } from "../utils/definitions";
import VerifyingLoadingScreen from "../ui/onboarding/verifying-loading-screen";

const Signup = () => {
  const [stage, setStage] = useState<OnboardingStage>("welcome");

  const renderStage = () => {
    switch (stage) {
      case "welcome":
        return <Welcome onNext={setStage} />;
      case "buyer-signup":
        return <BuyerSignupForm onNext={setStage} />;
      case "staff-signup":
        return <StaffSignupForm onNext={setStage} />;
      case "enter-otp":
        return <EnterOTP onNext={setStage} />;
      case "verifying-loading-screen":
        return <VerifyingLoadingScreen onNext={setStage} />
      default:
        return <Welcome onNext={setStage} />;
    }
  };

  return <div className='w-full h-full'>{renderStage()}</div>;
};

export default Signup;
