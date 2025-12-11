import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Recycle, 
  Trophy, 
  Star, 
  Zap, 
  Target,
  Award,
  Crown,
  Flame,
  TreeDeciduous
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeDisplayProps {
  badges: Badge[];
  compact?: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  leaf: Leaf,
  recycle: Recycle,
  trophy: Trophy,
  star: Star,
  zap: Zap,
  target: Target,
  award: Award,
  crown: Crown,
  flame: Flame,
  tree: TreeDeciduous,
};

export function BadgeDisplay({ badges, compact = false }: BadgeDisplayProps) {
  const getRarityStyles = (rarity: Badge['rarity'], earned: boolean) => {
    if (!earned) {
      return {
        bg: 'bg-muted/50',
        border: 'border-muted',
        text: 'text-muted-foreground/50',
        glow: '',
      };
    }

    switch (rarity) {
      case 'common':
        return {
          bg: 'bg-gradient-to-br from-eco-mint to-eco-leaf/20',
          border: 'border-eco-leaf/30',
          text: 'text-eco-forest',
          glow: '',
        };
      case 'rare':
        return {
          bg: 'bg-gradient-to-br from-eco-sky/30 to-blue-500/20',
          border: 'border-eco-sky/50',
          text: 'text-eco-sky',
          glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
        };
      case 'epic':
        return {
          bg: 'bg-gradient-to-br from-purple-400/30 to-purple-600/20',
          border: 'border-purple-500/50',
          text: 'text-purple-500',
          glow: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
        };
      case 'legendary':
        return {
          bg: 'bg-gradient-to-br from-amber-400/40 to-orange-500/30',
          border: 'border-amber-500/50',
          text: 'text-amber-500',
          glow: 'shadow-[0_0_25px_rgba(245,158,11,0.5)]',
        };
    }
  };

  const displayBadges = compact ? badges.slice(0, 6) : badges;

  return (
    <TooltipProvider>
      <div className={cn(
        'grid gap-3',
        compact ? 'grid-cols-6' : 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8'
      )}>
        {displayBadges.map((badge, index) => {
          const Icon = iconMap[badge.icon] || Star;
          const styles = getRarityStyles(badge.rarity, badge.earned);

          return (
            <Tooltip key={badge.id}>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={badge.earned ? { scale: 1.1, rotate: 5 } : undefined}
                  className={cn(
                    'relative aspect-square rounded-xl border-2 p-3 transition-all duration-300 cursor-pointer',
                    styles.bg,
                    styles.border,
                    badge.earned && styles.glow,
                    badge.earned && 'hover:shadow-lg',
                    !badge.earned && 'opacity-50 grayscale'
                  )}
                >
                  <Icon className={cn('h-full w-full', styles.text)} />
                  
                  {badge.earned && badge.rarity === 'legendary' && (
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{ 
                        boxShadow: [
                          '0 0 20px rgba(245,158,11,0.3)',
                          '0 0 30px rgba(245,158,11,0.5)',
                          '0 0 20px rgba(245,158,11,0.3)',
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-semibold">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  {badge.earned && badge.earnedDate && (
                    <p className="text-xs text-eco-leaf">Earned: {badge.earnedDate}</p>
                  )}
                  {!badge.earned && (
                    <p className="text-xs text-muted-foreground italic">Not yet earned</p>
                  )}
                  <p className={cn(
                    'text-xs font-medium capitalize',
                    badge.rarity === 'legendary' && 'text-amber-500',
                    badge.rarity === 'epic' && 'text-purple-500',
                    badge.rarity === 'rare' && 'text-eco-sky',
                    badge.rarity === 'common' && 'text-eco-leaf'
                  )}>
                    {badge.rarity}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
