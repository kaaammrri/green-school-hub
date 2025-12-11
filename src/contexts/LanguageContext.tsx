import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड' },
  'nav.pickup': { en: 'Request Pickup', hi: 'पिकअप अनुरोध' },
  'nav.analytics': { en: 'Analytics', hi: 'विश्लेषण' },
  'nav.leaderboard': { en: 'Leaderboard', hi: 'लीडरबोर्ड' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल' },
  'nav.logout': { en: 'Logout', hi: 'लॉगआउट' },
  
  // Landing Page
  'landing.hero.title': { en: 'Transform School Waste Into Environmental Impact', hi: 'स्कूल के कचरे को पर्यावरणीय प्रभाव में बदलें' },
  'landing.hero.subtitle': { en: 'Join thousands of Indian schools in building a cleaner, greener future through smart waste management', hi: 'स्मार्ट अपशिष्ट प्रबंधन के माध्यम से स्वच्छ, हरित भविष्य बनाने में हजारों भारतीय स्कूलों से जुड़ें' },
  'landing.hero.cta': { en: 'Get Started', hi: 'शुरू करें' },
  'landing.hero.learnMore': { en: 'Learn More', hi: 'और जानें' },
  
  // Auth
  'auth.login': { en: 'Login', hi: 'लॉगिन' },
  'auth.signup': { en: 'Sign Up', hi: 'साइन अप' },
  'auth.email': { en: 'Email', hi: 'ईमेल' },
  'auth.password': { en: 'Password', hi: 'पासवर्ड' },
  'auth.confirmPassword': { en: 'Confirm Password', hi: 'पासवर्ड की पुष्टि करें' },
  'auth.schoolName': { en: 'School Name', hi: 'स्कूल का नाम' },
  'auth.selectRole': { en: 'Select Role', hi: 'भूमिका चुनें' },
  'auth.school': { en: 'School', hi: 'स्कूल' },
  'auth.driver': { en: 'Driver', hi: 'ड्राइवर' },
  'auth.admin': { en: 'Administrator', hi: 'व्यवस्थापक' },
  
  // Dashboard
  'dashboard.welcome': { en: 'Welcome back', hi: 'वापसी पर स्वागत है' },
  'dashboard.stats.totalWaste': { en: 'Total Waste Collected', hi: 'कुल एकत्रित कचरा' },
  'dashboard.stats.recycled': { en: 'Recycled', hi: 'पुनर्नवीनीकरण' },
  'dashboard.stats.points': { en: 'Eco Points', hi: 'इको पॉइंट्स' },
  'dashboard.stats.rank': { en: 'School Rank', hi: 'स्कूल रैंक' },
  'dashboard.schedule': { en: 'Upcoming Pickups', hi: 'आगामी पिकअप' },
  'dashboard.recentActivity': { en: 'Recent Activity', hi: 'हाल की गतिविधि' },
  
  // Pickup
  'pickup.title': { en: 'Request Waste Pickup', hi: 'कचरा पिकअप अनुरोध' },
  'pickup.wasteType': { en: 'Waste Type', hi: 'कचरे का प्रकार' },
  'pickup.quantity': { en: 'Estimated Quantity', hi: 'अनुमानित मात्रा' },
  'pickup.date': { en: 'Preferred Date', hi: 'पसंदीदा तारीख' },
  'pickup.time': { en: 'Preferred Time', hi: 'पसंदीदा समय' },
  'pickup.notes': { en: 'Additional Notes', hi: 'अतिरिक्त नोट्स' },
  'pickup.upload': { en: 'Upload Photo', hi: 'फोटो अपलोड करें' },
  'pickup.submit': { en: 'Submit Request', hi: 'अनुरोध सबमिट करें' },
  'pickup.tracking': { en: 'Track Pickup', hi: 'पिकअप ट्रैक करें' },
  
  // Waste Types
  'waste.plastic': { en: 'Plastic', hi: 'प्लास्टिक' },
  'waste.paper': { en: 'Paper', hi: 'कागज' },
  'waste.ewaste': { en: 'E-Waste', hi: 'ई-कचरा' },
  'waste.organic': { en: 'Organic', hi: 'जैविक' },
  'waste.metal': { en: 'Metal', hi: 'धातु' },
  'waste.glass': { en: 'Glass', hi: 'कांच' },
  
  // Gamification
  'gamification.points': { en: 'Points', hi: 'पॉइंट्स' },
  'gamification.badges': { en: 'Badges', hi: 'बैज' },
  'gamification.level': { en: 'Level', hi: 'स्तर' },
  'gamification.streak': { en: 'Day Streak', hi: 'दिन की लय' },
  
  // Common
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'common.error': { en: 'Something went wrong', hi: 'कुछ गलत हो गया' },
  'common.success': { en: 'Success!', hi: 'सफलता!' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'common.save': { en: 'Save', hi: 'सहेजें' },
  'common.kg': { en: 'kg', hi: 'किलो' },
  'common.viewAll': { en: 'View All', hi: 'सभी देखें' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
