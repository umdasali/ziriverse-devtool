"use client";

import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Globe,
  Lock,
  Network,
  CreditCard,
  Calendar,
  MapPin,
  User,
  Wand2,
  Copy,
  Check,
  Download,
  Trash2,
  Code2,
  TestTube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type {
  RegexCategory,
  ProgrammingLanguage,
  GeneratedPattern,
  PatternOptions,
  PhonePatternOptions,
  PasswordPatternOptions,
  URLPatternOptions,
  DatePatternOptions,
  IPAddressPatternOptions,
  PostalCodePatternOptions,
  UsernamePatternOptions,
  CustomPatternOptions,
  RegexMakerHistoryEntry,
  PatternTestResult,
} from "@/types/regex-maker";
import {
  DEFAULT_PATTERN_OPTIONS,
  DEFAULT_PHONE_OPTIONS,
  DEFAULT_PASSWORD_OPTIONS,
  DEFAULT_URL_OPTIONS,
  DEFAULT_DATE_OPTIONS,
  DEFAULT_IP_OPTIONS,
  DEFAULT_POSTAL_CODE_OPTIONS,
  DEFAULT_USERNAME_OPTIONS,
  DEFAULT_CUSTOM_OPTIONS,
  PHONE_COUNTRIES,
  PASSWORD_STRENGTHS,
  DATE_FORMATS,
  POSTAL_CODE_COUNTRIES,
  PROGRAMMING_LANGUAGES,
} from "@/types/regex-maker";
import {
  generatePattern,
  generateLanguageCode,
  testGeneratedPattern,
  getExampleStrings,
} from "@/lib/developer-tools/regex-maker";

// Category icons mapping
const CATEGORY_ICONS = {
  email: Mail,
  phone: Phone,
  url: Globe,
  password: Lock,
  ipAddress: Network,
  creditCard: CreditCard,
  date: Calendar,
  postalCode: MapPin,
  username: User,
  custom: Wand2,
};

// History localStorage key
const HISTORY_KEY = "regex-maker-history";
const MAX_HISTORY = 10;

