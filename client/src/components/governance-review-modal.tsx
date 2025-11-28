import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface GovernanceReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
  currentStatus: string;
  currentAutonomy: string;
}

export function GovernanceReviewModal({
  isOpen,
  onClose,
  workerName,
  currentStatus,
  currentAutonomy,
}: GovernanceReviewModalProps) {
  const { toast } = useToast();
  const [reviewType, setReviewType] = useState("probation");
  const [outcome, setOutcome] = useState("approve");

  const handleSubmit = () => {
    toast({
      title: "Governance Review Submitted",
      description: `Review for ${workerName} has been recorded successfully.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Governance & Promotion Review</DialogTitle>
          <DialogDescription>
            Conduct a formal review for {workerName} to graduate from probation or promote autonomy.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Review Type</Label>
            <Select value={reviewType} onValueChange={setReviewType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="probation">Probation Graduation</SelectItem>
                <SelectItem value="promotion">Autonomy Promotion</SelectItem>
                <SelectItem value="quarterly">Quarterly Audit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-3 bg-muted/50 rounded border border-border text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Status:</span>
              <span className="font-medium">{currentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Autonomy:</span>
              <span className="font-medium">{currentAutonomy}</span>
            </div>
            {reviewType === "probation" && (
               <div className="flex justify-between text-blue-600">
                 <span className="font-medium">Target Status:</span>
                 <span className="font-bold">Active</span>
               </div>
            )}
            {reviewType === "promotion" && (
               <div className="flex justify-between text-blue-600">
                 <span className="font-medium">Target Autonomy:</span>
                 <span className="font-bold">Execute (Next Level)</span>
               </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Review Outcome</Label>
            <div className="grid grid-cols-3 gap-2">
              <div 
                className={`cursor-pointer border rounded p-3 flex flex-col items-center gap-2 hover:bg-muted/50 ${outcome === 'approve' ? 'border-green-500 bg-green-50/10' : ''}`}
                onClick={() => setOutcome('approve')}
              >
                <CheckCircle2 className={`w-5 h-5 ${outcome === 'approve' ? 'text-green-600' : 'text-muted-foreground'}`} />
                <span className="text-xs font-medium">Approve</span>
              </div>
              <div 
                className={`cursor-pointer border rounded p-3 flex flex-col items-center gap-2 hover:bg-muted/50 ${outcome === 'conditional' ? 'border-orange-500 bg-orange-50/10' : ''}`}
                onClick={() => setOutcome('conditional')}
              >
                <AlertTriangle className={`w-5 h-5 ${outcome === 'conditional' ? 'text-orange-600' : 'text-muted-foreground'}`} />
                <span className="text-xs font-medium">Conditional</span>
              </div>
              <div 
                className={`cursor-pointer border rounded p-3 flex flex-col items-center gap-2 hover:bg-muted/50 ${outcome === 'reject' ? 'border-red-500 bg-red-50/10' : ''}`}
                onClick={() => setOutcome('reject')}
              >
                <XCircle className={`w-5 h-5 ${outcome === 'reject' ? 'text-red-600' : 'text-muted-foreground'}`} />
                <span className="text-xs font-medium">Reject</span>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Review Notes & Justification</Label>
            <Textarea placeholder="Enter detailed findings from the review..." className="h-24" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Review</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
