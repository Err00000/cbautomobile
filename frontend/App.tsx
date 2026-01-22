import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Navigate, Outlet, useLocation } from 'react-router-dom';
import { LanguageSelector } from './components/LanguageSelector';
import { CBLogo } from './components/CBLogo';
import { Language, ServiceData, Car, Partner } from './types';
import { CONTENT, SERVICES, FEATURED_CARS } from './constants';
import * as Icons from 'lucide-react';

import { ImageSlider } from './components/ImageSlider';
import EmailSubscriptionForm from './components/EmailSubscriptionForm'; // Import the new component

// Define the type for the context
interface LanguageContextType {
  language: Language;
  setLanguage: (l: Language) => void;
}

// Create and export the LanguageContext
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);


// --- Scroll Handling ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Components ---

interface NavbarProps {
  language: Language;
  setLanguage: (l: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, setLanguage }) => {
  const navigate = useNavigate();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('cb_language', lang);
  };

  return (
    <nav className="fixed top-0 w-full z-30 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => navigate('/home')}>
            <CBLogo className="w-12 h-12 md:w-16 md:h-16 scale-75 md:scale-100 transition-transform group-hover:scale-90 md:group-hover:scale-105" />
            <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600 hidden md:block">
              CB Automobile
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/4915175312107" className="hidden md:flex items-center gap-2 text-neutral-300 hover:text-yellow-500 transition-colors">
              <Icons.Phone size={16} />
              <span className="text-sm font-medium">+49 15175312107</span>
            </a>
            <div className="flex gap-2">
              {Object.values(Language).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-2 py-1 md:px-3 md:py-1 rounded text-xs md:text-sm font-medium transition-colors ${
                    language === lang ? 'bg-yellow-600 text-white' : 'text-neutral-400 hover:text-yellow-500'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface ServiceCardProps {
  service: ServiceData;
  language: Language;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, language }) => {
  const navigate = useNavigate();
  // Dynamic Icon rendering
  const IconComponent = (Icons as any)[service.iconName] || Icons.HelpCircle;

  return (
    <div
      onClick={() => navigate(`/services/${service.id}`)}
      className="group relative p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-yellow-600/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(234,179,8,0.2)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="w-12 h-12 mb-4 rounded-lg bg-neutral-800 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-600 group-hover:text-white transition-colors duration-300">
          <IconComponent size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
          {service.title[language]}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed">
          {service.description[language]}
        </p>
      </div>
    </div>
  );
};

interface StatsSectionProps {
  language: Language;
}

const StatsSection: React.FC<StatsSectionProps> = ({ language }) => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {(CONTENT.stats || []).map((stat, index) => {
            const IconComponent = (Icons as any)[stat.icon] || Icons.HelpCircle;
            return (
              <div key={index} className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl p-8 hover:border-yellow-600/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(234,179,8,0.2)]">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex justify-center items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-yellow-600/10 flex items-center justify-center group-hover:bg-yellow-600 transition-colors duration-300">
                      <IconComponent className="w-8 h-8 text-yellow-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <p className="text-4xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{stat.value}</p>
                  <p className="text-neutral-400">{stat.title[language]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface CarCardProps {
  car: Car;
  language: Language;
  onViewDetails: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, language, onViewDetails }) => {
  return (
    <div className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-yellow-600 transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(234,179,8,0.2)]">
      <div className="relative h-48 overflow-hidden cursor-pointer" onClick={onViewDetails}>
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black to-transparent">
           <span className="bg-yellow-600 text-black font-bold px-2 py-1 rounded text-sm">
             {car.price.toLocaleString()} {CONTENT.carSales.priceCurrency}
           </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-1">{car.make}</h3>
        <p className="text-neutral-400 text-sm mb-4">{car.model}</p>
        
        <div className="grid grid-cols-2 gap-y-2 text-xs text-neutral-300 border-t border-neutral-800 pt-3">
           <div className="flex items-center gap-1">
             <Icons.Calendar className="w-3 h-3 text-yellow-500" />
             {car.year} {CONTENT.carSales.specs.year[language]}
           </div>
           <div className="flex items-center gap-1">
             <Icons.Gauge className="w-3 h-3 text-yellow-500" />
             {car.mileage.toLocaleString()} {CONTENT.carSales.specs.mileage[language]}
           </div>
           <div className="flex items-center gap-1">
             <Icons.Zap className="w-3 h-3 text-yellow-500" />
             {car.power} {CONTENT.carSales.specs.power[language]}
           </div>
           <div className="flex items-center gap-1">
             <Icons.Fuel className="w-3 h-3 text-yellow-500" />
             {car.fuel}
           </div>
        </div>

        <button 
          onClick={onViewDetails}
          className="w-full mt-4 bg-neutral-800 hover:bg-yellow-600 hover:text-black text-white py-2 rounded-lg transition-colors text-sm font-medium"
        >
          {CONTENT.carSales.viewDetails[language]}
        </button>
      </div>
    </div>
  );
};

interface CarDetailsModalProps {
  car: Car;
  language: Language;
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, language, onClose }) => {
  const specs = CONTENT.carSales.specs;
  
  // Helper to render a spec row
  const SpecRow = ({ label, value }: { label: string; value: string | number | Record<Language, string> }) => {
    let displayValue: string | number;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      displayValue = (value as Record<Language, string>)[language];
    } else {
      displayValue = value as string | number;
    }

    return (
      <div className="flex justify-between py-2 border-b border-neutral-800 last:border-0">
        <span className="text-neutral-400 text-sm font-medium">{label}</span>
        <span className="text-white text-sm text-right max-w-[50%]">{displayValue}</span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></div>
      <div className="bg-neutral-900 border border-neutral-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-yellow-600 transition-colors"
        >
          <Icons.X className="w-6 h-6" />
        </button>
        
        {/* Header Image */}
        <ImageSlider images={car.images} />

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
           <h3 className="text-lg font-semibold text-white border-b border-yellow-600/30 pb-2">
             {CONTENT.carSales.viewDetails[language]}
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              <SpecRow label={specs.series[language]} value={car.details.series} />
              <SpecRow label={specs.trim[language]} value={car.details.trim} />
              <SpecRow label={specs.engineVolume[language]} value={car.details.engineVolume} />
              <SpecRow label={specs.seats[language]} value={car.details.seats} />
              <SpecRow label={specs.doors[language]} value={car.details.doors} />
              <SpecRow label={specs.emissionClass[language]} value={car.details.emissionClass} />
              <SpecRow label={specs.inspection[language]} value={car.details.inspection} />
              <SpecRow label={specs.climate[language]} value={car.details.climate} />
              <SpecRow label={specs.airbags[language]} value={car.details.airbags} />
              <SpecRow label={specs.colorManuf[language]} value={car.details.colorManuf} />
              <SpecRow label={specs.color[language]} value={car.details.color} />
              <SpecRow label={specs.interior[language]} value={car.details.interior} />
              <SpecRow label={specs.towBraked[language]} value={car.details.towBraked} />
              <SpecRow label={specs.towUnbraked[language]} value={car.details.towUnbraked} />
              <SpecRow label={specs.weight[language]} value={car.details.weight} />
              <SpecRow label={specs.cylinders[language]} value={car.details.cylinders} />
              <SpecRow label={specs.tank[language]} value={car.details.tank} />
              <SpecRow label={specs.driveType[language]} value={car.details.driveType} />
              <SpecRow label={specs.consumption[language]} value={car.details.consumption} />
              <SpecRow label={specs.co2[language]} value={car.details.co2} />
              <div className="col-span-1 md:col-span-2">
                <SpecRow label={specs.fuelConsCombined[language]} value={car.details.fuelConsCombined} />
              </div>
           </div>

           <div className="pt-4 flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
              >
                {CONTENT.carSales.closeDetails[language]}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};


interface ContactModalProps {
  phone: string;
  onClose: () => void;
  language: Language;
}

const ContactModal: React.FC<ContactModalProps> = ({ phone, onClose, language }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></div>
      <div className="bg-neutral-900 border border-neutral-700 w-full max-w-sm rounded-2xl shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-300 p-8 text-center">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-yellow-600 transition-colors"
        >
          <Icons.X className="w-6 h-6" />
        </button>
        
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-yellow-600/20 rounded-full text-yellow-500">
            <Icons.PhoneCall size={40} />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">
          {CONTENT.common.callNow[language]}
        </h3>
        
        <a 
          href={`https://wa.me/${phone.replace(/\s/g, '')}`} 
          className="text-3xl font-mono text-yellow-400 hover:text-yellow-300 transition-colors tracking-wider"
        >
          {phone}
        </a>

        <div className="mt-8">
           <button 
             onClick={onClose}
             className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors w-full sm:w-auto"
           >
             {CONTENT.carSales.closeDetails[language]}
           </button>
        </div>
      </div>
    </div>
  );
};


interface ServiceDetailsModalProps {
  service: ServiceData;
  partner: Partner; // Added partner prop
  language: Language;
  onClose: () => void;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ service, partner, language, onClose }) => {
  const IconComponent = (Icons as any)[service.iconName] || Icons.HelpCircle;

  const isCarRegistrationCR85 = service.id === 'car-registration' && partner.id === 'p-cr85-info' && partner.registrationDetails;
  const isCarCheckCR85 = service.id === 'car-check' && partner.id === 'p-cr85-auto' && partner.carCheckDetails;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></div>
      <div className="bg-neutral-900 border border-neutral-700 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-300 p-8">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-yellow-600 transition-colors"
        >
          <Icons.X className="w-6 h-6" />
        </button>
        
        {isCarRegistrationCR85 && partner.registrationDetails ? (
          <>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-yellow-600/20 rounded-xl text-yellow-500">
                <IconComponent size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {partner.registrationDetails.header[language]}
              </h3>
            </div>
            <p className="text-neutral-300 leading-relaxed mb-6">
              {partner.registrationDetails.subtitle[language]}
            </p>
            <div className="space-y-4">
              {partner.registrationDetails.plates.map((plate, index) => (
                <div key={index} className="bg-neutral-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white text-lg">{plate.title[language]}</h4>
                  <p className="text-neutral-400 text-sm">{plate.description[language]}</p>
                </div>
              ))}
            </div>
          </>
        ) : isCarCheckCR85 && partner.carCheckDetails ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partner.carCheckDetails.items.map((item, index) => {
                const ItemIcon = (Icons as any)[item.icon] || Icons.HelpCircle;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-yellow-600/10 rounded-full text-yellow-500">
                        <ItemIcon size={32} />
                      </div>
                    </div>
                    <h4 className="font-bold text-white text-lg underline mb-2">{item.title[language]}</h4>
                    <p className="text-neutral-400 text-sm">{item.description[language]}</p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-8">
              {partner.image && (
                <div className="md:w-1/3 flex-shrink-0">
                  <img src={partner.image} alt={partner.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {partner.name}
                </h3>
                <p className="text-neutral-400 mb-6">
                  {partner.description[language]}
                </p>

                <div className="flex items-center gap-4 mb-6 border-t border-b border-neutral-800 py-4">
                  <div className="p-3 bg-yellow-600/20 rounded-xl text-yellow-500">
                    <IconComponent size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-white">
                    {service.title[language]}
                  </h4>
                </div>

                <p className="text-neutral-300 leading-relaxed">
                  {service.longDescription[language]}
                </p>
              </div>
            </div>
          </>
        )}

        <div className="mt-8 text-right">
           <button 
             onClick={onClose}
             className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
           >
             {CONTENT.carSales.closeDetails[language]}
           </button>
        </div>
      </div>
    </div>
  );
};


// --- Pages ---

const LanguageSelectionPage: React.FC<{ setLanguage: (l: Language) => void }> = ({ setLanguage }) => {
  const navigate = useNavigate();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('cb_language', lang);
    navigate('/home');
  };

  return <LanguageSelector onSelect={handleSelect} />;
};

const HomePage: React.FC<{ language: Language }> = ({ language }) => {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-neutral-950">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #ca8a04 0%, transparent 25%)',
            filter: 'blur(100px)'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8 animate-in zoom-in duration-1000">
            <CBLogo className="w-32 h-32 md:w-48 md:h-48" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight animate-in slide-in-from-bottom-8 duration-1000 delay-100">
            {CONTENT.hero.title[language]}
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 mb-10 leading-relaxed animate-in slide-in-from-bottom-8 duration-1000 delay-200">
            {CONTENT.hero.subtitle[language]}
          </p>
          
          <button 
            onClick={scrollToServices}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black transition-all duration-200 bg-yellow-500 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 animate-in slide-in-from-bottom-8 duration-1000 delay-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]"
          >
            {CONTENT.hero.cta[language]}
            <Icons.ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>



            {/* Services Section */}
            <section id="services" className="py-24 bg-neutral-950 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      language={language}
                    />
                  ))}
                </div>
              </div>
            </section>
      
                        <StatsSection language={language} />
      
            
      
                        {/* Email Subscription Form */}
      
                        <section className="py-24 bg-neutral-950">
      
                          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
                            <EmailSubscriptionForm />
      
                          </div>
      
                        </section>
      
                </div>
      
              );
      
            };

