import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';


type HeaderProps = {
    onReset: () => void
}

export const Header = ({ onReset }: HeaderProps) => (

    <View
        style={styles.headerContainer}
    >
        <Text style={styles.title}>ToneWhisper
            <Text style={styles.titleHighlight}>AI</Text>
        </Text>
        <Pressable onPress={onReset}>
            <Feather name="rotate-ccw" size={20} style={styles.resetIcon} />
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#18181b'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    titleHighlight: {
        color: '#f59e0b'
    },
    resetIcon: {
        color: '#71717a'
    }
});
