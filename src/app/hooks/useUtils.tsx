import { getSession, signOut } from "next-auth/react";
import { useCallback } from "react";


export default function useUtils() {


  const rolesWithAliases = [
    { role: 'finance', folder: 'finance' },
    { role: 'support', folder: 'support' },
    { role: 'guest', folder: 'Guest' },
    { role: 'manager', folder: 'Manager' },
    { role: null, folder: 'finance' }
  ];

  // Function to get alias by role
  // async function getFolder() {
  //   const session = await getSession();
  //   const roleAlias = rolesWithAliases.find(r => r.role === session?.role);

  //   return roleAlias ? roleAlias.folder : null;
  // }

  const getFolder = useCallback(async () => {
    const session = await getSession();
    const roleAlias = rolesWithAliases.find(r => r.role === session?.role);
    return roleAlias ? roleAlias.folder : null;
  }, []);

  const handleSignout = useCallback(async () => {
    await signOut();
  }, []);

  return {
    getFolder,
    handleSignout
  }
}
