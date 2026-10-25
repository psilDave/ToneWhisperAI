import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const loadingMessages = [
    "Analisando frequências...",
    "Escolhendo os melhores pedais...",
    "Ajustando o ganho das válvulas...",
    "Finalizando sua cadeia de sinal..."
];

export const LoadingScreen = () => {

    const [loadingStep, setLoadingStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingStep((prev) => (prev + 1) % loadingMessages.length)
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <View>
            <ActivityIndicator size="large" color="#f59e0b" />
            <Text>Processando Áudio</Text>
            <Text>{loadingMessages[loadingStep]}</Text>
        </View>
    );
};