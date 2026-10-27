import { useTone } from '@/context/ToneContext';
import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type HeaderProps = {
    onReset: () => void
}

/**
 * Global Header Component:
 * Displays the ToneWhisper AI brand identity and a reset action button
 * to clear the current query and return to the home screen.
 */
export const Header = ({ onReset }: HeaderProps) => {
    const { setInput, strings } = useTone()

    return (
        <View style={styles.headerContainer}>
            {/* Logo and Brand Title */}
            <View style={styles.titleRow}>
                <View style={styles.iconBox}>
                    <Feather name="music" size={20} color="#000" />
                </View>
                <Text style={styles.title}>{strings.header.title}
                    <Text style={styles.titleHighlight}>{strings.header.aiBadge}</Text>
                </Text>
            </View>

            {/* Reset Button: Clears user input and dismisses navigation stack */}
            <Pressable 
                onPress={() => {
                    setInput('')
                    onReset()
                }}
                style={styles.resetButton}
                accessibilityLabel="Reset search"
            >
                <Feather name="rotate-ccw" size={20} color="#71717a" />
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#18181b',
        borderBottomWidth: 1,
        borderBottomColor: '#27272a',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconBox: {
        backgroundColor: '#f59e0b',
        padding: 8,
        borderRadius: 12,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        fontStyle: 'italic',
    },
    titleHighlight: {
        color: '#f59e0b'
    },
    resetButton: {
        padding: 4,
    }
});
