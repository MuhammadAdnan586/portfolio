// src/utils/i18n.js

/**
 * Translations object containing key-value pairs for various strings in the application.
 * Languages included: English, اردو (Urdu), پنجابی (Punjabi), پشتو (Pashto)
 *
 * NOTE: The Urdu/Punjabi/Pashto translations are based on the user's provided context and common usage.
 */
const translations = {
    // --- Settings Page Strings (User Provided) ---
    'Account': {
        English: 'Account',
        'اردو': 'اکاؤنٹ',
        'پنجابی': 'کھاتہ',
        'پشتو': 'حساب'
    },
    'Edit Profile (Change Signup Info)': {
        English: 'Edit Profile (Change Signup Info)',
        'اردو': 'پروفائل میں ترمیم کریں (سائن اپ معلومات تبدیل کریں)',
        'پنجابی': 'پروفائل ٹھیک کرو (سائن اپ معلومات بدلو)',
        'پشتو': 'پروفایل سمون (د نوم لیکنې معلومات بدل کړئ)'
    },
    'General': {
        English: 'General',
        'اردو': 'عمومی ترتیبات',
        'پنجابی': 'عام سیٹنگاں',
        'پشتو': 'عمومي ترتیبات'
    },
    'Language': {
        English: 'Language',
        'اردو': 'زبان',
        'پنجابی': 'بولی',
        'پشتو': 'ژبه'
    },
    'Dark Theme': {
        English: 'Dark Theme',
        'اردو': 'گہرا تھیم',
        'پنجابی': 'گہرا روپ',
        'پشتو': 'توره بڼه'
    },
    'Area Unit': {
        English: 'Area Unit',
        'اردو': 'رقبہ یونٹ',
        'پنجابی': 'رقبے دی اکائی',
        'پشتو': 'ساحه واحد'
    },
    'Notifications': {
        English: 'Notifications',
        'اردو': 'اطلاعات',
        'پنجابی': 'اطلاعاں',
        'پشتو': 'خبرتیاوې'
    },
    'Reminders & Alerts': {
        English: 'Reminders & Alerts',
        'اردو': 'یاد دہانی و الرٹس',
        'پنجابی': 'یاد دہانیاں تے الرٹس',
        'پشتو': 'یادونې او خبرداری'
    },
    'Data & Privacy': {
        English: 'Data & Privacy',
        'اردو': 'ڈیٹا اور رازداری',
        'پنجابی': 'ڈیٹا تے رازداری',
        'پشتو': 'ډاټا او محرمیت'
    },
    'Offline Mode (save local)': {
        English: 'Offline Mode (save local)',
        'اردو': 'آف لائن موڈ (مقامی طور پر محفوظ کریں)',
        'پنجابی': 'آف لائن موڈ (مقامی طور تے سانبھو)',
        'پشتو': 'آفلاین حالت (په سیمه ییزه توګه ذخیره کول)'
    },
    'Export Data (CSV/PDF)': {
        English: 'Export Data (CSV/PDF)',
        'اردو': 'ڈیٹا برآمد کریں (CSV/PDF)',
        'پنجابی': 'ڈیٹا باہر کڈھو (CSV/PDF)',
        'پشتو': 'ډاټا صادرول (CSV/PDF)'
    },
    'Clear Scan History': {
        English: 'Clear Scan History',
        'اردو': 'سکین ہسٹری صاف کریں',
        'پنجابی': 'سکین ہسٹری مٹاؤ',
        'پشتو': 'سکین تاریخ پاک کړئ'
    },
    'About': {
        English: 'About',
        'اردو': 'متعلق',
        'پنجابی': 'بارے وچ',
        'پشتو': 'په اړه'
    },
    'About Text': {
        English: 'App & model updates, privacy policy and account settings are available in the About page.',
        'اردو': 'ایپ اور ماڈل اپ ڈیٹس، رازداری کی پالیسی اور اکاؤنٹ کی ترتیبات متعلقہ صفحہ میں دستیاب ہیں۔',
        'پنجابی': 'ایپ تے ماڈل اپ ڈیٹس، رازداری دی پالیسی تے کھاتے دی سیٹنگز متعلقہ صفحہ وچ موجود نیں۔',
        'پشتو': 'د اپلیکیشن او ماډل تازه معلومات، محرمیت پالیسي او حساب ترتیبات د About په پاڼه کې شتون لري.'
    },

    // --- Alert Dialog Strings ---
    'Clear history': {
        English: 'Clear history',
        'اردو': 'ہسٹری صاف کریں',
        'پنجابی': 'ہسٹری مٹاؤ',
        'پشتو': 'تاریخ پاک کړئ'
    },
    'Are you sure you want to delete all saved scans and history? This cannot be undone.': {
        English: 'Are you sure you want to delete all saved scans and history? This cannot be undone.',
        'اردو': 'کیا آپ واقعی تمام محفوظ شدہ سکین اور ہسٹری حذف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں کیا جا سکتا۔',
        'پنجابی': 'کی تہانوں یقین اے کہ تُسی ساریاں سکین ہسٹری مٹاؤنا چاہندے او؟ ایہ واپس نہیں ہو سکدا۔',
        'پشتو': 'ایا تاسو ډاډه یاست چې غواړئ ټول خوندي شوي سکینونه او تاریخ حذف کړئ؟ دا بیرته نشي اخیستل کیدی.'
    },
    'Cancel': {
        English: 'Cancel',
        'اردو': 'منسوخ',
        'پنجابی': 'منسوخ',
        'پشتو': 'لغوه'
    },
    'Delete': {
        English: 'Delete',
        'اردو': 'حذف کریں',
        'پنجابی': 'مٹاؤ',
        'پشتو': 'حذف کړئ'
    },
    'Done': {
        English: 'Done',
        'اردو': 'ہو گیا',
        'پنجابی': 'ہو گیا',
        'پشتو': 'وشو'
    },
    'Scan history cleared.': {
        English: 'Scan history cleared.',
        'اردو': 'سکین ہسٹری صاف ہو گئی ہے۔',
        'پنجابی': 'سکین ہسٹری مٹ گئی۔',
        'پشتو': 'سکین تاریخ پاک شو.'
    },

    // --- New Strings from Screenshots and App Structure ---
    'Settings': {
        English: 'Settings',
        'اردو': 'ترتیبات',
        'پنجابی': 'سیٹنگز',
        'پشتو': 'ترتیبات'
    },
    'Back': {
        English: 'Back',
        'اردو': 'واپس',
        'پنجابی': 'پچھے',
        'پشتو': 'شاته'
    },
    'FDM': {
        English: 'FDM',
        'اردو': 'ایف ڈی ایم',
        'پنجابی': 'ایف ڈی ایم',
        'پشتو': 'ایف ډي ایم'
    },
    'Fertilizer Deficiency Monitor': {
        English: 'Fertilizer Deficiency Monitor',
        'اردو': 'کھاد کی کمی کا مانیٹر',
        'پنجابی': 'کھاد دی کمی دا مانیٹر',
        'پشتو': 'د سرې کمښت څارونکی'
    },
    'Scan Recommend Save': {
        English: 'Scan Recommend Save',
        'اردو': 'سکین کریں، تجویز لیں، محفوظ کریں',
        'پنجابی': 'سکین کرو، صلاح لو، سانبھو',
        'پشتو': 'سکین، سپارښتنه، خوندي کول'
    },
    'Project Summary': {
        English: 'Project Summary',
        'اردو': 'پروجیکٹ کا خلاصہ',
        'پنجابی': 'پراجیکٹ دا خلاصہ',
        'پشتو': 'د پروژې لنډیز'
    },
    'Project Summary Text': {
        English: 'Project Summary Text', // Placeholder
        'اردو': 'اس پروجیکٹ کا مقصد پودوں میں کھاد کی کمی کو اے آئی کے ذریعے پہچاننا اور بروقت حل فراہم کرنا ہے۔',
        'پنجابی': 'ایس پراجیکٹ دا مقصد پودیاں وچ کھاد دی کمی نوں اے آئی دے ذریعے پچھاننا تے ویلے تے حل دینا اے۔',
        'پشتو': 'د دې پروژې موخه د نباتاتو په کمي کې د سرې کمښت د AI له لارې تشخیص او پر وخت حل لارې وړاندې کول دي.'
    },
    'Team & Supervisor': {
        English: 'Team & Supervisor',
        'اردو': 'ٹیم اور سپروائزر',
        'پنجابی': 'ٹیم تے سپروائزر',
        'پشتو': 'ټیم او څارونکی'
    },
    'Supervisor Text': {
        English: 'Supervisor Text', // Placeholder
        'اردو': 'سپروائزر کا نام: ڈاکٹر سیف الرحمان',
        'پنجابی': 'سپروائزر دا ناں: ڈاکٹر سیف الرحمان',
        'پشتو': 'د څارونکي نوم: ډاکټر سیف الرحمن'
    },
    'Timeline & Data': {
        English: 'Timeline & Data',
        'اردو': 'ٹائم لائن اور ڈیٹا',
        'پنجابی': 'ٹائم لائن تے ڈیٹا',
        'پشتو': 'مهال ویش او ډاټا'
    },
    'Timeline Text': {
        English: 'Timeline Text', // Placeholder
        'اردو': 'پروجیکٹ ٹائم لائن: اکتوبر 2024 سے مارچ 2025 تک',
        'پنجابی': 'پراجیکٹ ٹائم لائن: اکتوبر 2024 توں مارچ 2025 تک',
        'پشتو': 'د پروژې مهال ویش: د ۲۰۲۴ کال د اکتوبر څخه تر ۲۰۲۵ کال د مارچ پورې'
    },
    'Open Proposal (PDF)': {
        English: 'Open Proposal (PDF)',
        'اردو': 'پروپوزل کھولیں (PDF)',
        'پنجابی': 'پروپوزل کھولو (PDF)',
        'پشتو': 'وړاندیز پرانیستل (PDF)'
    },
    'Open Settings': {
        English: 'Open Settings',
        'اردو': 'ترتیبات کھولیں',
        'پنجابی': 'سیٹنگز کھولو',
        'پشتو': 'ترتیبات پرانیستل'
    },
    'Share App': {
        English: 'Share App',
        'اردو': 'ایپ شیئر کریں',
        'پنجابی': 'ایپ سانجھی کرو',
        'پشتو': 'ایپ شریک کړئ'
    },
    'FARMER\'S ASSISTANT': {
        English: "FARMER'S ASSISTANT",
        'اردو': 'کسان کا مددگار',
        'پنجابی': 'کسان دا مددگار',
        'پشتو': 'د بزګر مرسته کوونکی'
    },
    'AI-Based Fertilizer Deficiency Detection': {
        English: 'AI-Based Fertilizer Deficiency Detection',
        'اردو': 'اے آئی پر مبنی کھاد کی کمی کی شناخت',
        'پنجابی': 'اے آئی اُتے مبنی کھاد دی کمی دی پچھان',
        'پشتو': 'د AI پر بنسټ د سرې کمښت کشف'
    },
    'Leaf Scan': {
        English: 'Leaf Scan',
        'اردو': 'پتوں کا سکین',
        'پنجابی': 'پتیاں دا سکین',
        'پشتو': 'د پاڼو سکین'
    },
    'AI Chatbot': {
        English: 'AI Chatbot',
        'اردو': 'اے آئی چیٹ بوٹ',
        'پنجابی': 'اے آئی چیٹ بوٹ',
        'پشتو': 'AI چیټ بوټ'
    },
    'History': {
        English: 'History',
        'اردو': 'ہسٹری',
        'پنجابی': 'ہسٹری',
        'پشتو': 'تاریخ'
    },
    'Calculator': {
        English: 'Calculator',
        'اردو': 'کیلکولیٹر',
        'پنجابی': 'کیلکولیٹر',
        'پشتو': 'حسابګر'
    },
    'Community': {
        English: 'Community',
        'اردو': 'کمیونٹی',
        'پنجابی': 'کمیونٹی',
        'پشتو': 'ټولنه'
    },
    'Privacy Policy': {
        English: 'Privacy Policy',
        'اردو': 'رازداری کی پالیسی',
        'پنجابی': 'رازداری پالیسی',
        'پشتو': 'محرمیت پالیسي'
    },
    'Terms of Service': {
        English: 'Terms of Service',
        'اردو': 'سروس کی شرائط',
        'پنجابی': 'خدمت دیاں شرطاں',
        'پشتو': 'د خدمت شرایط'
    },
    'Logout': {
        English: 'Logout',
        'اردو': 'لاگ آؤٹ',
        'پنجابی': 'لاگ آؤٹ',
        'پشتو': 'بهر ووتل'
    },
    'Version': {
        English: 'Version',
        'اردو': 'ورژن',
        'پنجابی': 'ورژن',
        'پشتو': 'نسخه'
    },
    'App Updates': {
        English: 'App Updates',
        'اردو': 'ایپ اپ ڈیٹس',
        'پنجابی': 'ایپ اپ ڈیٹس',
        'پشتو': 'د اپلیکیشن تازه معلومات'
    },
    'i': {
        English: 'i', // Icon text
        'اردو': 'i',
        'پنجابی': 'i',
        'پشتو': 'i'
    },
    // Missing translations from the screen:
    'Edit Profile': { // Changed 'Edit Profile (Change Signup Info)' to simply 'Edit Profile' for the heading on the settings page
        English: 'Edit Profile',
        'اردو': 'پروفائل میں ترمیم کریں',
        'پنجابی': 'پروفائل ٹھیک کرو',
        'پشتو': 'پروفایل سمون'
    },
    'Acre': { // Area unit value
        English: 'Acre',
        'اردو': 'ایکڑ',
        'پنجابی': 'ایکڑ',
        'پشتو': 'ایکر'
    }
};

/**
 * Translates a given key (English string) into the specified language.
 * If the translation for the key or the current language is not found,
 * the original key (English string) is returned as a fallback.
 *
 * @param {string} key The English string to translate.
 * @param {string} currentLang The target language ('English', 'اردو', 'پنجابی', 'پشتو').
 * @returns {string} The translated string or the original key if translation is missing.
 */
export const translate = (key, currentLang) => {
    // Look up the translation. Use the original key as a fallback if translation is missing.
    return translations[key]?.[currentLang] || key;
};

/**
 * An array of supported languages for display in a language selection list.
 */
export const supportedLanguages = [
    'English',
    'اردو',
    'پنجابی',
    'پشتو'
];

/**
 * Returns the translations object. Useful for components that need the entire map.
 * @returns {object} The complete translations object.
 */
export const getTranslations = () => {
    return translations;
};