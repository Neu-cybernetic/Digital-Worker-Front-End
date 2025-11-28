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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CorrectiveActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
}

export function CorrectiveActionModal({
  isOpen,
  onClose,
  workerName,
}: CorrectiveActionModalProps) {
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Corrective Action Opened",
      description: `Case #CAP-${Math.floor(Math.random() * 1000)} has been created for ${workerName}.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Open Corrective Action Plan (CAP)</DialogTitle>
          <DialogDescription>
            Initiate a formal remediation process for performance or compliance failures.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Issue Summary</Label>
            <Input placeholder="e.g., Recurring SLO Breach in Invoice Processing" />
          </div>

          <div className="grid gap-2">
            <Label>Severity</Label>
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Minor Optimization</SelectItem>
                <SelectItem value="medium">Medium - Performance Degradation</SelectItem>
                <SelectItem value="high">High - Compliance/Risk Failure</SelectItem>
                <SelectItem value="critical">Critical - System Safety Breach</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Remediation Requirements</Label>
            <Textarea placeholder="Describe the required fixes (e.g., retraining, config change, scope reduction)..." className="h-24" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Assigned Owner</Label>
              <Input placeholder="e.g., Technical Lead" />
            </div>
            <div className="grid gap-2">
              <Label>Target Resolution Date</Label>
              <Input type="date" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleSubmit}>Open Case</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
