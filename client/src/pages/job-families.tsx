import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Network, 
  Briefcase, 
  Layers, 
  Shield, 
  Users, 
  Code, 
  FileText, 
  MoreHorizontal,
  ChevronRight,
  GitBranch,
  Database,
  BrainCircuit,
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Job Architecture
const JOB_FAMILIES = [
  {
    id: "finance",
    title: "Finance Operations",
    description: "Digital workers focused on accounting, reconciliation, and financial reporting.",
    count: 142,
    riskProfile: "High",
    roles: [
      { id: "fin-ap", title: "AP Specialist", level: "L2", type: "Transactional" },
      { id: "fin-gl", title: "GL Reconciler", level: "L3", type: "Analytical" },
      { id: "fin-audit", title: "Compliance Auditor", level: "L4", type: "Governance" },
    ]
  },
  {
    id: "customer",
    title: "Customer Experience",
    description: "Front-line agents handling inquiries, support tickets, and customer outreach.",
    count: 385,
    riskProfile: "Medium",
    roles: [
      { id: "cx-triage", title: "Triage Agent", level: "L1", type: "Transactional" },
      { id: "cx-support", title: "Support Specialist", level: "L2", type: "Interactive" },
      { id: "cx-retention", title: "Retention Analyst", level: "L3", type: "Analytical" },
    ]
  },
  {
    id: "it",
    title: "IT Operations",
    description: "Automation for infrastructure management, ticketing, and system monitoring.",
    count: 89,
    riskProfile: "Medium",
    roles: [
      { id: "it-monitor", title: "System Monitor", level: "L1", type: "Transactional" },
      { id: "it-prov", title: "Provisioning Bot", level: "L2", type: "Operational" },
    ]
  },
  {
    id: "hr",
    title: "People & Talent",
    description: "Digital assistants for recruiting, onboarding, and employee services.",
    count: 45,
    riskProfile: "Low",
    roles: [
      { id: "hr-sched", title: "Interview Scheduler", level: "L1", type: "Administrative" },
      { id: "hr-onboard", title: "Onboarding Guide", level: "L2", type: "Interactive" },
    ]
  }
];

const SKILLS_TAXONOMY = [
  {
    category: "Cognitive",
    skills: ["Natural Language Understanding", "Sentiment Analysis", "Image Recognition", "Decision Making"]
  },
  {
    category: "Systems",
    skills: ["SAP S/4HANA", "Salesforce", "ServiceNow", "Workday", "Microsoft Graph"]
  },
  {
    category: "Process",
    skills: ["Invoice Processing", "Reconciliation", "Ticket Routing", "Data Entry", "Report Generation"]
  }
];

