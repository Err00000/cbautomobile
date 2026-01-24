import React from 'react';
import { Language } from '../types';
import { CBLogo } from './CBLogo';

interface LanguageSelectorProps {
  onSelect: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-white p-4 animate-in fade-in duration-700">
      <div className="mb-12 animate-in zoom-in duration-700 delay-150">
        <CBLogo className="w-64 h-64 border-4" />
      </div>
      
      <h1 className="text-2xl md:text-3xl font-light mb-12 text-center text-yellow-500 tracking-wider">
        Select Language
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <button
          onClick={() => onSelect(Language.RO)}
          className="group relative overflow-hidden p-6 border border-neutral-800 rounded-xl hover:border-yellow-600 transition-all duration-300 bg-neutral-900/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-yellow-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="flex items-center justify-center gap-3">
             <span className="text-2xl">🇷🇴</span>
             <span className="font-medium text-lg tracking-wide group-hover:text-yellow-400">Română</span>
          </div>
        </button>

        <button
          onClick={() => onSelect(Language.DE)}
          className="group relative overflow-hidden p-6 border border-neutral-800 rounded-xl hover:border-yellow-600 transition-all duration-300 bg-neutral-900/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-yellow-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="flex items-center justify-center gap-3">
             <span className="text-2xl">🇩🇪</span>
             <span className="font-medium text-lg tracking-wide group-hover:text-yellow-400">Deutsch</span>
          </div>
        </button>

        <button
          onClick={() => onSelect(Language.EN)}
          className="group relative overflow-hidden p-6 border border-neutral-800 rounded-xl hover:border-yellow-600 transition-all duration-300 bg-neutral-900/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-yellow-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="flex items-center justify-center gap-3">
             <span className="text-2xl">🇬🇧</span>
             <span className="font-medium text-lg tracking-wide group-hover:text-yellow-400">English</span>
          </div>
        </button>

        <button
          onClick={() => onSelect(Language.IT)}
          className="group relative overflow-hidden p-6 border border-neutral-800 rounded-xl hover:border-yellow-600 transition-all duration-300 bg-neutral-900/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-yellow-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="flex items-center justify-center gap-3">
             <span className="text-2xl">🇮🇹</span>
             <span className="font-medium text-lg tracking-wide group-hover:text-yellow-400">Italiano</span>
          </div>
        </button>

        <button
          onClick={() => onSelect(Language.RU)}
          className="group relative overflow-hidden p-6 border border-neutral-800 rounded-xl hover:border-yellow-600 transition-all duration-300 bg-neutral-900/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-yellow-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="flex items-center justify-center gap-3">
             <span className="text-2xl">🇷🇺</span>
             <span className="font-medium text-lg tracking-wide group-hover:text-yellow-400">Русский</span>
          </div>
        </button>

        <button
          onClick={() => onSelect(Language.AR)}
          className="group relative overflow-hidden p-6 border border-neutral-800 rounded-xl hover:border-yellow-600 transition-all duration-300 bg-neutral-900/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-yellow-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="flex items-center justify-center gap-3">
             <span className="text-2xl">🇸🇦</span>
             <span className="font-medium text-lg tracking-wide group-hover:text-yellow-400">العربية</span>
          </div>
        </button>
      </div>
    </div>
  );
};