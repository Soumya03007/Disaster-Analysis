import React from 'react';
import { Image as ImageIcon, Maximize2 } from 'lucide-react';

interface ImagePreviewProps {
  file: File;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ file, className = "" }) => {
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative analysis-card rounded-lg border analysis-border overflow-hidden shadow-card ${className}`}>
      <div className="aspect-video bg-muted flex items-center justify-center relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="animate-pulse-subtle">
              <ImageIcon className="h-12 w-12 text-analysis-muted" />
            </div>
          </div>
        )}
        
        <img
          src={imageUrl}
          alt="Disaster scene preview"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
        />
        
        <div className="absolute top-2 right-2">
          <button className="p-2 bg-black/20 hover:bg-black/40 rounded-md backdrop-blur-sm transition-colors">
            <Maximize2 className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-4 border-t analysis-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">Scene Analysis</h3>
            <p className="text-sm text-analysis-muted">
              {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle"></div>
            <span className="text-sm text-analysis-muted">Ready for analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};