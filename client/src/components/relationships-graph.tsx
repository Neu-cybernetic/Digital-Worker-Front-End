import { ReactFlow, Background, Controls, MiniMap, Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Vendor Portal (Source)' },
    position: { x: 250, y: 0 },
    style: { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }
  },
  {
    id: '2',
    data: { label: 'InvoiceProcessor-Alpha' },
    position: { x: 250, y: 150 },
    style: { 
      background: '#eff6ff', 
      border: '2px solid #3b82f6', 
      borderRadius: '8px', 
      padding: '15px', 
      fontWeight: 'bold',
      color: '#1e3a8a',
      width: 200,
      textAlign: 'center'
    }
  },
  {
    id: '3',
    data: { label: 'SAP ERP (Target)' },
    position: { x: 100, y: 300 },
    style: { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }
  },
  {
    id: '4',
    data: { label: 'Email Notification Service' },
    position: { x: 400, y: 300 },
    style: { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'AP Manager (Review)' },
    position: { x: 250, y: 450 },
    style: { background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Ingests PDF' },
  { id: 'e2-3', source: '2', target: '3', label: 'Posts Invoice' },
  { id: 'e2-4', source: '2', target: '4', label: 'Exceptions' },
  { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#ef4444' } },
  { id: 'e3-5', source: '3', target: '5', animated: true, style: { stroke: '#22c55e' } },
];

interface RelationshipsGraphProps {
  className?: string;
  interactive?: boolean;
}

export function RelationshipsGraph({ className, interactive = true }: RelationshipsGraphProps) {
  return (
    <div className={className}>
      <ReactFlow 
        nodes={initialNodes} 
        edges={initialEdges} 
        fitView
        attributionPosition="bottom-right"
        nodesDraggable={interactive}
        nodesConnectable={false}
        zoomOnScroll={interactive}
        panOnScroll={interactive}
      >
        <Background color="#94a3b8" gap={16} />
        {interactive && <Controls />}
        {interactive && <MiniMap />}
      </ReactFlow>
    </div>
  );
}
