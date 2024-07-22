export type OnboardingStage =
  | "welcome"
  | "buyer-signup"
  | "staff-signup"
  | "verifying-loading-screen"
  | "enter-otp"
  | "otp-verified"
  | "signup-successful";

export interface OnboardingChildrenProps {
  onNext: (stage: OnboardingStage) => void;
}
