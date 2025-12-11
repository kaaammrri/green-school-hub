import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Truck, MapPin, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ScheduledPickup {
  id: string;
  date: string;
  time: string;
  wasteTypes: string[];
  estimatedWeight: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  driverName?: string;
  vehicleNumber?: string;
}

interface PickupScheduleProps {
  pickups: ScheduledPickup[];
  compact?: boolean;
}

export function PickupSchedule({ pickups, compact = false }: PickupScheduleProps) {
  const getStatusStyles = (status: ScheduledPickup['status']) => {
    switch (status) {
      case 'scheduled':
        return { bg: 'bg-eco-sky/10', text: 'text-eco-sky', border: 'border-eco-sky/30' };
      case 'in-progress':
        return { bg: 'bg-eco-warning/10', text: 'text-eco-warning', border: 'border-eco-warning/30' };
      case 'completed':
        return { bg: 'bg-eco-success/10', text: 'text-eco-success', border: 'border-eco-success/30' };
      case 'cancelled':
        return { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/30' };
    }
  };

  const getStatusLabel = (status: ScheduledPickup['status']) => {
    switch (status) {
      case 'scheduled': return 'Scheduled';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
    }
  };

  const displayPickups = compact ? pickups.slice(0, 3) : pickups;

  return (
    <div className="space-y-3">
      {displayPickups.map((pickup, index) => {
        const statusStyles = getStatusStyles(pickup.status);
        
        return (
          <motion.div
            key={pickup.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              'p-4 rounded-xl border bg-card transition-all duration-200',
              'hover:shadow-md hover:border-primary/30',
              pickup.status === 'in-progress' && 'border-eco-warning/50'
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={cn(
                  'p-2 rounded-lg shrink-0',
                  pickup.status === 'in-progress' 
                    ? 'bg-eco-warning/10 animate-pulse-ring' 
                    : 'bg-primary/10'
                )}>
                  <Truck className={cn(
                    'h-5 w-5',
                    pickup.status === 'in-progress' ? 'text-eco-warning' : 'text-primary'
                  )} />
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{pickup.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{pickup.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    {pickup.wasteTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      ~{pickup.estimatedWeight}
                    </span>
                  </div>

                  {pickup.driverName && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {pickup.driverName} • {pickup.vehicleNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <Badge 
                variant="outline" 
                className={cn(
                  'shrink-0',
                  statusStyles.bg,
                  statusStyles.text,
                  statusStyles.border
                )}
              >
                {getStatusLabel(pickup.status)}
              </Badge>
            </div>
          </motion.div>
        );
      })}

      {pickups.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Truck className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No upcoming pickups scheduled</p>
        </div>
      )}
    </div>
  );
}
