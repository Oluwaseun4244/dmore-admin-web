import { selectAlert } from "@/lib/features/alert/alertSlice";
import { useAppSelector } from "@/lib/hooks";
import gsap from "gsap";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import React, { useEffect, useRef } from "react";

const Alert = () => {
  const { message, type, isVisible } = useAppSelector(selectAlert);
  const alertRef = useRef(null);

  const alertClasses = {
    success: "bg-green-100 text-green-500 text-green-700",
    error: "bg-red-100 text-red-500 text-red-700",
    info: "bg-blue-100 text-blue-500 text-blue-700",
    warning: "bg-yellow-100 text-yellow-500 text-yellow-700",
  };

  const IconComponent = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
    warning: AlertTriangle,
  }[type];

  useEffect(() => {
    if (alertRef.current) {
      if (isVisible) {
        gsap.fromTo(
          alertRef.current,
          { yPercent: -100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      } else {
        gsap.to(alertRef.current, {
          yPercent: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        });
      }
    }
  }, [isVisible]);

  if (!isVisible && !alertRef.current) return null;

  return (
    <div className='w-screen h-screen relative flex justify-center'>
      <div
        ref={alertRef}
        className={`fixed top-4 py-4 px-5 rounded-md border ${alertClasses[type]} flex items-center space-x-2`}
      >
        <IconComponent className='w-5 h-5' />
        <span className='font-sans text-[14px] leading-[19.2px]'>
          {message}
        </span>
      </div>
    </div>
  );
};

export default Alert;
