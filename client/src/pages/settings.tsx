import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Users, 
  Shield, 
  Bell, 
  Database, 
  Globe, 
  Cpu, 
  Plug, 
  Save, 
  RefreshCw,
  Check,
  Mail,
  Slack,
  Key
} from "lucide-react";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-background font-sans antialiased">
      <div className="flex-1 flex flex-col min-w-0">
        <MainLayout>
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              
              {/* Header */}
              <div className="bg-card border-b px-8 py-6 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                      <SettingsIcon className="w-6 h-6 text-primary" />
                      System Settings
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Configure global platform preferences, integrations, and security policies.
                    </p>
                  </div>
                  <Button className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </div>

              <div className="p-8 max-w-[1200px] mx-auto w-full">
                <Tabs defaultValue="general" className="w-full flex flex-col md:flex-row gap-8">
                  
                  {/* Sidebar Navigation for Settings */}
                  <aside className="w-full md:w-[250px] flex-shrink-0">
                    <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1 p-0">
                      <TabsTrigger 
                        value="general" 
                        className="w-full justify-start gap-3 px-4 py-3 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-muted transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        General & Branding
                      </TabsTrigger>
                      <TabsTrigger 
                        value="integrations" 
                        className="w-full justify-start gap-3 px-4 py-3 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-muted transition-colors"
                      >
                        <Plug className="w-4 h-4" />
                        Integrations
                      </TabsTrigger>
                      <TabsTrigger 
                        value="ai" 
                        className="w-full justify-start gap-3 px-4 py-3 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-muted transition-colors"
                      >
                        <Cpu className="w-4 h-4" />
                        AI Configuration
                      </TabsTrigger>
                      <TabsTrigger 
                        value="users" 
                        className="w-full justify-start gap-3 px-4 py-3 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-muted transition-colors"
                      >
                        <Users className="w-4 h-4" />
                        User Management
                      </TabsTrigger>
                      <TabsTrigger 
                        value="security" 
                        className="w-full justify-start gap-3 px-4 py-3 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-muted transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Security & Audit
                      </TabsTrigger>
                      <TabsTrigger 
                        value="notifications" 
                        className="w-full justify-start gap-3 px-4 py-3 rounded-md data-[state=active]:bg-primary/10 data-[state=active]:text-primary hover:bg-muted transition-colors"
                      >
                        <Bell className="w-4 h-4" />
                        Notifications
                      </TabsTrigger>
                    </TabsList>
                  </aside>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0 space-y-6">
                    
                    {/* General Settings */}
                    <TabsContent value="general" className="space-y-6 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle>Organization Profile</CardTitle>
                          <CardDescription>Manage your company details and branding.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <Label htmlFor="org-name">Organization Name</Label>
                              <Input id="org-name" defaultValue="Acme Corp" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="org-domain">Primary Domain</Label>
                              <Input id="org-domain" defaultValue="acme.com" disabled />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Timezone & Localization</Label>
                            <Select defaultValue="utc">
                              <SelectTrigger>
                                <SelectValue placeholder="Select Timezone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                                <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                                <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                                <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Integrations */}
                    <TabsContent value="integrations" className="space-y-6 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle>Connected Platforms</CardTitle>
                          <CardDescription>Manage external connections and API keys.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          
                          {/* Microsoft 365 */}
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                <Database className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">Microsoft 365 / Agent365</h4>
                                <p className="text-sm text-muted-foreground">Identity source and registry sync.</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                                <Check className="w-3 h-3" /> Connected
                              </Badge>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                          </div>

                          {/* Foundry */}
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                                <Cpu className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">Microsoft Foundry</h4>
                                <p className="text-sm text-muted-foreground">Telemetry and performance metrics.</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                                <Check className="w-3 h-3" /> Connected
                              </Badge>
                              <Button variant="outline" size="sm">Configure</Button>
                            </div>
                          </div>

                          {/* Slack */}
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                <Slack className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">Slack</h4>
                                <p className="text-sm text-muted-foreground">Notifications and human-in-loop alerts.</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary">Disconnected</Badge>
                              <Button size="sm">Connect</Button>
                            </div>
                          </div>

                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* AI Configuration */}
                    <TabsContent value="ai" className="space-y-6 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle>Global AI Governance</CardTitle>
                          <CardDescription>Set default constraints and model preferences for all workers.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Global Temperature Cap</Label>
                                <p className="text-sm text-muted-foreground">Limit creativity variance for all enterprise agents.</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Input type="number" className="w-20" defaultValue="0.7" step="0.1" max="1" min="0" />
                              </div>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">PII Redaction (Default)</Label>
                                <p className="text-sm text-muted-foreground">Automatically redact detected PII in logs.</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Human-in-the-Loop Mandate</Label>
                                <p className="text-sm text-muted-foreground">Require human review for confidence scores {"<"} 60%.</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>

                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* User Management */}
                    <TabsContent value="users" className="space-y-6 mt-0">
                      <Card>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle>Users & Roles</CardTitle>
                              <CardDescription>Manage platform access and permissions.</CardDescription>
                            </div>
                            <Button size="sm" className="gap-2">
                              <Users className="w-4 h-4" />
                              Invite User
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src="https://github.com/shadcn.png" />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">Jane Doe</p>
                                  <p className="text-xs text-muted-foreground">jane.doe@acme.com</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Badge variant="outline">Admin</Badge>
                                <Button variant="ghost" size="sm">Edit</Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarFallback>MK</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium text-sm">Mike Kowalski</p>
                                  <p className="text-xs text-muted-foreground">mike.k@acme.com</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Badge variant="outline">Editor</Badge>
                                <Button variant="ghost" size="sm">Edit</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Security */}
                    <TabsContent value="security" className="space-y-6 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle>Security & Audit</CardTitle>
                          <CardDescription>Configure retention policies and SSO.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-base">Single Sign-On (SSO)</Label>
                                <p className="text-sm text-muted-foreground">Enforce SAML/OIDC authentication.</p>
                              </div>
                              <Badge>Enforced</Badge>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                              <Label>Audit Log Retention</Label>
                              <Select defaultValue="90">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select retention period" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="30">30 Days</SelectItem>
                                  <SelectItem value="90">90 Days</SelectItem>
                                  <SelectItem value="365">1 Year</SelectItem>
                                  <SelectItem value="forever">Forever</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Notifications */}
                    <TabsContent value="notifications" className="space-y-6 mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle>Notification Preferences</CardTitle>
                          <CardDescription>Configure system-wide alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                             <div className="flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                 <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                                   <AlertTriangle className="w-4 h-4" />
                                 </div>
                                 <div className="space-y-0.5">
                                   <Label className="text-base">Critical Incidents</Label>
                                   <p className="text-sm text-muted-foreground">Immediate alerts for SLA breaches and security blocks.</p>
                                 </div>
                               </div>
                               <div className="flex gap-2">
                                 <Badge variant="outline" className="gap-1"><Mail className="w-3 h-3"/> Email</Badge>
                                 <Badge variant="outline" className="gap-1"><Slack className="w-3 h-3"/> Slack</Badge>
                               </div>
                             </div>
                             
                             <Separator />

                             <div className="flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                 <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                   <RefreshCw className="w-4 h-4" />
                                 </div>
                                 <div className="space-y-0.5">
                                   <Label className="text-base">Weekly Digest</Label>
                                   <p className="text-sm text-muted-foreground">Summary of worker performance and utilization.</p>
                                 </div>
                               </div>
                               <div className="flex gap-2">
                                 <Badge variant="outline" className="gap-1"><Mail className="w-3 h-3"/> Email</Badge>
                               </div>
                             </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </MainLayout>
      </div>
    </div>
  );
}

// Missing Icon import fix
import { AlertTriangle } from "lucide-react";
