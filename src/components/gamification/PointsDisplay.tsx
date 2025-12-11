import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Flame, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface PointsDisplayProps {
  points: number;
  level: number;
  streak: number;
  pointsToNextLevel: number;
  currentLevelProgress: number;
}

export function PointsDisplay({ 
  points, 
  level, 
  streak, 
  pointsToNextLevel, 
  currentLevelProgress 
}: PointsDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Main Points Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-eco-forest to-eco-leaf p-6 text-primary-foreground"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary-foreground/10" />
        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-6 translate-y-6 rounded-full bg-primary-foreground/10" />
        
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-foreground/80">Total Eco Points</p>
              <motion.p 
                className="text-4xl font-bold"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {points.toLocaleString()}
              </motion.p>
            </div>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-3 rounded-full bg-primary-foreground/20"
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>
          </div>

          {/* Level Progress */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Level {level}</span>
              <span className="text-primary-foreground/80">
                {pointsToNextLevel.toLocaleString()} pts to Level {level + 1}
              </span>
            </div>
            <div className="relative h-3 rounded-full bg-primary-foreground/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentLevelProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute inset-y-0 left-0 bg-primary-foreground rounded-full"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Streak Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-eco-warning/10">
              <Flame className="h-5 w-5 text-eco-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{streak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </motion.div>

        {/* Rank Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rank-gold/10">
              <Star className="h-5 w-5 text-rank-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">#{level}</p>
              <p className="text-xs text-muted-foreground">School Rank</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Weekly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-border bg-card p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-foreground">This Week</p>
          <div className="flex items-center gap-1 text-eco-success text-sm">
            <TrendingUp className="h-4 w-4" />
            <span>+24%</span>
          </div>
        </div>
        <div className="flex items-end gap-1 h-16">
          {[40, 65, 45, 80, 55, 90, 70].map((height, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className={cn(
                'flex-1 rounded-sm',
                index === 6 ? 'bg-primary' : 'bg-primary/30'
              )}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </motion.div>
    </div>
  );
}
