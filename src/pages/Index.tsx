
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
            <main className="flex-grow px-2 sm:px-4 mx-auto flex flex-col items-center justify-center gap-2 w-full">
              <div className="text-left w-full">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Hey, Stranger</h1>
                <p className="text-2xl md:text-3xl font-garamond text-foreground/90">Let's Make Your Content BlowUp</p>
              </div>
              <div className="w-full max-w-[54rem] px-2">
                <MetamorphicUploadSection />
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