export default function JobFamilies() {
  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)] gap-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-primary" />
              Job Architecture & Taxonomy
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Define the standardized roles, skills, and governance profiles for your digital workforce. 
              Establish clear career paths and capability requirements for AI agents.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Network className="w-4 h-4" />
              Visualize Graph
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Job Family
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="families" className="flex-1 flex flex-col min-h-0">
          <div className="border-b">
            <TabsList className="bg-transparent h-12 w-full justify-start gap-6 p-0">
              <TabsTrigger 
                value="families" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 pb-3 bg-transparent"
              >
                Job Families
              </TabsTrigger>
              <TabsTrigger 
                value="roles" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 pb-3 bg-transparent"
              >
                Standardized Roles
              </TabsTrigger>
              <TabsTrigger 
                value="skills" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 pb-3 bg-transparent"
              >
                Skills Taxonomy
              </TabsTrigger>
              <TabsTrigger 
                value="governance" 
                className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-0 pb-3 bg-transparent"
              >
                Risk Profiles
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Job Families Content */}
          <TabsContent value="families" className="flex-1 overflow-y-auto pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {JOB_FAMILIES.map((family) => (
                <Card key={family.id} className="flex flex-col hover:border-primary/50 transition-colors cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" className={cn(
                        "ml-auto",
                        family.riskProfile === "High" ? "border-red-200 bg-red-50 text-red-700" :
                        family.riskProfile === "Medium" ? "border-amber-200 bg-amber-50 text-amber-700" :
                        "border-green-200 bg-green-50 text-green-700"
                      )}>
                        {family.riskProfile} Risk
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{family.title}</CardTitle>
                    <CardDescription className="line-clamp-2 min-h-[40px]">{family.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-3">
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider text-[10px]">Key Roles</div>
                      <div className="flex flex-wrap gap-2">
                        {family.roles.map((role) => (
                          <Badge key={role.id} variant="secondary" className="font-normal bg-muted/50">
                            {role.title}
                          </Badge>
                        ))}
                        {family.roles.length > 0 && (
                          <Badge variant="secondary" className="font-normal bg-muted/50">
                            +{Math.floor(Math.random() * 5) + 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="pt-3 text-sm text-muted-foreground flex justify-between">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      <span>{family.count} Active Workers</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardFooter>
                </Card>
              ))}

              {/* Add New Card */}
              <Card className="flex flex-col items-center justify-center border-dashed hover:border-primary hover:bg-primary/5 transition-all cursor-pointer min-h-[250px]">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg">Create Job Family</h3>
                <p className="text-sm text-muted-foreground mt-1">Define a new functional area</p>
              </Card>
            </div>
          </TabsContent>

          {/* Roles Content */}
          <TabsContent value="roles" className="flex-1 overflow-y-auto pt-6">
            <div className="flex gap-6 h-full">
              {/* Role List Sidebar */}
              <div className="w-80 flex flex-col gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search roles..." className="pl-9" />
                </div>
                <div className="flex-1 border rounded-lg bg-card overflow-hidden flex flex-col">
                  <div className="overflow-y-auto flex-1 p-2 space-y-1">
                    {JOB_FAMILIES.flatMap(f => f.roles.map(r => ({...r, family: f.title}))).map((role, i) => (
                      <button 
                        key={role.id}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors flex flex-col gap-1",
                          i === 0 ? "bg-primary/10 text-primary font-medium" : "text-foreground"
                        )}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span>{role.title}</span>
                          <Badge variant="outline" className="text-[10px] h-5 px-1.5">{role.level}</Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{role.family}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Role Detail View */}
              <div className="flex-1 space-y-6">
                <Card className="h-full border-none shadow-none bg-transparent">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold">AP Specialist</h2>
                          <Badge>L2 - Operational</Badge>
                          <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">Medium Risk</Badge>
                        </div>
                        <p className="text-muted-foreground">
                          Responsible for processing standard vendor invoices, validating PO matching, and flagging exceptions for human review.
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Edit Definition</Button>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <BrainCircuit className="w-4 h-4 text-primary" />
                            Required Capabilities
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            OCR Document Extraction
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Pattern Matching (Regex)
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Basic Decision Logic
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Database className="w-4 h-4 text-blue-600" />
                            System Access
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            SAP S/4HANA (Read/Write)
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            SharePoint (Read)
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Shield className="w-4 h-4 text-red-600" />
                            Governance
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            $10k Approval Limit
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            Human Review for Exceptions
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Standard Operating Procedure (SOP)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 text-sm">
                          <div className="flex gap-4 p-3 bg-muted/30 rounded-lg">
                            <span className="font-bold text-muted-foreground">01</span>
                            <div>
                              <p className="font-medium">Ingest Invoice</p>
                              <p className="text-muted-foreground">Monitor dedicated mailbox for PDF attachments.</p>
                            </div>
                          </div>
                          <div className="flex gap-4 p-3 bg-muted/30 rounded-lg">
                            <span className="font-bold text-muted-foreground">02</span>
                            <div>
                              <p className="font-medium">Extract Data</p>
                              <p className="text-muted-foreground">Use OCR model to identify Vendor, Date, Amount, and Line Items.</p>
                            </div>
                          </div>
                          <div className="flex gap-4 p-3 bg-muted/30 rounded-lg">
                            <span className="font-bold text-muted-foreground">03</span>
                            <div>
                              <p className="font-medium">Validate PO</p>
                              <p className="text-muted-foreground">Check against open POs in SAP. Match line items within 2% variance.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Skills Taxonomy Content */}
          <TabsContent value="skills" className="flex-1 overflow-y-auto pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILLS_TAXONOMY.map((category, idx) => (
                <Card key={idx} className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.category === "Cognitive" && <BrainCircuit className="w-5 h-5 text-purple-600" />}
                      {category.category === "Systems" && <Cpu className="w-5 h-5 text-blue-600" />}
                      {category.category === "Process" && <Layers className="w-5 h-5 text-green-600" />}
                      {category.category} Skills
                    </CardTitle>
                    <CardDescription>Core capabilities and tool proficiencies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1 hover:bg-secondary/80 cursor-pointer transition-colors">
                          {skill}
                        </Badge>
                      ))}
                      <Button variant="ghost" size="sm" className="h-6 w-6 rounded-full p-0 border border-dashed">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Governance Tab Placeholder */}
          <TabsContent value="governance" className="flex-1 pt-6">
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
                <div className="p-4 bg-muted rounded-full">
                  <Shield className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Risk Profiles Configuration</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mt-2">
                    Configure default governance policies, approval workflows, and audit requirements for each risk tier.
                  </p>
                </div>
                <Button>Configure Risk Tiers</Button>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </MainLayout>
  );
}
