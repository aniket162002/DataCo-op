import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  earnings: number;
  bundles: number;
  verification: 'pending' | 'verified' | 'rejected';
}

interface DataBundle {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  samples: number;
  seller: string;
  rating: number;
  preview: {
    type: 'location' | 'usage' | 'demographic';
    data: any[];
  };
  created: string;
}

interface AppState {
  user: User | null;
  bundles: DataBundle[];
  cart: string[];
  earnings: {
    daily: number[];
    weekly: number[];
    monthly: number[];
  };
  setUser: (user: User | null) => void;
  addToCart: (bundleId: string) => void;
  removeFromCart: (bundleId: string) => void;
  clearCart: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        id: '1',
        email: 'demo@datacoop.com',
        name: 'Demo User',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
        earnings: 2847.50,
        bundles: 12,
        verification: 'verified',
      },
      bundles: [
        {
          id: '1',
          title: 'Urban Mobility Patterns - San Francisco',
          description: 'Anonymized location data showing movement patterns in downtown SF during peak hours',
          price: 89.99,
          category: 'Location',
          tags: ['mobility', 'urban', 'transportation'],
          samples: 15000,
          seller: 'MobilityResearch',
          rating: 4.8,
          preview: {
            type: 'location',
            data: [
              { lat: 37.7749, lng: -122.4194, count: 245 },
              { lat: 37.7849, lng: -122.4094, count: 189 },
              { lat: 37.7649, lng: -122.4294, count: 156 },
            ]
          },
          created: '2024-01-15T10:30:00Z',
        },
        {
          id: '2',
          title: 'Shopping Behavior Analytics Q4 2024',
          description: 'Consumer spending patterns and preferences during holiday season',
          price: 134.99,
          category: 'Behavior',
          tags: ['shopping', 'consumer', 'retail'],
          samples: 8500,
          seller: 'RetailInsights',
          rating: 4.9,
          preview: {
            type: 'usage',
            data: [
              { category: 'Electronics', value: 34.2 },
              { category: 'Clothing', value: 28.7 },
              { category: 'Home', value: 22.1 },
            ]
          },
          created: '2024-01-12T14:20:00Z',
        },
        {
          id: '3',
          title: 'Health & Fitness Tracking Insights',
          description: 'Aggregated wellness data from fitness trackers with privacy protection',
          price: 67.50,
          category: 'Health',
          tags: ['fitness', 'health', 'wellness'],
          samples: 12000,
          seller: 'WellnessData',
          rating: 4.6,
          preview: {
            type: 'demographic',
            data: [
              { age: '18-25', steps: 8500 },
              { age: '26-35', steps: 7200 },
              { age: '36-45', steps: 6800 },
            ]
          },
          created: '2024-01-10T09:15:00Z',
        },
      ],
      cart: [],
      earnings: {
        daily: [45, 52, 38, 61, 47, 59, 43],
        weekly: [320, 285, 410, 365, 295, 380, 425],
        monthly: [1200, 1450, 1680, 1520, 1380, 1790, 1650, 1420, 1580, 1720, 1890, 2100],
      },
      setUser: (user) => set({ user }),
      addToCart: (bundleId) => {
        const { cart } = get();
        if (!cart.includes(bundleId)) {
          set({ cart: [...cart, bundleId] });
        }
      },
      removeFromCart: (bundleId) => {
        const { cart } = get();
        set({ cart: cart.filter(id => id !== bundleId) });
      },
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'dataco-op-store',
    }
  )
);