const ServiceDetailPage: React.FC<{ language: Language }> = ({ language }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = SERVICES.find(s => s.id === id);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [contactPartner, setContactPartner] = useState<Partner | null>(null);
  const [serviceDetailsModalData, setServiceDetailsModalData] = useState<{service: ServiceData, partner: Partner} | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCar || contactPartner || serviceDetailsModalData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCar, contactPartner, serviceDetailsModalData]);

  if (!service) {
    return <Navigate to="/home" replace />;
  }

  const IconComponent = (Icons as any)[service.iconName] || Icons.HelpCircle;
  const isCarSales = service.id === 'car-sales';

  return (
    <>
      {selectedCar && (
        <CarDetailsModal 
          car={selectedCar} 
          language={language} 
          onClose={() => setSelectedCar(null)} 
        />
      )}

      {contactPartner && contactPartner.phone && (
        <ContactModal 
          phone={contactPartner.phone} 
          language={language} 
          onClose={() => setContactPartner(null)} 
        />
      )}


      
      {serviceDetailsModalData && (
        <ServiceDetailsModal
          service={serviceDetailsModalData.service}
          partner={serviceDetailsModalData.partner}
          language={language}
          onClose={() => setServiceDetailsModalData(null)}
        />
      )}

      <div className="min-h-screen pt-28 pb-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center text-neutral-400 hover:text-yellow-500 transition-colors mb-8 group"
          >
            <Icons.ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            {CONTENT.common.back[language]}
          </button>

          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
             {/* Decorative background glow */}
             <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none"></div>

             <div className="relative z-10">
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-yellow-600/20 rounded-2xl text-yellow-500">
                    <IconComponent size={40} />
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    {service.title[language]}
                  </h1>
               </div>
               
               <p className="text-lg text-neutral-300 leading-relaxed mb-12 border-l-4 border-yellow-600 pl-6 max-w-4xl">
                 {service.longDescription[language]}
               </p>

               {isCarSales ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {FEATURED_CARS.map(car => (
                     <CarCard 
                       key={car.id} 
                       car={car} 
                       language={language} 
                       onViewDetails={() => setSelectedCar(car)}
                     />
                   ))}
                 </div>
               ) : (
                 <>
                   <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                     <Icons.Users className="w-6 h-6 text-yellow-500" />
                     {CONTENT.common.selectPartner[language]}
                   </h2>

                   <div className="grid gap-6 md:grid-cols-2">
                     {service.partners.map(partner => (
                       <div key={partner.id} className="relative bg-black/40 border border-neutral-800 p-6 rounded-xl hover:border-yellow-600/50 transition-colors">
                          <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
                          <p className="text-sm text-neutral-400 mb-6">{partner.description[language]}</p>
                          
                          <div className="flex gap-3">
                            {partner.phone && (
                              <button
                                onClick={() => setContactPartner(partner)}
                                className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                              >
                                <Icons.Phone size={16} />
                                {CONTENT.common.contactPartner[language]}
                              </button>
                            )}
                            <button
                              onClick={() => setServiceDetailsModalData({service, partner})}
                              className="flex-1 border border-neutral-700 hover:border-neutral-500 text-neutral-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                            >
                              <Icons.Info size={16} />
                              {CONTENT.common.details[language]}
                            </button>
                          </div>
                       </div>
                     ))}
                   </div>
                 </>
               )}
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Layout & Main App ---

