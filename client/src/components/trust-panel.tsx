import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MOCK_WORKERS } from "@/lib/mock-data";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, TrendingUp, AlertTriangle, Clock, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CorrectiveActionModal } from "@/components/corrective-action-modal";
import { cn } from "@/lib/utils";

interface TrustPanelProps {
  onReviewClick?: () => void;
  className?: string;
  onClose?: () => void;
}

export function TrustPanel({ onReviewClick, className, onClose }: TrustPanelProps) {
  const [isCapOpen, setIsCapOpen] = useState(false);
  // Using a fixed worker for the prototype as per spec (Luna - Claims Agent)
  // In a real app this would be context-aware or use the selected worker
  const worker = MOCK_WORKERS[0]; // Fallback to first worker if Luna not found in mock
  
  // Mock data for the specific "Luna" example from the spec
  const demoWorker = {
    name: "Luna",
    role: "Claims Agent",
    risk: "Critical",
    autonomy: "Orchestrate",
    status: "Probation",
    slo: 94,
    valueRisk: 8.7,
    hx: 91,
    trustTrend: "up"
  };

  return (
    <>
      <div className={cn("w-96 border-l bg-card flex flex-col overflow-y-auto h-full shadow-xl", className)}>
        <div className="p-6 border-b flex items-center justify-between bg-card sticky top-0 z-10 backdrop-blur-xl bg-card/80">
          <h3 className="font-semibold flex items-center gap-2 text-lg">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Trust & Control
          </h3>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="p-6 space-y-8">
          {/* Worker Context */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xl shadow-sm">
                L
              </div>
              <div>
                <h4 className="font-bold text-xl">{demoWorker.name}</h4>
                <p className="text-sm text-muted-foreground">{demoWorker.role}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge type="risk" value={demoWorker.risk} />
              <StatusBadge type="autonomy" value={demoWorker.autonomy} />
              <StatusBadge type="status" value={demoWorker.status} />
            </div>
          </div>

          <Separator />

          {/* Key Metrics */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 p-3 rounded-lg bg-muted/30 border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">SLO Score</span>
                <p className="text-2xl font-bold tracking-tight">{demoWorker.slo}%</p>
              </div>
              <div className="space-y-1.5 p-3 rounded-lg bg-muted/30 border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Value/Risk</span>
                <p className="text-2xl font-bold tracking-tight">{demoWorker.valueRisk}</p>
              </div>
            </div>
            
            <div className="p-4 bg-green-50/50 border border-green-100 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-green-900">Trust Score</span>
                <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">↑ 12%</span>
              </div>
              <div className="w-full bg-green-200/50 h-2.5 rounded-full overflow-hidden">
                <div className="bg-green-600 h-full w-[91%] shadow-sm"></div>
              </div>
              <p className="text-xs text-green-700 font-medium flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" />
                High consistency in last 30 days
              </p>
            </div>
          </div>

          <Separator />

          {/* Live Guardrails */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Active Guardrails</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm p-3 bg-white rounded-lg border shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-foreground font-medium">PII Redaction Active</span>
              </div>
              <div className="flex items-start gap-3 text-sm p-3 bg-white rounded-lg border shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <span className="text-foreground font-medium">Spend Limit: $500</span>
              </div>
              <div className="flex items-start gap-3 text-sm p-3 bg-amber-50 border-amber-200 rounded-lg border shadow-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-amber-900 font-medium">Probation: Human Approval Required</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3 h-11 font-medium hover:bg-muted/50 border-dashed" onClick={onReviewClick}>
              <Clock className="w-4 h-4 text-muted-foreground" />
              Review Probation Period
            </Button>
            <Button variant="destructive" className="w-full justify-start gap-3 h-11 font-medium bg-red-50 text-red-600 hover:bg-red-100 border-red-200 border shadow-none" onClick={() => setIsCapOpen(true)}>
              <AlertTriangle className="w-4 h-4" />
              Open Corrective Action
            </Button>
          </div>
        </div>
      </div>

      <CorrectiveActionModal 
        isOpen={isCapOpen} 
        onClose={() => setIsCapOpen(false)} 
        workerName={demoWorker.name}
      />
    </>
  );
}
