import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, Check, ChevronRight, AlertTriangle, ShieldCheck, Star,
  Mail, Database, Globe, Shield, Lock, Users, Server, FileText, 
  MessageSquare, Calendar, HardDrive, Cloud, CreditCard, Search, User, ArrowRight
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { TrustPanel } from "@/components/trust-panel";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  jobFamily: z.string({ required_error: "Please select a job family." }),
  businessUnit: z.string({ required_error: "Please select a business unit." }),
  secondaryBusinessUnit: z.string().optional(),
  riskTier: z.string({ required_error: "Please select a risk tier." }),
  autonomyLevel: z.string({ required_error: "Please select an autonomy level." }),
  primaryOwner: z.string().min(2, "Primary owner is required."),
});

const STEPS = [
  { id: 1, title: "Basic Info" },
  { id: 2, title: "Job Family" },
  { id: 3, title: "Org Placement" },
  { id: 4, title: "Purpose" },
  { id: 5, title: "Capabilities" },
  { id: 6, title: "Ownership" },
  { id: 7, title: "Governance" },
  { id: 8, title: "Review" }
];

const PURPOSE_TEMPLATES = [
  {
    id: "t1",
    title: "Standard Inquiry Handler",
    text: "Act as a first-line responder for [Department] inquiries. Retrieve status updates, answer FAQs based on knowledge base, and route complex issues to human agents. Maintain professional tone and adhere to data privacy guidelines.",
    verified: true
  },
  {
    id: "t2",
    title: "Data Reconciliation Agent",
    text: "Monitor [Source System] and [Target System] for discrepancies. Automatically reconcile matches within [Threshold] variance. Flag exceptions for human review and generate daily reconciliation reports.",
    verified: true
  },
  {
    id: "t3",
    title: "Content Generation Assistant",
    text: "Draft initial versions of [Content Type] based on provided briefs. Ensure adherence to brand voice guidelines and SEO best practices. Do not publish directly; submit all drafts for human approval.",
    verified: true
  }
];

