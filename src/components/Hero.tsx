
import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToUpload = () => {
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          <span>Make Your Videos </span>
          <span className="bg-clip-text text-transparent bg-gradient-viral">Go Viral</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          BlowUp AI analyzes your videos and predicts their viral potential. Get insights and recommendations to maximize your content's reach.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-viral hover:bg-gradient-viral hover:opacity-90"
            onClick={scrollToUpload}
          >
            Analyze Your Video
          </Button>
          <Button size="lg" variant="outline">
            Learn How It Works
          </Button>
        </div>

        <div className="mt-20 text-center">
          <Button variant="ghost" onClick={scrollToUpload} className="animate-bounce">
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
