import { useParams, useLocation } from "wouter";
import { MainLayout } from "@/components/layout/MainLayout";
import { MOCK_WORKERS } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Edit, 
  PauseCircle,
  Power,
  AlertTriangle,
  Bot,
  FileText,
  ShieldAlert,
  History as HistoryIcon,
  CheckCircle2,
  Archive
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrustPanel } from "@/components/trust-panel";
import { RelationshipsGraph } from "@/components/relationships-graph";
import { useState } from "react";
import { GovernanceReviewModal } from "@/components/governance-review-modal";
import { PauseModal } from "@/components/pause-modal";
import { AssignmentChangeModal } from "@/components/assignment-change-modal";
import { RetirementModal } from "@/components/retirement-modal";

export default function WorkerDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRetireOpen, setIsRetireOpen] = useState(false);
  
  const worker = MOCK_WORKERS.find(w => w.id === id);

  if (!worker) {
    return (
      <MainLayout>
        <div className="p-10 text-center">
          <h2 className="text-xl font-semibold">Worker not found</h2>
          <Button onClick={() => setLocation("/")} className="mt-4">Back to Directory</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      <div className="flex-1 flex flex-col min-w-0">
        <MainLayout>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              {/* Header (Fixed) */}
              <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setLocation("/directory")} className="-ml-2 mt-1">
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                        {worker.name.charAt(0)}
                      </div>
                      <div>
                        <h1 className="text-xl font-bold flex items-center gap-2">
                          {worker.name}
                          <span className="text-xs font-mono font-normal text-muted-foreground bg-muted px-1.5 py-0.5 rounded">v2.4</span>
                        </h1>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <StatusBadge type="risk" value={worker.riskTier} />
                          <StatusBadge type="autonomy" value={worker.autonomyLevel} />
                          <StatusBadge type="status" value={worker.status} />
                          <div className="h-4 w-px bg-border mx-1" />
                          <div className="flex items-center gap-3 text-xs font-medium">
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">SLO</span>
                              <span className="font-bold">{worker.sloScore}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Val/Risk</span>
                              <span className="font-bold">{worker.valueRiskRatio}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">HX</span>
                              <span className="font-bold">{worker.hxScore}</span>
                            </div>
                            <div className="flex items-center gap-1 text-green-600">
                              <span className="text-muted-foreground text-foreground">Trust</span>
                              <span className="font-bold">↑</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsEditOpen(true)}>
                      <Edit className="w-4 h-4" />
                      Edit Assignment
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsPauseOpen(true)}>
                      <PauseCircle className="w-4 h-4" />
                      Pause
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setIsRetireOpen(true)}>
                      <Archive className="w-4 h-4" />
                      Retire
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tabs & Content */}
              <div className="p-6 max-w-6xl mx-auto w-full">
                {/* ... same content ... */}
                <Tabs defaultValue="overview" className="w-full space-y-6">
                  <TabsList className="w-full bg-transparent border-b rounded-none h-auto p-0 flex justify-start gap-6 overflow-x-auto">
                    <TabsTrigger 
                      value="overview" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-colors hover:text-foreground"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="performance" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-colors hover:text-foreground"
                    >
                      Performance
                    </TabsTrigger>
                    <TabsTrigger 
                      value="value" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-colors hover:text-foreground"
                    >
                      Value
                    </TabsTrigger>
                    <TabsTrigger 
                      value="human" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-colors hover:text-foreground"
                    >
                      Human Impact
                    </TabsTrigger>
                    <TabsTrigger 
                      value="relationships" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-colors hover:text-foreground"
                    >
                      Relationships
                    </TabsTrigger>
                    <TabsTrigger 
                      value="governance" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-colors hover:text-foreground"
                    >
                      Governance
                    </TabsTrigger>
                    <TabsTrigger 
                      value="history" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-colors hover:text-foreground"
                    >
                      History
                    </TabsTrigger>
                    <TabsTrigger 
                      value="collaboration" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary transition-colors hover:text-foreground"
                    >
                      Collaboration
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Existing Tabs Content... */}
                  <TabsContent value="overview" className="space-y-6">
                    {/* ... (Keeping existing overview content logic but minimizing for brevity in this edit block) ... */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Identity & Placement</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                              <div>
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">Job Family</span>
                                <span className="text-sm font-medium bg-secondary px-2 py-1 rounded-md text-[#f4f4f4]">{worker.jobFamily}</span>
                              </div>
                              <div>
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">Primary Process</span>
                                <span className="text-sm font-medium">{worker.primaryProcess}</span>
                              </div>
                              <div>
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">Business Unit</span>
                                <span className="text-sm font-medium">{worker.businessUnit}</span>
                              </div>
                              <div>
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide block mb-1">Department</span>
                                <span className="text-sm font-medium">{worker.department}</span>
                              </div>
                            </div>
                            
                            <Separator className="my-6" />
                            
                            <div className="space-y-3">
                              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Capabilities</span>
                              <div className="flex flex-wrap gap-2">
                                {worker.capabilities.map(cap => (
                                  <span key={cap} className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded text-xs font-medium">
                                    {cap}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <Separator className="my-6" />

                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                                  <Bot className="w-4 h-4 text-primary" />
                                  Purpose Statement
                                </h4>
                                <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded border">
                                  {worker.description}
                                </p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold flex items-center gap-2 mb-2 text-red-600">
                                  <AlertTriangle className="w-4 h-4" />
                                  Boundaries & Prohibited Actions
                                </h4>
                                <div className="bg-red-50 border border-red-100 rounded p-3">
                                  <ul className="list-disc pl-4 text-sm text-red-800 space-y-1">
                                    <li>Cannot approve payments {'>'} $5,000 without human sign-off</li>
                                    <li>No direct database schema modifications</li>
                                    <li>Cannot send external emails to domains not in allowlist</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle>RACI Matrix</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="border border-border">
                              <div className="grid grid-cols-5 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground">
                                <div className="p-3 border-r border-border">Activity</div>
                                <div className="p-3 text-center border-r border-border">Responsible</div>
                                <div className="p-3 text-center border-r border-border">Accountable</div>
                                <div className="p-3 text-center border-r border-border">Consulted</div>
                                <div className="p-3 text-center">Informed</div>
                              </div>
                              <div className="grid grid-cols-5 text-sm hover:bg-muted/10 transition-colors border-b border-border last:border-0">
                                <div className="p-3 font-medium border-r border-border flex items-center">Exception Handling</div>
                                <div className="p-3 flex justify-center items-center border-r border-border bg-blue-50/30">
                                  <StatusBadge type="autonomy" value="Execute" showIcon={false} className="scale-90" />
                                </div>
                                <div className="p-3 flex justify-center items-center border-r border-border">
                                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold" title="Product Owner">PO</span>
                                </div>
                                <div className="p-3 flex justify-center items-center border-r border-border">
                                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold" title="Operations">OPS</span>
                                </div>
                                <div className="p-3 flex justify-center items-center">
                                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold" title="Risk Team">RSK</span>
                                </div>
                              </div>
                              <div className="grid grid-cols-5 text-sm hover:bg-muted/10 transition-colors">
                                <div className="p-3 font-medium border-r border-border flex items-center">Config Change</div>
                                <div className="p-3 flex justify-center items-center border-r border-border">
                                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold" title="Technical Owner">TC</span>
                                </div>
                                <div className="p-3 flex justify-center items-center border-r border-border">
                                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold" title="Product Owner">PO</span>
                                </div>
                                <div className="p-3 flex justify-center items-center border-r border-border">
                                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold" title="Security">SEC</span>
                                </div>
                                <div className="p-3 flex justify-center items-center">
                                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold" title="Audit">AUD</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Ownership</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {worker.primaryOwner.avatar || "PO"}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{worker.primaryOwner.name}</p>
                                <p className="text-xs text-muted-foreground">{worker.primaryOwner.role} (Primary)</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                                TO
                              </div>
                              <div>
                                <p className="text-sm font-medium">{worker.technicalOwner.name}</p>
                                <p className="text-xs text-muted-foreground">{worker.technicalOwner.role} (Technical)</p>
                              </div>
                            </div>
                            <Separator />
                            <div>
                              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3">Escalation Rules</h4>
                              <div className="space-y-2">
                                <div className="text-sm border rounded p-2 bg-muted/20">
                                  <span className="font-medium block">Policy Violation</span>
                                  <span className="text-xs text-muted-foreground">→ Stop & Notify Risk Officer</span>
                                </div>
                                <div className="text-sm border rounded p-2 bg-muted/20">
                                  <span className="font-medium block">Low Confidence</span>
                                  <span className="text-xs text-muted-foreground">→ Route to Human Queue (Tier 2)</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  {/* Placeholder Tabs ... */}
                  <TabsContent value="performance">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>SLO Performance</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center h-[200px]">
                          <div className="text-5xl font-bold text-primary mb-2">{worker.sloScore}%</div>
                          <p className="text-muted-foreground text-sm">Adherence (30 days)</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Strength Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[200px] flex items-center justify-center bg-muted/5">
                          <p className="text-muted-foreground text-sm italic">Radar chart placeholder</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="value">
                    <Card>
                      <CardHeader>
                        <CardTitle>Value Attribution</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[300px] flex items-center justify-center bg-muted/5">
                        <p className="text-muted-foreground">Outcome Credits Timeline Chart Placeholder</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="relationships">
                    <Card className="h-[600px] overflow-hidden border shadow-sm">
                      <RelationshipsGraph className="w-full h-full" interactive={false} />
                    </Card>
                  </TabsContent>

                  {/* New Governance & History Implementation */}
                  <TabsContent value="governance" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="md:col-span-2">
                        <CardHeader>
                          <CardTitle>Incident & Violation Log</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {worker.incidents && worker.incidents.length > 0 ? (
                            <div className="space-y-4">
                              {worker.incidents.map(incident => (
                                <div key={incident.id} className="flex items-start gap-4 p-4 border rounded-md bg-card">
                                  <div className={`p-2 rounded-full ${incident.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                    <ShieldAlert className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h4 className="text-sm font-bold">{incident.type}</h4>
                                        <p className="text-xs text-muted-foreground font-mono">{incident.date} • {incident.id}</p>
                                      </div>
                                      <span className="text-xs font-medium px-2 py-0.5 rounded border bg-muted">
                                        {incident.status}
                                      </span>
                                    </div>
                                    <p className="text-sm mt-2">{incident.description}</p>
                                    {incident.resolution && (
                                      <div className="mt-2 text-xs bg-muted/50 p-2 rounded border-l-2 border-green-500">
                                        <span className="font-semibold">Resolution:</span> {incident.resolution}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-12 text-muted-foreground">
                              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                              <p>No incidents recorded. Good governance!</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Active Corrective Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {worker.correctiveActions && worker.correctiveActions.length > 0 ? (
                            <div className="space-y-3">
                              {worker.correctiveActions.map(action => (
                                <div key={action.id} className="p-3 border border-l-4 border-l-orange-500 rounded bg-orange-50/10">
                                  <h4 className="text-sm font-bold mb-1">{action.issue}</h4>
                                  <p className="text-xs text-muted-foreground mb-2">Owner: {action.assignedTo}</p>
                                  <div className="text-xs bg-white border p-2 rounded">
                                    {action.remediationPlan}
                                  </div>
                                  <div className="mt-2 text-right">
                                    <span className="text-[10px] uppercase tracking-wide font-bold text-orange-700">Due: {action.dueDate}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-muted-foreground text-sm">
                              No active remediation plans.
                            </div>
                          )}
                          <Button variant="outline" className="w-full mt-4 text-xs" onClick={() => setIsReviewOpen(true)}>
                            Start Governance Review
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="history">
                    <Card>
                      <CardHeader>
                        <CardTitle>Version & Change History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-8 relative border-l ml-4 pl-8 py-2">
                          {worker.versionHistory?.map((version, i) => (
                            <div key={i} className="relative">
                              <div className={`absolute -left-[39px] top-1 w-4 h-4 rounded-full ring-4 ring-background flex items-center justify-center ${
                                version.changeType === 'Creation' ? 'bg-green-500 text-white' : 
                                version.changeType === 'Promotion' ? 'bg-blue-500 text-white' : 
                                'bg-muted text-foreground border'
                              }`}>
                                <div className="w-2 h-2 bg-current rounded-full" />
                              </div>
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold font-mono bg-muted px-1.5 rounded">{version.version}</span>
                                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{version.changeType}</span>
                                  <span className="text-xs text-muted-foreground ml-auto">{version.date}</span>
                                </div>
                                <p className="text-sm font-medium mt-1">{version.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">
                                    {version.author.charAt(0)}
                                  </div>
                                  <p className="text-xs text-muted-foreground">By {version.author}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Other Placeholders */}
                  <TabsContent value="human">
                    <Card className="p-10 flex justify-center"><p className="text-muted-foreground">Human Impact & Override Analysis</p></Card>
                  </TabsContent>
                  <TabsContent value="collaboration">
                    <Card className="p-10 flex justify-center"><p className="text-muted-foreground">Delegation Map & Behavior Drift</p></Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Permanent Trust Panel */}
            <TrustPanel onReviewClick={() => setIsReviewOpen(true)} />
          </div>
        </MainLayout>
      </div>
      {/* Modals */}
      <GovernanceReviewModal 
        isOpen={isReviewOpen} 
        onClose={() => setIsReviewOpen(false)} 
        workerName={worker.name}
        currentStatus={worker.status}
        currentAutonomy={worker.autonomyLevel}
      />
      <PauseModal 
        isOpen={isPauseOpen} 
        onClose={() => setIsPauseOpen(false)} 
        workerName={worker.name}
      />
      <AssignmentChangeModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        workerName={worker.name}
        currentRole={worker.jobFamily}
        currentProcess={worker.primaryProcess}
      />
      <RetirementModal 
        isOpen={isRetireOpen} 
        onClose={() => setIsRetireOpen(false)} 
        workerName={worker.name}
      />
    </div>
  );
}
