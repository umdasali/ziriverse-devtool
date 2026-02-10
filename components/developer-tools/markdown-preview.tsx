"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Eye, Code, Check, FileText } from "lucide-react";
import { marked } from "marked";

const SAMPLE_MARKDOWN = `# Welcome to Markdown Preview

This is a **live** Markdown editor with instant preview.

## Features

- GitHub Flavored Markdown support
- Live preview as you type
- Export as HTML
- Copy formatted HTML

## Formatting Examples

### Text Styling

- **Bold text** using \`**bold**\`
- *Italic text* using \`*italic*\`
- ***Bold and italic*** using \`***both***\`
- ~~Strikethrough~~ using \`~~text~~\`

### Lists

#### Unordered List
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3

#### Ordered List
1. First item
2. Second item
3. Third item

### Code

Inline code: \`const x = 10;\`

Code block:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

### Links & Images

[Visit Google](https://google.com)

![Alt text](https://via.placeholder.com/150)

### Blockquotes

> This is a blockquote.
> It can span multiple lines.

### Tables

| Feature | Supported |
|---------|-----------|
| Headers | ✓ |
| Lists | ✓ |
| Code | ✓ |
| Tables | ✓ |

### Horizontal Rule

---

### Task List

- [x] Completed task
- [ ] Pending task
- [ ] Another task

Happy writing! 🚀
`;

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MARKDOWN);
  const [html, setHtml] = useState<string>("");
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  // Configure marked options
  useEffect(() => {
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: true, // Line breaks
    });
  }, []);

  // Convert markdown to HTML
  useEffect(() => {
    const convertMarkdown = async () => {
      try {
        const htmlContent = await marked(markdown);
        setHtml(htmlContent as string);
      } catch (error) {
        console.error("Error converting markdown:", error);
        setHtml("<p>Error converting markdown</p>");
      }
    };

    convertMarkdown();
  }, [markdown]);

  // Copy HTML
  const copyHTML = () => {
    navigator.clipboard.writeText(html);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  // Copy Markdown
  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  // Download HTML
  const downloadHTML = () => {
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Document</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
      color: #333;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
    }
    blockquote {
      border-left: 4px solid #ddd;
      padding-left: 1rem;
      color: #666;
      margin-left: 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background: #f4f4f4;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    hr {
      border: none;
      border-top: 2px solid #ddd;
      margin: 2rem 0;
    }
  </style>
</head>
<body>
${html}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `markdown-${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Clear content
  const clearContent = () => {
    setMarkdown("");
  };

  // Load sample
  const loadSample = () => {
    setMarkdown(SAMPLE_MARKDOWN);
  };

  const wordCount = markdown.trim().split(/\s+/).length;
  const charCount = markdown.length;
  const lineCount = markdown.split("\n").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Markdown Preview</h1>
          <p className="text-muted-foreground">
            Live Markdown editor with instant HTML preview
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadSample}>
            Load Sample
          </Button>
          <Button variant="outline" onClick={clearContent}>
            Clear
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <Card>
        <CardContent className="py-4">
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{wordCount}</span>
              <span className="text-muted-foreground">words</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{charCount}</span>
              <span className="text-muted-foreground">characters</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{lineCount}</span>
              <span className="text-muted-foreground">lines</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Editor */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Markdown Editor
              </span>
              <Button size="sm" variant="outline" onClick={copyMarkdown}>
                {copiedMarkdown ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type your Markdown here..."
              className="flex-1 font-mono text-sm min-h-[600px] resize-none"
            />
          </CardContent>
        </Card>

        {/* Right: Preview & HTML */}
        <Card className="flex flex-col">
          <CardHeader>
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="html">
                  <Code className="w-4 h-4 mr-2" />
                  HTML
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-4">
                <div className="flex gap-2 mb-4">
                  <Button size="sm" variant="outline" onClick={downloadHTML} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download HTML
                  </Button>
                </div>
                <div
                  className="prose prose-sm max-w-none min-h-[600px] p-4 border rounded-lg overflow-auto"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </TabsContent>

              <TabsContent value="html" className="mt-4">
                <div className="flex gap-2 mb-4">
                  <Button size="sm" variant="outline" onClick={copyHTML} className="flex-1">
                    {copiedHtml ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy HTML
                      </>
                    )}
                  </Button>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-auto min-h-[600px] text-xs">
                  <code>{html}</code>
                </pre>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>

      {/* Syntax Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Markdown Syntax Guide</CardTitle>
          <CardDescription>Quick reference for common Markdown syntax</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium mb-2">Headers</p>
              <code className="block bg-muted p-2 rounded text-xs">
                # H1<br />
                ## H2<br />
                ### H3
              </code>
            </div>
            <div>
              <p className="font-medium mb-2">Emphasis</p>
              <code className="block bg-muted p-2 rounded text-xs">
                **bold**<br />
                *italic*<br />
                ~~strike~~
              </code>
            </div>
            <div>
              <p className="font-medium mb-2">Lists</p>
              <code className="block bg-muted p-2 rounded text-xs">
                - Item 1<br />
                - Item 2<br />
                1. Numbered
              </code>
            </div>
            <div>
              <p className="font-medium mb-2">Links</p>
              <code className="block bg-muted p-2 rounded text-xs">
                [Text](url)
              </code>
            </div>
            <div>
              <p className="font-medium mb-2">Code</p>
              <code className="block bg-muted p-2 rounded text-xs">
                `inline code`<br />
                ```<br />
                code block<br />
                ```
              </code>
            </div>
            <div>
              <p className="font-medium mb-2">Blockquote</p>
              <code className="block bg-muted p-2 rounded text-xs">
                &gt; Quote text
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
