import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { 
  BarChart2, 
  Cpu, 
  DollarSign, 
  Filter, 
  Layers, 
  TrendingUp, 
  Users,
  Zap
} from "lucide-react";

export default function Planning() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold font-heading text-foreground">Workforce Planning & Capacity</h1>
            <p className="text-muted-foreground">Optimize digital worker allocation, forecast utilization, and manage costs.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter View
            </Button>
            <Button className="gap-2">
              <Zap className="w-4 h-4" />
              Run Optimizer
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Total Utilization</span>
                <Cpu className="w-4 h-4 text-primary" />
              </div>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground mt-1">+12% vs last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Projected Cost (Run Rate)</span>
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold">$14.2k</div>
              <p className="text-xs text-muted-foreground mt-1">Below budget ($16k)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Capacity Risk</span>
                <Layers className="w-4 h-4 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-600">High</div>
              <p className="text-xs text-muted-foreground mt-1">2 Processes near limit</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Optimization Opps</span>
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground mt-1">Potential savings: $2.4k/mo</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="heatmap" className="space-y-6">
          <TabsList className="bg-card border">
            <TabsTrigger value="heatmap" className="gap-2">
              <Users className="w-4 h-4" />
              Capacity Heatmap
            </TabsTrigger>
            <TabsTrigger value="forecast" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Demand Forecast
            </TabsTrigger>
            <TabsTrigger value="cost" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Cost Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="heatmap" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Utilization Heatmap by Business Unit</CardTitle>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Global</SelectItem>
                      <SelectItem value="na">North America</SelectItem>
                      <SelectItem value="emea">EMEA</SelectItem>
                      <SelectItem value="apac">APAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>Real-time load balancing across organizational units.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Heatmap Rows */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3 text-sm font-medium">Finance Operations</div>
                      <div className="col-span-9 grid grid-cols-12 gap-1 h-8">
                        {/* Mock Heatmap Cells */}
                        <div className="col-span-2 bg-green-200 rounded flex items-center justify-center text-xs font-bold text-green-800" title="AP-Bot-1">45%</div>
                        <div className="col-span-2 bg-green-300 rounded flex items-center justify-center text-xs font-bold text-green-900" title="AP-Bot-2">62%</div>
                        <div className="col-span-2 bg-red-400 rounded flex items-center justify-center text-xs font-bold text-white animate-pulse" title="Tax-Agent-X">98%</div>
                        <div className="col-span-2 bg-green-200 rounded flex items-center justify-center text-xs font-bold text-green-800">41%</div>
                        <div className="col-span-4 bg-muted/20 rounded border border-dashed flex items-center justify-center text-xs text-muted-foreground">Available Capacity</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3 text-sm font-medium">Customer Support</div>
                      <div className="col-span-9 grid grid-cols-12 gap-1 h-8">
                        <div className="col-span-3 bg-orange-300 rounded flex items-center justify-center text-xs font-bold text-orange-900" title="Triage-Bot">88%</div>
                        <div className="col-span-3 bg-orange-200 rounded flex items-center justify-center text-xs font-bold text-orange-800" title="Chat-Agent-A">82%</div>
                        <div className="col-span-3 bg-green-200 rounded flex items-center justify-center text-xs font-bold text-green-800">55%</div>
                        <div className="col-span-3 bg-green-100 rounded flex items-center justify-center text-xs font-bold text-green-700">20%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3 text-sm font-medium">HR Services</div>
                      <div className="col-span-9 grid grid-cols-12 gap-1 h-8">
                        <div className="col-span-1 bg-green-100 rounded flex items-center justify-center text-xs font-bold text-green-700">12%</div>
                        <div className="col-span-1 bg-green-100 rounded flex items-center justify-center text-xs font-bold text-green-700">15%</div>
                        <div className="col-span-10 bg-muted/20 rounded border border-dashed flex items-center justify-center text-xs text-muted-foreground">Huge Surplus Capacity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-purple-50 rounded border border-purple-100">
                    <h4 className="font-bold text-sm text-purple-900 mb-1">Rebalance Finance Ops</h4>
                    <p className="text-xs text-purple-700 mb-2">Tax-Agent-X is at critical load (98%). Offload "Invoice Categorization" tasks to available surplus in HR Services cluster.</p>
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Apply Rebalancing</Button>
                  </div>
                  <div className="p-3 bg-muted/50 rounded border">
                    <h4 className="font-bold text-sm mb-1">Scale Down HR Cluster</h4>
                    <p className="text-xs text-muted-foreground mb-2">HR Services is operating at 15% efficiency. Recommend putting 2 agents into deep sleep.</p>
                    <Button size="sm" variant="outline" className="w-full">Review Plan</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Load Distribution</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[200px] bg-muted/5">
                  <p className="text-muted-foreground text-sm italic">Distribution Pie Chart Placeholder</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecast">
             <Card className="h-[400px] flex items-center justify-center">
               <div className="text-center">
                 <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                 <h3 className="text-lg font-semibold">Demand Forecasting Model</h3>
                 <p className="text-muted-foreground">Historical trend analysis and 90-day projection visualization would go here.</p>
               </div>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
