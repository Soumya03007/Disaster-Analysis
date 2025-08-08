import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { ImagePreview } from '@/components/ImagePreview';
import { CaptionDisplay } from '@/components/CaptionDisplay';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Zap, Shield, Activity } from 'lucide-react';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);
  const [rawReport, setRawReport] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setCaption(null);
    setRawReport(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setCaption(null);
    setRawReport(null);
  };

  const handleGenerateReport = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:8000/analyze/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      setCaption(data.caption);
      setRawReport(data.report);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setCaption("❌ Failed to generate caption.");
      setRawReport("❌ Failed to generate report.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b analysis-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 scarlet-glow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg gradient-primary shadow-glow">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Disaster Scene Analysis</h1>
              <p className="text-sm text-analysis-muted">AI-powered emergency response tool</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Upload Section */}
          <section className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Upload Disaster Scene Image</h2>
              <p className="text-lg text-analysis-muted">
                Get instant AI-powered analysis of emergency situations
              </p>
            </div>

            <FileUpload
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              onRemoveFile={handleRemoveFile}
              isLoading={isLoading}
            />
          </section>

          {/* Action Button */}
          {selectedFile && (
            <div className="flex justify-center animate-fade-in">
              <Button
                onClick={handleGenerateReport}
                disabled={isLoading}
                size="lg"
                className="gradient-primary text-white hover:shadow-glow transition-all duration-300 disabled:opacity-50 shadow-analysis"
              >
                {isLoading ? (
                  <>
                    <Activity className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Scene...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Generate Analysis Report
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Results Section */}
          {selectedFile && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
              {/* Left Column */}
              <div className="space-y-6">
                <ImagePreview file={selectedFile} />
                <CaptionDisplay caption={caption} isLoading={isLoading} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {rawReport && (
                  <div className="bg-card p-6 rounded-lg shadow-md border border-border">
                    <h2 className="text-xl font-semibold text-foreground mb-4">📝 Disaster Report</h2>
                    <pre className="whitespace-pre-wrap text-sm text-foreground">{rawReport}</pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Features Section */}
          {!selectedFile && (
            <section className="mt-16 animate-fade-in">
              <div className="text-center space-y-8">
                <h3 className="text-2xl font-bold text-foreground">AI-Powered Emergency Analysis</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="analysis-card rounded-lg border analysis-border p-6 shadow-card text-center space-y-4 hover:shadow-glow transition-all duration-300">
                    <div className="p-3 rounded-lg bg-primary/20 w-fit mx-auto shadow-glow">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">Instant Analysis</h4>
                    <p className="text-sm text-analysis-muted">
                      Get real-time scene analysis and threat assessment in seconds
                    </p>
                  </div>

                  <div className="analysis-card rounded-lg border analysis-border p-6 shadow-card text-center space-y-4 hover:shadow-glow transition-all duration-300">
                    <div className="p-3 rounded-lg bg-primary/20 w-fit mx-auto shadow-glow">
                      <AlertTriangle className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground">Risk Assessment</h4>
                    <p className="text-sm text-analysis-muted">
                      Comprehensive evaluation of immediate threats and safety concerns
                    </p>
                  </div>

                  <div className="analysis-card rounded-lg border analysis-border p-6 shadow-card text-center space-y-4 hover:shadow-glow transition-all duration-300">
                    <div className="p-3 rounded-lg bg-green-900/20 w-fit mx-auto green-glow">
                      <Shield className="h-6 w-6 text-green-400" />
                    </div>
                    <h4 className="font-semibold text-foreground">Response Guidance</h4>
                    <p className="text-sm text-analysis-muted">
                      Actionable recommendations for emergency response teams
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
