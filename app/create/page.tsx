'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Activity,
  Users,
  Calendar,
  Shield,
  Eye,
  Upload,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const steps = [
  {
    id: 1,
    title: 'Bundle Type',
    description: 'Choose what type of data bundle to create',
  },
  {
    id: 2,
    title: 'Data Selection',
    description: 'Select and configure your data sources',
  },
  {
    id: 3,
    title: 'AI Anonymization',
    description: 'Preview and configure privacy protection',
  },
  {
    id: 4,
    title: 'Bundle Details',
    description: 'Set pricing and description',
  },
  {
    id: 5,
    title: 'Review & Publish',
    description: 'Final review before publishing',
  },
];

const bundleTypes = [
  {
    id: 'location',
    name: 'Location Data',
    icon: MapPin,
    description: 'GPS coordinates, movement patterns, location visits',
    demand: 'High',
    avgPrice: '$45-120',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    id: 'behavior',
    name: 'Behavioral Data',
    icon: Users,
    description: 'App usage, browsing patterns, interaction data',
    demand: 'Very High',
    avgPrice: '$60-180',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    id: 'health',
    name: 'Health & Fitness',
    icon: Activity,
    description: 'Steps, heart rate, sleep patterns, workout data',
    demand: 'Medium',
    avgPrice: '$30-90',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    id: 'calendar',
    name: 'Calendar Events',
    icon: Calendar,
    description: 'Meeting patterns, availability, time management',
    demand: 'Medium',
    avgPrice: '$25-70',
    color: 'bg-purple-500/10 text-purple-500',
  },
];

const mockAISuggestions = [
  'Based on current market demand, location data in urban areas is trending 15% higher this month.',
  'Consider bundling your location data with behavioral patterns for 25% higher value.',
  'Your data profile matches high-demand segments for retail analytics companies.',
];

