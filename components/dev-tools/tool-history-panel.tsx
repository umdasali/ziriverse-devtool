"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Trash2, X } from "lucide-react";
import type { ToolHistoryEntry } from "@/types/dev-tools";

interface ToolHistoryPanelProps {
  history: ToolHistoryEntry[];
  onLoad: (entry: ToolHistoryEntry) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const toolNames: Record<ToolHistoryEntry["tool"], string> = {
  "json-to-ts": "JSON to TypeScript",
  "css-converter": "CSS Converter",
  "svg-visualizer": "SVG Visualizer",
  "regex-tester": "Regex Tester",
};

const toolColors: Record<ToolHistoryEntry["tool"], string> = {
  "json-to-ts": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "css-converter": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "svg-visualizer": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  "regex-tester": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
};

export function ToolHistoryPanel({
  history,
  onLoad,
  onDelete,
  onClose,
}: ToolHistoryPanelProps) {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="mb-6 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <h2 className="text-xl font-semibold">History</h2>
          <Badge variant="secondary">{history.length} entries</Badge>
        </div>
        <Button size="sm" variant="ghost" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {history.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No history yet. Use a tool to create your first entry.
        </p>
      ) : (
        <div className="space-y-2">
          {history.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={toolColors[entry.tool]}>
                    {toolNames[entry.tool]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {entry.input.slice(0, 80)}
                  {entry.input.length > 80 ? "..." : ""}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onLoad(entry)}
                >
                  Load
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(entry.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
