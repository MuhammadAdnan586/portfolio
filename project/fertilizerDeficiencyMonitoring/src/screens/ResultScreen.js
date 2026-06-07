// src/screens/ResultScreen.js

import React, { useContext, useEffect } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../utils/lang.js';
import {
    View, Text, StyleSheet, Image, ScrollView, Dimensions,
    ActivityIndicator, Alert
} from 'react-native';

const GREEN = '#2e7d32';
const { width } = Dimensions.get('window');

export default function ResultScreen({ route, navigation }) {

    const { settings } = useContext(SettingsContext);
    const language = settings.language;

    // safely extract data
    const { photoUri, analysisResult } = route.params || {};

    // ================= AUTO NAVIGATION EFFECT =================
    useEffect(() => {
        if (!photoUri || !analysisResult) {
            Alert.alert(
                translate("Data Error", language),
                translate("Analysis data missing. Please scan again.", language)
            );
            navigation.replace('LeafScan');
            return;
        }

        // ⏳ Fake loading for UX (2.5 seconds)
        const timer = setTimeout(() => {
            navigation.replace('FertilizerRecommendation', {
                analysisResult,
                photoUri
            });
        }, 2500);

        return () => clearTimeout(timer);

    }, [photoUri, analysisResult, navigation, language]);

    // ================= LOADING UI =================
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: photoUri }}
                    style={styles.resultImage}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.header}>
                    {translate("Analyzing Leaf Image", language)}
                </Text>

                <ActivityIndicator
                    size="large"
                    color={GREEN}
                    style={{ marginTop: 25 }}
                />

                <Text style={styles.loadingText}>
                    {translate("Please wait while we analyze your crop image...", language)}
                </Text>
            </View>
        </ScrollView>
    );
}

// ================= STYLES =================
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },

    imageContainer: {
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },

    resultImage: {
        width: width * 0.95,
        height: width * 0.6,
        borderRadius: 10,
        resizeMode: 'cover'
    },

    section: {
        padding: 18,
        alignItems: 'center'
    },

    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: GREEN,
        textAlign: 'center'
    },

    loadingText: {
        marginTop: 15,
        color: '#666',
        textAlign: 'center',
        fontSize: 14
    },
});