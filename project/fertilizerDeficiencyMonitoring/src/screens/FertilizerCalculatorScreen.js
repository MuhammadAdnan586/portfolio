import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../utils/lang.js';

export default function FertilizerCalculatorScreen() {

    const { settings } = useContext(SettingsContext);
    const language = settings.language;

    const isRTL = ['اردو', 'پنجابی', 'پشتو'].includes(language);

    const textAlignmentStyle = isRTL
        ? { textAlign: 'right', writingDirection: 'rtl' }
        : { textAlign: 'left', writingDirection: 'ltr' };

    const inputAlignmentStyle = isRTL
        ? { textAlign: 'right' }
        : { textAlign: 'left' };

    const [crop, setCrop] = useState('');
    const [area, setArea] = useState('');
    const [deficiency, setDeficiency] = useState('');
    const [fertilizer, setFertilizer] = useState('');
    const [errors, setErrors] = useState({});

    const alphaRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^\d+(\.\d+)?$/;

    const validate = () => {
        let temp = {};

        // Crop validation
        if (!crop.trim()) temp.crop = translate("Crop name is required", language);
        else if (!alphaRegex.test(crop.trim())) temp.crop = translate("Only alphabets allowed", language);
        else if (crop.trim().length < 3) temp.crop = translate("Minimum 3 characters required", language);

        // Area validation
        if (!area.trim()) temp.area = translate("Area is required", language);
        else if (!numberRegex.test(area.trim())) temp.area = translate("Enter a valid number", language);
        else if (parseFloat(area) <= 0) temp.area = translate("Area must be greater than zero", language);

        // Deficiency validation
        if (!deficiency.trim()) temp.deficiency = translate("Deficiency type is required", language);
        else if (!alphaRegex.test(deficiency.trim())) temp.deficiency = translate("Only alphabets allowed", language);

        // Fertilizer validation
        if (!fertilizer.trim()) temp.fertilizer = translate("Fertilizer type is required", language);
        else if (!alphaRegex.test(fertilizer.trim())) temp.fertilizer = translate("Only alphabets allowed", language);

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const calculate = () => {
        if (!validate()) return;

        let base = 80;
        const def = deficiency.toLowerCase();

        if (def.includes("nitrogen")) base = 100;
        else if (def.includes("phosphorus")) base = 60;
        else if (def.includes("potassium")) base = 50;

        let fertilizerFactor = 1;
        const f = fertilizer.toLowerCase();

        if (f.includes("urea")) fertilizerFactor = 1;
        else if (f.includes("dap")) fertilizerFactor = 1.5;
        else if (f.includes("sop")) fertilizerFactor = 1.2;
        else if (f.includes("mop")) fertilizerFactor = 1.1;
        else if (f.includes("npk")) fertilizerFactor = 1.3;

        const result = (parseFloat(area) * base * fertilizerFactor).toFixed(1);

        const alertMessage = `
${translate("Crop", language)}: ${crop}
${translate("Area", language)}: ${area} acre
${translate("Deficiency", language)}: ${deficiency}
${translate("Fertilizer", language)}: ${fertilizer}

${translate("You need approximately", language)} ${result} kg
`;

        Alert.alert(translate("Result", language), alertMessage);
    };

    return (
        <View style={[styles.container, textAlignmentStyle]}>
            <Text style={[styles.header, textAlignmentStyle]}>
                {translate("Fertilizer Calculator", language)}
            </Text>

            <TextInput
                placeholder={translate("Crop (e.g., Wheat)", language)}
                value={crop}
                onChangeText={(t) => { setCrop(t); setErrors({ ...errors, crop: "" }); }}
                style={[styles.input, inputAlignmentStyle, errors.crop && styles.errorBorder]}
            />
            {errors.crop && <Text style={styles.error}>{errors.crop}</Text>}

            <TextInput
                placeholder={translate("Area (acre)", language)}
                value={area}
                keyboardType="numeric"
                onChangeText={(t) => { setArea(t); setErrors({ ...errors, area: "" }); }}
                style={[styles.input, inputAlignmentStyle, errors.area && styles.errorBorder]}
            />
            {errors.area && <Text style={styles.error}>{errors.area}</Text>}

            <TextInput
                placeholder={translate("Deficiency Type (e.g., Nitrogen)", language)}
                value={deficiency}
                onChangeText={(t) => { setDeficiency(t); setErrors({ ...errors, deficiency: "" }); }}
                style={[styles.input, inputAlignmentStyle, errors.deficiency && styles.errorBorder]}
            />
            {errors.deficiency && <Text style={styles.error}>{errors.deficiency}</Text>}

            <TextInput
                placeholder={translate("Fertilizer Type (e.g., Urea, DAP)", language)}
                value={fertilizer}
                onChangeText={(t) => { setFertilizer(t); setErrors({ ...errors, fertilizer: "" }); }}
                style={[styles.input, inputAlignmentStyle, errors.fertilizer && styles.errorBorder]}
            />
            {errors.fertilizer && <Text style={styles.error}>{errors.fertilizer}</Text>}

            <Button
                title={translate("Calculate", language)}
                onPress={calculate}
                color="rgba(20,131,16,1)"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 18, fontWeight: '700', marginBottom: 15 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 12,
        borderRadius: 6
    },
    error: { color: 'red', fontSize: 12, marginBottom: 5 },
    errorBorder: { borderColor: 'red' }
});
