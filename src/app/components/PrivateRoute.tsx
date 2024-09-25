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
        // router.push("/login");
      } else {
        setHasSession(true);
      }
      setLoading(false);
    };

    if (status !== "loading") {
      checkSession();
    }
  }, [status, router, pathname]);

  // useEffect(() => {
  //   console.log("session", session);
  //   console.log("status", status);
  // }, [session, status]);

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     const returnUrl = encodeURIComponent(pathname as string);
  //     router.push(`/login?returnUrl=${returnUrl}`);
  //   }
  // }, [status, router, pathname]);

  if (loading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <p className='font-sans text-white text-5xl'>Loading...</p>
      </div>
    );
  }

  // return status === "authenticated" ? <>{children}</> : null;
  return hasSession ? <>{children}</> : null;
};

export default PrivateRoute;



// import { useSession, getSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const { status } = useSession();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [hasSession, setHasSession] = useState(false);

//   useEffect(() => {
//     const checkSession = async () => {
//       const session = await getSession();
//       if (!session) {
//         router.push("/login");
//       } else {
//         setHasSession(true);
//       }
//       setLoading(false);
//     };

//     if (status !== "loading") {
//       checkSession();
//     }
//   }, [status, router]);

//   if (loading) {
//     return (
//       <div className='w-screen h-screen flex justify-center items-center'>
//         <p className='font-sans text-white text-5xl'>Loading...</p>
//       </div>
//     );
//   }

//   return hasSession ? <>{children}</> : null;
// };

// export default PrivateRoute;