import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="h-16 border-b bg-background flex items-center px-6 sticky top-0 z-10 justify-between">
      <div className="w-96">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search workers, IDs, or owners..." 
            className="pl-9 bg-muted/40 border-none focus-visible:ring-1" 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Link href="/create">
          <Button className="gap-2 bg-primary hover:bg-primary/90 shadow-sm">
            <Plus className="h-4 w-4" />
            Register Digital Worker
          </Button>
        </Link>
      </div>
    </header>
  );
}
