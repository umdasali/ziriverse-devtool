"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AuthConfig, AuthType } from "@/types/api-tester";

interface AuthEditorProps {
  auth: AuthConfig;
  onChange: (auth: AuthConfig) => void;
}

export function AuthEditor({ auth, onChange }: AuthEditorProps) {
  const handleTypeChange = (type: AuthType) => {
    onChange({ ...auth, type });
  };

  const handleBasicChange = (field: "username" | "password", value: string) => {
    onChange({
      ...auth,
      basic: {
        username: field === "username" ? value : auth.basic?.username || "",
        password: field === "password" ? value : auth.basic?.password || "",
      },
    });
  };

  const handleBearerChange = (token: string) => {
    onChange({
      ...auth,
      bearer: { token },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
        <CardDescription>Configure request authentication</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="auth-type">Auth Type</Label>
          <Select value={auth.type} onValueChange={(value) => handleTypeChange(value as AuthType)}>
            <SelectTrigger id="auth-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="basic">Basic Auth</SelectItem>
              <SelectItem value="bearer">Bearer Token</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {auth.type === "basic" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={auth.basic?.username || ""}
                onChange={(e) => handleBasicChange("username", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={auth.basic?.password || ""}
                onChange={(e) => handleBasicChange("password", e.target.value)}
              />
            </div>
          </div>
        )}

        {auth.type === "bearer" && (
          <div className="space-y-2">
            <Label htmlFor="token">Bearer Token</Label>
            <Input
              id="token"
              type="text"
              placeholder="Enter bearer token"
              value={auth.bearer?.token || ""}
              onChange={(e) => handleBearerChange(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              The token will be sent in the Authorization header as: Bearer {auth.bearer?.token || "[token]"}
            </p>
          </div>
        )}

        {auth.type === "none" && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No authentication will be used for this request
          </p>
        )}
      </CardContent>
    </Card>
  );
}
