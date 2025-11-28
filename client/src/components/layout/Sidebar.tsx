import { Link, useLocation } from "wouter";
import { 
  LayoutGrid, 
  Network, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Settings,
  Bot,
  BarChart2,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutGrid, label: "Cockpit", href: "/" },
    { icon: Bot, label: "Digital Workers", href: "/directory" },
    { icon: Users, label: "Org & Ownership", href: "/org" },
    { icon: Network, label: "Relationships", href: "/relationships" },
    { icon: Briefcase, label: "Job Families", href: "/job-families" },
  ];

  const performanceItems = [
    { icon: BarChart2, label: "Performance & SLOs", href: "/performance" },
    { icon: TrendingUp, label: "Value Realization", href: "/value" },
  ];

  const strategyItems = [
    { icon: Lightbulb, label: "Strategy & Planning", href: "/planning" },
    { icon: ShieldCheck, label: "Governance & Risk", href: "/governance" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    // Carbon UI Shell Sidebar:
    // - Background: Gray 10 (#f4f4f4) in light mode (White Theme Carbon)
    // - Text: Gray 100 (#161616)
    // - Icons: 20px usually.
    // - Selection: Blue 60 Left Border (3-4px).
    <aside className="w-[256px] bg-[#f4f4f4] text-[#161616] flex flex-col h-screen sticky top-0 left-0 font-sans border-r border-[#e0e0e0]">
      <div className="h-[48px] flex items-center px-4 bg-[#161616] border-b border-[#393939]">
        <span className="font-semibold text-sm tracking-wider uppercase text-white">Workforce One</span>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="mb-6">
          <div className="px-4 mb-2 text-xs font-medium text-[#525252] uppercase tracking-wider">
            Platform
          </div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-4",
                  location === item.href
                    ? "bg-white border-[#0f62fe] text-[#0f62fe] font-medium shadow-sm"
                    : "border-transparent text-[#525252] hover:bg-[#e0e0e0] hover:text-[#161616]"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="mb-6">
          <div className="px-4 mb-2 text-xs font-medium text-[#525252] uppercase tracking-wider">
            Insights
          </div>
          {performanceItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-4",
                  location === item.href
                    ? "bg-white border-[#0f62fe] text-[#0f62fe] font-medium shadow-sm"
                    : "border-transparent text-[#525252] hover:bg-[#e0e0e0] hover:text-[#161616]"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            </Link>
          ))}
        </div>

        <div className="mb-6">
          <div className="px-4 mb-2 text-xs font-medium text-[#525252] uppercase tracking-wider">
            Governance
          </div>
          {strategyItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-4",
                  location === item.href
                    ? "bg-white border-[#0f62fe] text-[#0f62fe] font-medium shadow-sm"
                    : "border-transparent text-[#525252] hover:bg-[#e0e0e0] hover:text-[#161616]"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-[#e0e0e0] bg-[#f4f4f4]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#e0e0e0] flex items-center justify-center text-xs font-bold text-[#161616]">
            JD
          </div>
          <div className="text-sm text-[#525252]">
            <div className="font-medium text-[#161616]">John Doe</div>
            <div className="text-xs">HR Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
