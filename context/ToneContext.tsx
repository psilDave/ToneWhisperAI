import { detectLanguage, Strings, SupportedLocale, translations } from '@/constants/strings';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

/**
 * Global application context interface.
 */
type ToneContextData = {
    input: string;
    setInput: (value: string) => void;
    language: SupportedLocale;
    strings: Strings;
};

// Create the context with an initial empty structure
const ToneContext = createContext<ToneContextData>({} as ToneContextData);

/**
 * ToneProvider: Global state provider component.
 * Manages user tone input and keeps localized strings synchronized across all screens.
 */
export function ToneProvider({ children }: { children: ReactNode }) {
    const [input, setInput] = useState('');
    const [language, setLanguage] = useState<SupportedLocale>(detectLanguage());

    useEffect(() => {
        // Automatically sync language with client device/browser configuration after mount
        setLanguage(detectLanguage());
    }, []);

    // Resolve the string dictionary for the active language (with Portuguese as default fallback)
    const currentStrings = translations[language] || translations.pt;

    return (
        <ToneContext.Provider value={{ input, setInput, language, strings: currentStrings }}>
            {children}
        </ToneContext.Provider>
    );
}

/**
 * Custom hook for consuming ToneContext in any child component.
 */
export function useTone() {
    return useContext(ToneContext);
}
