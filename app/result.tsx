import { useTone } from '@/context/ToneContext'
import { Feather, Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Fragment } from 'react'
import { DimensionValue, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

/**
 * Represents an individual gear component in the guitar signal chain (pedal or amplifier).
 */
type SignalItem = {
    type: 'pedal' | 'amp'
    name: string
    category?: string
    settings: Record<string, string>
}

/**
 * JSON schema structure returned by the Google Gemini model.
 */
type ToneData = {
    summary: string
    signalChain: SignalItem[]
    proTip?: string
}

/**
 * Result Screen:
 * Displays the complete AI-generated rig specification, including
 * tone analysis, horizontal signal flow, proportional knob settings, and pro tips.
 */
export default function ResultScreen() {
    const { setInput, strings } = useTone()
    const { toneJson } = useLocalSearchParams<{ toneJson: string }>()

    if (!toneJson) return null

    let toneData: ToneData
    try {
        // Sanitize AI response, removing Markdown code fences in case the model returns them
        const rawString = typeof toneJson === 'string' ? toneJson : String(toneJson)
        const cleanJson = rawString.replace(/```json/gi, '').replace(/```/g, '').trim()
        toneData = JSON.parse(cleanJson)
    } catch (error) {
        console.error('Failed to parse AI JSON response:', error)
        return null
    }

    return (
        <ScrollView contentContainerStyle={styles.screenContainer} showsVerticalScrollIndicator={false}>
            {/* AI Analysis Summary Card */}
            <View style={styles.summaryCard}>
                <View style={styles.sectionHeaderRow}>
                    <Ionicons name="sparkles" size={14} color="#f59e0b" />
                    <Text style={styles.summarySectionTitle}>{strings.result.aiAnalysis}</Text>
                </View>
                <Text style={styles.summaryText}>&quot;{toneData.summary}&quot;</Text>
            </View>

            {/* Horizontal Signal Flow: Interconnected Gear Chain */}
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeaderRow}>
                    <Feather name="layers" size={14} color="#52525b" />
                    <Text style={styles.sectionTitle}>{strings.result.signalFlow}</Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.signalFlowContainer}
                >
                    {toneData.signalChain.map((item, idx) => (
                        <Fragment key={idx}>
                            <View style={[
                                styles.pill,
                                item.type === 'amp' ? styles.pillAmp : styles.pillPedal
                            ]}>
                                {/* Semantic color-coded dot based on effect category */}
                                <View style={[
                                    styles.dotIndicator,
                                    item.type === 'amp' ? styles.dotAmp :
                                        item.category === 'drive' ? styles.dotDrive :
                                            item.category === 'delay' ? styles.dotDelay :
                                                item.category === 'mod' ? styles.dotMod : styles.dotReverb
                                ]} />
                                <Text style={[
                                    styles.pillText,
                                    item.type === 'amp' ? styles.pillTextAmp : styles.pillTextPedal
                                ]}>
                                    {item.name}
                                </Text>
                            </View>
                            {/* Connector arrow between sequential gear */}
                            {idx !== toneData.signalChain.length - 1 && (
                                <Feather name="chevron-right" size={14} color="#3f3f46" style={{ marginHorizontal: 4 }} />
                            )}
                        </Fragment>
                    ))}
                </ScrollView>
            </View>

            {/* Detailed Gear Configuration (Knobs with proportional bar tracks) */}
            <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>{strings.result.knobSettings}</Text>

            <View style={styles.gearListContainer}>
                {toneData.signalChain.map((item, idx) => (
                    <View key={idx} style={styles.gearCard}>
                        <View style={styles.gearHeader}>
                            <Text style={styles.gearName}>{item.name}</Text>
                            <View style={styles.gearTypeBadge}>
                                <Text style={styles.gearType}>{item.type.toUpperCase()}</Text>
                            </View>
                        </View>

                        {/* Knobs Grid */}
                        <View style={styles.knobsGrid}>
                            {Object.entries(item.settings).map(([effectLabel, value]) => {
                                const numericValue = parseFloat(value) || 0
                                const percentage = Math.min(Math.max((numericValue / 10) * 100, 0), 100)

                                return (
                                    <View key={effectLabel} style={styles.knobContainer}>
                                        <View style={styles.knobHeader}>
                                            <Text style={styles.knobLabel}>{effectLabel}</Text>
                                            <Text style={styles.knobValue}>{value}</Text>
                                        </View>
                                        {/* Visual progress bar representing the knob value (0-10 scale) */}
                                        <View style={styles.barTrack}>
                                            <View
                                                style={{
                                                    height: '100%',
                                                    width: `${percentage}%` as DimensionValue,
                                                    backgroundColor: item.type === 'amp' ? '#a1a1aa' : '#f59e0b',
                                                }}
                                            />
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                ))}
            </View>

            {/* Pro Tip Card */}
            {toneData.proTip && (
                <View style={styles.proTipCard}>
                    <View style={styles.sectionHeaderRow}>
                        <Feather name="zap" size={14} color="#f59e0b" />
                        <Text style={styles.summarySectionTitle}>{strings.result.proTip}</Text>
                    </View>
                    <Text style={styles.proTipText}>{toneData.proTip}</Text>
                </View>
            )}

            {/* Reset Button: Clears query and returns to Home */}
            <Pressable style={styles.resetButton} onPress={() => {
                setInput('')
                router.dismissAll()
            }}>
                <Text style={styles.resetButtonText}>{strings.result.resetButton}</Text>
            </Pressable>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        padding: 24,
        paddingBottom: 48,
        backgroundColor: '#0c0c0c',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },
    sectionTitle: {
        color: '#52525b',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2.5,
    },
    summarySectionTitle: {
        color: '#f59e0b',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2.5,
    },
    summaryCard: {
        backgroundColor: '#18181b',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#27272a',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    summaryText: {
        color: '#d4d4d8',
        fontSize: 16,
        lineHeight: 24,
        fontStyle: 'italic',
    },
    signalFlowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 16,
        borderWidth: 1,
    },
    pillPedal: {
        backgroundColor: '#18181b',
        borderColor: '#27272a',
    },
    pillAmp: {
        backgroundColor: '#f4f4f5',
        borderColor: '#d4d4d8',
    },
    dotIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    dotAmp: { backgroundColor: '#a1a1aa' },
    dotDrive: { backgroundColor: '#ef4444' },
    dotDelay: { backgroundColor: '#3b82f6' },
    dotMod: { backgroundColor: '#a855f7' },
    dotReverb: { backgroundColor: '#10b981' },
    pillText: {
        fontSize: 11,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    pillTextPedal: { color: '#d4d4d8' },
    pillTextAmp: { color: '#18181b' },
    gearListContainer: {
        gap: 16,
        marginBottom: 24,
    },
    gearCard: {
        backgroundColor: '#18181b',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#27272a',
        gap: 16,
    },
    gearHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gearName: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '900',
    },
    gearTypeBadge: {
        backgroundColor: '#27272a',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3f3f46',
    },
    gearType: {
        color: '#a1a1aa',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },
    knobsGrid: {
        gap: 16,
    },
    knobContainer: {
        gap: 6,
    },
    knobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    knobLabel: {
        color: '#71717a',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    knobValue: {
        color: '#f59e0b',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    barTrack: {
        height: 6,
        width: '100%',
        backgroundColor: '#27272a',
        borderRadius: 999,
        overflow: 'hidden',
    },
    proTipCard: {
        backgroundColor: 'rgba(39, 26, 12, 0.4)',
        padding: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#27272a',
        marginBottom: 24,
    },
    proTipText: {
        color: '#71717a',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },
    resetButton: {
        backgroundColor: '#ffffff',
        paddingVertical: 18,
        borderRadius: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    resetButtonText: {
        color: '#000000',
        fontWeight: '900',
        fontSize: 14,
        letterSpacing: 1,
    },
});
