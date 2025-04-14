
import React from 'react';
import { Upload } from "lucide-react";

interface FileUploadInputProps {
  selectedFile: File | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({ selectedFile, onChange }) => {
  return (
    <label 
      htmlFor="minimal-file-upload" 
      className="cursor-pointer flex-grow flex items-center gap-2 p-2 rounded-md hover:bg-muted/30 transition-colors"
    >
      <Upload className={`h-5 w-5 ${selectedFile ? 'text-primary' : 'text-muted-foreground'}`} />
      <span className={`text-sm ${selectedFile ? '' : 'text-muted-foreground'} truncate`}>
        {selectedFile ? selectedFile.name : "Upload Your Video"}
      </span>
      <input
        id="minimal-file-upload"
        type="file"
        accept="video/*"
        className="hidden"
        onChange={onChange}
      />
    </label>
  );
};

export default FileUploadInput;
