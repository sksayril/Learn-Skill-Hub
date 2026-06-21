"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import dynamic from "next/dynamic";

const NoticeModal = dynamic(() => import("@/components/NoticeModal"), { ssr: false });

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="skill-mission-theme">
        <TooltipProvider>
          {children}
          <Toaster />
          <NoticeModal />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

