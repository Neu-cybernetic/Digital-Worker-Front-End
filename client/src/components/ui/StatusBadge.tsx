import { cn } from "@/lib/utils";
import { RiskTier, AutonomyLevel, WorkerStatus } from "@/lib/types";
import { 
  Circle, 
  Triangle, 
  Square, 
  Hexagon, 
  Eye, 
  Lightbulb, 
  Rocket, 
  Crown,
  CheckCircle2,
  PauseCircle,
  Clock,
  AlertCircle
} from "lucide-react";

interface StatusBadgeProps {
  type: "risk" | "autonomy" | "status";
  value: string;
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({ type, value, className, showIcon = true }: StatusBadgeProps) {
  let badgeClass = "";
  let Icon = null;

  if (type === "risk") {
    switch (value as RiskTier) {
      case "Low": 
        badgeClass = "badge-risk-low"; 
        Icon = Hexagon;
        break;
      case "Medium": 
        badgeClass = "badge-risk-medium"; 
        Icon = Square;
        break;
      case "High": 
        badgeClass = "badge-risk-high"; 
        Icon = Triangle;
        break;
      case "Critical": 
        badgeClass = "badge-risk-critical"; 
        Icon = Circle;
        break;
      default: 
        badgeClass = "bg-gray-100 text-gray-800";
        Icon = Circle;
    }
  } else if (type === "autonomy") {
    switch (value as AutonomyLevel) {
      case "Observe": 
        badgeClass = "badge-autonomy-observe"; 
        Icon = Eye;
        break;
      case "Suggest": 
        badgeClass = "badge-autonomy-suggest"; 
        Icon = Lightbulb;
        break;
      case "Execute": 
        badgeClass = "badge-autonomy-execute"; 
        Icon = Rocket;
        break;
      case "Orchestrate": 
        badgeClass = "badge-autonomy-orchestrate"; 
        Icon = Crown;
        break;
      default: 
        badgeClass = "bg-gray-100 text-gray-800";
        Icon = Eye;
    }
  } else if (type === "status") {
    switch (value as WorkerStatus) {
      case "Active": 
        badgeClass = "bg-green-50 text-green-700 border-green-200"; 
        Icon = CheckCircle2;
        break;
      case "Paused": 
        badgeClass = "bg-gray-100 text-gray-700 border-gray-200"; 
        Icon = PauseCircle;
        break;
      case "Retired": 
        badgeClass = "bg-gray-100 text-gray-500 border-gray-200"; 
        Icon = Circle;
        break;
      case "Probation": 
        badgeClass = "bg-orange-50 text-orange-700 border-orange-200"; 
        Icon = Clock;
        break;
      case "Stage": 
        badgeClass = "bg-blue-50 text-blue-700 border-blue-200"; 
        Icon = Circle;
        break;
      case "Retirement Candidate":
        badgeClass = "bg-red-50 text-red-700 border-red-200";
        Icon = AlertCircle;
        break;
      default: 
        badgeClass = "bg-gray-100 text-gray-800";
        Icon = Circle;
    }
  }

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
      badgeClass,
      className
    )}>
      {showIcon && Icon && <Icon className="w-3.5 h-3.5" />}
      {value}
    </span>
  );
}