export default function CreateBundlePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState('');
  const [bundleData, setBundleData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    tags: '',
    dataSources: [],
    anonymizationLevel: 'high',
    includeMetadata: false,
  });

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    toast.success('Bundle published successfully! It will appear in the marketplace shortly.');
    // Redirect to dashboard or marketplace
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose Bundle Type</h2>
              <p className="text-muted-foreground">
                Select the type of data bundle you want to create based on market demand.
              </p>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {bundleTypes.map((type) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all border-2 ${
                    selectedType === type.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${type.color}`}>
                        <type.icon className="h-5 w-5" />
                      </div>
                      <Badge variant={type.demand === 'Very High' ? 'default' : type.demand === 'High' ? 'secondary' : 'outline'}>
                        {type.demand} Demand
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Price Range</span>
                      <span className="font-semibold text-green-600">{type.avgPrice}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Suggestions */}
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span>AI Market Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mockAISuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Configure Data Sources</h2>
              <p className="text-muted-foreground">
                Select which data sources to include in your bundle.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                { name: 'GPS Location History', samples: '15,420', status: 'Connected', risk: 'Low' },
                { name: 'App Usage Statistics', samples: '8,960', status: 'Connected', risk: 'Low' },
                { name: 'Search History', samples: '12,350', status: 'Available', risk: 'Medium' },
                { name: 'Contact Interactions', samples: '3,240', status: 'Available', risk: 'High' },
              ].map((source, index) => (
                <Card key={index} className="border-2 border-border">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <Checkbox 
                        checked={bundleData.dataSources.includes(source.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setBundleData({
                              ...bundleData,
                              dataSources: [...bundleData.dataSources, source.name]
                            });
                          } else {
                            setBundleData({
                              ...bundleData,
                              dataSources: bundleData.dataSources.filter(s => s !== source.name)
                            });
                          }
                        }}
                      />
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-muted-foreground">{source.samples} data points</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={source.status === 'Connected' ? 'default' : 'secondary'}>
                        {source.status}
                      </Badge>
                      <Badge variant={
                        source.risk === 'Low' ? 'default' :
                        source.risk === 'Medium' ? 'secondary' : 'destructive'
                      }>
                        {source.risk} Risk
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">AI Anonymization Preview</h2>
              <p className="text-muted-foreground">
                Preview how your data will be anonymized before bundling.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Before/After Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <span>Raw Data (Before)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 font-mono text-sm bg-muted p-4 rounded-lg">
                    <div>lat: 37.7749, lng: -122.4194</div>
                    <div>timestamp: 2024-01-15T10:30:00Z</div>
                    <div>device_id: iPhone_ABC123</div>
                    <div>user_id: john.doe@email.com</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Anonymized Data (After)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 font-mono text-sm bg-muted p-4 rounded-lg">
                    <div>lat: 37.77##, lng: -122.41##</div>
                    <div>timestamp: 2024-01-##T##:##:##Z</div>
                    <div>device_id: [REMOVED]</div>
                    <div>user_id: [ANONYMIZED_HASH]</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Anonymization Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Anonymization Settings</CardTitle>
                <CardDescription>Configure the level of privacy protection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="anonymization-level">Anonymization Level</Label>
                  <Select 
                    value={bundleData.anonymizationLevel} 
                    onValueChange={(value) => setBundleData({...bundleData, anonymizationLevel: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (Some identifiers removed)</SelectItem>
                      <SelectItem value="standard">Standard (Most identifiers removed)</SelectItem>
                      <SelectItem value="high">High (All identifiers removed + noise)</SelectItem>
                      <SelectItem value="maximum">Maximum (Differential privacy applied)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="metadata"
                    checked={bundleData.includeMetadata}
                    onCheckedChange={(checked) => setBundleData({...bundleData, includeMetadata: checked})}
                  />
                  <Label htmlFor="metadata">Include metadata for better insights</Label>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Score */}
            <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Privacy Protection Score</span>
                  <span className="text-2xl font-bold text-green-600">98%</span>
                </div>
                <Progress value={98} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  Excellent privacy protection. Your data is fully anonymized and cannot be traced back to you.
                </p>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Bundle Details</h2>
              <p className="text-muted-foreground">
                Set your bundle title, description, and pricing.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Bundle Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Urban Mobility Patterns - San Francisco"
                    value={bundleData.title}
                    onChange={(e) => setBundleData({...bundleData, title: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what insights your data bundle provides..."
                    rows={4}
                    value={bundleData.description}
                    onChange={(e) => setBundleData({...bundleData, description: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={bundleData.category} onValueChange={(value) => setBundleData({...bundleData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="behavior">Behavior</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., mobility, urban, transportation"
                    value={bundleData.tags}
                    onChange={(e) => setBundleData({...bundleData, tags: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={bundleData.price}
                    onChange={(e) => setBundleData({...bundleData, price: e.target.value})}
                  />
                </div>

                {/* AI Pricing Suggestion */}
                <Card className="border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-base">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span>AI Pricing Suggestion</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Recommended Price:</span>
                        <span className="font-bold text-green-600">$89.99</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Market Range:</span>
                        <span>$65 - $120</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Based on similar bundles, data quality, and current demand.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Bundle Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Bundle Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Data Points:</span>
                      <span className="font-medium">24,380</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Range:</span>
                      <span className="font-medium">3 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Privacy Score:</span>
                      <span className="font-medium text-green-600">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Revenue:</span>
                      <span className="font-medium text-green-600">${bundleData.price || '0.00'}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Review & Publish</h2>
              <p className="text-muted-foreground">
                Review your bundle details before publishing to the marketplace.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Bundle Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground">Title</Label>
                    <p className="font-medium">{bundleData.title || 'Untitled Bundle'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Category</Label>
                    <p className="font-medium">{bundleData.category || 'Not selected'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Price</Label>
                    <p className="font-medium">${bundleData.price || '0.00'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Data Sources</Label>
                    <p className="font-medium">{bundleData.dataSources.length} selected</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="font-medium">{bundleData.description || 'No description provided'}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Tags</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {bundleData.tags.split(',').filter(Boolean).map((tag, index) => (
                      <Badge key={index} variant="outline">{tag.trim()}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Privacy & Security</span>
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Anonymization Level:</span>
                    <span className="font-medium">High</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Privacy Score:</span>
                    <span className="font-medium text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Identifiers Removed:</span>
                    <span className="font-medium">All personal data</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8 max-w-4xl">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold tracking-tight">Create Data Bundle</h1>
              <Badge variant="outline">Step {currentStep} of {steps.length}</Badge>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2 mb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 < currentStep ? 'bg-primary text-primary-foreground' :
                    index + 1 === currentStep ? 'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1 < currentStep ? <CheckCircle className="h-4 w-4" /> : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 ${
                      index + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold">{steps[currentStep - 1].title}</h3>
              <p className="text-sm text-muted-foreground">{steps[currentStep - 1].description}</p>
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-2">
              {currentStep < steps.length ? (
                <Button 
                  onClick={nextStep}
                  disabled={currentStep === 1 && !selectedType}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handlePublish} className="bg-primary text-primary-foreground">
                  <Upload className="mr-2 h-4 w-4" />
                  Publish Bundle
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}