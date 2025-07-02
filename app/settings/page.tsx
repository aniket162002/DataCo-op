'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Shield,
  CreditCard,
  Bell,
  Eye,
  Lock,
  Trash2,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function SettingsPage() {
  const { user } = useAppStore();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false,
    },
    privacy: {
      dataRetention: '12months',
      anonymizationLevel: 'high',
      shareMetadata: true,
      allowResearch: true,
    },
    payouts: {
      method: 'stripe',
      schedule: 'weekly',
      minimumAmount: 25,
      taxReporting: true,
    }
  });

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!');
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion requested. You will receive an email with further instructions.');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8 max-w-4xl">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account, privacy preferences, and payout settings.
            </p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="payouts" className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Payouts</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Button>
                      <p className="text-sm text-muted-foreground mt-1">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      placeholder="Tell us about yourself..."
                      defaultValue=""
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Verification Status</span>
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your identity has been verified for secure transactions.
                      </p>
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings}>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Privacy</CardTitle>
                    <CardDescription>
                      Control how your data is processed and shared.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="anonymization">Default Anonymization Level</Label>
                      <Select 
                        value={settings.privacy.anonymizationLevel}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          privacy: {...settings.privacy, anonymizationLevel: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic - Remove direct identifiers</SelectItem>
                          <SelectItem value="standard">Standard - Remove most identifiers</SelectItem>
                          <SelectItem value="high">High - Remove all identifiers + noise</SelectItem>
                          <SelectItem value="maximum">Maximum - Differential privacy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="retention">Data Retention Period</Label>
                      <Select 
                        value={settings.privacy.dataRetention}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          privacy: {...settings.privacy, dataRetention: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3months">3 Months</SelectItem>
                          <SelectItem value="6months">6 Months</SelectItem>
                          <SelectItem value="12months">12 Months</SelectItem>
                          <SelectItem value="24months">24 Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Share Metadata</p>
                          <p className="text-sm text-muted-foreground">
                            Include metadata to help buyers understand data context
                          </p>
                        </div>
                        <Switch 
                          checked={settings.privacy.shareMetadata}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            privacy: {...settings.privacy, shareMetadata: checked}
                          })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Allow Research Use</p>
                          <p className="text-sm text-muted-foreground">
                            Permit academic and research institutions to use your data
                          </p>
                        </div>
                        <Switch 
                          checked={settings.privacy.allowResearch}
                          onCheckedChange={(checked) => setSettings({
                            ...settings,
                            privacy: {...settings.privacy, allowResearch: checked}
                          })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Data Export & Deletion</CardTitle>
                    <CardDescription>
                      Manage your data and exercise your privacy rights.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Export Your Data</p>
                        <p className="text-sm text-muted-foreground">
                          Download a copy of all your data and transaction history
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delete All Data</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently remove all your data from our systems
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Payouts Tab */}
            <TabsContent value="payouts">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payout Settings</CardTitle>
                    <CardDescription>
                      Configure how and when you receive payments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="payout-method">Payout Method</Label>
                      <Select 
                        value={settings.payouts.method}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          payouts: {...settings.payouts, method: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stripe">Stripe Connect</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="bank">Direct Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="schedule">Payout Schedule</Label>
                      <Select 
                        value={settings.payouts.schedule}
                        onValueChange={(value) => setSettings({
                          ...settings,
                          payouts: {...settings.payouts, schedule: value}
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="minimum">Minimum Payout Amount</Label>
                      <Input
                        id="minimum"
                        type="number"
                        value={settings.payouts.minimumAmount}
                        onChange={(e) => setSettings({
                          ...settings,
                          payouts: {...settings.payouts, minimumAmount: Number(e.target.value)}
                        })}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Payouts will only be processed when your balance exceeds this amount.
                      </p>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Tax Reporting</p>
                        <p className="text-sm text-muted-foreground">
                          Generate tax documents for your earnings
                        </p>
                      </div>
                      <Switch 
                        checked={settings.payouts.taxReporting}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          payouts: {...settings.payouts, taxReporting: checked}
                        })}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Stripe Connect Connected</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your Stripe account is connected and ready to receive payments.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Manage Stripe Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose how you want to be notified about important events.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch 
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          notifications: {...settings.notifications, email: checked}
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <Switch 
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          notifications: {...settings.notifications, push: checked}
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive text messages for important updates
                        </p>
                      </div>
                      <Switch 
                        checked={settings.notifications.sms}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          notifications: {...settings.notifications, sms: checked}
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Communications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about new features and opportunities
                        </p>
                      </div>
                      <Switch 
                        checked={settings.notifications.marketing}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          notifications: {...settings.notifications, marketing: checked}
                        })}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-3">Notification Types</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Bundle sales</span>
                        <Badge variant="default">Always</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Payout processed</span>
                        <Badge variant="default">Always</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Security alerts</span>
                        <Badge variant="default">Always</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Weekly summaries</span>
                        <Badge variant="secondary">Optional</Badge>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveSettings}>Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>
                      Manage your password and security settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>

                    <Button>Update Password</Button>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Enable 2FA
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Active Sessions</p>
                          <p className="text-sm text-muted-foreground">
                            Manage your active login sessions
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          View Sessions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Danger Zone</span>
                    </CardTitle>
                    <CardDescription>
                      These actions cannot be undone. Please proceed with caution.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Delete Account</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}