import type { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { SearchProvider } from './SearchProvider';

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * A wrapper component to manage all global context providers.
 * Order matters: Higher-level providers (like Auth) should wrap 
 * data-dependent providers (like Search).
 */
const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AuthProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </AuthProvider>
  );
}

export default AppProviders;