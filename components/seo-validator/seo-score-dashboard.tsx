"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SEOScore } from "@/types/seo";
import {
  TrendingUp,
  FileText,
  Code,
  Zap,
  Share2,
  CheckCircle2,
  AlertCircle,
  XCircle
} from "lucide-react";

interface SEOScoreDashboardProps {
  score: SEOScore;
}

export function SEOScoreDashboard({ score }: SEOScoreDashboardProps) {
  const getScoreColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBadge = (value: number) => {
    if (value >= 80) return <Badge variant="default" className="bg-green-600">Excellent</Badge>;
    if (value >= 60) return <Badge variant="secondary" className="bg-yellow-600">Good</Badge>;
    if (value >= 40) return <Badge variant="secondary" className="bg-orange-600">Fair</Badge>;
    return <Badge variant="destructive">Poor</Badge>;
  };

  const getScoreIcon = (value: number) => {
    if (value >= 80) return <CheckCircle2 className="h-5 w-5 text-green-600" />;
    if (value >= 60) return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    return <XCircle className="h-5 w-5 text-red-600" />;
  };

  const categories = [
    { name: "Meta Tags", score: score.metaTags, max: 25, icon: FileText },
    { name: "Content", score: score.content, max: 25, icon: FileText },
    { name: "Technical", score: score.technical, max: 20, icon: Code },
    { name: "Performance", score: score.performance, max: 15, icon: Zap },
    { name: "Social", score: score.social, max: 15, icon: Share2 },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Overall SEO Score</CardTitle>
              <CardDescription>Comprehensive SEO health analysis</CardDescription>
            </div>
            {getScoreBadge(score.overall)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  className={getScoreColor(score.overall, 100)}
                  strokeDasharray={`${(score.overall / 100) * 552.92} 552.92`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(score.overall, 100)}`}>
                    {score.overall}
                  </div>
                  <div className="text-sm text-muted-foreground">out of 100</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Score Breakdown</CardTitle>
          <CardDescription>Detailed analysis by category</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const percentage = (category.score / category.max) * 100;

            return (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${getScoreColor(category.score, category.max)}`}>
                      {category.score}/{category.max}
                    </span>
                    {getScoreIcon(percentage)}
                  </div>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      percentage >= 80 ? 'bg-green-600' :
                      percentage >= 60 ? 'bg-yellow-600' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Quick Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {score.overall >= 80 && (
            <div className="flex items-start gap-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4 mt-0.5" />
              <span>Excellent! Your SEO is well-optimized.</span>
            </div>
          )}
          {score.metaTags < 20 && (
            <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
              <XCircle className="h-4 w-4 mt-0.5" />
              <span>Meta tags need improvement.</span>
            </div>
          )}
          {score.performance < 12 && (
            <div className="flex items-start gap-2 text-sm text-yellow-600 dark:text-yellow-400">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span>Performance optimization recommended.</span>
            </div>
          )}
          {score.social < 10 && (
            <div className="flex items-start gap-2 text-sm text-yellow-600 dark:text-yellow-400">
              <AlertCircle className="h-4 w-4 mt-0.5" />
              <span>Improve social media meta tags.</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
