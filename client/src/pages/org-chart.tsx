import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { ORG_DATA } from "@/lib/mock-data";
import { OrgNode } from "@/lib/types";
import { User, Bot, ChevronDown, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const OrgNodeItem = ({ node, level = 0 }: { node: OrgNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          "flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-muted/50 border mb-2 w-fit min-w-[300px]",
          node.type === 'digital' ? "border-primary/50 bg-primary/5" : "bg-card",
          level > 0 && "ml-8 relative"
        )}
      >
        {level > 0 && (
          <div className="absolute -left-6 top-1/2 w-6 h-px bg-border" />
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn("h-6 w-6", !hasChildren && "invisible")}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </Button>

        <div className={cn(
          "w-8 h-8 rounded-md flex items-center justify-center",
          node.type === 'digital' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
        )}>
          {node.type === 'digital' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium">{node.label}</span>
          <span className="text-xs text-muted-foreground">{node.role}</span>
        </div>
      </div>

      {hasChildren && isOpen && (
        <div className="relative border-l border-border ml-[19px] pl-4 py-1">
          {node.children!.map((child) => (
            <OrgNodeItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function OrgChart() {
  return (
    <MainLayout>
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold">Organizational Placement</h1>
            <p className="text-muted-foreground">View Digital Workers in context of the human organization.</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search org..." className="pl-8" />
          </div>
        </div>

        <Card className="flex-1 p-8 overflow-auto bg-muted/10 border-dashed">
          <div className="min-w-max">
             <OrgNodeItem node={ORG_DATA} />
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
