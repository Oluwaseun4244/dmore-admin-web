import { getSession, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        const returnUrl = encodeURIComponent(pathname as string);
        router.push(`/login?returnUrl=${returnUrl}`);
      } else {
        setHasSession(true);
      }
      setLoading(false);
    };

    if (status !== "loading") {
      checkSession();
    }
  }, [status, router, pathname]);

  if (loading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <p className='font-sans text-white text-5xl'>Loading...</p>
      </div>
    );
  }

  return hasSession ? <>{children}</> : null;
};

export default PrivateRoute;
