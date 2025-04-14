
import React from 'react';
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import MorphingHeader from '@/components/MorphingHeader';
import MetamorphicUploadSection from '@/components/MetamorphicUploadSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SonnerToaster position="top-center" />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <main className="flex-grow p-6 mx-auto flex flex-col items-center justify-center gap-4">
              <MorphingHeader />
              <MetamorphicUploadSection />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