export default function CreateWorker() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [purposeScore, setPurposeScore] = useState(0);
  const [approvalType, setApprovalType] = useState("standard");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Calculate purpose score based on length and keywords
  const descriptionValue = form.watch("description");
  useEffect(() => {
    if (!descriptionValue) {
      setPurposeScore(0);
      return;
    }
    
    let score = 0;
    const text = descriptionValue.toLowerCase();
    
    // Base score for length
    if (text.length > 20) score += 20;
    if (text.length > 50) score += 20;
    if (text.length > 100) score += 10;
    
    // Keywords for quality
    if (text.includes("act as") || text.includes("role")) score += 10;
    if (text.includes("ensure") || text.includes("adhere")) score += 10;
    if (text.includes("do not") || text.includes("limit")) score += 10; // Constraints
    if (text.includes("submit") || text.includes("approval")) score += 10; // Oversight
    if (text.includes("based on") || text.includes("using")) score += 10; // Context

    setPurposeScore(Math.min(score, 100));
  }, [descriptionValue]);

  const nextStep = () => {
    // In a real app, trigger validation for current step fields here
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const applyTemplate = (text: string) => {
    form.setValue("description", text);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Digital Worker Created",
      description: "The identity has been successfully registered.",
    });
    setTimeout(() => setLocation("/directory"), 1000);
  }

  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      <div className="flex-1 flex flex-col min-w-0">
        <MainLayout>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              
              {/* Wizard Header */}
              <div className="bg-card border-b px-6 py-4 sticky top-0 z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setLocation("/directory")}>
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <h1 className="font-bold text-lg">Onboard New Digital Worker</h1>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep} of {STEPS.length}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {STEPS.map((step) => (
                    <div 
                      key={step.id} 
                      className={cn(
                        "text-xs font-medium transition-colors",
                        currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 max-w-3xl mx-auto w-full">
                <Form {...form}>
                  <form className="space-y-8">
                    
                    {currentStep === 1 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Basic Information</CardTitle>
                          <CardDescription>Define the core identity and branding.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground border-2 border-dashed">
                              Avatar
                            </div>
                            <div className="flex-1 space-y-4">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Worker Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g. InvoiceProcessor-Alpha" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {currentStep === 2 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Job Family</CardTitle>
                          <CardDescription>Select the functional role to auto-configure risk baselines.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <FormField
                            control={form.control}
                            name="jobFamily"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Job Family</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select job family" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="finance">Finance Operations</SelectItem>
                                    <SelectItem value="hr">HR Operations</SelectItem>
                                    <SelectItem value="it">IT Operations</SelectItem>
                                    <SelectItem value="customer">Customer Service</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  Selecting "Finance Operations" sets default Risk Tier to High.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    )}

                    {currentStep === 3 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Organizational Placement</CardTitle>
                          <CardDescription>Where does this worker sit in the org chart?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <FormField
                            control={form.control}
                            name="businessUnit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Primary Business Unit</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select BU" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="gbs">Global Business Services</SelectItem>
                                    <SelectItem value="tech">Technology</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="secondaryBusinessUnit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Secondary Business Unit (Optional)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select secondary BU" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="gbs">Global Business Services</SelectItem>
                                    <SelectItem value="tech">Technology</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Purpose & Boundaries</CardTitle>
                            <CardDescription>Define mission and constraints.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Purpose Score</label>
                                <span className={`text-xs font-bold ${purposeScore > 70 ? 'text-green-600' : purposeScore > 40 ? 'text-orange-600' : 'text-red-600'}`}>
                                  {purposeScore}/100
                                </span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-500 ${purposeScore > 70 ? 'bg-green-500' : purposeScore > 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                                  style={{ width: `${purposeScore}%` }}
                                />
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {purposeScore > 70 ? "Excellent! Clear mission and constraints." : 
                                 purposeScore > 40 ? "Good start. Add more specific constraints and oversight." : 
                                 "Too vague. Describe specific role, actions, and limits."}
                              </p>
                            </div>

                            <FormField
                              control={form.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex justify-between items-center">
                                    <FormLabel>Purpose Statement</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Textarea 
                                      className="min-h-[120px] resize-y" 
                                      placeholder="Describe the worker's role, intended outcome, and operating constraints..."
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="space-y-3">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Or Start from a Template</h4>
                              <div className="grid grid-cols-1 gap-3">
                                {PURPOSE_TEMPLATES.map(template => (
                                  <div 
                                    key={template.id}
                                    className="border rounded-lg p-3 hover:bg-muted/50 cursor-pointer transition-colors group relative"
                                    onClick={() => applyTemplate(template.text)}
                                  >
                                    {template.verified && (
                                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-100">
                                        <ShieldCheck className="w-3 h-3" />
                                        ORG VERIFIED
                                      </div>
                                    )}
                                    <h5 className="font-medium text-sm mb-1 pr-20">{template.title}</h5>
                                    <p className="text-xs text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                                      {template.text}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                              <h4 className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                Prohibited Actions
                              </h4>
                              <Textarea 
                                className="bg-white" 
                                placeholder="List actions this worker is strictly forbidden from performing..." 
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>System Access & Capabilities</CardTitle>
                          <CardDescription>Define what systems this worker can access and which APIs it consumes.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Communication & Collaboration</h3>
                            <div className="grid grid-cols-1 gap-4">
                              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/5 transition-colors">
                                <div className="flex items-center gap-4">
                                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <Mail className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Microsoft 365 Graph API</p>
                                    <p className="text-sm text-muted-foreground">Read/Write access to Outlook & Teams</p>
                                  </div>
                                </div>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/5 transition-colors">
                                <div className="flex items-center gap-4">
                                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                    <MessageSquare className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Slack Webhooks</p>
                                    <p className="text-sm text-muted-foreground">Post messages to public channels</p>
                                  </div>
                                </div>
                                <Switch />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Enterprise Data Systems</h3>
                            <div className="grid grid-cols-1 gap-4">
                              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/5 transition-colors">
                                <div className="flex items-center gap-4">
                                  <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                    <Database className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="font-medium">SAP S/4HANA</p>
                                    <p className="text-sm text-muted-foreground">Financial records (Read Only)</p>
                                  </div>
                                </div>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/5 transition-colors">
                                <div className="flex items-center gap-4">
                                  <div className="p-2 bg-cyan-100 text-cyan-600 rounded-lg">
                                    <Cloud className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <p className="font-medium">Salesforce CRM</p>
                                    <p className="text-sm text-muted-foreground">Customer records management</p>
                                  </div>
                                </div>
                                <Switch />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">External Access</h3>
                            <div className="flex items-center justify-between p-4 border border-yellow-200 bg-yellow-50/50 rounded-lg">
                              <div className="flex items-center gap-4">
                                <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                                  <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-medium text-yellow-900">Public Internet Access</p>
                                  <p className="text-sm text-yellow-700">Allow outbound HTTP requests to any domain</p>
                                </div>
                              </div>
                              <Switch />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {currentStep === 6 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Ownership & Accountability</CardTitle>
                          <CardDescription>Designate human owners responsible for this digital worker.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                          {/* Primary Owner */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <label className="text-base font-semibold">Primary Business Owner</label>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">Accountable</span>
                            </div>
                            <div className="p-4 border rounded-lg flex items-center justify-between bg-card hover:border-primary/50 transition-colors cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">Sarah Jenkins</p>
                                  <p className="text-xs text-muted-foreground">Director, Finance Operations</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Change</Button>
                            </div>
                            <p className="text-xs text-muted-foreground pl-1">Responsible for business outcomes and approving major changes.</p>
                          </div>

                          {/* Technical Owner */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <label className="text-base font-semibold">Technical Owner</label>
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded font-medium">Responsible</span>
                            </div>
                            <div className="p-4 border rounded-lg flex items-center justify-between bg-card hover:border-primary/50 transition-colors cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                  <AvatarFallback className="bg-slate-800 text-white">MK</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">Mike Kowalski</p>
                                  <p className="text-xs text-muted-foreground">Senior Automation Engineer</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Change</Button>
                            </div>
                            <p className="text-xs text-muted-foreground pl-1">Responsible for maintenance, performance, and technical troubleshooting.</p>
                          </div>

                          {/* Risk Owner */}
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <label className="text-base font-semibold">Risk & Compliance Owner</label>
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded font-medium">Consulted</span>
                            </div>
                            <div className="p-4 border border-dashed rounded-lg flex items-center justify-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer h-[72px]">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="w-4 h-4" />
                                <span className="text-sm font-medium">Assign Risk Owner (Optional)</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {currentStep === 7 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Governance & Compliance</CardTitle>
                          <CardDescription>Configure data handling policies and approval workflows.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                          
                          {/* Data Sensitivity */}
                          <div className="space-y-4">
                            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                              <Lock className="w-4 h-4" />
                              Data Sensitivity Classification
                            </h3>
                            <RadioGroup defaultValue="internal" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              <div className="relative flex flex-col items-start space-y-2 rounded-xl border-2 p-4 hover:bg-muted/5 cursor-pointer transition-all [&:has([data-state=checked])]:border-green-500 [&:has([data-state=checked])]:bg-green-50/30">
                                <RadioGroupItem value="public" id="public" className="sr-only" />
                                <label htmlFor="public" className="flex flex-col w-full h-full cursor-pointer">
                                  <div className="p-2 w-fit rounded-lg bg-green-100 text-green-700 mb-2">
                                    <Globe className="w-5 h-5" />
                                  </div>
                                  <span className="font-semibold text-sm">Public</span>
                                  <span className="text-xs text-muted-foreground mt-1">Open access. No PII or business secrets.</span>
                                </label>
                              </div>

                              <div className="relative flex flex-col items-start space-y-2 rounded-xl border-2 p-4 hover:bg-muted/5 cursor-pointer transition-all [&:has([data-state=checked])]:border-blue-500 [&:has([data-state=checked])]:bg-blue-50/30">
                                <RadioGroupItem value="internal" id="internal" className="sr-only" />
                                <label htmlFor="internal" className="flex flex-col w-full h-full cursor-pointer">
                                  <div className="p-2 w-fit rounded-lg bg-blue-100 text-blue-700 mb-2">
                                    <Users className="w-5 h-5" />
                                  </div>
                                  <span className="font-semibold text-sm">Internal</span>
                                  <span className="text-xs text-muted-foreground mt-1">Employee only. Basic auth required.</span>
                                </label>
                              </div>

                              <div className="relative flex flex-col items-start space-y-2 rounded-xl border-2 p-4 hover:bg-muted/5 cursor-pointer transition-all [&:has([data-state=checked])]:border-orange-500 [&:has([data-state=checked])]:bg-orange-50/30">
                                <RadioGroupItem value="confidential" id="confidential" className="sr-only" />
                                <label htmlFor="confidential" className="flex flex-col w-full h-full cursor-pointer">
                                  <div className="p-2 w-fit rounded-lg bg-orange-100 text-orange-700 mb-2">
                                    <Shield className="w-5 h-5" />
                                  </div>
                                  <span className="font-semibold text-sm">Confidential</span>
                                  <span className="text-xs text-muted-foreground mt-1">Sensitive strategy or financial data.</span>
                                </label>
                              </div>

                              <div className="relative flex flex-col items-start space-y-2 rounded-xl border-2 p-4 hover:bg-muted/5 cursor-pointer transition-all [&:has([data-state=checked])]:border-red-500 [&:has([data-state=checked])]:bg-red-50/30">
                                <RadioGroupItem value="restricted" id="restricted" className="sr-only" />
                                <label htmlFor="restricted" className="flex flex-col w-full h-full cursor-pointer">
                                  <div className="p-2 w-fit rounded-lg bg-red-100 text-red-700 mb-2">
                                    <Lock className="w-5 h-5" />
                                  </div>
                                  <span className="font-semibold text-sm">Restricted</span>
                                  <span className="text-xs text-muted-foreground mt-1">Highly sensitive PII/PHI. Audit logging mandatory.</span>
                                </label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div className="h-px bg-border" />

                          {/* Compliance Frameworks */}
                          <div className="space-y-4">
                            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4" />
                              Compliance Frameworks
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {['GDPR', 'SOC 2 Type II', 'HIPAA', 'ISO 27001', 'PCI DSS'].map((framework) => (
                                <div key={framework} className="relative">
                                  <Checkbox id={framework} className="peer sr-only" defaultChecked={framework === 'SOC 2 Type II'} />
                                  <label
                                    htmlFor={framework}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-muted bg-transparent cursor-pointer transition-all hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 peer-data-[state=checked]:text-primary font-medium text-sm"
                                  >
                                    {framework === 'SOC 2 Type II' && <Check className="w-3.5 h-3.5" />}
                                    {framework}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="h-px bg-border" />

                          {/* Approval Workflow */}
                          <div className="space-y-6">
                            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                              <Check className="w-4 h-4" />
                              Change Approval Workflow
                            </h3>
                            
                            <RadioGroup 
                              value={approvalType} 
                              onValueChange={setApprovalType}
                              className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >
                              <div className="relative">
                                <RadioGroupItem value="self" id="wf-self" className="sr-only" />
                                <label htmlFor="wf-self" className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${approvalType === 'self' ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/50'}`}>
                                  <span className="font-semibold text-sm block mb-1">Self-Approval</span>
                                  <span className="text-xs text-muted-foreground">For low-risk cosmetic changes only.</span>
                                </label>
                              </div>
                              <div className="relative">
                                <RadioGroupItem value="standard" id="wf-standard" className="sr-only" />
                                <label htmlFor="wf-standard" className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${approvalType === 'standard' ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/50'}`}>
                                  <span className="font-semibold text-sm block mb-1">Standard Approval</span>
                                  <span className="text-xs text-muted-foreground">Requires Manager sign-off.</span>
                                </label>
                              </div>
                              <div className="relative">
                                <RadioGroupItem value="cab" id="wf-cab" className="sr-only" />
                                <label htmlFor="wf-cab" className={`block p-4 rounded-lg border-2 cursor-pointer transition-all ${approvalType === 'cab' ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/50'}`}>
                                  <span className="font-semibold text-sm block mb-1">Governance Board</span>
                                  <span className="text-xs text-muted-foreground">High risk. Full CAB review required.</span>
                                </label>
                              </div>
                            </RadioGroup>

                            {/* Visual Workflow Chain */}
                            <div className="bg-muted/30 rounded-lg p-6 border border-dashed flex items-center justify-center gap-4 overflow-x-auto">
                              <div className="flex flex-col items-center gap-2 min-w-[100px]">
                                <div className="w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary font-bold shadow-sm">
                                  1
                                </div>
                                <span className="text-xs font-semibold">Request</span>
                              </div>
                              
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              
                              {approvalType === 'self' ? (
                                <>
                                  <div className="flex flex-col items-center gap-2 min-w-[100px] opacity-50 grayscale">
                                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-muted-foreground/20 flex items-center justify-center text-muted-foreground font-bold">
                                      -
                                    </div>
                                    <span className="text-xs font-semibold text-muted-foreground">Auto-Approved</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex flex-col items-center gap-2 min-w-[100px]">
                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center text-blue-600 font-bold shadow-sm">
                                      <User className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-semibold">Manager</span>
                                  </div>
                                </>
                              )}

                              {(approvalType === 'standard' || approvalType === 'cab') && (
                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              )}

                              {approvalType === 'cab' && (
                                <>
                                  <div className="flex flex-col items-center gap-2 min-w-[100px]">
                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-orange-200 flex items-center justify-center text-orange-600 font-bold shadow-sm">
                                      <Shield className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-semibold">Risk Review</span>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                  <div className="flex flex-col items-center gap-2 min-w-[100px]">
                                    <div className="w-10 h-10 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center text-purple-600 font-bold shadow-sm">
                                      <Users className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-semibold">CAB Board</span>
                                  </div>
                                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                </>
                              )}

                              <div className="flex flex-col items-center gap-2 min-w-[100px]">
                                <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-200 flex items-center justify-center text-green-700 font-bold shadow-sm">
                                  <Check className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-semibold text-green-700">Deploy</span>
                              </div>
                            </div>
                          </div>

                        </CardContent>
                      </Card>
                    )}

                    {currentStep === 8 && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Review & Submit</CardTitle>
                          <CardDescription>Verify all details before creation.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 bg-muted/20 rounded border">
                              <h4 className="font-medium mb-2">Summary</h4>
                              <ul className="text-sm space-y-1 text-muted-foreground">
                                <li>Name: {form.getValues("name")}</li>
                                <li>Job Family: {form.getValues("jobFamily")}</li>
                                <li>BU: {form.getValues("businessUnit")}</li>
                              </ul>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-800 rounded border border-yellow-100 text-sm">
                              <AlertTriangle className="w-4 h-4" />
                              High Risk Profile detected. Requires Governance Council approval.
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                  </form>
                </Form>

                <div className="flex items-center justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={nextStep}
                    className="gap-2"
                  >
                    {currentStep === 8 ? (
                      <>Submit for Approval <Check className="w-4 h-4" /></>
                    ) : (
                      <>Next Step <ChevronRight className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Dynamic Trust Panel Preview */}
            <TrustPanel />
          </div>
        </MainLayout>
      </div>
    </div>
  );
}
