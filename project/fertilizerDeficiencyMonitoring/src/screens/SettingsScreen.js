// SettingsScreen.js
import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { SettingsContext } from '../context/SettingsContext'; 
import { translate } from '../utils/lang';

const LANGS = ['English', 'اردو', 'پنجابی', 'پشتو'];
const UNITS = ['Hectare', 'Acre'];

export default function SettingsScreen({ navigation }) {
    // --- Global settings context ---
    const { settings, saveSettings: saveSettingsContext } = useContext(SettingsContext);

    // --- Local state only for non-global UI controls ---
    const [unit, setUnit] = useState(settings.unit || 'Hectare');
    const [notifications, setNotifications] = useState(settings.notifications ?? true);
    const [offlineMode, setOfflineMode] = useState(settings.offlineMode ?? true);

    // --- Extract global settings for use in this component (Theme & Language) ---
    const themeDark = settings.themeDark;
    const language = settings.language; 
    
    // --- Save any setting (global or local) ---
    const saveSetting = async (key, value, isGlobal = false) => {
        if (!isGlobal) {
            // Local-only updates
            if (key === 'unit') setUnit(value);
            if (key === 'notifications') setNotifications(value);
            if (key === 'offlineMode') setOfflineMode(value);
        }

        const updatedSettings = {
            ...settings,
            [key]: value,
        };

        try {
            await AsyncStorage.setItem('@app_settings', JSON.stringify(updatedSettings));
            // Global changes (language, themeDark) update the Context, triggering a global re-render
            if (isGlobal) saveSettingsContext(updatedSettings); 
        } catch (e) {
            console.warn('Failed to save settings', e);
        }
    };

    // --- Load persisted local settings on mount ---
    useEffect(() => {
        (async () => {
            try {
                const s = await AsyncStorage.getItem('@app_settings');
                if (s) {
                    const obj = JSON.parse(s);
                    // Update local states from persisted storage
                    setUnit(obj.unit || 'Hectare');
                    setNotifications(obj.notifications ?? true);
                    setOfflineMode(obj.offlineMode ?? true);
                }
            } catch (e) {
                console.warn('Failed to load settings', e);
            }
        })();
    }, []);

    // --- Utility functions ---
    const confirmClearHistory = () => {
        Alert.alert(
            translate('Clear history', language), 
            translate('Are you sure you want to delete all saved scans and history? This cannot be undone.', language), 
            [
                { text: translate('Cancel', language), style: 'cancel' }, 
                { 
                    text: translate('Delete', language), 
                    style: 'destructive', 
                    onPress: async () => {
                        await AsyncStorage.removeItem('@scan_history');
                        Alert.alert(translate('Done', language), translate('Scan history cleared.', language)); 
                    }
                },
            ]
        );
    };

    const exportData = async () => {
        Alert.alert(translate('Export Data', language), translate('Data export started (implement backend / file creation).', language));
    };

    const navigateToProfile = () => {
        navigation.navigate('SignUp');
    };

    // --- Dynamic theme styles ---
    const currentStyles = themeDark ? darkStyles : lightStyles;
    const currentContainerStyle = [styles.container, currentStyles.container];
    const currentLabelStyle = [styles.label, currentStyles.label];
    const currentSectionTitleStyle = [styles.sectionTitle, currentStyles.sectionTitle];
    
    // Check for RTL language (Urdu, Punjabi, Pashto)
    const isRTL = language === 'اردو' || language === 'پنجابی' || language === 'پشتو';
    
    // Apply RTL alignment if needed
    const textAlignmentStyle = isRTL ? { textAlign: 'right', writingDirection: 'rtl' } : { textAlign: 'left', writingDirection: 'ltr' };
    
    // Adjust row direction for RTL
    const rowDirectionStyle = isRTL ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' };
    
    const labelStyleWithRTL = [currentLabelStyle, textAlignmentStyle];
    const sectionTitleStyleWithRTL = [currentSectionTitleStyle, textAlignmentStyle];

    // --- UI (All text translated) ---
    return (
        <ScrollView style={currentContainerStyle} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={sectionTitleStyleWithRTL}>{translate('Account', language)}</Text>
            <TouchableOpacity style={styles.buttonLink} onPress={navigateToProfile}>
                <Text style={[styles.buttonLinkText, textAlignmentStyle]}>{translate('Edit Profile (Change Signup Info)', language)}</Text>
            </TouchableOpacity>

            <Text style={sectionTitleStyleWithRTL}>{translate('General', language)}</Text>

            {/* Language Picker - Global */}
            <Text style={labelStyleWithRTL}>{translate('Language', language)}</Text>
            <View style={[styles.pickerWrap, currentStyles.pickerWrap]}>
                <Picker 
                    selectedValue={language} 
                    onValueChange={(v) => saveSetting('language', v, true)} 
                    style={[currentStyles.picker, isRTL ? { paddingRight: 30 } : { paddingLeft: 30 }]} 
                    itemStyle={currentStyles.pickerItem}
                >
                    {LANGS.map(l => <Picker.Item key={l} label={l} value={l} />)}
                </Picker>
            </View>

            {/* Dark Theme Switch - Global */}
            <View style={[styles.row, rowDirectionStyle]}>
                <Text style={labelStyleWithRTL}>{translate('Dark Theme', language)}</Text>
                <Switch 
                    value={themeDark} 
                    onValueChange={(v) => saveSetting('themeDark', v, true)} 
                    trackColor={{ false: "#767577", true: "#81b0ff" }} 
                    thumbColor={themeDark ? "#0a7f2e" : "#f4f3f4"}
                />
            </View>

            {/* Area Unit - Local state */}
            <Text style={labelStyleWithRTL}>{translate('Area Unit', language)}</Text>
            <View style={[styles.pickerWrap, currentStyles.pickerWrap]}>
                <Picker 
                    selectedValue={unit} 
                    onValueChange={(v) => saveSetting('unit', v)} 
                    style={[currentStyles.picker, isRTL ? { paddingRight: 30 } : { paddingLeft: 30 }]}
                    itemStyle={currentStyles.pickerItem}
                >
                    {UNITS.map(u => <Picker.Item key={u} label={u} value={u} />)}
                </Picker>
            </View>

            {/* Notifications */}
            <Text style={sectionTitleStyleWithRTL}>{translate('Notifications', language)}</Text>
            <View style={[styles.row, rowDirectionStyle]}>
                <Text style={labelStyleWithRTL}>{translate('Reminders & Alerts', language)}</Text>
                <Switch 
                    value={notifications} 
                    onValueChange={(v) => saveSetting('notifications', v)} 
                    trackColor={{ false: "#767577", true: "#81b0ff" }} 
                    thumbColor={notifications ? "#0a7f2e" : "#f4f3f4"}
                />
            </View>

            {/* Offline Mode */}
            <Text style={sectionTitleStyleWithRTL}>{translate('Data & Privacy', language)}</Text>
            <View style={[styles.row, rowDirectionStyle]}>
                <Text style={labelStyleWithRTL}>{translate('Offline Mode (save local)', language)}</Text>
                <Switch 
                    value={offlineMode} 
                    onValueChange={(v) => saveSetting('offlineMode', v)} 
                    trackColor={{ false: "#767577", true: "#81b0ff" }} 
                    thumbColor={offlineMode ? "#0a7f2e" : "#f4f3f4"}
                />
            </View>

            {/* Export & Clear History */}
            <TouchableOpacity style={styles.button} onPress={exportData}>
                <Text style={styles.buttonText}>{translate('Export Data (CSV/PDF)', language)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, {backgroundColor:'#ffdddd'}]} onPress={confirmClearHistory}>
                <Text style={[styles.buttonText, {color:'#a00'}]}>{translate('Clear Scan History', language)}</Text>
            </TouchableOpacity>

            <Text style={[styles.small, currentStyles.small, {marginTop:20}, textAlignmentStyle]}>
                {translate('About Text', language)}
            </Text>
        </ScrollView>
    );
}

