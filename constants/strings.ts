import { getLocales } from 'expo-localization';
import { Platform } from 'react-native';

export const translations = {
  pt: {
    header: {
      title: 'ToneWhisper',
      aiBadge: 'AI',
    },
    home: {
      title: 'Tone Quest',
      description: 'A sua busca pelo timbre perfeito termina aqui.',
      inputPlaceholder: 'Descreva o som (ex: Solo do Gilmour em Comfortably Numb, Metal anos 90, Blues cremoso...)',
      submitButton: 'PROJETAR RIG',
    },
    loading: {
      title: 'Processando Áudio',
      steps: [
        'Analisando frequências...',
        'Escolhendo os melhores pedais...',
        'Ajustando o ganho das válvulas...',
        'Finalizando sua cadeia de sinal...',
      ],
    },
    result: {
      aiAnalysis: 'ANÁLISE DA IA',
      signalFlow: 'FLUXO DE SINAL',
      knobSettings: 'CONFIGURAÇÃO DOS KNOBS',
      proTip: 'DICA DE ESPECIALISTA',
      resetButton: 'NOVA CONSULTA',
    },
    ai: {
      userPromptLabel: 'Pedido do usuário',
      responseLanguageInstruction: 'Idioma obrigatório da resposta: Português do Brasil',
      systemPrompt: `
Você é um especialista em timbres de guitarra (Tone Designer). 
O usuário descreverá um som ou música e você deve retornar um JSON com a configuração de equipamento sugerida.
IMPORTANTE: Todos os campos descritivos ("summary" e "proTip") DEVEM ser obrigatoriamente redigidos em Português do Brasil.
O JSON deve seguir este formato estrito:
{
  "summary": "Breve explicação do timbre em português",
  "signalChain": [
    {"type": "pedal", "name": "Nome do Pedal", "category": "drive|mod|delay|reverb", "settings": {"Gain": "7", "Tone": "5"}},
    {"type": "amp", "name": "Nome do Amp", "settings": {"Gain": "6", "Bass": "5", "Mid": "7", "Treble": "6"}}
  ],
  "proTip": "Uma dica avançada em português"
}
Retorne APENAS o JSON sem tags markdown extras.`.trim(),
    },
  },
  en: {
    header: {
      title: 'ToneWhisper',
      aiBadge: 'AI',
    },
    home: {
      title: 'Tone Quest',
      description: 'Your quest for the perfect tone ends here.',
      inputPlaceholder: 'Describe the tone (e.g., Gilmour solo in Comfortably Numb, 90s metal, creamy blues...)',
      submitButton: 'DESIGN RIG',
    },
    loading: {
      title: 'Processing Audio',
      steps: [
        'Analyzing frequencies...',
        'Selecting the best pedals...',
        'Dialing in tube gain...',
        'Finalizing your signal chain...',
      ],
    },
    result: {
      aiAnalysis: 'AI ANALYSIS',
      signalFlow: 'SIGNAL FLOW',
      knobSettings: 'KNOB SETTINGS',
      proTip: 'PRO TIP',
      resetButton: 'NEW SEARCH',
    },
    ai: {
      userPromptLabel: 'User request',
      responseLanguageInstruction: 'Mandatory response language: English',
      systemPrompt: `
You are a guitar tone specialist (Tone Designer). 
The user will describe a sound or song and you must return a JSON with the suggested equipment configuration.
IMPORTANT: All descriptive text fields ("summary" and "proTip") MUST strictly be in English.
The JSON must follow this strict format:
{
  "summary": "Brief explanation of the tone in English",
  "signalChain": [
    {"type": "pedal", "name": "Pedal Name", "category": "drive|mod|delay|reverb", "settings": {"Gain": "7", "Tone": "5"}},
    {"type": "amp", "name": "Amp Name", "settings": {"Gain": "6", "Bass": "5", "Mid": "7", "Treble": "6"}}
  ],
  "proTip": "An advanced tip in English"
}
Return ONLY the JSON without extra markdown tags.`.trim(),
    },
  },
} as const;

export type SupportedLocale = keyof typeof translations;
export type Strings = (typeof translations)[SupportedLocale];

export const DEFAULT_LOCALE: SupportedLocale = 'pt';

/**
 * Transparently detects the preferred language based on web browser or native device settings.
 *
 * @returns The supported locale code ('pt' | 'en')
 */
export function detectLanguage(): SupportedLocale {
  try {
    // 1. Web environment language detection
    if (Platform.OS === 'web' && typeof navigator !== 'undefined') {
      const allLangs = (navigator.languages && navigator.languages.length > 0)
        ? navigator.languages
        : [navigator.language];

      const cleanLangs = allLangs.filter(Boolean).map(l => l.toLowerCase());

      const hasPortuguese = cleanLangs.some(l => l.startsWith('pt'));
      const hasEnglish = cleanLangs.some(l => l.startsWith('en'));

      if (hasPortuguese && !hasEnglish) {
        return 'pt';
      }
      if (hasEnglish && !hasPortuguese) {
        return 'en';
      }
      if (hasPortuguese && hasEnglish) {
        const firstPtIndex = cleanLangs.findIndex(l => l.startsWith('pt'));
        const firstEnIndex = cleanLangs.findIndex(l => l.startsWith('en'));
        return firstPtIndex <= firstEnIndex ? 'pt' : 'en';
      }
    }

    // 2. Native mobile environment (iOS / Android)
    const locales = getLocales();
    if (locales && locales.length > 0) {
      const code = locales[0]?.languageCode?.toLowerCase() as SupportedLocale;
      if (translations[code]) {
        return code;
      }
    }
  } catch {
    // Silent fallback if platform APIs fail
  }

  // 3. Generic Intl API fallback
  try {
    const intlLocale = Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.locale?.toLowerCase();
    if (intlLocale?.startsWith('en')) return 'en';
    if (intlLocale?.startsWith('pt')) return 'pt';
  } catch {
    // Fallback
  }

  return DEFAULT_LOCALE;
}

/**
 * Retrieves the currently active language code.
 */
export function getCurrentLanguage(): SupportedLocale {
  return detectLanguage();
}

/**
 * Retrieves the localized strings dictionary for the active language.
 */
export function getStrings(): Strings {
  return translations[getCurrentLanguage()];
}

/**
 * Dynamic Proxy providing transparent property access to the current localized strings.
 */
export const strings: Strings = new Proxy({} as Strings, {
  get(_target, prop: keyof Strings) {
    return getStrings()[prop];
  },
});

export default strings;
