import React from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';

interface CaptionDisplayProps {
  caption: string | null;
  isLoading: boolean;
}

export const CaptionDisplay: React.FC<CaptionDisplayProps> = ({ caption, isLoading }) => {
  if (isLoading) {
    return (
      <div className="analysis-card rounded-lg border analysis-border p-4 shadow-card">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Loader2 className="h-5 w-5 text-primary animate-spin" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">Generating Caption</h3>
            <div className="mt-2 space-y-2">
              <div className="h-3 bg-muted rounded animate-pulse w-3/4"></div>
              <div className="h-3 bg-muted rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!caption) {
    return (
      <div className="analysis-card rounded-lg border analysis-border p-4 shadow-card">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-muted/50">
            <MessageSquare className="h-5 w-5 text-analysis-muted" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Scene Caption</h3>
            <p className="text-sm text-analysis-muted mt-1">
              Upload an image to generate an automatic scene description.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-card rounded-lg border analysis-border p-4 shadow-card animate-fade-in">
      <div className="flex items-start space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">Scene Caption</h3>
          <p className="text-sm text-analysis-muted mt-2 leading-relaxed">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
};