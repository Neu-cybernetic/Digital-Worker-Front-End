import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, AlertTriangle, FileText, CheckCircle2, Gavel, 
  History, Lock, ArrowUpRight, Search, Filter, MoreHorizontal,
  AlertCircle, Clock, UserCheck
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

// Mock Data
const RISK_DISTRIBUTION = [
  { name: 'Low Risk', value: 65, color: '#10b981' }, // green-500
  { name: 'Medium Risk', value: 25, color: '#f59e0b' }, // amber-500
  { name: 'High Risk', value: 10, color: '#ef4444' }, // red-500
];

const POLICIES = [
  { id: 'POL-001', name: 'Data Privacy & PII Handling', status: 'Active', version: '2.4', lastReview: '2024-10-15', adherence: 98 },
  { id: 'POL-002', name: 'External API Access Control', status: 'Active', version: '1.1', lastReview: '2024-11-01', adherence: 100 },
  { id: 'POL-003', name: 'AI Ethics & Bias Check', status: 'Review Needed', version: '3.0', lastReview: '2024-09-20', adherence: 92 },
  { id: 'POL-004', name: 'Human-in-the-Loop Thresholds', status: 'Active', version: '1.5', lastReview: '2024-10-30', adherence: 95 },
  { id: 'POL-005', name: 'Session Timeout & Auth', status: 'Draft', version: '0.9', lastReview: '2024-11-20', adherence: 0 },
];

const APPROVALS = [
  { id: 'REQ-1024', type: 'New Worker', subject: 'InvoiceBot-V2', requester: 'Sarah Jenkins', submitted: '2h ago', severity: 'Medium' },
  { id: 'REQ-1025', type: 'Access Change', subject: 'CustomerSupport-AI', requester: 'Mike Kowalski', submitted: '5h ago', severity: 'High' },
  { id: 'REQ-1026', type: 'Policy Override', subject: 'DataScraper-X', requester: 'Dev Team', submitted: '1d ago', severity: 'Critical' },
];

const AUDIT_LOGS = [
  { id: 'AUD-9921', timestamp: 'Today, 10:42 AM', actor: 'System', action: 'Auto-quarantined Worker', target: 'PaymentProcessor-04', details: 'Erratic behavior detected > 95% confidence' },
  { id: 'AUD-9920', timestamp: 'Today, 09:15 AM', actor: 'Jane Doe', action: 'Approved Policy Exception', target: 'ReportGen-AI', details: 'Temporary access to legacy DB' },
  { id: 'AUD-9919', timestamp: 'Yesterday, 4:30 PM', actor: 'Mike Kowalski', action: 'Updated Configuration', target: 'ChatBot-L1', details: 'Changed temperature setting to 0.7' },
  { id: 'AUD-9918', timestamp: 'Yesterday, 2:00 PM', actor: 'System', action: 'Policy Violation Blocked', target: 'EmailSender-V1', details: 'Attempted to send PII to external domain' },
];

