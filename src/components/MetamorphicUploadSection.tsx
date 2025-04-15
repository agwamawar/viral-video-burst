
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from '../hooks/use-toast';
import { Progress } from '../components/ui/progress';
import MorphingHeader from './MorphingHeader';

const MetamorphicUploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          navigate('/virality-report');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto">
      <MorphingHeader />
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileChange}
                accept="video/*,image/*"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-500 hover:text-blue-700"
              >
                Click to upload or drag files here
              </label>
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {file.name}
                </p>
              )}
            </div>
            
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleUpload} 
            disabled={!file || uploading}
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Analyze Virality'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MetamorphicUploadSection;
