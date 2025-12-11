import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning';
  delay?: number;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = 'default',
  delay = 0 
}: StatsCardProps) {
  const variantStyles = {
    default: {
      bg: 'bg-card',
      icon: 'bg-muted text-muted-foreground',
      iconHover: 'group-hover:bg-primary/10 group-hover:text-primary',
    },
    primary: {
      bg: 'bg-gradient-to-br from-primary to-eco-forest',
      icon: 'bg-primary-foreground/20 text-primary-foreground',
      iconHover: 'group-hover:bg-primary-foreground/30',
    },
    success: {
      bg: 'bg-gradient-to-br from-eco-leaf to-eco-forest',
      icon: 'bg-primary-foreground/20 text-primary-foreground',
      iconHover: 'group-hover:bg-primary-foreground/30',
    },
    warning: {
      bg: 'bg-gradient-to-br from-eco-warning to-eco-earth',
      icon: 'bg-primary-foreground/20 text-primary-foreground',
      iconHover: 'group-hover:bg-primary-foreground/30',
    },
  };

  const styles = variantStyles[variant];
  const isColoredVariant = variant !== 'default';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'group relative overflow-hidden rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        styles.bg,
        !isColoredVariant && 'border border-border'
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-current" />
        <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-current" />
      </div>

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn(
            'text-sm font-medium',
            isColoredVariant ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}>
            {title}
          </p>
          <p className={cn(
            'text-3xl font-bold tracking-tight',
            isColoredVariant ? 'text-primary-foreground' : 'text-foreground'
          )}>
            {value}
          </p>
          {subtitle && (
            <p className={cn(
              'text-xs',
              isColoredVariant ? 'text-primary-foreground/70' : 'text-muted-foreground'
            )}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className={cn(
              'inline-flex items-center gap-1 text-xs font-medium',
              trend.isPositive 
                ? (isColoredVariant ? 'text-primary-foreground' : 'text-eco-success') 
                : 'text-destructive'
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
              <span className={isColoredVariant ? 'text-primary-foreground/60' : 'text-muted-foreground'}>
                vs last month
              </span>
            </div>
          )}
        </div>

        <div className={cn(
          'rounded-xl p-3 transition-colors duration-300',
          styles.icon,
          styles.iconHover
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
