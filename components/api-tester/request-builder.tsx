"use client";

import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { HTTPMethod } from "@/types/api-tester";
import { getMethodColor } from "@/lib/api-tester/response-formatter";

interface RequestBuilderProps {
  method: HTTPMethod;
  url: string;
  onMethodChange: (method: HTTPMethod) => void;
  onUrlChange: (url: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function RequestBuilder({
  method,
  url,
  onMethodChange,
  onUrlChange,
  onSend,
  isLoading,
}: RequestBuilderProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && url && !isLoading) {
      onSend();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="w-32">
            <Select value={method} onValueChange={(value) => onMethodChange(value as HTTPMethod)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(["GET", "POST", "PUT", "PATCH", "DELETE"] as HTTPMethod[]).map((m) => (
                  <SelectItem key={m} value={m}>
                    <Badge variant="outline" className={getMethodColor(m)}>
                      {m}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Input
              type="url"
              placeholder="https://api.example.com/endpoint"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>

          <Button onClick={onSend} disabled={isLoading || !url} size="default">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
