import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, ScrollView, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../utils/lang.js'; // Aapka naya lang file

export default function AboutScreen() {
    const navigation = useNavigation();
    
    // --- Context aur Language Setup ---
    const { settings } = useContext(SettingsContext);
    const language = settings.language;
    const themeDark = settings.themeDark;
    
    // --- RTL Check ---
    const isRTL = language === 'اردو' || language === 'پنجابی' || language === 'پشتو';
    const textAlignmentStyle = isRTL ? { textAlign: 'right', writingDirection: 'rtl' } : { textAlign: 'left', writingDirection: 'ltr' };
    
    // --- Dynamic Styles ---
    const lightStyles = StyleSheet.create({
        container: { backgroundColor: '#fff' },
        text: { color: '#000' },
        small: { color: '#666' }
    });
    
    const darkStyles = StyleSheet.create({
        container: { backgroundColor: '#121212' },
        text: { color: '#e0e0e0' },
        small: { color: '#aaa' }
    });

    const currentStyles = themeDark ? darkStyles : lightStyles;
    const currentContainerStyle = [styles.container, currentStyles.container];
    const currentTextStyle = currentStyles.text;
    const currentSmallStyle = currentStyles.small;

    const currentPStyle = [styles.p, currentTextStyle, textAlignmentStyle];
    const currentSectionStyle = [styles.section, currentTextStyle, textAlignmentStyle];


    const team = [
        { name: 'Umm-e-Habiba', id: '22-ARID-874', email: 'ummeh9164@gmail.com' },
        { name: 'Mustafa Nasir', id: '22-ARID-3113', email: 'mustafanasir3331@gmail.com' },
        { name: 'Muhammad Adnan', id: '22-ARID-814', email: 'adnank75586@gmail.com' },
        { name: 'Supervisor ', id: 'Dr. Saif Ur Rahman' },

    ];

    const openProposal = async () => {
        const url = 'file:///sdcard/Download/FYP_Proposal_Fertilizer_Final_Updated.pdf'; 
        Linking.canOpenURL(url).then(s => s && Linking.openURL(url));
    };

    const shareApp = async () => {
        Share.share({ message: translate('Share Message', language) });
    };

    return (
        <ScrollView style={currentContainerStyle} contentContainerStyle={{padding:18}}>
            <View style={{alignItems:'center'}}>
                <Image source={require('../assets/Logo.png')} style={{width:96, height:96}} />
                <Text style={[styles.title, currentTextStyle]}>{translate('Fertilizer Deficiency Monitor', language)}</Text>
                <Text style={[styles.tag, currentSmallStyle]}>{translate('Scan • Recommend • Save', language)}</Text>
            </View>

            <Text style={currentSectionStyle}>{translate('Project Summary', language)}</Text>
            <Text style={currentPStyle}>

                This project proposes an AI-based plant health monitoring system designed to combat significant crop losses caused by fertilizer deficiencies globally and in Pakistan. The system replaces traditional, time-consuming soil testing with a simple mobile phone camera scan of plant leaves to detect visible deficiency symptoms. The core solution involves a deep learning model, such as CNN, trained on extensive datasets to provide early, automated deficiency diagnosis. Key features include a personalized recommendation system that suggests appropriate fertilizers, medicines, and sprays, complete with a price comparison from various companies to ensure affordability. Furthermore, the app features an integrated chatbot with voice interaction to promote digital inclusion and accessibility for farmers with limited literacy. This comprehensive, cost-effective solution is intended for small to medium-scale farmers, offering instant, data-driven support to improve crop yield and resource management.

            </Text>

            <Text style={currentSectionStyle}>{translate('Team & Supervisor', language)}</Text>
            {team.map(t => (
                <View key={t.id} style={[styles.teamRow, textAlignmentStyle]}>
                    <Text style={[{fontWeight:'700'}, currentTextStyle]}>{t.name}</Text>
                    <Text style={[styles.small, currentSmallStyle]}>{t.id} • {t.email}</Text>
                </View>
            ))}


            <Text style={currentSectionStyle}>{translate('Timeline & Data', language)}</Text>
            <Text style={currentPStyle}>
                {translate('Timeline Text', language)}
            </Text>

            <TouchableOpacity style={styles.linkBtn} onPress={openProposal}>
                <Text style={styles.linkText}>{translate('Open Proposal (PDF)', language)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.linkText}>{translate('Open Settings', language)}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareBtn} onPress={shareApp}>
                <Text style={styles.shareText}>{translate('Share App', language)}</Text>
            </TouchableOpacity>

            <Text style={[styles.small, currentSmallStyle, {marginTop:20}, textAlignmentStyle]}>
                {translate('Licenses Text', language)}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{flex:1},
    title:{fontSize:18, fontWeight:'800', marginTop:8},
    tag:{marginTop:4},
    section:{marginTop:18, fontWeight:'700', fontSize:15},
    p:{marginTop:6, lineHeight:20, textAlign: 'justify'},
    teamRow:{marginTop:8},
    small:{fontSize:12},
    linkBtn:{marginTop:12, padding:12, borderRadius:8, backgroundColor:'#eee', alignItems:'center'},
    linkText:{color:'#0a7f2e', fontWeight:'700'},
    shareBtn:{marginTop:12, padding:12, borderRadius:8, backgroundColor:'#0a7f2e', alignItems:'center'},
    shareText:{color:'#fff', fontWeight:'700'}
});