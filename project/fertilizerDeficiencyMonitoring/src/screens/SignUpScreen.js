import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../utils/lang.js';

export default function SignUpScreen({ navigation }) {
    // --- Context aur Language Setup ---
    const { settings } = useContext(SettingsContext);
    const language = settings.language;
    
    // --- RTL Check ---
    const isRTL = language === 'اردو' || language === 'پنجابی' || language === 'پشتو';
    const textAlignmentStyle = isRTL ? { textAlign: 'right', writingDirection: 'rtl' } : { textAlign: 'left', writingDirection: 'ltr' };
    const inputDirectionStyle = isRTL ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }; // To place icon on left/right

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        farmName: "",
        cropType: "",
        location: "",
    });

    const [errors, setErrors] = useState({}); // <-- store validation errors

    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
 // REGEX VALIDATIONS
const nameRegex = /^[A-Za-z\s]+$/;  // alphabets + space
const cropRegex = /^[A-Za-z]+$/;     // alphabets only
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // simple valid email

        // Remove error when user starts typing
        if (errors[key]) {
            setErrors({ ...errors, [key]: "" });
        }
    };

    const validate = () => {
    let temp = {};

    // FULL NAME
    if (!form.fullName.trim()) {
        temp.fullName = translate("Full Name is required", language);
    } else if (!nameRegex.test(form.fullName.trim())) {
        temp.fullName = translate("Full Name should contain alphabet and spaces only", language);
    }

    // EMAIL
    if (!form.email.trim()) {
        temp.email = translate("Email is required", language);
    } else if (!emailRegex.test(form.email.trim())) {
        temp.email = translate("Invalid email format", language);
    }

    // PASSWORD
    if (!form.password.trim()) {
        temp.password = translate("Password is required", language);
    }

    // CONFIRM PASSWORD
    if (!form.confirmPassword.trim()) {
        temp.confirmPassword = translate("Please confirm your password", language);
    } else if (form.password !== form.confirmPassword) {
        temp.confirmPassword = translate("Passwords do not match", language);
    }

    // FARM NAME
    if (!form.farmName.trim()) {
        temp.farmName = translate("Farm Name is required", language);
    } else if (!nameRegex.test(form.farmName.trim())) {
        temp.farmName = translate("Farm Name should contain alphabet and spaces only", language);
    }

    // CROP TYPE
    if (!form.cropType.trim()) {
        temp.cropType = translate("Crop Type is required", language);
    } else if (!cropRegex.test(form.cropType.trim())) {
        temp.cropType = translate("Crop Type should contain alphabets only", language);
    }

    // LOCATION (any format allowed)
    if (!form.location.trim()) {
        temp.location = translate("Location is required", language);
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
};


    const handleSignUp = async () => {
        if (!validate()) return; // stop if validation fails

        try {
            await AsyncStorage.setItem(`user_${form.email}`, JSON.stringify(form));

            Alert.alert(translate("Success", language), translate("Account created successfully!", language)); // Translate alert
            navigation.replace("Login");
        } catch (err) {
            Alert.alert(translate("Error", language), translate("Something went wrong.", language)); // Translate alert
        }
    };

    const inputFields = [
        { key: "fullName", icon: "👤", placeholder: "Full Name" },
        { key: "email", icon: "📩", placeholder: "Email" },
        { key: "password", icon: "🔒", placeholder: "Password", secure: true },
        { key: "confirmPassword", icon: "🔒", placeholder: "Confirm Password", secure: true },
        { key: "farmName", icon: "🏡", placeholder: "Farm Name" },
        { key: "cropType", icon: "🌾", placeholder: "Primary Crop Type" },
        { key: "location", icon: "📍", placeholder: "Farm Location" },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.iconCircle}><Text style={styles.leaf}>🌿</Text></View>
            <Text style={[styles.title, textAlignmentStyle]}>{translate("Create Account", language)}</Text>
            <Text style={[styles.subtitle, textAlignmentStyle]}>{translate("Sign up to continue", language)}</Text>

            {/* INPUT FIELDS */}
            {inputFields.map((item, index) => (
                <View key={index} style={{ width: "80%" }}>
                    
                    {/* INPUT BOX */}
                    <View style={[
                        styles.inputBox,
                        inputDirectionStyle, // Apply RTL direction
                        errors[item.key] ? { borderColor: "red", borderWidth: 1 } : null
                    ]}>
                        <Text style={styles.inputIcon}>{item.icon}</Text>
                        <TextInput
                            placeholder={translate(item.placeholder, language)} // Translate placeholder
                            placeholderTextColor="#888"
                            style={[
                                styles.input, 
                                isRTL ? { textAlign: 'right' } : { textAlign: 'left' } // Align input text
                            ]}
                            value={form[item.key]}
                            secureTextEntry={item.secure || false}
                            onChangeText={(text) => handleChange(item.key, text)}
                        />
                    </View>

                    {/* ERROR MESSAGE */}
                    {errors[item.key] ? (
                        <Text style={[styles.errorText, isRTL ? { textAlign: 'right', marginLeft: 'auto', marginRight: 5 } : { textAlign: 'left', marginLeft: 5, marginRight: 'auto' }]}>{errors[item.key]}</Text>
                    ) : null}

                </View>
            ))}

            {/* SIGNUP BUTTON */}
            <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
                <Text style={styles.signupText}>{translate("Sign Up", language)}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace('Login')}>
                <Text style={[styles.loginLink, textAlignmentStyle]}>{translate("Already have an account? Login", language)}</Text>
            </TouchableOpacity>

            

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { paddingTop: 50, paddingBottom: 50, alignItems: 'center', backgroundColor: '#E6F7E6' },
    iconCircle: { width: 70, height: 70, borderRadius: 40, backgroundColor: '#D4F5D4', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    leaf: { fontSize: 32 },
    title: { fontSize: 26, fontWeight: '700', color: '#1B3C1A' },
    subtitle: { fontSize: 15, color: '#4A654A', marginBottom: 25, marginTop: 4 },

    inputBox: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 14,
        marginBottom: 5,
        elevation: 3,
        alignItems: 'center',
    },

    inputIcon: { fontSize: 20, marginRight: 8 },
    input: { flex: 1, fontSize: 16, color: '#000' },

    errorText: {
        color: "red",
        marginBottom: 10,
        marginLeft: 5,
        fontSize: 13,
        fontWeight: "500"
    },

    signupBtn: { width: '80%', backgroundColor: '#2E7D32', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 20 },
    signupText: { color: '#fff', fontSize: 18, fontWeight: '700' },
    loginLink: { marginTop: 15, color: '#2E7D32', fontSize: 15, fontWeight: '600' },

});