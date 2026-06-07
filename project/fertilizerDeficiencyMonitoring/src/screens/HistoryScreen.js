import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../utils/lang.js';

const GREEN = '#2e7d32';
const GRAY_LIGHT = '#e0e0e0';

/* -------------------- Dummy History Data -------------------- */
const getTranslatedHistory = (language) => ([
    {
        id: '1',
        date: '2025-11-28',
        deficiency: translate('Nitrogen Deficiency', language),
        recommendation: translate('Urea Fertilizer (200kg/acre)', language),
        company: 'Fauji Fertilizer Company (FFC)',
    },
    {
        id: '2',
        date: '2025-11-27',
        deficiency: translate('Healthy', language),
        recommendation: translate('General crop monitoring recommended.', language),
        company: 'N/A',
    },
    {
        id: '3',
        date: '2025-11-26',
        deficiency: translate('Potassium Deficiency', language),
        recommendation: translate('Sulfate of Potash (SOP) (50kg/acre)', language),
        company: 'Engro Fertilizers',
    },
    {
        id: '4',
        date: '2025-11-25',
        deficiency: translate('Phosphorus Deficiency', language),
        recommendation: translate('DAP Fertilizer (150kg/acre)', language),
        company: 'Fatima Group',
    },
]);

/* -------------------- Detail Row Component -------------------- */
const ItemDetail = ({ label, value, isRTL, isDeficiency }) => (
    <View style={styles.detailRow}>
        <Text style={[styles.detailLabel, isRTL && { textAlign: 'right' }]}>
            {label}:
        </Text>
        <Text
            style={[
                styles.detailValue,
                isRTL && { textAlign: 'right' },
                isDeficiency && value === translate('Healthy', 'English') && styles.healthyText,
            ]}
        >
            {value}
        </Text>
    </View>
);

/* -------------------- Main Screen -------------------- */
export default function HistoryScreen() {
    const { settings } = useContext(SettingsContext);
    const language = settings.language;

    const isRTL =
        language === 'اردو' ||
        language === 'پنجابی' ||
        language === 'پشتو';

    const dummyHistory = getTranslatedHistory(language);

    return (
        <View style={styles.container}>
            <Text style={[styles.header, isRTL && { textAlign: 'right' }]}>
                {translate('Scan History', language)}
            </Text>

            <FlatList
                data={dummyHistory}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>

                        {/* Date Only (View Button Removed) */}
                        <Text style={styles.dateText}>
                            {translate('Date', language)}: {item.date}
                        </Text>

                        <View style={styles.separator} />

                        <ItemDetail
                            label={translate('Deficiency Detected', language)}
                            value={item.deficiency}
                            isRTL={isRTL}
                            isDeficiency
                        />

                        <ItemDetail
                            label={translate('Recommended Solution', language)}
                            value={item.recommendation}
                            isRTL={isRTL}
                        />

                        <ItemDetail
                            label={translate('Company/Product', language)}
                            value={item.company}
                            isRTL={isRTL}
                        />
                    </View>
                )}
            />
        </View>
    );
}

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f0f4f7',
    },
    header: {
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 20,
        color: '#333',
    },
    itemCard: {
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 12,
        elevation: 4,
        borderLeftWidth: 5,
        borderLeftColor: GREEN,
    },
    dateText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        marginBottom: 10,
    },
    separator: {
        height: 1,
        backgroundColor: GRAY_LIGHT,
        marginVertical: 10,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        width: 130,
        marginRight: 10,
    },
    detailValue: {
        flex: 1,
        fontSize: 14,
        color: '#555',
    },
    healthyText: {
        color: GREEN,
        fontWeight: 'bold',
    },
});
