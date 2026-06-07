// src/screens/FertilizerRecommendationScreen.js
import React, { useContext, useEffect } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../utils/lang.js';
import {
    View, Text, StyleSheet, ScrollView, Dimensions, Alert
} from 'react-native';

const GREEN = '#2e7d32';
const { width } = Dimensions.get('window');

export default function FertilizerRecommendationScreen({ route, navigation }) {
    // Hooks
    const { settings } = useContext(SettingsContext);
    const language = settings.language;

    // Data Extraction
    const { analysisResult } = route.params || {};

    // Safety Check: Agar data missing ho (agar seedha navigate kiya jaye)
    useEffect(() => {
        if (!analysisResult) {
            Alert.alert(translate("Data Error", language), translate("Missing recommendation data. Returning to scan flow.", language));
            navigation.goBack();
        }
    }, [analysisResult, navigation, language]);

    // Render Guard
    if (!analysisResult) {
        return <View style={styles.loadingContainer}><Text>{translate("Loading...", language)}</Text></View>;
    }

    // --- RTL Check ---
    const isRTL = language === 'اردو' || language === 'پنجابی' || language === 'پشتو';
    const textAlignmentStyle = isRTL ? { textAlign: 'right', writingDirection: 'rtl' } : { textAlign: 'left', writingDirection: 'ltr' };


    return (
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 40}}>
            <View style={[styles.section, textAlignmentStyle]}>
                <Text style={styles.header}>{translate("Deficiency Details", language)}</Text>

                {/* Detected Deficiency and Symptoms */}
                <View style={styles.resultBox}>
                    <Text style={styles.resultLabel}>{translate("Detected Deficiency", language)}</Text>
                    <Text style={styles.resultValue}>{analysisResult.deficiency} - ({analysisResult.severity})</Text>
                    <Text style={styles.symptoms}>{translate("Symptoms", language)}: {analysisResult.symptoms}</Text>
                </View>

                {/* Recommended Fertilizers Section */}
                <Text style={styles.recommendationHeader}>{translate("Recommended Fertilizers", language)}</Text>

                {analysisResult.recommendations.map((rec, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.companyName}>{rec.company}</Text>
                        <Text style={styles.productName}>{rec.product}</Text>
                        <Text style={styles.details}>{translate("Dosage", language)}: {rec.dosage}</Text>
                        <Text style={styles.priceRange}>{translate("Price Range", language)}: {rec.priceRange}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    section: { padding: 18 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: GREEN, textAlign: 'center' },

    // Result State Styles
    resultBox: { padding: 15, backgroundColor: '#e8f5e9', borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: GREEN },
    resultLabel: { fontSize: 14, color: '#666', fontWeight: '500' },
    resultValue: { fontSize: 18, fontWeight: '900', color: GREEN, marginTop: 5, marginBottom: 8 },
    symptoms: { fontSize: 13, color: '#444', marginTop: 8 },

    recommendationHeader: { fontSize: 18, fontWeight: '700', marginTop: 10, marginBottom: 10, color: '#333' },
    card: { padding: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 },
    companyName: { fontSize: 14, fontWeight: 'bold', color: '#555' },
    productName: { fontSize: 16, fontWeight: '800', color: GREEN, marginTop: 4 },
    details: { fontSize: 13, marginTop: 4, color: '#444' },
    priceRange: { fontSize: 13, fontWeight: 'bold', color: '#e65100', marginTop: 4 }
});