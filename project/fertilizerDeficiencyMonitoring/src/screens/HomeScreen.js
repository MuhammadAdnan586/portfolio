import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../utils/lang.js';

export default function HomeScreen({ navigation }) {
    // --- Context aur Language Setup ---
    const { settings } = useContext(SettingsContext);
    const language = settings.language;
    
    // --- RTL Check ---
    const isRTL = language === 'اردو' || language === 'پنجابی' || language === 'پشتو';
    const textAlignmentStyle = isRTL ? { textAlign: 'right', writingDirection: 'rtl' } : { textAlign: 'left', writingDirection: 'ltr' };
    
    // Grid item ko LTR/RTL mein center rakhne ke liye ek dynamic style
    const gridItemAlignment = isRTL ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' };


    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* TOP HERO SECTION */}
            <View style={styles.heroBox}>
                <Image 
                    source={require('../assets/dashboard.png')} 
                    style={styles.heroImage}
                />

                <Text style={styles.heroTitle}>{translate("FARMER'S ASSISTANT", language)}</Text>
                <Text style={styles.heroSubtitle}>{translate("AI-Based Fertilizer Deficiency Detection", language)}</Text>

                {/* MAIN ROUND BUTTONS */}
                <View style={styles.mainButtons}>
                    <TouchableOpacity 
                        style={styles.roundBtn}
                        onPress={() => navigation.navigate('LeafScan')}
                    >
                        <Text style={styles.roundIcon}>📷</Text>
                        <Text style={styles.roundText}>{translate("Leaf Scan", language)}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.roundBtn}
                        onPress={() => navigation.navigate('Chatbot')}
                    >
                        <Text style={styles.roundIcon}>🎤</Text>
                        <Text style={styles.roundText}>{translate("AI Chatbot", language)}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* FEATURE GRID */}
            <View style={styles.grid}>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('History')}>
                    <Text style={styles.icon}>🕑</Text>
                    <Text style={styles.cardText}>{translate("History", language)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Notifications')}>
                    <Text style={styles.icon}>🔔</Text>
                    <Text style={styles.cardText}>{translate("Notifications", language)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FertilizerCalculator')}>
                    <Text style={styles.icon}>🧮</Text>
                    <Text style={styles.cardText}>{translate("Calculator", language)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Community')}>
                    <Text style={styles.icon}>👥</Text>
                    <Text style={styles.cardText}>{translate("Community", language)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('About')}>
                    <Text style={styles.icon}>ℹ️</Text>
                    <Text style={styles.cardText}>{translate("About", language)}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Settings')}>
                    <Text style={styles.icon}>⚙️</Text>
                    <Text style={styles.cardText}>{translate("Settings", language)}</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: '#DFF3D8', 
        paddingBottom: 30,
    },

    heroBox: {
        width: '100%',
        backgroundColor: '#639250ff',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingBottom: 25,
        alignItems: 'center',
        elevation: 8,
    },

    heroImage: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },

    heroTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginTop: 10,
    },

    heroSubtitle: {
        color: '#E1FFE1',
        fontSize: 13,
        marginBottom: 18,
    },

    mainButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },

    roundBtn: {
        width: 130,
        height: 130,
        backgroundColor: '#5CC46A',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },

    roundIcon: { fontSize: 40, color: '#fff' },
    roundText: { fontSize: 14, color: '#fff', marginTop: 6, fontWeight: '600' },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },

    card: {
        width: '47%',
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        marginBottom: 20,
    },

    icon: { fontSize: 32, marginBottom: 8 },
    cardText: { fontSize: 15, fontWeight: '600', color: '#2E7D32' },

});