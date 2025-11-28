import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MOCK_WORKERS } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Filter, 
  MoreHorizontal, 
  ArrowUpDown, 
  LayoutGrid, 
  List,
  ChevronRight,
  Plus
} from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Directory() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [, setLocation] = useLocation();

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold font-heading text-foreground">Digital Worker Directory</h1>
            <p className="text-muted-foreground">Manage and monitor your digital workforce portfolio.</p>
          </div>
          
          <Button onClick={() => setLocation("/create")} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Worker
          </Button>
        </div>

        {/* Filters & Actions Toolbar */}
        <div className="flex items-center justify-between gap-4 bg-card p-4 rounded-lg border shadow-sm">
          {/* Command Bar Placeholder */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-xs text-muted-foreground border rounded px-1.5 py-0.5">⌘K</span>
            </div>
            <input 
              type="text" 
              placeholder="Search workers, owners, or capabilities..." 
              className="w-full pl-12 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted/30"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Active (3)
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                High Risk (1)
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-md border">
            <Button 
              variant={viewMode === "list" ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === "grid" ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden min-h-[600px]">
          {viewMode === "list" ? (
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox />
                  </TableHead>
                  <TableHead className="w-[250px]">
                    <Button variant="ghost" size="sm" className="-ml-3 h-8 gap-1 font-semibold">
                      Worker Name
                      <ArrowUpDown className="w-3 h-3" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Job Family</TableHead>
                  <TableHead>Business Unit</TableHead>
                  <TableHead>Risk Tier</TableHead>
                  <TableHead>Autonomy</TableHead>
                  <TableHead>Primary Owner</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_WORKERS.map((worker) => (
                  <TableRow key={worker.id} className="group hover:bg-muted/30 transition-colors cursor-pointer">
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/worker/${worker.id}`}>
                        <div className="flex items-center gap-3 hover:underline decoration-primary underline-offset-4">
                          <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                             {worker.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-primary">{worker.name}</span>
                            <span className="text-xs text-muted-foreground font-mono">{worker.id}</span>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <StatusBadge type="status" value={worker.status} />
                    </TableCell>
                    <TableCell className="text-sm">{worker.jobFamily}</TableCell>
                    <TableCell className="text-sm">{worker.businessUnit}</TableCell>
                    <TableCell>
                      <StatusBadge type="risk" value={worker.riskTier} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge type="autonomy" value={worker.autonomyLevel} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        {worker.primaryOwner.avatar ? (
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                            {worker.primaryOwner.avatar}
                          </div>
                        ) : null}
                        <span>{worker.primaryOwner.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Identity</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {/* Grid View Implementation */}
              {MOCK_WORKERS.map((worker) => (
                <Link key={worker.id} href={`/worker/${worker.id}`}>
                  <div className="relative border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card group flex flex-col h-full">
                    {/* Probation Banner if needed */}
                    {worker.status === "Probation" && (
                       <div className="absolute -top-px left-4 right-4 h-1 bg-orange-500 rounded-b-sm z-10" />
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                       <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg shadow-sm">
                          {worker.name.charAt(0)}
                       </div>
                       <StatusBadge type="status" value={worker.status} className="scale-90 origin-top-right" />
                    </div>

                    <div className="mb-4 flex-1">
                      <h3 className="font-bold text-base group-hover:text-primary transition-colors mb-1">{worker.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono mb-2">{worker.id}</p>
                      <div className="inline-flex items-center px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium mb-1">
                        {worker.jobFamily}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{worker.businessUnit} / {worker.department}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      <StatusBadge type="risk" value={worker.riskTier} />
                      <StatusBadge type="autonomy" value={worker.autonomyLevel} />
                    </div>
                    
                    <div className="pt-3 border-t flex items-center justify-between text-xs mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
                          {worker.primaryOwner.avatar || "PO"}
                        </div>
                        <span className="text-muted-foreground truncate max-w-[80px]">{worker.primaryOwner.name}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

// Helper Icon for Grid View
function Bot(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}
