import { DigitalWorker, OrgNode } from "./types";

export const MOCK_WORKERS: DigitalWorker[] = [
  {
    id: "DW-001",
    name: "InvoiceProcessor-Alpha",
    description: "Automates the ingestion and preliminary validation of vendor invoices across the North American region.",
    jobFamily: "Finance Operations",
    businessUnit: "Global Business Services",
    department: "Accounts Payable",
    primaryProcess: "Procure-to-Pay",
    riskTier: "Low",
    autonomyLevel: "Execute",
    status: "Active",
    primaryOwner: {
      name: "Sarah Jenkins",
      role: "AP Manager",
      avatar: "SJ"
    },
    technicalOwner: {
      name: "Platform Team A",
      role: "SRE"
    },
    capabilities: ["OCR", "SAP Integration", "Email Parsing"],
    createdAt: "2023-11-15",
    sloScore: 98,
    valueScore: 85,
    hxScore: 92,
    trustScore: 95,
    trustTrend: "up",
    valueRiskRatio: 8.5,
    incidentCount: 0,
    lastGovernanceReview: "2024-05-01",
    incidents: [],
    governanceReviews: [
      {
        id: "REV-001",
        date: "2024-05-01",
        reviewer: "Compliance Officer",
        type: "Quarterly",
        outcome: "Approved",
        notes: "Routine audit passed with no findings."
      }
    ],
    correctiveActions: [],
    versionHistory: [
      {
        version: "v2.4",
        date: "2024-04-15",
        changeType: "Config Change",
        description: "Updated vendor allowlist",
        author: "System Admin"
      },
      {
        version: "v2.3",
        date: "2024-02-10",
        changeType: "Promotion",
        description: "Promoted to Execute autonomy",
        author: "Governance Council"
      },
      {
        version: "v1.0",
        date: "2023-11-15",
        changeType: "Creation",
        description: "Initial deployment",
        author: "System Admin"
      }
    ]
  },
  {
    id: "DW-002",
    name: "CustSupport-Triage-Bot",
    description: "First-line customer support ticket classification and routing agent.",
    jobFamily: "Customer Experience",
    businessUnit: "Consumer Products",
    secondaryBusinessUnit: "North America Retail",
    department: "Support Ops",
    primaryProcess: "Incident Management",
    riskTier: "Medium",
    autonomyLevel: "Suggest",
    status: "Active",
    primaryOwner: {
      name: "Mike Ross",
      role: "Support Lead",
      avatar: "MR"
    },
    technicalOwner: {
      name: "AI Ops Team",
      role: "ML Engineer"
    },
    capabilities: ["NLP", "Ticket Routing", "Sentiment Analysis"],
    createdAt: "2024-01-10",
    sloScore: 92,
    valueScore: 78,
    hxScore: 88,
    trustScore: 89,
    trustTrend: "flat",
    valueRiskRatio: 6.2,
    incidentCount: 2,
    lastGovernanceReview: "2024-04-15",
    incidents: [
      {
        id: "INC-102",
        date: "2024-03-12",
        type: "Misclassification",
        severity: "Low",
        description: "Incorrectly routed VIP tickets to general queue",
        status: "Resolved",
        resolution: "Retrained classification model"
      }
    ],
    governanceReviews: [
      {
        id: "REV-002",
        date: "2024-04-15",
        reviewer: "Risk Team",
        type: "Quarterly",
        outcome: "Approved",
        notes: "Performance acceptable despite minor incidents."
      }
    ],
    correctiveActions: [],
    versionHistory: [
      {
        version: "v1.2",
        date: "2024-03-15",
        changeType: "Config Change",
        description: "Model retraining deployment",
        author: "ML Ops"
      },
      {
        version: "v1.0",
        date: "2024-01-10",
        changeType: "Creation",
        description: "Initial launch",
        author: "System Admin"
      }
    ]
  },
  {
    id: "DW-003",
    name: "TradeSettlement-V2",
    description: "High-volume trade settlement reconciliation agent for equities.",
    jobFamily: "Capital Markets",
    businessUnit: "Investment Banking",
    department: "Back Office",
    primaryProcess: "Trade Settlement",
    riskTier: "Critical",
    autonomyLevel: "Observe",
    status: "Probation",
    probationEndDate: "2024-08-01",
    primaryOwner: {
      name: "Elena Fisher",
      role: "Director of Ops",
      avatar: "EF"
    },
    technicalOwner: {
      name: "FinTech Core",
      role: "DevLead"
    },
    capabilities: ["SWIFT Messaging", "Reconciliation", "Exception Handling"],
    createdAt: "2024-02-20",
    sloScore: 88,
    valueScore: 95,
    hxScore: 75,
    trustScore: 82,
    trustTrend: "down",
    valueRiskRatio: 4.1,
    incidentCount: 0,
    lastGovernanceReview: "2024-05-10",
    incidents: [],
    governanceReviews: [],
    correctiveActions: [
      {
        id: "CAP-001",
        dateOpened: "2024-05-12",
        issue: "Probation Review Pending",
        remediationPlan: "Complete 90-day observation period review",
        status: "Open",
        assignedTo: "Elena Fisher",
        dueDate: "2024-06-01"
      }
    ],
    versionHistory: [
      {
        version: "v1.0",
        date: "2024-02-20",
        changeType: "Creation",
        description: "Probationary deployment",
        author: "System Admin"
      }
    ]
  },
  {
    id: "DW-004",
    name: "MarketingContent-Gen",
    description: "Generates draft social media copy for campaign launches.",
    jobFamily: "Marketing",
    businessUnit: "Global Marketing",
    department: "Social Media",
    primaryProcess: "Campaign Management",
    riskTier: "High",
    autonomyLevel: "Suggest",
    status: "Paused",
    primaryOwner: {
      name: "David Lee",
      role: "CMO Office",
      avatar: "DL"
    },
    technicalOwner: {
      name: "GenAI Center of Excellence",
      role: "Prompt Engineer"
    },
    capabilities: ["Content Generation", "Brand Voice Check"],
    createdAt: "2024-03-05",
    sloScore: 75,
    valueScore: 60,
    hxScore: 65,
    trustScore: 70,
    trustTrend: "flat",
    valueRiskRatio: 2.5,
    incidentCount: 1,
    lastGovernanceReview: "2024-03-20",
    incidents: [
      {
        id: "INC-201",
        date: "2024-04-01",
        type: "Policy Violation",
        severity: "High",
        description: "Generated content violating brand safety guidelines",
        status: "Open",
        resolution: "Pending investigation"
      }
    ],
    governanceReviews: [],
    correctiveActions: [
      {
        id: "CAP-002",
        dateOpened: "2024-04-02",
        issue: "Brand Safety Violation",
        remediationPlan: "Adjust prompt constraints and re-test",
        status: "In Progress",
        assignedTo: "GenAI COE",
        dueDate: "2024-04-15"
      }
    ],
    versionHistory: [
      {
        version: "v1.1",
        date: "2024-03-20",
        changeType: "Config Change",
        description: "Updated negative prompts",
        author: "Prompt Engineer"
      },
      {
        version: "v1.0",
        date: "2024-03-05",
        changeType: "Creation",
        description: "Initial deployment",
        author: "David Lee"
      }
    ]
  },
  {
    id: "DW-005",
    name: "NetworkSecurity-Watchdog",
    description: "Monitors network traffic patterns for anomalies and triggers automated isolation protocols.",
    jobFamily: "Cybersecurity",
    businessUnit: "IT Security",
    department: "SecOps",
    primaryProcess: "Threat Response",
    riskTier: "Critical",
    autonomyLevel: "Orchestrate",
    status: "Active",
    primaryOwner: {
      name: "Amanda Waller",
      role: "CISO",
      avatar: "AW"
    },
    technicalOwner: {
      name: "SecOps Team",
      role: "Security Architect"
    },
    capabilities: ["Anomaly Detection", "Firewall Management", "Incident Reporting"],
    createdAt: "2023-09-12",
    sloScore: 99,
    valueScore: 99,
    hxScore: 95,
    trustScore: 98,
    trustTrend: "up",
    valueRiskRatio: 9.8,
    incidentCount: 0,
    lastGovernanceReview: "2024-05-01",
    incidents: [],
    governanceReviews: [
      {
        id: "REV-005",
        date: "2024-05-01",
        reviewer: "External Auditor",
        type: "Quarterly",
        outcome: "Approved",
        notes: "Excellent compliance record."
      }
    ],
    correctiveActions: [],
    versionHistory: [
      {
        version: "v3.0",
        date: "2024-01-15",
        changeType: "Promotion",
        description: "Promoted to Orchestrate autonomy",
        author: "CISO"
      },
      {
        version: "v2.0",
        date: "2023-11-01",
        changeType: "Config Change",
        description: "Updated threat signatures",
        author: "SecOps"
      },
      {
        version: "v1.0",
        date: "2023-09-12",
        changeType: "Creation",
        description: "Initial deployment",
        author: "SecOps"
      }
    ]
  }
];

export const ORG_DATA: OrgNode = {
  id: "human-1",
  type: "human",
  label: "Sarah Jenkins (AP Manager)",
  role: "Primary Owner",
  children: [
    {
      id: "dw-1",
      type: "digital",
      label: "InvoiceProcessor-Alpha",
      role: "Digital Worker",
      children: [
        {
          id: "human-2",
          type: "human",
          label: "Risk Compliance Officer",
          role: "Governance"
        }
      ]
    },
    {
      id: "human-3",
      type: "human",
      label: "Junior AP Analyst",
      role: "Oversight"
    }
  ]
};
