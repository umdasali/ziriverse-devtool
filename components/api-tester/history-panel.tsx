"use client";

import { History, Trash2, X, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { RequestHistory } from "@/types/api-tester";
import { getMethodColor, getStatusColor } from "@/lib/api-tester/response-formatter";

interface HistoryPanelProps {
  history: RequestHistory[];
  onLoad: (entry: RequestHistory) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function HistoryPanel({
  history,
  onLoad,
  onDelete,
  onClose,
}: HistoryPanelProps) {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5" />
            <div>
              <CardTitle>Request History</CardTitle>
              <CardDescription>Your recent API requests</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-2">
            <History className="h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              No history yet. Send a request to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="outline"
                      className={getMethodColor(entry.request.method)}
                    >
                      {entry.request.method}
                    </Badge>
                    {entry.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(entry.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm font-mono truncate" title={entry.request.url}>
                    {entry.request.url}
                  </p>
                  {entry.response && (
                    <p className="text-xs mt-1">
                      <span className={getStatusColor(entry.response.status)}>
                        {entry.response.status} {entry.response.statusText}
                      </span>
                      <span className="text-muted-foreground"> • {entry.response.time.toFixed(0)}ms</span>
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onLoad(entry)}
                  >
                    Load
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(entry.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
