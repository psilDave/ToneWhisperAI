import { useTone } from '@/context/ToneContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

/**
 * Entry point for the main index route ('/').
 * Renders the primary HomeScreen component.
 */
export default function Index() {
  return <HomeScreen />;
}

/**
 * Home Screen:
 * Captures the user's natural language tone description and initiates
 * the AI-powered signal chain design flow.
 */
const HomeScreen = () => {
  // Access global tone state and localized strings from context
  const { input, setInput, strings } = useTone()
  const router = useRouter()

  /**
   * Navigates to the loading route with the user's prompt as a query parameter.
   */
  const projectRig = () => {
    router.push({
      pathname: '/loading',
      params: { prompt: input }
    });
  }

  return (
    <View style={styles.homeContainer}>
      {/* Hero Header & Subtitle */}
      <View style={styles.headerTextContainer}>
        <Text style={styles.titleText}>{strings.home.title}</Text>
        <Text style={styles.descriptionText}>{strings.home.description}</Text>
      </View>

      {/* Multiline Prompt Input with Sparkle Indicator */}
      <View style={styles.inputWrapper}>
        <TextInput
          value={input}
          onChangeText={setInput}
          multiline={true}
          placeholder={strings.home.inputPlaceholder}
          placeholderTextColor="#52525b"
          style={styles.textInput}
        />
        <View style={styles.sparkleIcon}>
          <Ionicons name="sparkles" size={24} color="#3f3f46" />
        </View>
      </View>

      {/* Action Button: Enabled only when input text is present */}
      <Pressable
        disabled={!input.trim()}
        onPress={projectRig}
        style={input.trim() ? styles.buttonEnabled : styles.buttonDisabled}
      >
        <View style={styles.buttonContainer}>
          <Feather name="zap" size={22} color={input.trim() ? "#000" : "#52525b"} />
          <Text style={input.trim() ? styles.buttonTextEnabled : styles.buttonTextDisabled}>
            {strings.home.submitButton}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerTextContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#71717a',
    textAlign: 'center',
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 32,
  },
  textInput: {
    width: '100%',
    height: 160,
    backgroundColor: '#18181b',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 24,
    padding: 20,
    color: '#ffffff',
    fontSize: 16,
    textAlignVertical: 'top',
  },
  sparkleIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  buttonEnabled: {
    backgroundColor: '#f59e0b',
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#27272a',
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonTextEnabled: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  buttonTextDisabled: {
    color: '#52525b',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
