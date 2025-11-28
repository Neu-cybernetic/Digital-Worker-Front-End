import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { RelationshipsGraph } from "@/components/relationships-graph";

export default function Relationships() {
  return (
    <MainLayout>
      <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold">Relationships Graph</h1>
            <p className="text-muted-foreground">Visualize dependencies and data flow between Digital Workers and systems.</p>
          </div>
        </div>

        <Card className="flex-1 overflow-hidden border shadow-sm">
          <RelationshipsGraph className="w-full h-full" />
        </Card>
      </div>
    </MainLayout>
  );
}
