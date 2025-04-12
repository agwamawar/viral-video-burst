
import React from 'react';
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SonnerToaster position="top-center" />
      <Header />
      <main className="flex-grow">
        <Hero />
        <UploadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
