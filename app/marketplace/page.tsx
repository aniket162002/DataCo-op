'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  MapPin,
  Users,
  Activity,
  Star,
  ShoppingCart,
  Eye,
  Calendar,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { Navigation } from '@/components/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/lib/store';
import { toast } from 'sonner';

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

export default function MarketplacePage() {
  const { bundles, addToCart } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['all', 'Location', 'Behavior', 'Health', 'Social', 'Financial'];

  const filteredBundles = bundles
    .filter(bundle => {
      const matchesSearch = bundle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bundle.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bundle.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = categoryFilter === 'all' || bundle.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'samples':
          return b.samples - a.samples;
        default:
          return new Date(b.created).getTime() - new Date(a.created).getTime();
      }
    });

  const handleAddToCart = (bundleId: string, bundleTitle: string) => {
    addToCart(bundleId);
    toast.success(`Added "${bundleTitle}" to cart!`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Location':
        return MapPin;
      case 'Behavior':
        return Users;
      case 'Health':
        return Activity;
      default:
        return TrendingUp;
    }
  };

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
            <h1 className="text-3xl font-bold tracking-tight">Data Marketplace</h1>
            <p className="text-muted-foreground mt-2">
              Discover and purchase high-quality anonymized data bundles from verified sellers.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div 
            className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between"
            variants={fadeInUp}
          >
            <div className="flex flex-1 max-w-sm items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search bundles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="samples">Most Samples</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Bundle Grid */}
          <motion.div 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
          >
            {filteredBundles.map((bundle) => {
              const CategoryIcon = getCategoryIcon(bundle.category);
              
              return (
                <motion.div key={bundle.id} variants={fadeInUp}>
                  <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80 hover:shadow-lg h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <CategoryIcon className="h-4 w-4" />
                          </div>
                          <Badge variant="secondary">{bundle.category}</Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{bundle.rating}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="line-clamp-2">{bundle.title}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {bundle.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {bundle.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{bundle.samples.toLocaleString()} samples</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(bundle.created).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {/* Seller */}
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Verified seller: {bundle.seller}</span>
                      </div>
                      
                      {/* Price and Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-2xl font-bold">${bundle.price}</span>
                          <span className="text-muted-foreground text-sm ml-1">USD</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleAddToCart(bundle.id, bundle.title)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Empty State */}
          {filteredBundles.length === 0 && (
            <motion.div 
              className="text-center py-12"
              variants={fadeInUp}
            >
              <div className="mx-auto h-12 w-12 text-muted-foreground">
                <Search className="h-full w-full" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No bundles found</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('all');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}

          {/* Stats Footer */}
          <motion.div 
            className="mt-12 grid gap-4 sm:grid-cols-3 text-center"
            variants={fadeInUp}
          >
            <div>
              <div className="text-2xl font-bold text-primary">{bundles.length}</div>
              <div className="text-sm text-muted-foreground">Data Bundles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">150K+</div>
              <div className="text-sm text-muted-foreground">Data Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">98.5%</div>
              <div className="text-sm text-muted-foreground">Privacy Score</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}