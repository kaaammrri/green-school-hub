import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardEntry {
  rank: number;
  previousRank?: number;
  name: string;
  city: string;
  points: number;
  wasteCollected: number;
  avatar?: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentSchoolId?: string;
  compact?: boolean;
}

export function Leaderboard({ entries, currentSchoolId, compact = false }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-rank-gold" />;
      case 2:
        return <Medal className="h-5 w-5 text-rank-silver" />;
      case 3:
        return <Award className="h-5 w-5 text-rank-bronze" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'badge-gold';
      case 2:
        return 'badge-silver';
      case 3:
        return 'badge-bronze';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendIcon = (current: number, previous?: number) => {
    if (!previous) return null;
    if (current < previous) return <TrendingUp className="h-4 w-4 text-eco-success" />;
    if (current > previous) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const displayEntries = compact ? entries.slice(0, 5) : entries;

  return (
    <div className="space-y-3">
      {displayEntries.map((entry, index) => (
        <motion.div
          key={entry.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={cn(
            'flex items-center gap-4 p-4 rounded-xl transition-all duration-200',
            entry.rank <= 3 ? 'bg-gradient-to-r from-card to-muted/30' : 'bg-card',
            'border border-border hover:border-primary/30 hover:shadow-md',
            currentSchoolId === entry.name && 'ring-2 ring-primary ring-offset-2'
          )}
        >
          {/* Rank Badge */}
          <div className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full shrink-0',
            getRankBadgeStyle(entry.rank)
          )}>
            {getRankIcon(entry.rank)}
          </div>

          {/* Avatar */}
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-eco-leaf/20 flex items-center justify-center shrink-0">
            <span className="text-lg font-bold text-primary">
              {entry.name.charAt(0)}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground truncate">{entry.name}</p>
              {getTrendIcon(entry.rank, entry.previousRank)}
            </div>
            <p className="text-sm text-muted-foreground">{entry.city}</p>
          </div>

          {/* Stats */}
          <div className="text-right shrink-0">
            <p className="font-bold text-foreground">{entry.points.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              {entry.wasteCollected.toLocaleString()} kg
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
