import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header } from './header';

const projectRig = () => { }

export const HomeScreen = () => {
    const [input, setInput] = useState('')

    return (
        <View style={styles.homeContainer}>
            <Header onReset={() => setInput('')} />
            <Text style={styles.titleText}>Tone Quest</Text>
            <Text style={styles.descriptionText}>A sua busca pelo timbre perfeito termina aqui.</Text>
            <TextInput
                value={input}
                onChangeText={setInput}
                multiline={true}
                placeholder='Descreva o som (ex: Solo do Gilmour em Comfortably Numb, Metal anos 90, Blues cremoso...)' />
            <Pressable
                disabled={!input.trim()}
                onPress={()=> {}}
                style={input.trim() ? styles.buttonEnabled : styles.buttonDisabled}>
                <View style={styles.buttonContainer}>
                    <Feather name="zap" size={22} color="#000" />
                    <Text style={styles.buttonText}>PROJETAR RIG</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {},
    titleText: {},
    descriptionText: {},
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12
    },
    buttonText: {},
    buttonEnabled: {},
    buttonDisabled: {}
})
