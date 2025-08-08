import React from 'react';
import { AlertTriangle, Users, CloudRain, MapPin, Clock, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ReportData {
  disasterType: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  humanPresence: string;
  casualties: string;
  environmentalConditions: string;
  location: string;
  timeOfDay: string;
  visibility: string;
  immediateThreats: string[];
  recommendations: string[];
}

interface DisasterReportProps {
  report: ReportData | null;
  isLoading: boolean;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Low':
      return 'bg-green-900/20 text-green-400 border-green-800';
    case 'Medium':
      return 'bg-yellow-900/20 text-yellow-400 border-yellow-800';
    case 'High':
      return 'bg-red-900/20 text-red-400 border-red-800';
    case 'Critical':
      return 'bg-red-900/30 text-red-300 border-red-700 shadow-glow';
    default:
      return 'bg-gray-900/20 text-gray-400 border-gray-800';
  }
};

export const DisasterReport: React.FC<DisasterReportProps> = ({ report, isLoading }) => {
  if (isLoading) {
    return (
      <div className="analysis-card rounded-lg border analysis-border p-6 shadow-card">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="h-5 w-5 text-primary animate-pulse-subtle" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Generating Analysis Report</h2>
              <p className="text-sm text-analysis-muted">Processing disaster scene data...</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-1/4"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="analysis-card rounded-lg border analysis-border p-6 shadow-card">
        <div className="text-center space-y-4">
          <div className="p-4 rounded-full bg-muted/50 w-16 h-16 mx-auto flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-analysis-muted" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">No Analysis Available</h3>
            <p className="text-sm text-analysis-muted">
              Upload an image and click "Generate Report" to begin analysis.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-card rounded-lg border analysis-border p-6 shadow-card animate-fade-in-up">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Disaster Analysis Report</h2>
              <p className="text-sm text-analysis-muted">Automated scene assessment</p>
            </div>
          </div>
          <Badge className={getSeverityColor(report.severity)}>
            {report.severity} Risk
          </Badge>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-analysis-muted" />
              <span className="text-sm font-medium text-foreground">Disaster Type</span>
            </div>
            <p className="text-sm text-analysis-muted ml-6">{report.disasterType}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-analysis-muted" />
              <span className="text-sm font-medium text-foreground">Human Presence</span>
            </div>
            <p className="text-sm text-analysis-muted ml-6">{report.humanPresence}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-analysis-muted" />
              <span className="text-sm font-medium text-foreground">Location Context</span>
            </div>
            <p className="text-sm text-analysis-muted ml-6">{report.location}</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-analysis-muted" />
              <span className="text-sm font-medium text-foreground">Time of Day</span>
            </div>
            <p className="text-sm text-analysis-muted ml-6">{report.timeOfDay}</p>
          </div>
        </div>

        {/* Environmental Conditions */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CloudRain className="h-4 w-4 text-analysis-muted" />
            <span className="text-sm font-medium text-foreground">Environmental Conditions</span>
          </div>
          <p className="text-sm text-analysis-muted ml-6">{report.environmentalConditions}</p>
        </div>

        {/* Casualties */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-analysis-muted" />
            <span className="text-sm font-medium text-foreground">Casualty Assessment</span>
          </div>
          <p className="text-sm text-analysis-muted ml-6">{report.casualties}</p>
        </div>

        {/* Immediate Threats */}
        {report.immediateThreats.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Immediate Threats</h4>
            <div className="space-y-2">
              {report.immediateThreats.map((threat, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5"></div>
                  <p className="text-sm text-analysis-muted">{threat}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {report.recommendations.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Recommendations</h4>
            <div className="space-y-2">
              {report.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                  <p className="text-sm text-analysis-muted">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};