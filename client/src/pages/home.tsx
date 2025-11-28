import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MOCK_WORKERS } from "@/lib/mock-data";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  TrendingUp, 
  Users,
  Activity
} from "lucide-react";
import { TrustPanel } from "@/components/trust-panel";
import { Link } from "wouter";

export default function Home() {
  // Mock summary data
  const stats = {
    total: 612,
    growth: 18,
    critical: 8,
    high: 46,
    avgSlo: 92.4,
    valueRisk: 7.1,
    avgHx: 88.7
  };

  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      <div className="flex-1 flex flex-col min-w-0">
        <MainLayout>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Top Summary Bar */}
              <div className="flex flex-wrap items-center gap-4 p-4 bg-card border rounded-lg shadow-sm text-sm">
                <div className="flex items-center gap-2 pr-4 border-r">
                  <span className="text-muted-foreground">Total Digital Workers:</span>
                  <span className="font-bold text-lg">{stats.total}</span>
                  <span className="text-green-600 text-xs font-medium bg-green-50 px-1.5 py-0.5 rounded">
                    ↑{stats.growth}% MoM
                  </span>
                </div>
                <div className="flex items-center gap-2 pr-4 border-r">
                  <span className="text-muted-foreground">Critical Risk:</span>
                  <span className="font-bold text-red-600">{stats.critical}</span>
                </div>
                <div className="flex items-center gap-2 pr-4 border-r">
                  <span className="text-muted-foreground">High Risk:</span>
                  <span className="font-bold text-orange-600">{stats.high}</span>
                </div>
                <div className="flex items-center gap-2 pr-4 border-r">
                  <span className="text-muted-foreground">Avg SLO:</span>
                  <span className="font-bold">{stats.avgSlo}%</span>
                </div>
                <div className="flex items-center gap-2 pr-4 border-r">
                  <span className="text-muted-foreground">Value/Risk:</span>
                  <span className="font-bold">{stats.valueRisk}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Avg HX:</span>
                  <span className="font-bold">{stats.avgHx}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Risk Exposure Heatmap */}
                <Card className="h-[320px]">
                  <CardHeader>
                    <CardTitle>Risk Exposure Heatmap</CardTitle>
                    <CardDescription>Concentration of High/Critical workers by Business Unit</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 h-full">
                      {['Finance', 'HR', 'IT', 'Customer', 'Marketing', 'Legal'].map((bu, i) => (
                        <div 
                          key={bu} 
                          className={`rounded-md flex flex-col items-center justify-center p-2 text-center border ${
                            i === 0 ? 'bg-red-100 border-red-200' : 
                            i === 2 ? 'bg-orange-50 border-orange-100' : 
                            'bg-green-50 border-green-100'
                          }`}
                        >
                          <span className={`font-bold text-lg ${
                            i === 0 ? 'text-red-700' : i === 2 ? 'text-orange-700' : 'text-green-700'
                          }`}>
                            {i === 0 ? 12 : i === 2 ? 5 : 2}
                          </span>
                          <span className="text-xs text-muted-foreground font-medium">{bu}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 2. Value Leaders */}
                <Card className="h-[320px] flex flex-col overflow-hidden">
                  <CardHeader>
                    <CardTitle>Value Leaders</CardTitle>
                    <CardDescription>Top performing workers by Contribution Index</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto pr-2">
                    <div className="space-y-3">
                      {MOCK_WORKERS.slice(0, 4).map(worker => (
                        <Link key={worker.id} href={`/worker/${worker.id}`}>
                          <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                {worker.valueScore}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{worker.name}</div>
                                <div className="text-xs text-muted-foreground">{worker.jobFamily}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-medium text-green-600">+{worker.valueRiskRatio}x ROI</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 3. Trust & Adoption */}
                <Card className="h-[320px]">
                  <CardHeader>
                    <CardTitle>Trust & Adoption Trajectory</CardTitle>
                    <CardDescription>Human Experience (HX) Score trends</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-end justify-between gap-2 h-[200px] pt-4">
                    {[65, 68, 74, 72, 78, 82, 85, 88].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div 
                          className="w-full bg-primary/20 rounded-t-md hover:bg-primary/40 transition-colors relative"
                          style={{ height: `${val}%` }}
                        >
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                            {val}
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground">W{i+1}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* 4. Alerts & Actions */}
                <Card className="h-[320px] flex flex-col overflow-hidden">
                  <CardHeader>
                    <CardTitle>Alerts & Actions</CardTitle>
                    <CardDescription>Items requiring immediate attention</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-y-auto">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-md">
                        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-red-900">Probation Ending: InvoiceProcessor</h4>
                          <p className="text-xs text-red-700 mt-1">Review performance data before auto-promotion on Friday.</p>
                          <button className="text-xs font-medium text-red-800 underline mt-2">Review Now</button>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-100 rounded-md">
                        <Activity className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-orange-900">Override Spike: Claims Agent</h4>
                          <p className="text-xs text-orange-700 mt-1">Human override rate increased by 15% in North America.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-100 rounded-md">
                        <Users className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-blue-900">Governance Review Due</h4>
                          <p className="text-xs text-blue-700 mt-1">Quarterly review for Finance Operations pending.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <TrustPanel />
          </div>
        </MainLayout>
      </div>
    </div>
  );
}
