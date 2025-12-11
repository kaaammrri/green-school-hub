import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Award, 
  Filter,
  Search,
  MapPin,
  TrendingUp,
  Crown
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Leaderboard } from '@/components/dashboard/Leaderboard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

// Mock data
const allSchools = [
  { rank: 1, previousRank: 2, name: 'Delhi Public School', city: 'New Delhi', points: 24560, wasteCollected: 1245, state: 'Delhi' },
  { rank: 2, previousRank: 1, name: 'St. Xavier\'s High School', city: 'Mumbai', points: 22340, wasteCollected: 1180, state: 'Maharashtra' },
  { rank: 3, previousRank: 3, name: 'Kendriya Vidyalaya', city: 'Bangalore', points: 19870, wasteCollected: 1050, state: 'Karnataka' },
  { rank: 4, previousRank: 5, name: 'Modern School', city: 'Pune', points: 17650, wasteCollected: 920, state: 'Maharashtra' },
  { rank: 5, previousRank: 4, name: 'Green Valley School', city: 'Chennai', points: 15420, wasteCollected: 845, state: 'Tamil Nadu' },
  { rank: 6, previousRank: 7, name: 'DAV Public School', city: 'Hyderabad', points: 14200, wasteCollected: 780, state: 'Telangana' },
  { rank: 7, previousRank: 6, name: 'Ryan International', city: 'Gurgaon', points: 13850, wasteCollected: 720, state: 'Haryana' },
  { rank: 8, previousRank: 9, name: 'Amity International', city: 'Noida', points: 12600, wasteCollected: 680, state: 'Uttar Pradesh' },
  { rank: 9, previousRank: 8, name: 'The Heritage School', city: 'Kolkata', points: 11900, wasteCollected: 640, state: 'West Bengal' },
  { rank: 10, previousRank: 10, name: 'Springdales School', city: 'Delhi', points: 10500, wasteCollected: 580, state: 'Delhi' },
];

const states = ['All States', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Haryana', 'Uttar Pradesh', 'West Bengal'];

export default function LeaderboardPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [timeframe, setTimeframe] = useState('all');

  const filteredSchools = allSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          school.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'All States' || school.state === selectedState;
    return matchesSearch && matchesState;
  });

  const topThree = filteredSchools.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">{t('nav.leaderboard')}</h1>
          <p className="text-muted-foreground mt-1">
            See how your school ranks against others across India
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto"
        >
          {/* 2nd Place */}
          <div className="flex flex-col items-center pt-8">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">
                  {topThree[1]?.name.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-rank-silver flex items-center justify-center shadow-md">
                <Medal className="h-5 w-5 text-white" />
              </div>
            </div>
            <p className="mt-4 font-semibold text-foreground text-center text-sm">
              {topThree[1]?.name}
            </p>
            <p className="text-xs text-muted-foreground">{topThree[1]?.city}</p>
            <p className="text-lg font-bold text-foreground mt-1">
              {topThree[1]?.points.toLocaleString()}
            </p>
            <div className="h-24 w-full bg-gradient-to-t from-rank-silver/30 to-transparent rounded-t-xl mt-4" />
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl ring-4 ring-amber-300/50">
                <span className="text-3xl font-bold text-white">
                  {topThree[0]?.name.charAt(0)}
                </span>
              </div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 left-1/2 -translate-x-1/2"
              >
                <Crown className="h-8 w-8 text-rank-gold" />
              </motion.div>
              <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-rank-gold flex items-center justify-center shadow-md">
                <Trophy className="h-6 w-6 text-white" />
              </div>
            </motion.div>
            <p className="mt-4 font-bold text-foreground text-center">
              {topThree[0]?.name}
            </p>
            <p className="text-sm text-muted-foreground">{topThree[0]?.city}</p>
            <p className="text-xl font-bold text-foreground mt-1">
              {topThree[0]?.points.toLocaleString()}
            </p>
            <div className="h-32 w-full bg-gradient-to-t from-rank-gold/30 to-transparent rounded-t-xl mt-4" />
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center pt-12">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">
                  {topThree[2]?.name.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full bg-rank-bronze flex items-center justify-center shadow-md">
                <Award className="h-4 w-4 text-white" />
              </div>
            </div>
            <p className="mt-4 font-semibold text-foreground text-center text-sm">
              {topThree[2]?.name}
            </p>
            <p className="text-xs text-muted-foreground">{topThree[2]?.city}</p>
            <p className="text-lg font-bold text-foreground mt-1">
              {topThree[2]?.points.toLocaleString()}
            </p>
            <div className="h-16 w-full bg-gradient-to-t from-rank-bronze/30 to-transparent rounded-t-xl mt-4" />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search schools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full sm:w-48">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="points" className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="points">By Points</TabsTrigger>
            <TabsTrigger value="waste">By Waste</TabsTrigger>
            <TabsTrigger value="growth">By Growth</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">All Schools</h2>
            <span className="text-sm text-muted-foreground">
              {filteredSchools.length} schools
            </span>
          </div>
          <Leaderboard 
            entries={filteredSchools} 
            currentSchoolId="Green Valley School"
          />
        </motion.div>
      </main>
    </div>
  );
}
