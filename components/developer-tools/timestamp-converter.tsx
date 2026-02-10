"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Copy, RefreshCw } from "lucide-react";

export function TimestampConverter() {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(Date.now());
  const [unixInput, setUnixInput] = useState<string>("");
  const [dateInput, setDateInput] = useState<string>("");
  const [convertedDate, setConvertedDate] = useState<string>("");
  const [convertedTimestamp, setConvertedTimestamp] = useState<string>("");
  const [relativeTime, setRelativeTime] = useState<string>("");

  // Update current timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Convert Unix timestamp to date
  const handleUnixToDate = () => {
    try {
      const timestamp = parseInt(unixInput);
      if (isNaN(timestamp)) {
        setConvertedDate("Invalid timestamp");
        return;
      }

      // Handle both seconds and milliseconds
      const ms = unixInput.length <= 10 ? timestamp * 1000 : timestamp;
      const date = new Date(ms);

      if (isNaN(date.getTime())) {
        setConvertedDate("Invalid timestamp");
        return;
      }

      const formatted = {
        iso: date.toISOString(),
        utc: date.toUTCString(),
        local: date.toLocaleString(),
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };

      setConvertedDate(JSON.stringify(formatted, null, 2));
      setRelativeTime(getRelativeTime(date));
    } catch (error) {
      setConvertedDate("Error converting timestamp");
    }
  };

  // Convert date to Unix timestamp
  const handleDateToUnix = () => {
    try {
      const date = new Date(dateInput);

      if (isNaN(date.getTime())) {
        setConvertedTimestamp("Invalid date format");
        return;
      }

      const timestamps = {
        milliseconds: date.getTime(),
        seconds: Math.floor(date.getTime() / 1000),
        iso: date.toISOString(),
      };

      setConvertedTimestamp(JSON.stringify(timestamps, null, 2));
    } catch (error) {
      setConvertedTimestamp("Error converting date");
    }
  };

  // Get relative time ("5 minutes ago", "in 2 hours")
  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffSec = Math.abs(Math.floor(diffMs / 1000));
    const isPast = diffMs < 0;

    if (diffSec < 60) return isPast ? `${diffSec} seconds ago` : `in ${diffSec} seconds`;
    if (diffSec < 3600) {
      const mins = Math.floor(diffSec / 60);
      return isPast ? `${mins} minute${mins > 1 ? 's' : ''} ago` : `in ${mins} minute${mins > 1 ? 's' : ''}`;
    }
    if (diffSec < 86400) {
      const hours = Math.floor(diffSec / 3600);
      return isPast ? `${hours} hour${hours > 1 ? 's' : ''} ago` : `in ${hours} hour${hours > 1 ? 's' : ''}`;
    }
    const days = Math.floor(diffSec / 86400);
    return isPast ? `${days} day${days > 1 ? 's' : ''} ago` : `in ${days} day${days > 1 ? 's' : ''}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getCurrentTimestampSeconds = () => Math.floor(currentTimestamp / 1000);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Timestamp Converter</h1>
        <p className="text-muted-foreground">
          Convert Unix timestamps to human-readable dates and vice versa
        </p>
      </div>

      {/* Current Timestamp Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Current Timestamp
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Milliseconds</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted px-3 py-2 rounded-md font-mono text-sm">
                  {currentTimestamp}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(currentTimestamp.toString())}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-2 block">Seconds</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted px-3 py-2 rounded-md font-mono text-sm">
                  {getCurrentTimestampSeconds()}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(getCurrentTimestampSeconds().toString())}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Current Date & Time</Label>
            <code className="block bg-muted px-3 py-2 rounded-md font-mono text-sm">
              {new Date(currentTimestamp).toLocaleString()}
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Converter Tabs */}
      <Tabs defaultValue="unix-to-date">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="unix-to-date">Unix → Date</TabsTrigger>
          <TabsTrigger value="date-to-unix">Date → Unix</TabsTrigger>
        </TabsList>

        {/* Unix to Date */}
        <TabsContent value="unix-to-date" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Convert Unix Timestamp to Date</CardTitle>
              <CardDescription>
                Enter a Unix timestamp (seconds or milliseconds)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="e.g., 1707426789 or 1707426789123"
                    value={unixInput}
                    onChange={(e) => setUnixInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUnixToDate()}
                  />
                </div>
                <Button onClick={handleUnixToDate}>Convert</Button>
                <Button
                  variant="outline"
                  onClick={() => setUnixInput(getCurrentTimestampSeconds().toString())}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              {convertedDate && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Result:</Label>
                    {relativeTime && (
                      <Badge variant="secondary">{relativeTime}</Badge>
                    )}
                  </div>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                    {convertedDate}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(convertedDate)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Result
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Date to Unix */}
        <TabsContent value="date-to-unix" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Convert Date to Unix Timestamp</CardTitle>
              <CardDescription>
                Enter a date in any common format (ISO, UTC, or locale-specific)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="e.g., 2024-02-09 or Feb 9, 2024 or 2024-02-09T10:30:00Z"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleDateToUnix()}
                  />
                </div>
                <Button onClick={handleDateToUnix}>Convert</Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Supported formats:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>ISO 8601: 2024-02-09T10:30:00Z</li>
                  <li>US Format: Feb 9, 2024</li>
                  <li>European: 09/02/2024</li>
                  <li>Unix timestamp: 1707426789</li>
                </ul>
              </div>

              {convertedTimestamp && (
                <div className="space-y-2">
                  <Label>Result:</Label>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                    {convertedTimestamp}
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(convertedTimestamp)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Result
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Common Timestamps</h4>
              <div className="space-y-1 text-muted-foreground">
                <p>• 0 = January 1, 1970 (Unix Epoch)</p>
                <p>• 1000000000 = September 9, 2001</p>
                <p>• 1500000000 = July 14, 2017</p>
                <p>• 2000000000 = May 18, 2033</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Time Units</h4>
              <div className="space-y-1 text-muted-foreground">
                <p>• 1 second = 1,000 milliseconds</p>
                <p>• 1 minute = 60 seconds</p>
                <p>• 1 hour = 3,600 seconds</p>
                <p>• 1 day = 86,400 seconds</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
