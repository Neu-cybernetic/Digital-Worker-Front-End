import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import { useLocation } from "wouter";

export default function Placeholder({ title }: { title: string }) {
  const [, setLocation] = useLocation();

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-6 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
          <Construction className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-heading font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          This module is part of the future roadmap (Epic 2+). 
          Please check back later for updates on Governance and Job Architecture features.
        </p>
        <Button onClick={() => setLocation("/")}>Return to Directory</Button>
      </div>
    </MainLayout>
  );
}
