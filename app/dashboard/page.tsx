'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Database,
  Shield,
  Activity,
  MapPin,
  Smartphone,
  Calendar,
  Users,
  Eye,
  Download,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAppStore } from '@/lib/store';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function DashboardPage() {
  const { user, earnings } = useAppStore();

  if (!user) return null;

  const earningsData = earnings.weekly.map((value, index) => ({
    week: `Week ${index + 1}`,
    earnings: value,
  }));

  const dataStreams = [
    {
      name: 'Location Data',
      icon: MapPin,
      enabled: true,
      samples: 15420,
      revenue: 234.50,
      trend: '+12%',
      status: 'active',
    },
    {
      name: 'App Usage',
      icon: Smartphone,
      enabled: true,
      samples: 8960,
      revenue: 156.30,
      trend: '+8%',
      status: 'active',
    },
    {
      name: 'Calendar Events',
      icon: Calendar,
      enabled: false,
      samples: 0,
      revenue: 0,
      trend: '0%',
      status: 'inactive',
    },
    {
      name: 'Social Activity',
      icon: Users,
      enabled: true,
      samples: 5430,
      revenue: 89.20,
      trend: '+15%',
      status: 'active',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'sale',
      description: 'Urban Mobility Bundle purchased by RetailCorp',
      amount: '+$45.99',
      time: '2 hours ago',
      signature: '0xa1b2c3...',
    },
    {
      id: 2,
      type: 'payout',
      description: 'Weekly payout processed',
      amount: '+$234.50',
      time: '1 day ago',
      signature: '0xd4e5f6...',
    },
    {
      id: 3,
      type: 'bundle',
      description: 'New Shopping Behavior bundle created',
      amount: '',
      time: '3 days ago',
      signature: '0x789abc...',
    },
    {
      id: 4,
      type: 'sale',
      description: 'Health Metrics Bundle purchased by HealthTech',
      amount: '+$67.20',
      time: '5 days ago',
      signature: '0xdef123...',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Monitor your data streams, track earnings, and manage your privacy settings.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={fadeInUp}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${user.earnings.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Bundles</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.bundles}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+2</span> this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">29.8K</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+8.2%</span> this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Privacy Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">98%</div>
                <p className="text-xs text-muted-foreground">
                  Excellent protection
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Charts */}
          <motion.div 
            className="grid gap-6 mb-8 lg:grid-cols-2"
            variants={fadeInUp}
          >
            <Card>
              <CardHeader>
                <CardTitle>Weekly Earnings</CardTitle>
                <CardDescription>Your earnings over the past 7 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={earningsData}>
                    <defs>
                      <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="week" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="earnings"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#earningsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Stream Activity</CardTitle>
                <CardDescription>Real-time monitoring of your data contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataStreams.map((stream, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${stream.enabled ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                          <stream.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{stream.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {stream.samples.toLocaleString()} samples
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">${stream.revenue.toFixed(2)}</p>
                          <p className="text-sm text-green-500">{stream.trend}</p>
                        </div>
                        <Switch checked={stream.enabled} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Audit Log</span>
                </CardTitle>
                <CardDescription>
                  Cryptographically signed record of all your data transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'sale' ? 'bg-green-500/10 text-green-500' :
                          activity.type === 'payout' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-purple-500/10 text-purple-500'
                        }`}>
                          {activity.type === 'sale' ? <TrendingUp className="h-4 w-4" /> :
                           activity.type === 'payout' ? <DollarSign className="h-4 w-4" /> :
                           <Database className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="font-medium">{activity.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{activity.time}</span>
                            <Badge variant="outline" className="text-xs">
                              {activity.signature}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {activity.amount && (
                        <div className="text-right">
                          <p className="font-medium text-green-500">{activity.amount}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Audit Log
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}