const Footer: React.FC<{ language: Language }> = ({ language }) => (
  <footer className="bg-black py-12 border-t border-neutral-900">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-neutral-500 text-sm">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <CBLogo className="w-8 h-8" />
        <span>© {new Date().getFullYear()} CB Automobile. {CONTENT.footer.rights[language]}</span>
      </div>
      <div className="flex gap-6">
        <span>{CONTENT.footer.contact[language]}: CristianBogdanAutomobile@gmail.com</span>
      </div>
    </div>
  </footer>
);

const AppLayout: React.FC<{ language: Language; setLanguage: (l: Language) => void }> = ({ language, setLanguage }) => {
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-yellow-500/30">
        <Navbar language={language} setLanguage={setLanguage} />
        <main>
          <Outlet />
        </main>
        <Footer language={language} />
      </div>
    </LanguageContext.Provider>
  );
};

export default function App() {
  const [language, setLanguage] = useState<Language | null>(() => {
    // Try to restore language from local storage
    const saved = localStorage.getItem('cb_language');
    if (saved && Object.values(Language).includes(saved as Language)) {
      return saved as Language;
    }
    return null;
  });

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Route for Language Selection */}
        <Route 
          path="/" 
          element={<LanguageSelectionPage setLanguage={setLanguage} />} 
        />
        
        {/* Protected Routes (require language) */}
        <Route element={language ? <AppLayout language={language} setLanguage={setLanguage} /> : <Navigate to="/" replace />}>
          <Route path="/home" element={<HomePage language={language!} />} />
          <Route path="/services/:id" element={<ServiceDetailPage language={language!} />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
