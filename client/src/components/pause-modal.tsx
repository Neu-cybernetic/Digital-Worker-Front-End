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
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

interface PauseModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
}

export function PauseModal({
  isOpen,
  onClose,
  workerName,
}: PauseModalProps) {
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Digital Worker Paused",
      description: `${workerName} has been suspended. All active scopes revoked.`,
      variant: "destructive"
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="w-5 h-5" />
            Pause Digital Worker
          </DialogTitle>
          <DialogDescription>
            Temporarily suspend {workerName}. This will revoke all active access tokens and stop new task ingestion.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="p-3 bg-orange-50 border border-orange-100 rounded text-sm text-orange-800">
            <strong>Warning:</strong> Pausing a worker in production may impact downstream dependencies. Ensure manual fallback is in place.
          </div>
          
          <div className="grid gap-2">
            <Label>Reason for Pause</Label>
            <Textarea placeholder="e.g., Investigating anomalous behavior, Policy update pending..." className="h-24" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={handleSubmit}>Confirm Pause</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
