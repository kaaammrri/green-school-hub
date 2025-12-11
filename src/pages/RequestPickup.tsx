import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Calendar, 
  Clock, 
  Camera, 
  Upload, 
  Package,
  MapPin,
  CheckCircle,
  Loader2,
  X
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const wasteTypes = [
  { id: 'plastic', label: 'Plastic', icon: '♻️', color: 'bg-blue-500/10 border-blue-500/30 text-blue-600' },
  { id: 'paper', label: 'Paper', icon: '📄', color: 'bg-amber-500/10 border-amber-500/30 text-amber-600' },
  { id: 'ewaste', label: 'E-Waste', icon: '💻', color: 'bg-purple-500/10 border-purple-500/30 text-purple-600' },
  { id: 'organic', label: 'Organic', icon: '🌱', color: 'bg-green-500/10 border-green-500/30 text-green-600' },
  { id: 'metal', label: 'Metal', icon: '🔧', color: 'bg-slate-500/10 border-slate-500/30 text-slate-600' },
  { id: 'glass', label: 'Glass', icon: '🫙', color: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600' },
];

const timeSlots = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
];

export default function RequestPickup() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    wasteTypes: [] as string[],
    quantity: '',
    date: '',
    timeSlot: '',
    notes: '',
    photos: [] as File[],
  });

  const toggleWasteType = (typeId: string) => {
    setFormData(prev => ({
      ...prev,
      wasteTypes: prev.wasteTypes.includes(typeId)
        ? prev.wasteTypes.filter(t => t !== typeId)
        : [...prev.wasteTypes, typeId],
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newFiles].slice(0, 5),
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setStep(3); // Success step

    toast({
      title: 'Pickup Requested!',
      description: 'Your pickup has been scheduled. You will receive a confirmation shortly.',
    });
  };

  const canProceedToStep2 = formData.wasteTypes.length > 0 && formData.quantity;
  const canSubmit = canProceedToStep2 && formData.date && formData.timeSlot;

  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">{t('pickup.title')}</h1>
          <p className="text-muted-foreground mt-1">
            Schedule a waste pickup for your school
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <div className={cn(
                  'h-10 w-10 rounded-full flex items-center justify-center font-semibold transition-colors',
                  step >= s 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                )}>
                  {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                </div>
                <span className={cn(
                  'text-sm font-medium hidden sm:inline',
                  step >= s ? 'text-foreground' : 'text-muted-foreground'
                )}>
                  {s === 1 && 'Waste Details'}
                  {s === 2 && 'Schedule'}
                  {s === 3 && 'Confirm'}
                </span>
              </div>
              {s < 3 && (
                <div className={cn(
                  'flex-1 h-1 mx-4 rounded-full',
                  step > s ? 'bg-primary' : 'bg-muted'
                )} />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Waste Details */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="rounded-xl border border-border bg-card p-6">
                <Label className="text-base font-semibold mb-4 block">
                  {t('pickup.wasteType')} *
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {wasteTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => toggleWasteType(type.id)}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200',
                        formData.wasteTypes.includes(type.id)
                          ? type.color + ' border-current'
                          : 'border-border hover:border-primary/30'
                      )}
                    >
                      <span className="text-2xl">{type.icon}</span>
                      <span className="font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <Label htmlFor="quantity" className="text-base font-semibold mb-4 block">
                  {t('pickup.quantity')} *
                </Label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter estimated weight"
                    value={formData.quantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                    className="pl-10 pr-12"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    kg
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <Label className="text-base font-semibold mb-4 block">
                  {t('pickup.upload')} (Optional)
                </Label>
                <div className="space-y-4">
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors">
                    <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload photos</span>
                    <span className="text-xs text-muted-foreground">Max 5 photos</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  
                  {formData.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Upload ${index + 1}`}
                            className="h-16 w-16 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute -top-2 -right-2 h-5 w-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="button" 
                variant="eco" 
                size="lg" 
                className="w-full"
                disabled={!canProceedToStep2}
                onClick={() => setStep(2)}
              >
                Continue to Schedule
              </Button>
            </motion.div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="rounded-xl border border-border bg-card p-6">
                <Label htmlFor="date" className="text-base font-semibold mb-4 block">
                  {t('pickup.date')} *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="pl-10"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <Label className="text-base font-semibold mb-4 block">
                  {t('pickup.time')} *
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                      className={cn(
                        'flex items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200',
                        formData.timeSlot === slot
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/30'
                      )}
                    >
                      <Clock className={cn(
                        'h-5 w-5',
                        formData.timeSlot === slot ? 'text-primary' : 'text-muted-foreground'
                      )} />
                      <span className="font-medium">{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <Label htmlFor="notes" className="text-base font-semibold mb-4 block">
                  {t('pickup.notes')} (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions or notes for the driver..."
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  variant="eco" 
                  size="lg" 
                  className="flex-1"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Truck className="mr-2 h-5 w-5" />
                      {t('pickup.submit')}
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-flex p-6 rounded-full bg-eco-success/10 mb-6"
              >
                <CheckCircle className="h-16 w-16 text-eco-success" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Pickup Scheduled Successfully!
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Your pickup request has been submitted. You'll receive a confirmation notification shortly.
              </p>

              <div className="rounded-xl border border-border bg-card p-6 max-w-md mx-auto mb-8">
                <h3 className="font-semibold text-foreground mb-4">Pickup Summary</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Waste Types:</span>
                    <div className="flex gap-1 flex-wrap">
                      {formData.wasteTypes.map(type => (
                        <Badge key={type} variant="secondary">{type}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Quantity:</span>
                    <span className="font-medium">{formData.quantity} kg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{formData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{formData.timeSlot}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                  Go to Dashboard
                </Button>
                <Button variant="eco" onClick={() => { setStep(1); setFormData({ wasteTypes: [], quantity: '', date: '', timeSlot: '', notes: '', photos: [] }); }}>
                  Schedule Another
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </main>
    </div>
  );
}
