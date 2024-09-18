import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <p className='font-sans text-white text-5xl'>Loading...</p>
      </div>
    );
  }

  return session ? <>{children}</> : null;
};

export default PrivateRoute;
