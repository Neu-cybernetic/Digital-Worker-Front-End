import { Sidebar } from "./Sidebar";
import { 
  Search, 
  Bell, 
  Grid,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="h-[48px] bg-[#161616] text-white flex items-center justify-between px-4 sticky top-0 z-50 border-b border-[#393939]">
      <div className="flex items-center gap-4 flex-1">
        {/* Carbon Header Search - often distinct */}
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a8a8a8]" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-[#393939] border-none h-[32px] pl-10 pr-4 text-sm text-white placeholder-[#a8a8a8] focus:outline-none focus:ring-2 focus:ring-[#0f62fe]"
          />
        </div>
      </div>
      
      <div className="flex items-center h-full">
        <button className="h-full w-[48px] flex items-center justify-center hover:bg-[#393939] transition-colors">
          <Grid className="w-5 h-5 text-white" />
        </button>
        <button className="h-full w-[48px] flex items-center justify-center hover:bg-[#393939] transition-colors">
          <Bell className="w-5 h-5 text-white" />
        </button>
        <button className="h-full w-[48px] flex items-center justify-center hover:bg-[#393939] transition-colors">
          <User className="w-5 h-5 text-white" />
        </button>
      </div>
    </header>
  );
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f4f4f4] font-sans antialiased">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
           <div className="max-w-[1584px] mx-auto w-full">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
}
