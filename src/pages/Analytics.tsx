import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Download,
  Filter,
  Leaf,
  Recycle,
  TreeDeciduous,
  Droplets
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { WasteChart } from '@/components/analytics/WasteChart';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data
const monthlyTrendData = [
  { name: 'Jan', value: 420 },
  { name: 'Feb', value: 480 },
  { name: 'Mar', value: 550 },
  { name: 'Apr', value: 620 },
  { name: 'May', value: 580 },
  { name: 'Jun', value: 710 },
  { name: 'Jul', value: 680 },
  { name: 'Aug', value: 750 },
  { name: 'Sep', value: 820 },
  { name: 'Oct', value: 790 },
  { name: 'Nov', value: 880 },
  { name: 'Dec', value: 845 },
];

const wasteTypeData = [
  { name: 'Plastic', value: 320 },
  { name: 'Paper', value: 280 },
  { name: 'Organic', value: 180 },
  { name: 'E-Waste', value: 45 },
  { name: 'Metal', value: 15 },
  { name: 'Glass', value: 5 },
];

const weeklyData = [
  { name: 'Mon', value: 45 },
  { name: 'Tue', value: 62 },
  { name: 'Wed', value: 38 },
  { name: 'Thu', value: 71 },
  { name: 'Fri', value: 55 },
  { name: 'Sat', value: 28 },
  { name: 'Sun', value: 0 },
];

export default function Analytics() {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState('year');

  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('nav.analytics')}</h1>
            <p className="text-muted-foreground mt-1">
              Track your environmental impact and waste management progress
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Waste Collected"
            value="8,450 kg"
            subtitle="Since joining"
            icon={Recycle}
            trend={{ value: 15, isPositive: true }}
            variant="primary"
            delay={0.1}
          />
          <StatsCard
            title="Recycling Rate"
            value="92%"
            subtitle="Above average"
            icon={Leaf}
            trend={{ value: 3, isPositive: true }}
            variant="success"
            delay={0.2}
          />
          <StatsCard
            title="Trees Saved"
            value="124"
            subtitle="Equivalent impact"
            icon={TreeDeciduous}
            delay={0.3}
          />
          <StatsCard
            title="Water Saved"
            value="45,000L"
            subtitle="Equivalent impact"
            icon={Droplets}
            delay={0.4}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <WasteChart
              data={monthlyTrendData}
              type="area"
              title="Monthly Collection Trend"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <WasteChart
              data={wasteTypeData}
              type="pie"
              title="Waste Composition"
            />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <WasteChart
              data={weeklyData}
              type="bar"
              title="Weekly Collection (kg)"
            />
          </motion.div>

          {/* Environmental Impact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Environmental Impact Summary
            </h3>
            <div className="space-y-6">
              {[
                { label: 'CO₂ Emissions Reduced', value: '2.4 tons', progress: 78 },
                { label: 'Landfill Space Saved', value: '12 m³', progress: 65 },
                { label: 'Energy Conserved', value: '4,500 kWh', progress: 82 },
                { label: 'Raw Materials Saved', value: '1.8 tons', progress: 71 },
              ].map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 1, delay: 0.9 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary to-eco-leaf rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-eco-mint/30 border border-eco-leaf/20">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-eco-leaf/20">
                  <Leaf className="h-5 w-5 text-eco-forest" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Great Progress!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your school is in the top 10% for environmental impact this quarter. 
                    Keep up the excellent work! 🌱
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
