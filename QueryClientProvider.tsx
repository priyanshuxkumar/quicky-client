"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


interface ProvidersProps {
  children: React.ReactNode;
};



export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(new QueryClient())

  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  //       refetchOnWindowFocus: false, // Disable refetching on window focus
  //     },
  //   },
  // });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}