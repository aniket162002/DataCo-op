'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Database, 
  Home, 
  ShoppingCart, 
  Plus, 
  Settings, 
  Sun, 
  Moon,
  User,
  Bell,
  Search
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppStore } from '@/lib/store';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: Database },
  { href: '/marketplace', label: 'Marketplace', icon: Search },
  { href: '/create', label: 'Create Bundle', icon: Plus },
];

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, cart } = useAppStore();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <Database className="h-4 w-4 text-white" />
          </div>
          <span className="hidden font-poppins text-xl font-bold sm:inline-block">
            DataCo-Op
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="relative"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-md bg-primary/20"
                      layoutId="navbar-active"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Shopping Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cart.length > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
                >
                  {cart.length}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Notifications */}
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}