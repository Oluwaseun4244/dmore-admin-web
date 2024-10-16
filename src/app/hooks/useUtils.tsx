import { signOut, useSession } from "next-auth/react";
import { useCallback } from "react";


export default function useUtils() {

  const { data: session } = useSession()
  const rolesWithAliases = [
    { role: 'finance', folder: 'finance' },
    { role: 'support', folder: 'support' },
    { role: 'guest', folder: 'Guest' },
    { role: 'Finance', folder: 'finance' },
  ];

  const getFolder = () => {
    const roleAlias = rolesWithAliases.find(r => r.role === session?.role);
    return roleAlias ? roleAlias.folder : null;
  }

  const handleSignout = useCallback(async () => {
    await signOut({ callbackUrl: '/login' });
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
