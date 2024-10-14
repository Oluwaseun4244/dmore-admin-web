import { getSession, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useUtils from "../hooks/useUtils";
import { useAlert } from "@/lib/features/alert/useAlert";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getFolder, handleSignout } = useUtils()
  const { alert } = useAlert();
  const { status } = useSession();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  const routePath = pathname?.split('/')[1];


  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      const folder = await getFolder();

      console.log("SESSION HERE", session)
      if (session) {
        if (folder != routePath) {
          alert("You are not authorized!", "error");
          handleSignout()
          return
        } else {
          setHasSession(true);
        }
      } else {
        handleSignout()
        return
      }
      setLoading(false);
    };

    if (status !== "loading") {
      checkSession();
    }
  }, [status, routePath]);

  if (loading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <p className='font-sans text-white text-5xl'>Loading Private Route...</p>
      </div>
    );
  }

  return hasSession ? <>{children}</> : null;
};

export default PrivateRoute;
