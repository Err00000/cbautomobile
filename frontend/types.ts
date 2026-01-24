

export enum Language {
  RO = 'RO',
  DE = 'DE',
  EN = 'EN',
  IT = 'IT',
  RU = 'RU',
  AR = 'AR'
}

export interface Partner {
  id: string;
  name: string;
  description: Record<Language, string>;
  phone?: string;
  website?: string;
  registrationDetails?: RegistrationDetails;
  carCheckDetails?: CarCheckDetails;
}

export interface CarCheckDetails {
  items: Array<{
    icon: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
  }>;
}

export interface RegistrationDetails {
  header: Record<Language, string>;
  subtitle: Record<Language, string>;
  plates: Array<{
    title: Record<Language, string>;
    description: Record<Language, string>;
  }>;
}

export interface ServiceData {
  id: string;
  iconName: string; // Key to map to Lucide icon
  title: Record<Language, string>;
  description: Record<Language, string>;
  longDescription: Record<Language, string>;
  partners: Partner[];
}

export interface CarSpecs {
  series: string;           // Baureihe (Model codes usually don't change)
  trim: string;             // Ausstattungslinie (Names usually don't change)
  engineVolume: string;     // Hubraum
  seats: number;            // Anzahl Sitzplätze
  doors: string;            // Anzahl der Türen
  emissionClass: string;    // Schadstoffklasse
  inspection: Record<Language, string>;       // HU (Translatable)
  climate: Record<Language, string>;          // Klimatisierung (Translatable)
  airbags: Record<Language, string>;          // Airbags (Translatable)
  colorManuf: string;       // Farbe (Hersteller)
  color: Record<Language, string>;            // Farbe (Translatable)
  interior: Record<Language, string>;         // Innenausstattung (Translatable)
  towBraked: string;        // Anhängelast gebremst
  towUnbraked: string;      // Anhängelast ungebremst
  weight: string;           // Gewicht
  cylinders: number;        // Zylinder
  tank: string;             // Tankgröße
  driveType: Record<Language, string>;        // Antriebsart (Translatable)
  consumption: string;      // Energieverbrauch (komb.)
  co2: string;              // CO₂-Emissionen (komb.)
  fuelConsCombined: Record<Language, string>; // Kraftstoffverbrauch (Translatable text)
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  power: number;
  fuel: string;
  image: string;
  images: string[];
  details: CarSpecs;
}

export interface GlobalContent {
  hero: {
    title: Record<Language, string>;
    subtitle: Record<Language, string>;
    cta: Record<Language, string>;
  };
  stats: Array<{
    value: string;
    icon: string;
    title: Record<Language, string>;
  }>;
  carSales: {
    priceCurrency: string;
    viewDetails: Record<Language, string>;
    closeDetails: Record<Language, string>;
    specs: {
      year: Record<Language, string>;
      mileage: Record<Language, string>;
      power: Record<Language, string>;
      fuel: Record<Language, string>;
      // Detailed specs
      series: Record<Language, string>;
      trim: Record<Language, string>;
      engineVolume: Record<Language, string>;
      seats: Record<Language, string>;
      doors: Record<Language, string>;
      emissionClass: Record<Language, string>;
      inspection: Record<Language, string>;
      climate: Record<Language, string>;
      airbags: Record<Language, string>;
      colorManuf: Record<Language, string>;
      color: Record<Language, string>;
      interior: Record<Language, string>;
      towBraked: Record<Language, string>;
      towUnbraked: Record<Language, string>;
      weight: Record<Language, string>;
      cylinders: Record<Language, string>;
      tank: Record<Language, string>;
      driveType: Record<Language, string>;
      consumption: Record<Language, string>;
      co2: Record<Language, string>;
      fuelConsCombined: Record<Language, string>;
    }
  };
  footer: {
    rights: Record<Language, string>;
    contact: Record<Language, string>;
  };
  common: {
    back: Record<Language, string>;
    selectPartner: Record<Language, string>;
    contactPartner: Record<Language, string>;
    visitWebsite: Record<Language, string>;
  };
}