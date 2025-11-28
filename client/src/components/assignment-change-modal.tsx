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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GitBranch } from "lucide-react";

interface AssignmentChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName: string;
  currentRole: string;
  currentProcess: string;
}

export function AssignmentChangeModal({
  isOpen,
  onClose,
  workerName,
  currentRole,
  currentProcess,
}: AssignmentChangeModalProps) {
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Change Request Submitted",
      description: `Role realignment for ${workerName} submitted for approval.`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Role & Assignment Change
          </DialogTitle>
          <DialogDescription>
            Modify organizational alignment or process responsibilities. High-risk changes require Governance approval.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label>Change Type</Label>
            <Select defaultValue="realignment">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realignment">Org Realignment (BU Change)</SelectItem>
                <SelectItem value="process">Process Scope Expansion</SelectItem>
                <SelectItem value="transfer">Ownership Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">Current Role</Label>
              <div className="p-2 bg-muted/50 rounded text-sm font-medium">{currentRole}</div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">Target Role</Label>
              <Input placeholder="New Job Family..." />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">Current Process</Label>
              <div className="p-2 bg-muted/50 rounded text-sm font-medium">{currentProcess}</div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs uppercase">Target Process</Label>
              <Input placeholder="New Process..." />
            </div>
          </div>

          <div className="space-y-2">
             <Label>Justification</Label>
             <Input placeholder="Why is this change needed?" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
