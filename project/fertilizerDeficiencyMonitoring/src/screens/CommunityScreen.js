import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { translate } from '../utils/lang.js'; // Aapka naya lang file

// Simple component to simulate the voice recording visual feedback (Waveform and Timer)
// RECORDING... text translation added here
const RecordingIndicator = ({ time, language }) => { 
    const blinkAnim = useRef(new Animated.Value(0)).current;
    const animationRef = useRef(null); 

    useEffect(() => {
        animationRef.current = Animated.loop(
            Animated.sequence([
                Animated.timing(blinkAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.timing(blinkAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
            ])
        ).start();
        
        return () => {
            if (animationRef.current) {
                animationRef.current.stop();
            }
        };
    }, [blinkAnim]);

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };
    
    const isRTL = language === 'اردو' || language === 'پنجابی' || language === 'پشتو';
    const textAlignmentStyle = isRTL ? { writingDirection: 'rtl' } : { writingDirection: 'ltr' };

    return (
        <View style={recordingStyles.indicatorContainer}>
            <Animated.View style={[recordingStyles.redDot, { opacity: blinkAnim }]} />
            <Text style={[recordingStyles.recordingText, textAlignmentStyle]}>
                {translate('RECORDING...', language)} {formatTime(time)}
            </Text>
            
            <View style={recordingStyles.waveContainer}>
                <View style={recordingStyles.waveBar} />
                <View style={[recordingStyles.waveBar, { height: 12 }]} />
                <View style={recordingStyles.waveBar} />
                <View style={[recordingStyles.waveBar, { height: 10 }]} />
                <View style={recordingStyles.waveBar} />
                <View style={[recordingStyles.waveBar, { height: 14 }]} />
                <View style={recordingStyles.waveBar} />
            </View>
        </View>
    );
};


export default function CommunityScreen() {
    // --- Context aur Language Setup ---
    const { settings } = useContext(SettingsContext);
    const language = settings.language;
    
    // RTL Check for chat bubbles/input
    const isRTL = language === 'اردو' || language === 'پنجابی' || language === 'پشتو';
    const textAlignmentStyle = isRTL ? { textAlign: 'right', writingDirection: 'rtl' } : { textAlign: 'left', writingDirection: 'ltr' };
    const inputAlignmentStyle = isRTL ? { textAlign: 'right' } : { textAlign: 'left' };

    // Initial messages: Username ko translate kia gaya hai
    const [messages, setMessages] = useState([
        { id: '1', text: 'Farmer Ali: Mera gehoon ka rang peela ho raha hai. Koi madad kar sakta hai?', sender: 'other', username: translate('Farmer Ali', language) },
        { id: '2', text: 'Farmer Ahmed: Aap leaf ki photo share karen. Mujhe bhi same masla tha.', sender: 'user', username: translate('You', language) }
    ]);
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const intervalRef = useRef(null);

    // --- Voice Recording Timer Logic ---
    useEffect(() => {
        if (isRecording) {
            intervalRef.current = setInterval(() => {
                setRecordingTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!isRecording && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => clearInterval(intervalRef.current);
    }, [isRecording]);


    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { 
            id: Date.now().toString(), 
            text: input, 
            sender: 'user', 
            username: translate('You', language) 
        }]);
        setInput('');
    };
    
    const startRecording = () => {
        setIsRecording(true);
        setRecordingTime(0); 
    };
    
    const stopAndSendVoice = () => {
        if (recordingTime === 0) {
            setIsRecording(false);
            setRecordingTime(0);
            return;
        }
        
        setIsRecording(false);

        const duration = recordingTime;
        setRecordingTime(0);
        
        // Display the voice message in chat (using translation)
        setMessages(prev => [
            ...prev, 
            { 
                id: Date.now().toString() + '_voice', 
                text: `${translate('Voice Note', language)} (${duration}s) - ${translate('Sent to Community', language)}`, 
                sender: 'user', 
                username: translate('You', language) 
            }
        ]);
    };

    // The main action button on the right (SEND or MIC or STOP)
    const renderActionButton = () => {
        if (isRecording) {
            return (
                <TouchableOpacity style={styles.sendBtn} onPress={stopAndSendVoice}>
                    <Text style={styles.sendText}>{translate('STOP', language)}</Text>
                </TouchableOpacity>
            );
        } else if (input.trim()) {
            return (
                <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                    <Text style={styles.sendText}>{translate('SEND', language)}</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.micBtn} onPress={startRecording}>
                    <Text style={styles.micIconText}>🎙️</Text>
                </TouchableOpacity>
            );
        }
    };

    const renderMessageItem = ({ item }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[styles.bubbleContainer, isUser ? styles.userContainer : styles.otherContainer]}>
                <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
                    {!isUser && (
                        // Apply RTL/LTR to username
                        <Text style={[styles.usernameText, textAlignmentStyle]}>{item.username}</Text>
                    )}
                    {/* Apply RTL/LTR to message text */}
                    <Text style={[{ color: isUser ? '#fff' : '#000' }, textAlignmentStyle]}>{item.text}</Text>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>

            {/* CHAT HISTORY */}
            <FlatList
                data={messages}
                keyExtractor={item => item.id}
                renderItem={renderMessageItem}
                contentContainerStyle={{ padding: 10 }}
                // Invert list to show latest message at bottom
                inverted 
            />

            {/* INPUT BAR (Shared from Chatbot logic) */}
            <View style={styles.inputRow}>
                
                {isRecording ? (
                    // Show recording indicator when recording
                    <RecordingIndicator time={recordingTime} language={language} /> // Pass language
                ) : (
                    // Show text input when not recording
                    <View style={styles.textBox}>
                        <TextInput
                            style={[styles.input, inputAlignmentStyle]} // Apply input alignment
                            value={input}
                            onChangeText={setInput}
                            placeholder={translate('Type message or Record Voice Note...', language)} // Translate placeholder
                            placeholderTextColor="#777"
                        />
                    </View>
                )}

                {/* Right Action Button (SEND, MIC, or STOP) */}
                {renderActionButton()}

            </View>

        </View>
    );
}

