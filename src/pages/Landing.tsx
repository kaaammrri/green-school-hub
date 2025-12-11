import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Recycle, 
  Truck, 
  Trophy, 
  BarChart3, 
  Users, 
  ArrowRight,
  CheckCircle,
  School,
  TreeDeciduous,
  Droplets
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  {
    icon: Recycle,
    title: 'Smart Waste Segregation',
    description: 'AI-powered waste categorization helps schools properly sort recyclables, organic, and e-waste.',
  },
  {
    icon: Truck,
    title: 'Scheduled Pickups',
    description: 'Request pickups with real-time tracking. Know exactly when your waste will be collected.',
  },
  {
    icon: Trophy,
    title: 'Gamified Learning',
    description: 'Earn points, badges, and compete with other schools. Make sustainability fun!',
  },
  {
    icon: BarChart3,
    title: 'Impact Analytics',
    description: 'Track your environmental impact with detailed metrics and beautiful visualizations.',
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Connect with other eco-conscious schools and share best practices.',
  },
  {
    icon: School,
    title: 'Education Resources',
    description: 'Access curriculum materials and workshops on waste management.',
  },
];

const stats = [
  { value: '2,500+', label: 'Schools Registered' },
  { value: '15,000', label: 'Tons Recycled' },
  { value: '₹2.5Cr', label: 'Revenue Generated' },
  { value: '50,000+', label: 'Students Engaged' },
];

const impactMetrics = [
  { icon: TreeDeciduous, value: '12,450', label: 'Trees Saved', color: 'text-eco-leaf' },
  { icon: Droplets, value: '8.5M', label: 'Liters Water Saved', color: 'text-eco-sky' },
  { icon: Recycle, value: '15,000', label: 'Tons Recycled', color: 'text-primary' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header variant="landing" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-eco-mint/30 via-background to-eco-sand/30" />
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-eco-leaf/5 blur-3xl" />
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                India's #1 School Waste Management Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              {t('landing.hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              {t('landing.hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate('/auth?mode=signup')}
                className="w-full sm:w-auto"
              >
                {t('landing.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                onClick={() => navigate('/auth')}
                className="w-full sm:w-auto"
              >
                {t('landing.hero.learnMore')}
              </Button>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-[10%] hidden lg:block"
          >
            <div className="p-4 rounded-2xl bg-card shadow-lg border border-border">
              <Recycle className="h-8 w-8 text-primary" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 right-[10%] hidden lg:block"
          >
            <div className="p-4 rounded-2xl bg-card shadow-lg border border-border">
              <Trophy className="h-8 w-8 text-rank-gold" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-eco-forest">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-primary-foreground/80 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything Your School Needs
            </h2>
            <p className="text-lg text-muted-foreground">
              A complete platform for managing waste, engaging students, and making a real environmental impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Collective Impact
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Together, Indian schools are making a measurable difference in the fight against waste.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center p-8 rounded-2xl bg-card border border-border"
              >
                <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                  <metric.icon className={`h-8 w-8 ${metric.color}`} />
                </div>
                <p className="text-4xl font-bold text-foreground mb-1">{metric.value}</p>
                <p className="text-muted-foreground">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in just three simple steps
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Register Your School', desc: 'Sign up and create your school profile in minutes' },
              { step: '02', title: 'Segregate & Request', desc: 'Sort waste and request pickups through our app' },
              { step: '03', title: 'Track & Earn', desc: 'Monitor your impact and earn rewards for your efforts' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-start gap-6 mb-8 last:mb-0"
              >
                <div className="shrink-0 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-eco-leaf flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-eco-forest to-eco-leaf">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of schools already transforming waste management in India.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="hero-outline" 
                size="xl" 
                onClick={() => navigate('/auth?mode=signup')}
              >
                Register Your School
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-eco-leaf">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">
                Eco<span className="text-primary">Collect</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 EcoCollect. Made with 💚 for Indian Schools.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
