
import React from 'react';
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import MorphingHeader from '@/components/MorphingHeader';
import MinimalUploadSection from '@/components/MinimalUploadSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SonnerToaster position="top-center" />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <main className="flex-grow p-6">
              <MorphingHeader />
              <MinimalUploadSection />
            </main>
            <Footer />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
