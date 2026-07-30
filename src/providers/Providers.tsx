"use client";

import React from 'react';
import { ThemeProvider } from './ThemeProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Global client context provider wrapper.
 * Can be used to hook up future theme contexts, auth, or query providers.
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
