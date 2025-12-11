import React from 'react';
import { motion } from 'framer-motion';
import { 
  Recycle, 
  Leaf, 
  Trophy, 
  TrendingUp, 
  Plus,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { PickupSchedule } from '@/components/dashboard/PickupSchedule';
import { PointsDisplay } from '@/components/gamification/PointsDisplay';
import { BadgeDisplay } from '@/components/gamification/BadgeDisplay';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock data
const leaderboardData = [
  { rank: 1, previousRank: 2, name: 'Delhi Public School', city: 'New Delhi', points: 24560, wasteCollected: 1245 },
  { rank: 2, previousRank: 1, name: 'St. Xavier\'s High School', city: 'Mumbai', points: 22340, wasteCollected: 1180 },
  { rank: 3, previousRank: 3, name: 'Kendriya Vidyalaya', city: 'Bangalore', points: 19870, wasteCollected: 1050 },
  { rank: 4, previousRank: 5, name: 'Modern School', city: 'Pune', points: 17650, wasteCollected: 920 },
  { rank: 5, previousRank: 4, name: 'Green Valley School', city: 'Chennai', points: 15420, wasteCollected: 845 },
];

const upcomingPickups = [
  { id: '1', date: 'Dec 12, 2024', time: '10:00 AM', wasteTypes: ['Plastic', 'Paper'], estimatedWeight: '50 kg', status: 'scheduled' as const, driverName: 'Rajesh Kumar', vehicleNumber: 'DL-01-AB-1234' },
  { id: '2', date: 'Dec 14, 2024', time: '2:00 PM', wasteTypes: ['E-Waste'], estimatedWeight: '25 kg', status: 'scheduled' as const },
  { id: '3', date: 'Dec 11, 2024', time: '11:30 AM', wasteTypes: ['Organic'], estimatedWeight: '80 kg', status: 'in-progress' as const, driverName: 'Amit Singh', vehicleNumber: 'DL-02-CD-5678' },
];

const badges = [
  { id: '1', name: 'First Steps', description: 'Complete your first waste pickup', icon: 'leaf', earned: true, earnedDate: 'Nov 15, 2024', rarity: 'common' as const },
  { id: '2', name: 'Recycling Pro', description: 'Recycle 100kg of waste', icon: 'recycle', earned: true, earnedDate: 'Nov 28, 2024', rarity: 'common' as const },
  { id: '3', name: 'Streak Master', description: 'Maintain a 7-day activity streak', icon: 'flame', earned: true, earnedDate: 'Dec 1, 2024', rarity: 'rare' as const },
  { id: '4', name: 'Top Performer', description: 'Reach top 10 in leaderboard', icon: 'trophy', earned: true, earnedDate: 'Dec 5, 2024', rarity: 'epic' as const },
  { id: '5', name: 'Eco Champion', description: 'Recycle 1000kg of waste', icon: 'crown', earned: false, rarity: 'legendary' as const },
  { id: '6', name: 'Target Hitter', description: 'Meet monthly recycling target', icon: 'target', earned: true, earnedDate: 'Dec 8, 2024', rarity: 'rare' as const },
];

export default function Dashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">
            {t('dashboard.welcome')}, {user?.name || 'School'}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your sustainability progress for today
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          <Button variant="eco" onClick={() => navigate('/pickup')}>
            <Plus className="h-4 w-4 mr-2" />
            {t('nav.pickup')}
          </Button>
          <Button variant="outline" onClick={() => navigate('/analytics')}>
            <TrendingUp className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
          <Button variant="outline" onClick={() => navigate('/leaderboard')}>
            <Trophy className="h-4 w-4 mr-2" />
            Leaderboard
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title={t('dashboard.stats.totalWaste')}
            value="845 kg"
            subtitle="This month"
            icon={Recycle}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
            delay={0.2}
          />
          <StatsCard
            title={t('dashboard.stats.recycled')}
            value="92%"
            subtitle="Recycling rate"
            icon={Leaf}
            trend={{ value: 5, isPositive: true }}
            variant="success"
            delay={0.3}
          />
          <StatsCard
            title={t('dashboard.stats.points')}
            value="15,420"
            subtitle="Total earned"
            icon={Trophy}
            trend={{ value: 8, isPositive: true }}
            delay={0.4}
          />
          <StatsCard
            title={t('dashboard.stats.rank')}
            value="#5"
            subtitle="State ranking"
            icon={TrendingUp}
            trend={{ value: 2, isPositive: true }}
            delay={0.5}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Schedule & Leaderboard */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Pickups */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    {t('dashboard.schedule')}
                  </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/pickup')}>
                  {t('common.viewAll')}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <PickupSchedule pickups={upcomingPickups} compact />
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-rank-gold" />
                  <h2 className="text-lg font-semibold text-foreground">
                    {t('nav.leaderboard')}
                  </h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/leaderboard')}>
                  {t('common.viewAll')}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <Leaderboard entries={leaderboardData} compact currentSchoolId="Green Valley School" />
            </motion.div>
          </div>

          {/* Right Column - Gamification */}
          <div className="space-y-8">
            {/* Points Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <PointsDisplay
                points={15420}
                level={12}
                streak={7}
                pointsToNextLevel={2580}
                currentLevelProgress={75}
              />
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{t('gamification.badges')}</h3>
                <span className="text-sm text-muted-foreground">5/12 earned</span>
              </div>
              <BadgeDisplay badges={badges} compact />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
