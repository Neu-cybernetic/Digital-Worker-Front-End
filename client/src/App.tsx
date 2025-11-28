import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Directory from "@/pages/directory";
import WorkerDetail from "@/pages/worker-detail";
import CreateWorker from "@/pages/create-worker";
import OrgChart from "@/pages/org-chart";
import Relationships from "@/pages/relationships";
import JobFamilies from "@/pages/job-families";
import Placeholder from "@/pages/placeholder";
import PerformanceDashboard from "@/pages/performance";
import Planning from "@/pages/planning";
import Settings from "@/pages/settings";
import Governance from "@/pages/governance";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/directory" component={Directory} />
      <Route path="/worker/:id" component={WorkerDetail} />
      <Route path="/create" component={CreateWorker} />
      <Route path="/org" component={OrgChart} />
      <Route path="/relationships" component={Relationships} />
      <Route path="/performance" component={PerformanceDashboard} />
      <Route path="/planning" component={Planning} />
      
      {/* Placeholders for future scope */}
      <Route path="/job-families" component={JobFamilies} />
      <Route path="/governance" component={Governance} />
      <Route path="/settings" component={Settings} />
      <Route path="/strategy">
        <Placeholder title="Strategy & Planning" />
      </Route>
      <Route path="/value">
        <Placeholder title="Value Realization" />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
