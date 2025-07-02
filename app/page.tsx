'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, DollarSign, Users, Zap, CheckCircle, Star, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { DataFlowAnimation } from '@/components/data-flow-animation';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Advanced AI anonymization ensures your personal data remains completely private and secure.',
    color: 'bg-green-500/10 text-green-500'
  },
  {
    icon: DollarSign,
    title: 'Earn Revenue',
    description: 'Monetize your data while maintaining full control over what you share and with whom.',
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join a trusted marketplace where data sharing benefits everyone in the ecosystem.',
    color: 'bg-purple-500/10 text-purple-500'
  },
  {
    icon: Zap,
    title: 'Real-time Analytics',
    description: 'Track your earnings and data performance with comprehensive analytics and insights.',
    color: 'bg-orange-500/10 text-orange-500'
  }
];

const steps = [
  {
    step: '01',
    title: 'Connect Your Data',
    description: 'Securely link your digital footprint through our encrypted connection system.'
  },
  {
    step: '02',
    title: 'AI Anonymization',
    description: 'Our advanced AI automatically removes all personally identifiable information.'
  },
  {
    step: '03',
    title: 'Create Bundles',
    description: 'Package your anonymized data into valuable bundles for specific market needs.'
  },
  {
    step: '04',
    title: 'Earn & Track',
    description: 'Monitor your earnings and data performance through our comprehensive dashboard.'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Data Scientist',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'DataCo-Op transformed how I think about data privacy. I can now monetize my data while staying completely anonymous.',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Privacy Advocate',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'The anonymization technology is incredible. I feel secure knowing my privacy is protected while earning passive income.',
    rating: 5
  },
  {
    name: 'Dr. Emily Watson',
    role: 'Research Director',
    avatar: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=150',
    content: 'As a researcher, access to high-quality anonymized data through DataCo-Op has accelerated our studies significantly.',
    rating: 5
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="container relative">
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-4">
                🚀 Now in Public Beta
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
              variants={fadeInUp}
            >
              Your Data,{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Revenue
              </span>
            </motion.h1>
            
            <motion.p 
              className="mb-8 text-xl text-muted-foreground sm:text-2xl"
              variants={fadeInUp}
            >
              Safely share anonymized personal data bundles and earn revenue while maintaining 
              complete privacy and control over your digital footprint.
            </motion.p>
            
            <motion.div 
              className="flex flex-col gap-4 sm:flex-row sm:justify-center"
              variants={fadeInUp}
            >
              <Link href="/dashboard">
                <Button size="lg" className="group gradient-primary text-white">
                  Start Earning Today
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline">
                  Explore Marketplace
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated Data Flow Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <DataFlowAnimation />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <motion.div 
            className="mx-auto max-w-2xl text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose DataCo-Op?
            </h2>
            <p className="text-lg text-muted-foreground">
              Built with privacy, security, and fairness at its core. 
              Experience the future of ethical data monetization.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
                  <CardHeader>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container">
          <motion.div 
            className="mx-auto max-w-2xl text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Four simple steps to start monetizing your data securely and privately.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid gap-8 lg:grid-cols-4"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative"
                variants={fadeInUp}
              >
                <Card className="group relative h-full border-0 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                      {step.step}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform translate-x-4" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <motion.div 
            className="mx-auto max-w-2xl text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our community members are saying about their DataCo-Op experience.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid gap-8 lg:grid-cols-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group relative h-full border-0 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container">
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Take Control of Your Data?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of users who are already earning from their data while maintaining complete privacy.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="group gradient-primary text-white">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button size="lg" variant="outline">
                  Browse Data Bundles
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center space-x-8 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>AI-powered anonymization</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Instant payouts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Database className="h-4 w-4 text-white" />
              </div>
              <span className="font-poppins text-xl font-bold">DataCo-Op</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 DataCo-Op. All rights reserved. Privacy-first data marketplace.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}