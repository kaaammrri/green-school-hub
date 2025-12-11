import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Clock, 
  CheckCircle,
  Package,
  Phone,
  AlertCircle,
  Route,
  Fuel
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Mock data
const todayPickups = [
  {
    id: '1',
    schoolName: 'Delhi Public School',
    address: '123 Main Road, Sector 14, New Delhi',
    wasteTypes: ['Plastic', 'Paper'],
    estimatedWeight: '50 kg',
    scheduledTime: '10:00 AM',
    status: 'completed',
    completedAt: '9:45 AM',
    contactPerson: 'Mr. Sharma',
    phone: '+91 98765 43210',
  },
  {
    id: '2',
    schoolName: 'Modern School',
    address: '456 Park Avenue, Sector 22, New Delhi',
    wasteTypes: ['E-Waste', 'Metal'],
    estimatedWeight: '30 kg',
    scheduledTime: '11:30 AM',
    status: 'in-progress',
    contactPerson: 'Mrs. Gupta',
    phone: '+91 98765 43211',
  },
  {
    id: '3',
    schoolName: 'St. Xavier\'s School',
    address: '789 Church Road, Sector 8, New Delhi',
    wasteTypes: ['Organic'],
    estimatedWeight: '80 kg',
    scheduledTime: '2:00 PM',
    status: 'pending',
    contactPerson: 'Fr. Thomas',
    phone: '+91 98765 43212',
  },
  {
    id: '4',
    schoolName: 'Ryan International',
    address: '321 Highway Road, Sector 30, Gurgaon',
    wasteTypes: ['Plastic', 'Glass'],
    estimatedWeight: '45 kg',
    scheduledTime: '4:00 PM',
    status: 'pending',
    contactPerson: 'Ms. Kapoor',
    phone: '+91 98765 43213',
  },
];

export default function DriverPortal() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [pickups, setPickups] = useState(todayPickups);
  const [activePickup, setActivePickup] = useState<string | null>('2');

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-eco-success/10', text: 'text-eco-success', border: 'border-eco-success/30' };
      case 'in-progress':
        return { bg: 'bg-eco-warning/10', text: 'text-eco-warning', border: 'border-eco-warning/30' };
      case 'pending':
        return { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' };
      default:
        return { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' };
    }
  };

  const handleStartPickup = (id: string) => {
    setPickups(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'in-progress' } : p
    ));
    setActivePickup(id);
    toast({
      title: 'Pickup Started',
      description: 'Navigate to the school location.',
    });
  };

  const handleCompletePickup = (id: string) => {
    setPickups(prev => prev.map(p => 
      p.id === id ? { ...p, status: 'completed', completedAt: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) } : p
    ));
    setActivePickup(null);
    toast({
      title: 'Pickup Completed!',
      description: 'Great job! Moving to the next pickup.',
    });
  };

  const completedCount = pickups.filter(p => p.status === 'completed').length;
  const totalWeight = pickups.filter(p => p.status === 'completed').reduce((acc, p) => acc + parseInt(p.estimatedWeight), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Driver Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your pickups and routes for today
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCount}/{pickups.length}</p>
                <p className="text-xs text-muted-foreground">Pickups Done</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-eco-success/10">
                <CheckCircle className="h-5 w-5 text-eco-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalWeight} kg</p>
                <p className="text-xs text-muted-foreground">Collected Today</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-eco-sky/10">
                <Route className="h-5 w-5 text-eco-sky" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24 km</p>
                <p className="text-xs text-muted-foreground">Route Distance</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-eco-earth/10">
                <Fuel className="h-5 w-5 text-eco-earth" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">78%</p>
                <p className="text-xs text-muted-foreground">Fuel Level</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pickup List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Today's Pickups</h2>
              <Button variant="outline" size="sm">
                <Navigation className="h-4 w-4 mr-2" />
                Optimize Route
              </Button>
            </div>

            {pickups.map((pickup, index) => {
              const statusStyles = getStatusStyles(pickup.status);
              const isActive = pickup.id === activePickup;

              return (
                <motion.div
                  key={pickup.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={cn(
                    'rounded-xl border bg-card p-6 transition-all duration-200',
                    isActive ? 'border-eco-warning shadow-lg ring-2 ring-eco-warning/20' : 'border-border',
                    pickup.status === 'completed' && 'opacity-75'
                  )}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        'p-3 rounded-xl shrink-0',
                        pickup.status === 'in-progress' ? 'bg-eco-warning/10 animate-pulse' : 'bg-primary/10'
                      )}>
                        <Truck className={cn(
                          'h-6 w-6',
                          pickup.status === 'in-progress' ? 'text-eco-warning' : 'text-primary'
                        )} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{pickup.schoolName}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {pickup.address}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline"
                      className={cn(statusStyles.bg, statusStyles.text, statusStyles.border)}
                    >
                      {pickup.status === 'completed' && pickup.completedAt ? `Done ${pickup.completedAt}` : pickup.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{pickup.scheduledTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span>{pickup.estimatedWeight}</span>
                    </div>
                    <div className="flex gap-1">
                      {pickup.wasteTypes.map(type => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{pickup.contactPerson}</span>
                      <a href={`tel:${pickup.phone}`} className="flex items-center gap-1 text-primary hover:underline">
                        <Phone className="h-4 w-4" />
                        Call
                      </a>
                    </div>

                    {pickup.status === 'pending' && (
                      <Button variant="eco" size="sm" onClick={() => handleStartPickup(pickup.id)}>
                        Start Pickup
                      </Button>
                    )}
                    {pickup.status === 'in-progress' && (
                      <Button variant="eco" size="sm" onClick={() => handleCompletePickup(pickup.id)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                    {pickup.status === 'completed' && (
                      <CheckCircle className="h-5 w-5 text-eco-success" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Map Placeholder & Info */}
          <div className="space-y-4">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl border border-border bg-gradient-to-br from-eco-mint/20 to-eco-sky/10 p-6 aspect-square flex flex-col items-center justify-center"
            >
              <MapPin className="h-16 w-16 text-primary/50 mb-4" />
              <p className="text-lg font-semibold text-foreground">Route Map</p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Live navigation and route optimization coming soon
              </p>
              <Button variant="outline" className="mt-4">
                <Navigation className="h-4 w-4 mr-2" />
                Open in Maps
              </Button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Dispatcher
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  View Collection History
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
