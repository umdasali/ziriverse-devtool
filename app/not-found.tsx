"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center">
        {/* 404 Heading */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
        </div>

        {/* Helpful Links */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-4">
            Here are some helpful links instead:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/image-converter">
              <Button variant="outline" size="sm">
                Image Converter
              </Button>
            </Link>
            <Link href="/seo-validator">
              <Button variant="outline" size="sm">
                SEO Validator
              </Button>
            </Link>
            <Link href="/branding">
              <Button variant="outline" size="sm">
                Design System
              </Button>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <Home className="h-4 w-4" />
              Go to Homepage
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="gap-2 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-xs text-muted-foreground">
            Error Code: 404 - Resource not found
          </p>
        </div>
      </Card>
    </div>
  );
}