export function RegexMakerTool() {
  // State
  const [category, setCategory] = useState<RegexCategory>("email");
  const [language, setLanguage] = useState<ProgrammingLanguage>("javascript");
  const [options, setOptions] = useState<PatternOptions>(DEFAULT_PATTERN_OPTIONS);

  // Category-specific options
  const [phoneOptions, setPhoneOptions] = useState<PhonePatternOptions>(DEFAULT_PHONE_OPTIONS);
  const [passwordOptions, setPasswordOptions] = useState<PasswordPatternOptions>(DEFAULT_PASSWORD_OPTIONS);
  const [urlOptions, setURLOptions] = useState<URLPatternOptions>(DEFAULT_URL_OPTIONS);
  const [dateOptions, setDateOptions] = useState<DatePatternOptions>(DEFAULT_DATE_OPTIONS);
  const [ipOptions, setIPOptions] = useState<IPAddressPatternOptions>(DEFAULT_IP_OPTIONS);
  const [postalCodeOptions, setPostalCodeOptions] = useState<PostalCodePatternOptions>(DEFAULT_POSTAL_CODE_OPTIONS);
  const [usernameOptions, setUsernameOptions] = useState<UsernamePatternOptions>(DEFAULT_USERNAME_OPTIONS);
  const [customOptions, setCustomOptions] = useState<CustomPatternOptions>(DEFAULT_CUSTOM_OPTIONS);

  // Generated pattern and testing
  const [generatedPattern, setGeneratedPattern] = useState<GeneratedPattern | null>(null);
  const [testString, setTestString] = useState("");
  const [testResult, setTestResult] = useState<PatternTestResult | null>(null);

  // UI state
  const [copied, setCopied] = useState<string | null>(null);
  const [history, setHistory] = useState<RegexMakerHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load history:", error);
      }
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (pattern: GeneratedPattern) => {
    const entry: RegexMakerHistoryEntry = {
      id: crypto.randomUUID(),
      pattern,
      timestamp: Date.now(),
    };

    const newHistory = [entry, ...history].slice(0, MAX_HISTORY);
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  // Generate pattern handler
  const handleGenerate = () => {
    let categoryOpts: any = {};

    switch (category) {
      case "phone":
        categoryOpts = phoneOptions;
        break;
      case "password":
        categoryOpts = passwordOptions;
        break;
      case "url":
        categoryOpts = urlOptions;
        break;
      case "date":
        categoryOpts = dateOptions;
        break;
      case "ipAddress":
        categoryOpts = ipOptions;
        break;
      case "postalCode":
        categoryOpts = postalCodeOptions;
        break;
      case "username":
        categoryOpts = usernameOptions;
        break;
      case "custom":
        categoryOpts = customOptions;
        break;
    }

    const pattern = generatePattern(category, options, categoryOpts);
    setGeneratedPattern(pattern);
    saveToHistory(pattern);

    // Auto-test with first example
    if (pattern.examples[0]) {
      setTestString(pattern.examples[0]);
    }
  };

  // Test pattern against test string
  useEffect(() => {
    if (generatedPattern && testString) {
      const result = testGeneratedPattern(generatedPattern, testString);
      setTestResult(result);
    } else {
      setTestResult(null);
    }
  }, [generatedPattern, testString]);

  // Copy to clipboard
  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  // Download pattern as file
  const downloadPattern = () => {
    if (!generatedPattern) return;

    const code = generateLanguageCode(generatedPattern, language);
    const blob = new Blob([code.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `regex-pattern.${getFileExtension(language)}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Get file extension for language
  const getFileExtension = (lang: ProgrammingLanguage): string => {
    const extensions: Record<ProgrammingLanguage, string> = {
      javascript: "js",
      python: "py",
      php: "php",
      java: "java",
      csharp: "cs",
      ruby: "rb",
      go: "go",
      rust: "rs",
    };
    return extensions[lang];
  };

  // Load pattern from history
  const loadFromHistory = (pattern: GeneratedPattern) => {
    setGeneratedPattern(pattern);
    setCategory(pattern.category);
    if (pattern.options) {
      setOptions({ ...DEFAULT_PATTERN_OPTIONS, ...pattern.options });
    }
    if (pattern.categoryOptions) {
      // Restore category-specific options
      switch (pattern.category) {
        case "phone":
          setPhoneOptions({ ...DEFAULT_PHONE_OPTIONS, ...pattern.categoryOptions });
          break;
        case "password":
          setPasswordOptions({ ...DEFAULT_PASSWORD_OPTIONS, ...pattern.categoryOptions });
          break;
        case "url":
          setURLOptions({ ...DEFAULT_URL_OPTIONS, ...pattern.categoryOptions });
          break;
        case "date":
          setDateOptions({ ...DEFAULT_DATE_OPTIONS, ...pattern.categoryOptions });
          break;
        case "ipAddress":
          setIPOptions({ ...DEFAULT_IP_OPTIONS, ...pattern.categoryOptions });
          break;
        case "postalCode":
          setPostalCodeOptions({ ...DEFAULT_POSTAL_CODE_OPTIONS, ...pattern.categoryOptions });
          break;
        case "username":
          setUsernameOptions({ ...DEFAULT_USERNAME_OPTIONS, ...pattern.categoryOptions });
          break;
        case "custom":
          setCustomOptions({ ...DEFAULT_CUSTOM_OPTIONS, ...pattern.categoryOptions });
          break;
      }
    }
    setShowHistory(false);
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  // Delete single history entry
  const deleteHistoryEntry = (id: string) => {
    const newHistory = history.filter((entry) => entry.id !== id);
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  // Render category-specific options
  const renderCategoryOptions = () => {
    switch (category) {
      case "email":
        return <EmailOptionsCard />;
      case "phone":
        return <PhoneOptionsCard options={phoneOptions} onChange={setPhoneOptions} />;
      case "password":
        return <PasswordOptionsCard options={passwordOptions} onChange={setPasswordOptions} />;
      case "url":
        return <URLOptionsCard options={urlOptions} onChange={setURLOptions} />;
      case "date":
        return <DateOptionsCard options={dateOptions} onChange={setDateOptions} />;
      case "ipAddress":
        return <IPAddressOptionsCard options={ipOptions} onChange={setIPOptions} />;
      case "creditCard":
        return <CreditCardOptionsCard />;
      case "postalCode":
        return <PostalCodeOptionsCard options={postalCodeOptions} onChange={setPostalCodeOptions} />;
      case "username":
        return <UsernameOptionsCard options={usernameOptions} onChange={setUsernameOptions} />;
      case "custom":
        return <CustomOptionsCard options={customOptions} onChange={setCustomOptions} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Regex Maker</h2>
          <p className="text-sm text-muted-foreground">
            Generate regex patterns for common use cases with multi-language support
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
          >
            <Code2 className="h-4 w-4 mr-2" />
            History
            {history.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {history.length}
              </Badge>
            )}
          </Button>
          {generatedPattern && (
            <Button variant="outline" size="sm" onClick={downloadPattern}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pattern History</CardTitle>
              <CardDescription>Last {MAX_HISTORY} generated patterns</CardDescription>
            </div>
            {history.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No history yet. Generate a pattern to get started.
              </p>
            ) : (
              <div className="space-y-2">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer"
                    onClick={() => loadFromHistory(entry.pattern)}
                  >
                    <Badge variant="secondary">{entry.pattern.category}</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-mono truncate">{entry.pattern.pattern}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistoryEntry(entry.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Pattern Builder (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Category Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Select Pattern Category</CardTitle>
              <CardDescription>Choose the type of pattern you want to generate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {(Object.keys(CATEGORY_ICONS) as RegexCategory[]).map((cat) => {
                  const Icon = CATEGORY_ICONS[cat];
                  const isSelected = category === cat;
                  return (
                    <Button
                      key={cat}
                      variant={isSelected ? "default" : "outline"}
                      className="h-20 flex-col gap-2"
                      onClick={() => setCategory(cat)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs capitalize">{cat.replace(/([A-Z])/g, " $1").trim()}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Category-Specific Options */}
          {renderCategoryOptions()}

          {/* Common Options */}
          <Card>
            <CardHeader>
              <CardTitle>Common Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="validation">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="validation">Validation</TabsTrigger>
                  <TabsTrigger value="flags">Flags</TabsTrigger>
                </TabsList>

                <TabsContent value="validation" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Min Length</Label>
                      <Input
                        type="number"
                        placeholder="No minimum"
                        value={options.minLength || ""}
                        onChange={(e) =>
                          setOptions({
                            ...options,
                            minLength: e.target.value ? parseInt(e.target.value) : undefined,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Length</Label>
                      <Input
                        type="number"
                        placeholder="No maximum"
                        value={options.maxLength || ""}
                        onChange={(e) =>
                          setOptions({
                            ...options,
                            maxLength: e.target.value ? parseInt(e.target.value) : undefined,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Case Sensitive</Label>
                    <Switch
                      checked={options.caseSensitive}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, caseSensitive: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>No Leading Space</Label>
                    <Switch
                      checked={options.noLeadingSpace}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, noLeadingSpace: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>No Trailing Space</Label>
                    <Switch
                      checked={options.noTrailingSpace}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, noTrailingSpace: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>No Consecutive Spaces</Label>
                    <Switch
                      checked={options.noConsecutiveSpaces}
                      onCheckedChange={(checked) =>
                        setOptions({ ...options, noConsecutiveSpaces: checked })
                      }
                    />
                  </div>
                </TabsContent>

                <TabsContent value="flags" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Global (g)</Label>
                      <p className="text-xs text-muted-foreground">Find all matches</p>
                    </div>
                    <Switch
                      checked={options.flags.global}
                      onCheckedChange={(checked) =>
                        setOptions({
                          ...options,
                          flags: { ...options.flags, global: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Case Insensitive (i)</Label>
                      <p className="text-xs text-muted-foreground">Ignore case</p>
                    </div>
                    <Switch
                      checked={options.flags.caseInsensitive}
                      onCheckedChange={(checked) =>
                        setOptions({
                          ...options,
                          flags: { ...options.flags, caseInsensitive: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Multiline (m)</Label>
                      <p className="text-xs text-muted-foreground">Match across lines</p>
                    </div>
                    <Switch
                      checked={options.flags.multiline}
                      onCheckedChange={(checked) =>
                        setOptions({
                          ...options,
                          flags: { ...options.flags, multiline: checked },
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Unicode (u)</Label>
                      <p className="text-xs text-muted-foreground">Unicode support</p>
                    </div>
                    <Switch
                      checked={options.flags.unicode}
                      onCheckedChange={(checked) =>
                        setOptions({
                          ...options,
                          flags: { ...options.flags, unicode: checked },
                        })
                      }
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={handleGenerate} className="w-full" size="lg">
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Pattern
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Output & Testing (40%) */}
        <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-6 lg:self-start">
          {/* Generated Pattern Display */}
          {generatedPattern && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Generated Pattern
                  <Badge variant="secondary">{generatedPattern.category}</Badge>
                </CardTitle>
                <CardDescription>{generatedPattern.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Pattern</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(generatedPattern.pattern, "pattern")}
                    >
                      {copied === "pattern" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                    /{generatedPattern.pattern}/{generatedPattern.flags}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Examples (click to test)</Label>
                  <div className="flex flex-wrap gap-2">
                    {generatedPattern.examples.map((example, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => setTestString(example)}
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Live Tester */}
          {generatedPattern && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="h-5 w-5" />
                  Live Tester
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Test String</Label>
                  <Textarea
                    placeholder="Enter text to test against the pattern..."
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    rows={3}
                  />
                </div>

                {testResult && (
                  <div className="space-y-2">
                    {testResult.isValid ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={testResult.matchCount > 0 ? "default" : "secondary"}
                          >
                            {testResult.matchCount} match{testResult.matchCount !== 1 ? "es" : ""}
                          </Badge>
                        </div>
                        {testResult.matches.length > 0 && (
                          <div className="p-3 bg-muted rounded-lg">
                            <p className="text-sm font-mono whitespace-pre-wrap">
                              {highlightMatches(testString, testResult.matches)}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <Alert variant="destructive">
                        <AlertDescription>{testResult.error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Code Output */}
          {generatedPattern && (
            <Card>
              <CardHeader>
                <CardTitle>Code Output</CardTitle>
                <CardDescription>Use this pattern in your preferred language</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={language} onValueChange={(v) => setLanguage(v as ProgrammingLanguage)}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="javascript">JS</TabsTrigger>
                    <TabsTrigger value="python">Py</TabsTrigger>
                    <TabsTrigger value="php">PHP</TabsTrigger>
                    <TabsTrigger value="java">Java</TabsTrigger>
                  </TabsList>
                  <TabsList className="grid grid-cols-4 w-full mt-2">
                    <TabsTrigger value="csharp">C#</TabsTrigger>
                    <TabsTrigger value="ruby">Ruby</TabsTrigger>
                    <TabsTrigger value="go">Go</TabsTrigger>
                    <TabsTrigger value="rust">Rust</TabsTrigger>
                  </TabsList>

                  {(Object.keys(PROGRAMMING_LANGUAGES) as ProgrammingLanguage[]).map((lang) => {
                    const code = generateLanguageCode(generatedPattern, lang);
                    return (
                      <TabsContent key={lang} value={lang} className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>{code.label}</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(code.code, `code-${lang}`)}
                          >
                            {copied === `code-${lang}` ? (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                        <pre className="p-4 bg-muted rounded-lg overflow-x-auto text-sm">
                          <code>{code.code}</code>
                        </pre>
                      </TabsContent>
                    );
                  })}
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to highlight matches
function highlightMatches(text: string, matches: Array<{ index: number; length: number }>): React.ReactNode {
  if (matches.length === 0) return text;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, i) => {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${i}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      );
    }

    // Add highlighted match
    parts.push(
      <span key={`match-${i}`} className="bg-yellow-200 dark:bg-yellow-800">
        {text.substring(match.index, match.index + match.length)}
      </span>
    );

    lastIndex = match.index + match.length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(<span key="text-end">{text.substring(lastIndex)}</span>);
  }

  return <>{parts}</>;
}

// Category-specific option components
function EmailOptionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Options
        </CardTitle>
        <CardDescription>Basic email validation pattern</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Generates a pattern that matches standard email addresses (user@example.com).
          Use common options below for additional constraints.
        </p>
      </CardContent>
    </Card>
  );
}

function PhoneOptionsCard({
  options,
  onChange,
}: {
  options: PhonePatternOptions;
  onChange: (opts: PhonePatternOptions) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Phone Number Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Country Format</Label>
          <Select
            value={options.country}
            onValueChange={(v: any) => onChange({ ...options, country: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PHONE_COUNTRIES).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label} ({value.example})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label>Require Country Code</Label>
          <Switch
            checked={options.requireCountryCode}
            onCheckedChange={(checked) =>
              onChange({ ...options, requireCountryCode: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Allow Extension</Label>
          <Switch
            checked={options.allowExtension}
            onCheckedChange={(checked) =>
              onChange({ ...options, allowExtension: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

function PasswordOptionsCard({
  options,
  onChange,
}: {
  options: PasswordPatternOptions;
  onChange: (opts: PasswordPatternOptions) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Password Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Password Strength</Label>
          <Select
            value={options.strength}
            onValueChange={(v: any) => onChange({ ...options, strength: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PASSWORD_STRENGTHS).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label} - {value.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Minimum Length: {options.minLength}</Label>
          <Slider
            value={[options.minLength]}
            onValueChange={([v]) => onChange({ ...options, minLength: v })}
            min={4}
            max={32}
            step={1}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function URLOptionsCard({
  options,
  onChange,
}: {
  options: URLPatternOptions;
  onChange: (opts: URLPatternOptions) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          URL Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Require Protocol</Label>
          <Switch
            checked={options.requireProtocol}
            onCheckedChange={(checked) =>
              onChange({ ...options, requireProtocol: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Allow Subdomain</Label>
          <Switch
            checked={options.allowSubdomain}
            onCheckedChange={(checked) =>
              onChange({ ...options, allowSubdomain: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Allow Query Parameters</Label>
          <Switch
            checked={options.allowQueryParams}
            onCheckedChange={(checked) =>
              onChange({ ...options, allowQueryParams: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Allow Fragment (#)</Label>
          <Switch
            checked={options.allowFragment}
            onCheckedChange={(checked) =>
              onChange({ ...options, allowFragment: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

function DateOptionsCard({
  options,
  onChange,
}: {
  options: DatePatternOptions;
  onChange: (opts: DatePatternOptions) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Date Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Date Format</Label>
          <Select
            value={options.format}
            onValueChange={(v: any) => onChange({ ...options, format: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(DATE_FORMATS).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label} (e.g., {value.example})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label>Allow Leading Zero</Label>
          <Switch
            checked={options.allowLeadingZero}
            onCheckedChange={(checked) =>
              onChange({ ...options, allowLeadingZero: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

function IPAddressOptionsCard({
  options,
  onChange,
}: {
  options: IPAddressPatternOptions;
  onChange: (opts: IPAddressPatternOptions) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          IP Address Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>IP Version</Label>
          <Select
            value={options.version}
            onValueChange={(v: any) => onChange({ ...options, version: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ipv4">IPv4</SelectItem>
              <SelectItem value="ipv6">IPv6</SelectItem>
              <SelectItem value="both">Both IPv4 & IPv6</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label>Allow CIDR Notation</Label>
          <Switch
            checked={options.allowCIDR}
            onCheckedChange={(checked) =>
              onChange({ ...options, allowCIDR: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

function CreditCardOptionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Credit Card Options
        </CardTitle>
        <CardDescription>16-digit credit card number pattern</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Matches 16-digit credit card numbers with optional spacing or dashes.
          Note: This only validates format, not actual card validity.
        </p>
      </CardContent>
    </Card>
  );
}

function PostalCodeOptionsCard({
  options,
  onChange,
}: {
  options: PostalCodePatternOptions;
  onChange: (opts: PostalCodePatternOptions) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Postal Code Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Country Format</Label>
          <Select
            value={options.country}
            onValueChange={(v: any) => onChange({ ...options, country: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(POSTAL_CODE_COUNTRIES).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label} (e.g., {value.example})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

function UsernameOptionsCard({
  options,
  onChange,
}: {
  options: UsernamePatternOptions;
  onChange: (opts: UsernamePatternOptions) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Username Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Min Length</Label>
            <Input
              type="number"
              value={options.minLength}
              onChange={(e) =>
                onChange({ ...options, minLength: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Max Length</Label>
            <Input
              type="number"
              value={options.maxLength}
              onChange={(e) =>
                onChange({ ...options, maxLength: parseInt(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Allow Dots (.)</Label>
          <Switch
            checked={options.allowDots}
            onCheckedChange={(checked) =>
              onChange({ ...options, allowDots: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Allow Underscores (_)</Label>
          <Switch
            checked={options.allowUnderscores}
            onCheckedChange={(checked) =>
              onChange({ ...options, allowUnderscores: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Allow Hyphens (-)</Label>
          <Switch
            checked={options.allowHyphens}
            onCheckedChange={(checked) =>
              onChange({ ...options, allowHyphens: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Must Start with Letter</Label>
          <Switch
            checked={options.requireStartWithLetter}
            onCheckedChange={(checked) =>
              onChange({ ...options, requireStartWithLetter: checked })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

function CustomOptionsCard({
  options,
  onChange,
}: {
  options: CustomPatternOptions;
  onChange: (opts: CustomPatternOptions) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          Custom Pattern Options
        </CardTitle>
        <CardDescription>Build a custom pattern from character sets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Include Digits (0-9)</Label>
          <Switch
            checked={options.includeDigits}
            onCheckedChange={(checked) =>
              onChange({ ...options, includeDigits: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Include Lowercase (a-z)</Label>
          <Switch
            checked={options.includeLowercase}
            onCheckedChange={(checked) =>
              onChange({ ...options, includeLowercase: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Include Uppercase (A-Z)</Label>
          <Switch
            checked={options.includeUppercase}
            onCheckedChange={(checked) =>
              onChange({ ...options, includeUppercase: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Include Special Characters</Label>
          <Switch
            checked={options.includeSpecialChars}
            onCheckedChange={(checked) =>
              onChange({ ...options, includeSpecialChars: checked })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Custom Character Set (optional)</Label>
          <Input
            placeholder="e.g., $%#@"
            value={options.customCharSet || ""}
            onChange={(e) =>
              onChange({ ...options, customCharSet: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Min Length</Label>
            <Input
              type="number"
              placeholder="Any"
              value={options.minLength || ""}
              onChange={(e) =>
                onChange({
                  ...options,
                  minLength: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Max Length</Label>
            <Input
              type="number"
              placeholder="Any"
              value={options.maxLength || ""}
              onChange={(e) =>
                onChange({
                  ...options,
                  maxLength: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
