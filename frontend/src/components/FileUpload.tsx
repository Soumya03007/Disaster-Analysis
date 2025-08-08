import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onRemoveFile: () => void;
  isLoading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  onRemoveFile,
  isLoading = false
}) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false)
  });

  if (selectedFile) {
    return (
      <div className="relative analysis-card rounded-lg border analysis-border p-4 shadow-card animate-scale-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileImage className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-xs text-analysis-muted">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={onRemoveFile}
            disabled={isLoading}
            className="p-1 rounded-md hover:bg-destructive/10 transition-colors disabled:opacity-50"
          >
            <X className="h-4 w-4 text-destructive" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative cursor-pointer rounded-lg border-2 border-dashed transition-all duration-200",
        "p-8 text-center hover:border-primary/50 hover:bg-primary/5",
        "analysis-border bg-background",
        dragActive || isDragActive ? "border-primary bg-primary/10 shadow-upload" : "",
        isLoading && "pointer-events-none opacity-50"
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        <div className={cn(
          "p-4 rounded-full transition-all duration-200",
          dragActive || isDragActive 
            ? "bg-primary text-primary-foreground shadow-analysis" 
            : "bg-primary/10 text-primary"
        )}>
          <Upload className="h-8 w-8" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {dragActive || isDragActive ? "Drop your image here" : "Upload Disaster Scene Image"}
          </h3>
          <p className="text-sm text-analysis-muted">
            Drag and drop your image here, or click to browse
          </p>
          <p className="text-xs text-analysis-muted">
            Supports: JPG, JPEG, PNG (Max 200MB)
          </p>
        </div>
      </div>
    </div>
  );
};