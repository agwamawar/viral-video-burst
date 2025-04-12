
import React from 'react';
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import UploadSection from "@/components/UploadSection";
import Footer from "@/components/Footer";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SonnerToaster position="top-center" />
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <Header />
            <main className="flex-grow">
              <UploadSection />
            </main>
            <Footer />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