// ... Styles remain unchanged.
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f7f7' },
    bubbleContainer: {
        marginVertical: 5,
        maxWidth: '80%',
    },
    otherContainer: {
        alignSelf: 'flex-start',
    },
    userContainer: {
        alignSelf: 'flex-end',
    },
    bubble: {
        padding: 10,
        borderRadius: 14,
    },
    otherBubble: { 
        backgroundColor: '#fff', 
        borderWidth: 1,
        borderColor: '#ddd'
    },
    userBubble: { 
        backgroundColor: '#2e7d32', 
    },
    usernameText: {
        fontWeight: 'bold',
        marginBottom: 3,
        color: '#008CFF', 
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingBottom: 12,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    textBox: {
        flex: 1, 
        backgroundColor: '#f6f6f6',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginRight: 8, 
        borderWidth: 1,
        borderColor: '#dcdcdc',
        height: 48, 
        justifyContent: 'center', 
    },
    input: {
        height: 40,
        fontSize: 15,
        color: '#000',
    },
    sendBtn: {
        backgroundColor: '#2e7d32', 
        width: 65, 
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    sendText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    micBtn: {
        backgroundColor: '#f1f3f5ff', 
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    micIconText: {
        fontSize: 28, 
        lineHeight: 30, 
    }
});
const recordingStyles = StyleSheet.create({
    indicatorContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFE0E0', 
        borderRadius: 25,
        paddingHorizontal: 15,
        marginRight: 8,
        height: 48,
        borderWidth: 1,
        borderColor: '#D32F2F', 
    },
    redDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#D32F2F',
        marginRight: 8,
    },
    recordingText: {
        color: '#D32F2F',
        fontWeight: 'bold',
        marginRight: 10,
    },
    waveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        height: '100%',
    },
    waveBar: {
        width: 3,
        height: 8,
        backgroundColor: '#D32F2F',
        marginHorizontal: 1,
        borderRadius: 1,
    }
});