// --- LIGHT AND DARK THEME STYLES (No Change) ---
const lightStyles = StyleSheet.create({
    container: { backgroundColor: '#fff' },
    sectionTitle: { color: '#000' },
    label: { color: '#000' },
    pickerWrap: { borderColor: '#eee' },
    picker: { color: '#000' },
    pickerItem: { color: '#000' },
    small: { color: '#666' }
});

const darkStyles = StyleSheet.create({
    container: { backgroundColor: '#121212' },
    sectionTitle: { color: '#e0e0e0' },
    label: { color: '#e0e0e0' },
    pickerWrap: { borderColor: '#333', backgroundColor: '#333' },
    picker: { color: '#e0e0e0' },
    pickerItem: { color: '#e0e0e0' },
    small: { color: '#aaa' }
});

// --- SHARED STYLES (No Change) ---
const styles = StyleSheet.create({
    container:{flex:1, padding:18},
    sectionTitle:{fontSize:16, fontWeight:'700', marginTop:20, marginBottom:5},
    label:{fontSize:14, marginTop:10},
    pickerWrap:{ borderWidth:1, borderRadius:8, overflow:'hidden', marginTop:6},
    row:{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:12},
    button:{backgroundColor:'#0a7f2e', padding:12, borderRadius:8, alignItems:'center', marginTop:12},
    buttonText:{color:'#fff', fontWeight:'700'},
    buttonLink:{borderBottomWidth:1, borderBottomColor:'#ccc', paddingBottom:5},
    buttonLinkText:{color:'#008CFF', fontWeight:'600', fontSize:15},
    small:{fontSize:12}
});