export default function Governance() {
  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      <div className="flex-1 flex flex-col min-w-0">
        <MainLayout>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              
              {/* Header */}
              <div className="bg-card border-b px-8 py-6 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                      <Shield className="w-6 h-6 text-primary" />
                      Governance & Compliance
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Monitor workforce risk, enforce policies, and manage access controls.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2">
                      <FileText className="w-4 h-4" />
                      Export Report
                    </Button>
                    <Button className="gap-2">
                      <Gavel className="w-4 h-4" />
                      New Policy
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-8 max-w-[1600px] mx-auto w-full space-y-8">
                
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Overall Compliance Score</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">94%</span>
                          <span className="text-xs text-green-600 font-medium flex items-center">
                            <ArrowUpRight className="w-3 h-3" /> +2.4%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-green-100 text-green-700 rounded-full">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Active Risks</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">12</span>
                          <span className="text-xs text-red-600 font-medium flex items-center">
                            3 Critical
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-red-100 text-red-700 rounded-full">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">8</span>
                          <span className="text-xs text-amber-600 font-medium flex items-center">
                            Avg 4h wait
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-amber-100 text-amber-700 rounded-full">
                        <Clock className="w-6 h-6" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Active Policies</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">24</span>
                          <span className="text-xs text-muted-foreground">
                            Across 4 domains
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-blue-100 text-blue-700 rounded-full">
                        <Lock className="w-6 h-6" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Dashboard Tabs */}
                <Tabs defaultValue="overview" className="w-full space-y-6">
                  <TabsList className="w-full bg-transparent border-b rounded-none h-auto p-0 flex justify-start gap-6">
                    <TabsTrigger 
                      value="overview" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary"
                    >
                      Dashboard
                    </TabsTrigger>
                    <TabsTrigger 
                      value="policies" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary"
                    >
                      Policy Center
                    </TabsTrigger>
                    <TabsTrigger 
                      value="approvals" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary"
                    >
                      Approvals & Requests
                    </TabsTrigger>
                    <TabsTrigger 
                      value="audit" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-primary"
                    >
                      Audit Logs
                    </TabsTrigger>
                  </TabsList>

                  {/* Dashboard Content */}
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Risk Heatmap Card */}
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Risk Distribution by Business Unit</CardTitle>
                          <CardDescription>Current worker distribution across risk tiers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px] flex items-center justify-center bg-muted/5 rounded-md border border-dashed">
                            {/* Placeholder for a complex heatmap - using simple distribution for now */}
                            <div className="flex items-center gap-12">
                              <div className="w-[200px] h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={RISK_DISTRIBUTION}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={60}
                                      outerRadius={80}
                                      paddingAngle={5}
                                      dataKey="value"
                                    >
                                      {RISK_DISTRIBUTION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                    </Pie>
                                    <RechartsTooltip />
                                  </PieChart>
                                </ResponsiveContainer>
                              </div>
                              <div className="space-y-4">
                                {RISK_DISTRIBUTION.map((item) => (
                                  <div key={item.name} className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm font-medium">{item.name}</span>
                                    <span className="text-sm text-muted-foreground">({item.value}%)</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Critical Alerts */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Critical Alerts</CardTitle>
                          <CardDescription>Requires immediate attention.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-3 border-l-4 border-l-red-500 bg-red-50/20 rounded flex gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-bold text-red-900">Data Egress Detected</h4>
                              <p className="text-xs text-red-700 mt-1">Worker "FinBot-09" attempted connection to unapproved IP range.</p>
                              <Button variant="link" className="h-auto p-0 text-red-800 text-xs font-bold mt-2">Investigate →</Button>
                            </div>
                          </div>
                          <div className="p-3 border-l-4 border-l-amber-500 bg-amber-50/20 rounded flex gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-bold text-amber-900">SLA Breach Imminent</h4>
                              <p className="text-xs text-amber-700 mt-1">CustomerService-AI queue depth exceeding safe thresholds.</p>
                              <Button variant="link" className="h-auto p-0 text-amber-800 text-xs font-bold mt-2">View Queue →</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Policies Content */}
                  <TabsContent value="policies">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>Policy Center</CardTitle>
                            <CardDescription>Manage organizational standards and compliance rules.</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <div className="relative">
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Search policies..." className="pl-8 w-[250px]" />
                            </div>
                            <Button variant="outline" size="icon">
                              <Filter className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Policy Name</TableHead>
                              <TableHead>ID</TableHead>
                              <TableHead>Version</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Adherence</TableHead>
                              <TableHead>Last Review</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {POLICIES.map((policy) => (
                              <TableRow key={policy.id}>
                                <TableCell className="font-medium">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    {policy.name}
                                  </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground font-mono text-xs">{policy.id}</TableCell>
                                <TableCell>{policy.version}</TableCell>
                                <TableCell>
                                  <Badge variant={policy.status === 'Active' ? 'default' : 'secondary'}>
                                    {policy.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Progress value={policy.adherence} className="w-[60px] h-2" />
                                    <span className="text-xs font-medium">{policy.adherence}%</span>
                                  </div>
                                </TableCell>
                                <TableCell>{policy.lastReview}</TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  {/* Approvals Content */}
                  <TabsContent value="approvals">
                    <Card>
                      <CardHeader>
                        <CardTitle>Pending Requests</CardTitle>
                        <CardDescription>Change requests requiring your approval.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Request ID</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Subject</TableHead>
                              <TableHead>Requester</TableHead>
                              <TableHead>Severity</TableHead>
                              <TableHead>Submitted</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {APPROVALS.map((req) => (
                              <TableRow key={req.id}>
                                <TableCell className="font-mono text-xs">{req.id}</TableCell>
                                <TableCell>{req.type}</TableCell>
                                <TableCell className="font-medium">{req.subject}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                                      {req.requester.charAt(0)}
                                    </div>
                                    {req.requester}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={req.severity === 'Critical' ? 'destructive' : req.severity === 'High' ? 'outline' : 'secondary'} className={req.severity === 'High' ? 'border-orange-500 text-orange-600' : ''}>
                                    {req.severity}
                                  </Badge>
                                </TableCell>
                                <TableCell>{req.submitted}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <Button size="sm" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200">
                                      Approve
                                    </Button>
                                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                                      Reject
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Audit Content */}
                  <TabsContent value="audit">
                    <Card>
                      <CardHeader>
                        <CardTitle>System Audit Log</CardTitle>
                        <CardDescription>Immutable record of all governance actions.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-8">
                           {AUDIT_LOGS.map((log) => (
                             <div key={log.id} className="flex gap-4">
                               <div className="flex flex-col items-center">
                                 <div className="w-2 h-2 rounded-full bg-muted-foreground/30 mt-2" />
                                 <div className="w-px h-full bg-border mt-2" />
                               </div>
                               <div className="pb-6">
                                 <div className="flex items-center gap-2 mb-1">
                                   <span className="font-semibold text-sm">{log.action}</span>
                                   <Badge variant="outline" className="text-[10px] font-normal">{log.target}</Badge>
                                   <span className="text-xs text-muted-foreground ml-2">{log.timestamp}</span>
                                 </div>
                                 <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                                 <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded w-fit">
                                   <UserCheck className="w-3 h-3" />
                                   Actor: {log.actor}
                                   <span className="mx-1">•</span>
                                   ID: {log.id}
                                 </div>
                               </div>
                             </div>
                           ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                </Tabs>
              </div>
            </div>
          </div>
        </MainLayout>
      </div>
    </div>
  );
}
