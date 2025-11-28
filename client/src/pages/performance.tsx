import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_WORKERS } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Activity, DollarSign, Zap, Shield, PanelRightClose, PanelRightOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TrustPanel } from "@/components/trust-panel";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: 'Jan', slo: 94, value: 4000, risk: 12 },
  { name: 'Feb', slo: 96, value: 4500, risk: 15 },
  { name: 'Mar', slo: 95, value: 5200, risk: 10 },
  { name: 'Apr', slo: 98, value: 6100, risk: 8 },
  { name: 'May', slo: 97, value: 6800, risk: 5 },
  { name: 'Jun', slo: 99, value: 7500, risk: 3 },
];

const riskData = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Medium Risk', value: 25, color: '#f59e0b' },
  { name: 'High Risk', value: 10, color: '#ef4444' },
];

export default function PerformanceDashboard() {
  const [isTrustPanelOpen, setIsTrustPanelOpen] = useState(true);

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden">
        {/* Main Dashboard Content */}
        <div className="flex-1 overflow-y-auto pr-6 pb-6">
          <div className="space-y-6">
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-heading font-bold text-foreground">Performance & Value Realization</h1>
                <p className="text-muted-foreground">Track SLOs, value contribution, and operational impact across the digital workforce.</p>
              </div>
              
              {!isTrustPanelOpen && (
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setIsTrustPanelOpen(true)}
                >
                  <Shield className="w-4 h-4" />
                  Open Trust Panel
                </Button>
              )}
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg SLO Score</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">96.4%</div>
                  <p className="text-xs text-muted-foreground flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +2.1% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Value Realized</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.4M</div>
                  <p className="text-xs text-muted-foreground flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +15% projected annualized
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Efficiency Uplift</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42 FTEs</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    Equivalent capacity returned
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>SLO Trends (6 Months)</CardTitle>
                  <CardDescription>Average adherence to Service Level Objectives vs Risk Incidents</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorSlo" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Area type="monotone" dataKey="slo" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSlo)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Value Generation</CardTitle>
                  <CardDescription>Cumulative value credits issued</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Risk & Distribution Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Performance Heatmap</CardTitle>
                    <CardDescription>Operational efficiency by department</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center bg-muted/10 rounded-md border-dashed border-2 m-6 mt-0">
                    <p className="text-muted-foreground text-sm">Heatmap Visualization Placeholder</p>
                  </CardContent>
               </Card>
               
               <Card>
                 <CardHeader>
                   <CardTitle>Risk Distribution</CardTitle>
                   <CardDescription>Active workers by risk tier</CardDescription>
                 </CardHeader>
                 <CardContent className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {riskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-2">
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> Low</div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Med</div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div> High</div>
                    </div>
                 </CardContent>
               </Card>
            </div>

            {/* Worker Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors (Contribution Index)</CardTitle>
                <CardDescription>Workers with highest impact on OKRs and cross-functional KPIs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_WORKERS.sort((a, b) => (b.valueScore || 0) - (a.valueScore || 0)).map((worker) => (
                    <div key={worker.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {worker.valueScore}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{worker.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{worker.jobFamily}</span>
                            <span>•</span>
                            <span>{worker.primaryProcess}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">SLO Score</p>
                          <p className="font-medium text-sm">{worker.sloScore}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Incidents</p>
                          <p className={cn("font-medium text-sm", worker.incidentCount > 0 ? "text-red-500" : "text-green-600")}>
                            {worker.incidentCount}
                          </p>
                        </div>
                        <StatusBadge type="status" value={worker.status} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Collapsible Trust Panel */}
        {isTrustPanelOpen && (
          <div className="w-96 border-l bg-card -my-8 -mr-8 h-[calc(100vh-4rem)] flex flex-col shadow-xl transition-all animate-in slide-in-from-right duration-300 z-20">
            <TrustPanel 
              className="w-full h-full border-none" 
              onClose={() => setIsTrustPanelOpen(false)}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
}