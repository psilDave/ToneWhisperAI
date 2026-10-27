# 🎸 ToneWhisper AI

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81.5-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-SDK_54-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Google_Gemini_API-Flash_3.6-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini API" />
</p>

> **An intelligent, AI-powered virtual guitar tone designer that transforms natural language descriptions into complete, professional guitar rig configurations.**

---

## 📖 Overview

Guitarists often struggle to translate subjective sound concepts (e.g., *"David Gilmour's soaring solo in Comfortably Numb"*, *"Creamy 60s vintage blues"*, or *"Aggressive 90s Gothenburg melodic death metal"*) into physical pedalboard settings and amplifier parameters.

**ToneWhisper AI** solves this by serving as an interactive Tone Architect:
1. **Understands Natural Language**: Accepts open-ended artist references, song descriptions, and sonic textures.
2. **Recommends Signal Chains**: Suggests an ordered pedal chain (Overdrive, Modulation, Delay, Reverb) paired with the ideal tube amplifier.
3. **Calibrates Physical Knobs**: Generates numerical (0–10) potentiometer settings with proportional visual bar tracks.
4. **Delivers Pro Tips**: Provides nuanced advice on picking dynamics, guitar volume knob interaction, and pickup selection.

---

## ✨ Features

- 🧠 **Generative AI Core**: Integrates with Google Gemini (`gemini-3.6-flash`) via structured JSON schema generation.
- 🎛️ **Proportional Knob Visualization**: Renders custom visual gauge bars representing analog potentiometers.
- 🔗 **Interconnected Signal Flow**: Horizontal scrolling chain with semantic color-coded categories (Drive, Mod, Delay, Reverb, Amp).
- 🌍 **Transparent Internationalization (i18n)**: Automatically detects system/browser locale and switches seamlessly between **English (`en-US`)** and **Portuguese (`pt-BR`)**.
- 🎨 **Boutique Dark Theme**: Tailored aesthetic inspired by high-end boutique tube amplifiers and modern pedalboards.
- ⚡ **Cross-Platform**: Runs natively on **Android**, **iOS**, and **Web** with Server-Side Rendering (SSR) safety.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [React Native](https://reactnative.dev/) (v0.81.5) | Cross-platform native mobile application |
| **Platform** | [Expo](https://expo.dev/) (SDK 54) | Universal toolchain and runtime |
| **Routing** | [Expo Router](https://docs.expo.dev/router/introduction/) (v6) | File-based, type-safe navigation system |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict) | Compile-time type safety across data contracts |
| **AI Model** | [Google Gemini API](https://ai.google.dev/) (`gemini-3.6-flash`) | Deep reasoning and equipment configuration |
| **Networking** | [Axios](https://axios-http.com/) | Robust HTTP client for AI interactions |
| **Icons** | [@expo/vector-icons](https://icons.expo.fyi/) | Feather & Ionicons iconography |
| **Localization** | [expo-localization](https://docs.expo.dev/versions/latest/sdk/localization/) | Device locale detection and fallback management |

---

## 📂 Project Structure

```text
ToneWhisperAI/
├── app/                  # File-based routes (Expo Router)
│   ├── _layout.tsx       # Root layout with SafeAreaView and persistent Header
│   ├── index.tsx         # Home screen (prompt input & validation)
│   ├── loading.tsx       # Animated progress states & Gemini API integration
│   └── result.tsx        # Rig visualization (signal chain, knobs & pro tips)
├── components/           # Reusable UI components
│   └── Header.tsx        # Global branded header with state reset
├── constants/            # Centralized localization catalog (Android strings.xml pattern)
│   └── strings.ts        # Typed translation dictionaries (pt / en) & locale detection
├── context/              # React Context API
│   └── ToneContext.tsx   # Global state provider for prompt and locale sync
├── assets/               # Branding assets, icons, and splash screens
├── .env.example          # Environment variable template
├── .gitignore            # Git exclusion rules (protects API keys)
└── package.json          # Project manifest and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- `npm` or `yarn` package manager
- A free Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ToneWhisperAI.git
   cd ToneWhisperAI
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and add your Gemini API key:
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npx expo start
   ```

5. **Run the application:**
   - **Mobile (Physical Device)**: Download **Expo Go** on Android or iOS and scan the QR code.
   - **Web Browser**: Press <kbd>w</kbd> in the terminal.
   - **Android Emulator**: Press <kbd>a</kbd> in the terminal.
   - **iOS Simulator**: Press <kbd>i</kbd> in the terminal.

---

## 🔌 AI Integration Details

The application prompts Google Gemini using a strict JSON schema contract. The prompt instructs the model to act as a seasoned guitar technician and return:

```json
{
  "summary": "Brief explanation of the sonic characteristics and pickup choice",
  "signalChain": [
    {
      "type": "pedal",
      "name": "Overdrive (e.g., Tube Screamer TS808)",
      "category": "drive",
      "settings": {
        "Overdrive": "6.5",
        "Tone": "5.0",
        "Level": "7.0"
      }
    },
    {
      "type": "amp",
      "name": "Hiwatt Custom 100",
      "settings": {
        "Gain": "5.5",
        "Bass": "6.0",
        "Middle": "7.0",
        "Treble": "5.5",
        "Presence": "4.0"
      }
    }
  ],
  "proTip": "Roll off guitar tone control to 7 for smoother highs during lead passages."
}
```

The client validates and sanitizes the output string against Markdown code fences before parsing, ensuring seamless rendering without UI breaks.

---

## 📄 License

This project was developed for academic and portfolio purposes. Feel free to use and modify it under the [MIT License](LICENSE).
