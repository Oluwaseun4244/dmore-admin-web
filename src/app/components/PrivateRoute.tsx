import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("session", session);
    console.log("status", status);
  }, [session, status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      const returnUrl = encodeURIComponent(pathname as string);
      router.push(`/login?returnUrl=${returnUrl}`);
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <p className='font-sans text-white text-5xl'>Loading...</p>
      </div>
    );
  }

  return status === "authenticated" ? <>{children}</> : null;
};

export default PrivateRoute;
