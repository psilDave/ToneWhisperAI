import { useTone } from '@/context/ToneContext'
import { Strings } from '@/constants/strings'
import axios from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

/**
 * Loading & Processing Screen:
 * Displays dynamic animated progress steps simulating guitar rig design stages
 * (frequency analysis, pedal matching, valve gain biasing, etc.) while awaiting the AI response.
 */
export default function LoadingScreen() {
    // Retrieve the user prompt from route parameters
    const { prompt } = useLocalSearchParams<{ prompt: string }>()
    const [loadingStep, setLoadingStep] = useState(0)
    const router = useRouter()
    const { strings } = useTone()
    const loadingMessages = strings.loading.steps

    useEffect(() => {
        // Cycle through step messages every 1.5s to deliver engaging visual feedback
        const interval = setInterval(() => {
            setLoadingStep((prev) => (prev + 1) % loadingMessages.length)
        }, 1500)

        // Asynchronous function that calls Gemini API and redirects to the results screen
        const fetchTone = async () => {
            const result = await callGeminiAPI(prompt as string, strings)

            if (result) {
                // Navigate to result screen, replacing current entry in history stack
                router.replace({
                    pathname: '/result',
                    params: { toneJson: result }
                })
            } else {
                console.error('Failed to receive response from Gemini API.')
                router.back()
            }
        }

        if (prompt) {
            fetchTone()
        }

        // Clean up interval timer on unmount
        return () => clearInterval(interval)
    }, [prompt, router, loadingMessages.length, strings])

    return (
        <View style={styles.container}>
            {/* Circular glow indicator surrounding the spinner */}
            <View style={styles.loaderWrapper}>
                <ActivityIndicator size="large" color="#f59e0b" />
            </View>
            <Text style={styles.title}>{strings.loading.title}</Text>
            <Text style={styles.subtitle}>{loadingMessages[loadingStep]}</Text>
        </View>
    )
}

/**
 * Executes a POST request to Google Gemini's Interactions API endpoint.
 * Passes the user's prompt combined with the language-specific system prompt and strict JSON schema.
 *
 * @param prompt Natural language tone description provided by the user
 * @param strings Localized strings and system prompt definition
 * @returns JSON string returned by the model or empty string on failure
 */
async function callGeminiAPI(prompt: string, strings: Strings): Promise<string> {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY
    const url = 'https://generativelanguage.googleapis.com/v1beta/interactions'

    // Formulate payload specifying the Gemini model and language requirements
    const payload = {
        model: 'gemini-3.6-flash',
        input: `${strings.ai.systemPrompt}\n\n${strings.ai.responseLanguageInstruction}\n\n${strings.ai.userPromptLabel}: ${prompt}`
    }

    try {
        const response = await axios.post(url, payload, {
            headers: {
                'x-goog-api-key': apiKey,
                'Content-Type': 'application/json',
            },
        })

        // Extract the generated text content from the response steps
        const outputStep = response.data.steps?.find((step: any) => step.type === 'model_output')
        return outputStep?.content?.[0]?.text || ''
    } catch (error) {
        console.error('Gemini API request error:', error)
        return ''
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0c0c0c',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    loaderWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'rgba(245, 158, 11, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#71717a',
        fontStyle: 'italic',
    },
})
