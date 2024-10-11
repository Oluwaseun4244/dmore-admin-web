import { getSession, signOut } from "next-auth/react";
import { useCallback } from "react";


export default function useUtils() {


  const rolesWithAliases = [
    { role: 'finance', folder: 'finance' },
    { role: 'support', folder: 'support' },
    { role: 'guest', folder: 'Guest' },
    { role: 'Finance', folder: 'finance' },
  ];



  const getFolder = useCallback(async () => {
    const session = await getSession();
    const roleAlias = rolesWithAliases.find(r => r.role === session?.role);
    return roleAlias ? roleAlias.folder : null;
  }, []);

  const handleSignout = useCallback(async () => {
    await signOut();
    return;
  }, []);

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return {
    getFolder,
    handleSignout,
    isValidEmail
  }
}
