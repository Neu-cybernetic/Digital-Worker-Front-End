import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Archive, ArrowRight, FileDown } from "lucide-react";
import { useState } from "react";

interface RetirementModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
}

export function RetirementModal({
  isOpen,
  onClose,
  workerName,
}: RetirementModalProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const handleRetirement = () => {
    toast({
      title: "Retirement Process Initiated",
      description: `${workerName} has been marked as Retired. Succession plan activated.`,
    });
    onClose();
    setStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Archive className="w-5 h-5 text-muted-foreground" />
            Decommission & Succession Wizard
          </DialogTitle>
          <DialogDescription>
            Retire {workerName} and transfer responsibilities to a successor.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-6 px-2 relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-muted -z-10" />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-background ${step >= 1 ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}`}>1</div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-background ${step >= 2 ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}`}>2</div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 bg-background ${step >= 3 ? 'border-primary text-primary' : 'border-muted text-muted-foreground'}`}>3</div>
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="space-y-2">
                <Label>Retirement Reason</Label>
                <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Obsolescence (New Tech)</option>
                  <option>Process Sunset</option>
                  <option>Performance Degradation</option>
                  <option>Cost Reduction</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Memory Export</Label>
                <div className="border rounded p-4 bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded text-primary">
                      <FileDown className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Full Context Dump.json</p>
                      <p className="text-xs text-muted-foreground">245 MB • Last synced 10m ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Verify Checksum</Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="space-y-2">
                <Label>Select Successor</Label>
                <Input placeholder="Search for replacement worker..." />
                <div className="mt-2 border rounded p-3 flex items-center gap-3 hover:bg-muted/50 cursor-pointer">
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">V3</div>
                  <div>
                    <p className="text-sm font-medium">InvoiceProcessor-Beta (v3.0)</p>
                    <p className="text-xs text-muted-foreground">Ready for Promotion • 98% Match</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Scope Handoff</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked readOnly className="accent-primary" />
                    <span>Transfer API Credentials</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked readOnly className="accent-primary" />
                    <span>Migrate Pending Tasks (Queued: 14)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked readOnly className="accent-primary" />
                    <span>Notify Stakeholders</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 py-4 text-center animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Archive className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg">Ready to Retire</h3>
                <p className="text-sm text-muted-foreground max-w-[300px] mx-auto">
                  This action will permanently archive <strong>{workerName}</strong>. The successor will immediately take over traffic.
                </p>
              </div>
              <div className="bg-muted p-4 rounded text-left text-xs font-mono space-y-1">
                <p>FROM: {workerName} (v2.4)</p>
                <p>TO: InvoiceProcessor-Beta (v3.0)</p>
                <p>EFFECTIVE: Immediate</p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
          )}
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)}>
              Next Step <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button variant="destructive" onClick={handleRetirement}>Confirm Retirement</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
