import { LucideIcon } from "lucide-react";

export type RiskTier = "Low" | "Medium" | "High" | "Critical";
export type AutonomyLevel = "Observe" | "Suggest" | "Execute" | "Orchestrate";
export type WorkerStatus = "Active" | "Paused" | "Retired" | "Stage" | "Probation" | "Retirement Candidate";

export interface IncidentRecord {
  id: string;
  date: string;
  type: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  description: string;
  status: "Open" | "Resolved";
  resolution?: string;
}

export interface GovernanceReview {
  id: string;
  date: string;
  reviewer: string;
  type: "Quarterly" | "Promotion" | "Probation" | "Incident";
  outcome: "Approved" | "Rejected" | "Conditional";
  notes: string;
}

export interface CorrectiveAction {
  id: string;
  dateOpened: string;
  issue: string;
  remediationPlan: string;
  status: "Open" | "In Progress" | "Closed";
  assignedTo: string;
  dueDate: string;
}

export interface VersionHistory {
  version: string;
  date: string;
  changeType: "Creation" | "Promotion" | "Config Change" | "Rollback";
  description: string;
  author: string;
}

export interface DigitalWorker {
  id: string;
  name: string;
  description: string;
  jobFamily: string;
  department: string;
  businessUnit: string;
  secondaryBusinessUnit?: string; // Multi-Home Identity
  primaryProcess: string;
  riskTier: RiskTier;
  autonomyLevel: AutonomyLevel;
  status: WorkerStatus;
  primaryOwner: {
    name: string;
    role: string;
    avatar?: string;
  };
  technicalOwner: {
    name: string;
    role: string;
  };
  capabilities: string[];
  createdAt: string;
  
  // Extended Metrics for Backlog
  sloScore: number; // 0-100
  valueScore: number; // 0-100 (Contribution Index)
  hxScore: number; // 0-100 (Human Experience)
  trustScore: number; // 0-100
  trustTrend: "up" | "down" | "flat";
  valueRiskRatio: number;
  incidentCount: number;
  lastGovernanceReview: string;
  probationEndDate?: string;

  // New Data Structures for Backlog Features
  incidents?: IncidentRecord[];
  governanceReviews?: GovernanceReview[];
  correctiveActions?: CorrectiveAction[];
  versionHistory?: VersionHistory[];
}

export interface OrgNode {
  id: string;
  type: 'human' | 'digital';
  label: string;
  role?: string;
  children?: OrgNode[];
}
