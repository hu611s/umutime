// Game State
let gameState = {
    cityName: '',
    sessionLength: 25,
    breakLength: 5,
    timeLeft: 25 * 60,
    isRunning: false,
    isWorkSession: true,
    currentSession: 1,
    totalSessions: 4,
    coins: 50,
    stars: 0,
    population: 0,
    selectedBuilding: null,
    grid: Array(8).fill(null).map(() => Array(8).fill(null)),
    timerInterval: null,
    currentLang: 'en',
    lastMinute: 25,
    coinsPerMinute: 1,
    tasks: [],
    darkMode: false,
    isGuest: true,
    currentUser: null,
    flashcards: [],
    currentFlashcardIndex: 0,
    isFlashcardFlipped: false
};

// Supabase Configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
let supabase = null;

// Initialize Supabase
function initSupabase() {
    if (typeof window.supabase !== 'undefined') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }
}

// Translations
const translations = {
    en: {
        selectSession: 'Select Session Length',
        selectBreak: 'Select Break Length',
        selectSessions: 'Number of Sessions',
        adjustSessions: 'Adjust Number of Sessions',
        min: 'min',
        custom: 'Custom',
        sessions: 'sessions',
        nameCity: 'Name Your City',
        cityName: 'City Name',
        startBuilding: 'START BUILDING',
        focusTimer: 'Focus Timer',
        workSession: 'WORK SESSION',
        breakTime: 'BREAK TIME',
        session: 'Session',
        start: 'Start',
        pause: 'Pause',
        buildMenu: 'BUILD MENU',
        buyLand: 'BUY LAND',
        goPremium: 'Go Premium!',
        population: 'Population:',
        sessionComplete: 'Session Complete!',
        breakComplete: 'Break Complete!',
        focusTime: 'Focus Time:',
        mins: 'mins',
        earnings: 'Earnings:',
        smallHouse: 'Small House',
        office: 'Office',
        school: 'School',
        factory: 'Factory',
        road: 'Road',
        park: 'Park',
        set: 'Set',
        addMoreTime: 'Add More Time',
        exitSession: 'Exit Session',
        buildingLocked: 'Building locked during session',
        tasks: 'TASKS',
        addTask: 'Add a task...',
        musicPlayer: 'Music Player',
        // New translations
        settings: 'Settings',
        signIn: 'Sign In',
        themeMode: 'Theme Mode',
        themeModeDesc: 'Switch between light and dark mode',
        lightMode: '☀️ Light',
        darkMode: '🌙 Dark',
        language: 'Language',
        languageDesc: 'Choose your preferred language',
        english: 'EN',
        arabic: 'AR',
        guestMode: 'Guest Mode',
        guestModeDesc: 'Your progress is saved locally. Sign in to sync across devices.',
        tutorial: 'Tutorial',
        tutorialDesc: 'Learn how to use Umutime',
        saveProgressMsg: 'Sign in to save your progress and sync across devices!',
        email: 'Email',
        password: 'Password',
        signInBtn: 'Sign In',
        or: 'OR',
        signInGoogle: 'Continue with Google',
        noAccount: "Don't have an account?",
        signUpLink: 'Sign Up',
        createAccountMsg: 'Create an account to save your city forever!',
        username: 'Username',
        createAccount: 'Create Account',
        signUpGoogle: 'Sign Up with Google',
        haveAccount: 'Already have an account?',
        signInLink: 'Sign In',
        // Tutorial
        tutorialStep1Title: 'What is Umutime?',
        tutorialStep1Text: 'Hello! I\'m Hussein, the designer and developer of Umutime. This is a time management and focus website that helps you organize your day using clear focus sessions. In Umutime, time doesn\'t just pass… it transforms into achievement and visible progress.',
        tutorialStep2Title: 'Focus Sessions',
        tutorialStep2Text: 'Choose the focus duration that suits you and start the session. While the timer is running, focus only on studying or working without distractions.',
        tutorialStep3Title: 'Time = Coins',
        tutorialStep3Text: 'Each completed focus minute gives you one coin. The more you focus, the more coins you get.',
        tutorialStep4Title: 'Lock During Focus',
        tutorialStep4Text: 'During a focus session, you cannot build or modify the city. This system is designed to protect your focus and prevent distractions.',
        tutorialStep5Title: 'Break Time = Building Time',
        tutorialStep5Text: 'When the focus session ends and break time begins, the city opens. Here you can use the coins you earned for building and development.',
        tutorialStep6Title: 'City and Buildings',
        tutorialStep6Text: 'The city represents your real progress. Every building you place is the result of time you focused honestly.',
        tutorialStep7Title: 'Daily Tasks and Points',
        tutorialStep7Text: 'You can add simple tasks below the timer. When you complete any task, you get 5 points, a ✓ appears, and the checkmark cannot be removed after completion.',
        tutorialStep8Title: 'Difference Between Coins and Points',
        tutorialStep8Text: 'Coins 💰: You get them from every focus minute, used for building. Points ⭐: You get them from completing tasks, expressing your daily commitment.',
        tutorialStep9Title: 'Guest or Sign In',
        tutorialStep9Text: 'You can use Umutime directly as a guest without creating an account. Sign in is optional, used only to save your progress and sync across devices.',
        tutorialStep10Title: 'Flashcards for Review',
        tutorialStep10Text: 'Create question and answer cards to review your lessons. Add at least 3 cards, then start reviewing. Tap the card to flip it and see the answer. Perfect for studying!',
        next: 'Next',
        // Flashcards
        flashcards: 'Flashcards',
        flashcardsInfo: 'Create question and answer cards to review your lessons. Minimum 3 cards.',
        addFlashcard: 'Add Card',
        startReview: 'Start Review',
        cancel: 'Cancel',
        card: 'Card',
        question: 'Question',
        answer: 'Answer',
        tapToReveal: 'Tap to reveal answer',
        nextCard: 'Next →',
        exitReview: 'Exit Review',
        questionPlaceholder: 'Write your question here...',
        answerPlaceholder: 'Write the answer here...',
        // New Session & History
        endSession: 'End Session',
        endSessionTitle: 'End Session',
        endSessionMsg: 'Do you want to save this session or delete it?',
        studyTime: 'Study Time',
        coinsEarned: 'Coins Earned',
        tasksCompleted: 'Tasks Completed',
        saveSession: '💾 Save Session',
        deleteSession: '🗑️ Delete Session',
        history: 'History',
        historyDesc: 'View your saved sessions',
        noSessions: 'No saved sessions',
        sessionDetails: 'Session Details',
        sessionInfo: 'Session Info',
        date: 'Date',
        cityState: 'City State',
        tasksTitle: 'Tasks',
        exportPDF: 'Export PDF (Coming Soon)',
        guestSaveWarning: 'Please sign in to save sessions',
        sessionSaved: 'Session saved successfully!',
        sessionDeleted: 'Session deleted',
        hrs: 'hrs',
        completedTasks: 'Completed',
        uncompletedTasks: 'Uncompleted'
    },
    ar: {
        selectSession: 'اختر مدة الجلسة',
        selectBreak: 'اختر مدة الاستراحة',
        selectSessions: 'عدد الجلسات',
        adjustSessions: 'تعديل عدد الجلسات',
        min: 'دقيقة',
        custom: 'مخصص',
        sessions: 'جلسات',
        nameCity: 'اسم مدينتك',
        cityName: 'اسم المدينة',
        startBuilding: 'ابدأ البناء',
        focusTimer: 'مؤقت التركيز',
        workSession: 'جلسة عمل',
        breakTime: 'وقت استراحة',
        session: 'جلسة',
        start: 'ابدأ',
        pause: 'إيقاف',
        buildMenu: 'قائمة البناء',
        buyLand: 'شراء أرض',
        goPremium: 'اشترك بريميوم!',
        population: 'السكان:',
        sessionComplete: 'انتهت الجلسة!',
        breakComplete: 'انتهت الاستراحة!',
        focusTime: 'وقت التركيز:',
        mins: 'دقيقة',
        earnings: 'المكاسب:',
        smallHouse: 'بيت صغير',
        office: 'مكتب',
        school: 'مدرسة',
        factory: 'مصنع',
        road: 'طريق',
        park: 'حديقة',
        set: 'تأكيد',
        addMoreTime: 'إضافة وقت',
        exitSession: 'خروج',
        buildingLocked: 'البناء مقفل أثناء الجلسة',
        tasks: 'المهام',
        addTask: 'أضف مهمة...',
        musicPlayer: 'مشغل الموسيقى',
        // New translations
        settings: 'الإعدادات',
        signIn: 'تسجيل الدخول',
        themeMode: 'وضع العرض',
        themeModeDesc: 'التبديل بين الوضع النهاري والليلي',
        lightMode: '☀️ نهاري',
        darkMode: '🌙 ليلي',
        language: 'اللغة',
        languageDesc: 'اختر لغتك المفضلة',
        english: 'EN',
        arabic: 'AR',
        guestMode: 'وضع الضيف',
        guestModeDesc: 'يتم حفظ تقدمك محلياً. سجل دخولك للمزامنة عبر الأجهزة.',
        tutorial: 'الشرح',
        tutorialDesc: 'تعلم كيفية استخدام Umutime',
        saveProgressMsg: 'سجل دخولك لحفظ تقدمك والمزامنة عبر الأجهزة!',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        signInBtn: 'تسجيل الدخول',
        or: 'أو',
        signInGoogle: 'متابعة بحساب Google',
        noAccount: 'ليس لديك حساب؟',
        signUpLink: 'إنشاء حساب',
        createAccountMsg: 'أنشئ حساباً لحفظ مدينتك للأبد!',
        username: 'اسم المستخدم',
        createAccount: 'إنشاء حساب',
        signUpGoogle: 'التسجيل بحساب Google',
        haveAccount: 'لديك حساب بالفعل؟',
        signInLink: 'تسجيل الدخول',
        // Tutorial
        tutorialStep1Title: 'ما هو Umutime؟',
        tutorialStep1Text: 'أهلاً! أنا حسين، مصمم ومبرمج Umutime. هذا الموقع لإدارة الوقت والتركيز، يساعدك على تنظيم يومك باستخدام جلسات تركيز واضحة. في Umutime، الوقت لا يمر فقط… بل يتحوّل إلى إنجاز وتقدم مرئي.',
        tutorialStep2Title: 'جلسات التركيز',
        tutorialStep2Text: 'اختر مدة التركيز التي تناسبك وابدأ الجلسة. أثناء عمل المؤقت، ركّز فقط على الدراسة أو العمل بدون تشتيت.',
        tutorialStep3Title: 'الوقت = عملات',
        tutorialStep3Text: 'كل دقيقة تركيز مكتملة تمنحك عملة واحدة. كلما ركّزت أكثر، حصلت على عملات أكثر.',
        tutorialStep4Title: 'القفل أثناء التركيز',
        tutorialStep4Text: 'أثناء جلسة التركيز، لا يمكنك البناء أو التعديل في المدينة. هذا النظام مصمم ليحمي تركيزك ويمنع التشتت.',
        tutorialStep5Title: 'وقت الاستراحة = وقت البناء',
        tutorialStep5Text: 'عند انتهاء جلسة التركيز وبدء وقت الاستراحة، يتم فتح المدينة. هنا يمكنك استخدام العملات التي حصلت عليها للبناء والتطوير.',
        tutorialStep6Title: 'المدينة والمباني',
        tutorialStep6Text: 'المدينة تمثل تقدمك الحقيقي. كل مبنى تضعه هو نتيجة وقت ركّزت فيه بصدق.',
        tutorialStep7Title: 'المهام اليومية والنقاط',
        tutorialStep7Text: 'يمكنك إضافة مهام بسيطة أسفل المؤقت. عند إكمال أي مهمة، تحصل على 5 نقاط، وتظهر علامة ✓، ولا يمكن إزالة العلامة بعد الإكمال.',
        tutorialStep8Title: 'الفرق بين العملات والنقاط',
        tutorialStep8Text: 'العملات 💰: تحصل عليها من كل دقيقة تركيز، تُستخدم للبناء. النقاط ⭐: تحصل عليها من إنجاز المهام، تعبّر عن التزامك اليومي.',
        tutorialStep9Title: 'ضيف أو تسجيل دخول',
        tutorialStep9Text: 'يمكنك استخدام Umutime مباشرة كضيف بدون إنشاء حساب. تسجيل الدخول اختياري، ويُستخدم فقط لحفظ تقدمك ومزامنته بين الأجهزة.',
        tutorialStep10Title: 'بطاقات المراجعة',
        tutorialStep10Text: 'أنشئ بطاقات أسئلة وأجوبة لمراجعة دروسك. أضف 3 بطاقات على الأقل، ثم ابدأ المراجعة. اضغط على البطاقة لقلبها ورؤية الإجابة. مثالي للدراسة!',
        next: 'التالي',
        // Flashcards
        flashcards: 'بطاقات التعلم',
        flashcardsInfo: 'أنشئ بطاقات أسئلة وأجوبة لمراجعة دروسك. الحد الأدنى 3 بطاقات.',
        addFlashcard: 'إضافة بطاقة',
        startReview: 'ابدأ المراجعة',
        cancel: 'إلغاء',
        card: 'بطاقة',
        question: 'سؤال',
        answer: 'إجابة',
        tapToReveal: 'اضغط لرؤية الإجابة',
        nextCard: 'التالي ←',
        exitReview: 'إنهاء المراجعة',
        questionPlaceholder: 'اكتب سؤالك هنا...',
        answerPlaceholder: 'اكتب الإجابة هنا...',
        // New Session & History
        endSession: 'إنهاء الجلسة',
        endSessionTitle: 'إنهاء الجلسة',
        endSessionMsg: 'هل تريد حفظ هذه الجلسة أم حذفها؟',
        studyTime: 'وقت الدراسة',
        coinsEarned: 'العملات المكتسبة',
        tasksCompleted: 'المهام المنجزة',
        saveSession: '💾 حفظ الجلسة',
        deleteSession: '🗑️ حذف الجلسة',
        history: 'السجل',
        historyDesc: 'عرض جلساتك المحفوظة',
        noSessions: 'لا توجد جلسات محفوظة',
        sessionDetails: 'تفاصيل الجلسة',
        sessionInfo: 'معلومات الجلسة',
        date: 'التاريخ',
        cityState: 'حالة المدينة',
        tasksTitle: 'المهام',
        exportPDF: 'تصدير PDF (قريباً)',
        guestSaveWarning: 'يرجى تسجيل الدخول لحفظ الجلسات',
        sessionSaved: 'تم حفظ الجلسة بنجاح!',
        sessionDeleted: 'تم حذف الجلسة',
        hrs: 'ساعة',
        completedTasks: 'منجزة',
        uncompletedTasks: 'غير منجزة'
    }
};

// Buildings Data
const buildings = [
    { id: 1, name: 'smallHouse', cost: 20, emoji: '🏠', population: 5 },
    { id: 2, name: 'office', cost: 50, emoji: '🏢', population: 10 },
    { id: 3, name: 'school', cost: 75, emoji: '🏫', population: 15 },
    { id: 4, name: 'factory', cost: 100, emoji: '🏭', population: 20 },
    { id: 5, name: 'road', cost: 10, emoji: '⬛', population: 0 },
    { id: 6, name: 'park', cost: 30, emoji: '🌲', population: 3 }
];

// Music Player Data
const musicTracks = [
    { 
        name: 'Rain 🌧️', 
        file: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_4dfbccff32.mp3' 
    }
];

let currentTrackIndex = 0;
let audioPlayer = null;
let isPlaying = false;

// Timer Alert Sound
let timerAlertSound = null;
let alertInterval = null;
let isAlertPlaying = false;

function initMusicPlayer() {
    audioPlayer = new Audio();
    audioPlayer.volume = 0.5;
    
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
    });
    
    audioPlayer.addEventListener('error', (e) => {
        console.log('Audio loading error:', e);
        const trackNameEl = document.getElementById('currentTrack');
        if (trackNameEl) {
            const msg = gameState.currentLang === 'ar' 
                ? 'جاري التحميل...' 
                : 'Loading...';
            trackNameEl.textContent = msg;
        }
    });
    
    // Initialize timer alert sound
    timerAlertSound = new Audio();
    timerAlertSound.volume = 0.7;
    
    // Create beep sound using Web Audio API
    createTimerAlertSound();
    
    loadTrack(0);
}

function createTimerAlertSound() {
    // Create a simple beep sound using data URL
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800; // Frequency in Hz
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    // Store for later use
    window.timerAudioContext = audioContext;
}

function playTimerAlert() {
    if (isAlertPlaying) return;
    
    isAlertPlaying = true;
    
    // Play school bell pattern continuously
    playSchoolBellRing();
    
    // Repeat every 3 seconds until stopped
    alertInterval = setInterval(() => {
        playSchoolBellRing();
    }, 3000);
    
    // Vibrate on mobile devices - continuous pattern
    if (navigator.vibrate) {
        vibratePattern();
    }
}

function playSchoolBellRing() {
    if (!window.timerAudioContext) return;
    
    // School bell pattern: high-low-high-low (like "ding-dong-ding-dong")
    const times = [0, 0.15, 0.3, 0.45, 0.6, 0.75]; // Multiple rings
    const frequencies = [1200, 900, 1200, 900, 1200, 900]; // Alternating high-low
    
    times.forEach((time, index) => {
        setTimeout(() => {
            playBellTone(frequencies[index]);
        }, time * 1000);
    });
}

function playBellTone(frequency) {
    if (!window.timerAudioContext) return;
    
    const audioContext = window.timerAudioContext;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function vibratePattern() {
    if (navigator.vibrate && isAlertPlaying) {
        navigator.vibrate([200, 100, 200, 100, 200]);
        setTimeout(() => {
            if (isAlertPlaying) vibratePattern();
        }, 1000);
    }
}

function stopTimerAlert() {
    isAlertPlaying = false;
    
    if (alertInterval) {
        clearInterval(alertInterval);
        alertInterval = null;
    }
    
    // Stop vibration
    if (navigator.vibrate) {
        navigator.vibrate(0);
    }
}

function playBeep() {
    if (!window.timerAudioContext) return;
    
    const audioContext = window.timerAudioContext;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

function loadTrack(index) {
    if (index >= 0 && index < musicTracks.length) {
        currentTrackIndex = index;
        audioPlayer.src = musicTracks[index].file;
        const trackNameEl = document.getElementById('currentTrack');
        if (trackNameEl) {
            trackNameEl.textContent = musicTracks[index].name;
        }
    }
}

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        document.querySelector('.play-music').textContent = '▶';
        isPlaying = false;
    } else {
        audioPlayer.play().catch(e => {
            console.log('Cannot play audio:', e);
            const msg = gameState.currentLang === 'ar'
                ? 'لا يمكن تشغيل الملف الصوتي. تأكد من وجود rain.mp3'
                : 'Cannot play audio. Make sure rain.mp3 exists';
            alert(msg);
        });
        document.querySelector('.play-music').textContent = '⏸';
        isPlaying = true;
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % musicTracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + musicTracks.length) % musicTracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
}

function setVolume(value) {
    if (audioPlayer) {
        audioPlayer.volume = value / 100;
    }
}

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');
const cityNameInput = document.getElementById('cityNameInput');
const startBtn = document.getElementById('startBtn');
const sessionBtns = document.querySelectorAll('.session-btn');
const timerDisplay = document.getElementById('timerDisplay');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const playText = document.getElementById('playText');
const resetBtn = document.getElementById('resetBtn');
const coinsDisplay = document.getElementById('coinsDisplay');
const starsDisplay = document.getElementById('starsDisplay');
const premiumDisplay = document.getElementById('premiumDisplay');
const populationDisplay = document.getElementById('populationDisplay');
const cityNameDisplay = document.getElementById('cityNameDisplay');
const buildingsList = document.getElementById('buildingsList');
const cityGrid = document.getElementById('cityGrid');
const completeModal = document.getElementById('completeModal');
const completedTime = document.getElementById('completedTime');
const completedPop = document.getElementById('completedPop');
const earnedCoins = document.getElementById('earnedCoins');
const addMoreTimeBtn = document.getElementById('addMoreTimeBtn');
const exitSessionBtn = document.getElementById('exitSessionBtn');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const tasksList = document.getElementById('tasksList');
const toggleBuildMenu = document.getElementById('toggleBuildMenu');
const buildingStatus = document.getElementById('buildingStatus');
const progressBar = document.getElementById('progressBar');
const timerLabel = document.getElementById('timerLabel');
const currentSessionDisplay = document.getElementById('currentSession');
const totalSessionsDisplay = document.getElementById('totalSessions');
const sessionsSlider = document.getElementById('sessionsSlider');
const sessionsValue = document.getElementById('sessionsValue');
const customWorkCard = document.getElementById('customWorkCard');
const customWorkInput = document.getElementById('customWorkInput');
const customMinutes = document.getElementById('customMinutes');
const setCustomWork = document.getElementById('setCustomWork');
const customBreakCard = document.getElementById('customBreakCard');
const customBreakInput = document.getElementById('customBreakInput');
const customBreakMinutes = document.getElementById('customBreakMinutes');
const setCustomBreak = document.getElementById('setCustomBreak');

let workCards, breakCards;

// New DOM Elements
const settingsModal = document.getElementById('settingsModal');
const signInModal = document.getElementById('signInModal');
const tutorialModal = document.getElementById('tutorialModal');
const flashcardsModal = document.getElementById('flashcardsModal');
const settingsBtn = document.getElementById('settingsBtn');
const settingsBtnGame = document.getElementById('settingsBtnGame');
const signInBtn = document.getElementById('signInBtn');
const signInBtnGame = document.getElementById('signInBtnGame');
const tutorialBtn = document.getElementById('tutorialBtn');
const flashcardsBtn = document.getElementById('flashcardsBtn');
const closeSettings = document.getElementById('closeSettings');
const closeSignIn = document.getElementById('closeSignIn');
const closeTutorial = document.getElementById('closeTutorial');
const closeFlashcards = document.getElementById('closeFlashcards');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const switchToSignUp = document.getElementById('switchToSignUp');
const switchToSignIn = document.getElementById('switchToSignIn');
const authTitle = document.getElementById('authTitle');

// Session & History Elements
const endSessionBtn = document.getElementById('endSessionBtn');
const endSessionModal = document.getElementById('endSessionModal');
const closeEndSession = document.getElementById('closeEndSession');
const saveSessionBtn = document.getElementById('saveSessionBtn');
const deleteSessionBtn = document.getElementById('deleteSessionBtn');
const summaryTime = document.getElementById('summaryTime');
const summaryCoins = document.getElementById('summaryCoins');
const summaryTasks = document.getElementById('summaryTasks');
const historySetting = document.getElementById('historySetting');
const historyModal = document.getElementById('historyModal');
const closeHistory = document.getElementById('closeHistory');
const historyList = document.getElementById('historyList');
const emptyHistory = document.getElementById('emptyHistory');
const sessionDetailsModal = document.getElementById('sessionDetailsModal');
const closeSessionDetails = document.getElementById('closeSessionDetails');

// Session tracking
let sessionStartTime = null;
let totalStudyMinutes = 0;
let currentSessionId = null;

// ============================================
// GLOBAL MODAL MANAGER - FIX PERFORMANCE ISSUE
// ============================================
const modalStack = [];

function closeAllModals() {
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => modal.classList.add('hidden'));
    modalStack.length = 0;
}

function openModal(modalElement) {
    if (!modalElement) return;
    
    // Close ALL other modals first to prevent stacking
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        if (modal !== modalElement) {
            modal.classList.add('hidden');
        }
    });
    
    // Clear stack
    modalStack.length = 0;
    
    // Open new modal
    modalElement.classList.remove('hidden');
    modalStack.push(modalElement);
}

function closeModal(modalElement) {
    if (!modalElement) return;
    
    modalElement.classList.add('hidden');
    
    const index = modalStack.indexOf(modalElement);
    if (index > -1) {
        modalStack.splice(index, 1);
    }
}

// ============================================
// TOAST NOTIFICATION SYSTEM - PHONE STYLE
// ============================================

function showToast(options) {
    const {
        icon = '💡',
        title = '',
        message = '',
        type = 'default',
        duration = 3000
    } = options;
    
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">✕</button>
    `;
    
    container.appendChild(toast);
    
    // Close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        removeToast(toast);
    });
    
    // Click anywhere on toast to close
    toast.addEventListener('click', (e) => {
        if (e.target !== closeBtn) {
            removeToast(toast);
        }
    });
    
    // Auto remove after duration
    if (duration > 0) {
        setTimeout(() => {
            removeToast(toast);
        }, duration);
    }
}

function removeToast(toast) {
    toast.classList.add('toast-out');
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 300);
}

function showPremiumToast() {
    const isArabic = gameState.currentLang === 'ar';
    showToast({
        icon: '🚀',
        title: isArabic ? 'قريباً!' : 'Coming Soon!',
        message: isArabic ? 'ميزة Premium قيد التطوير. ترقبوا!' : 'Premium feature under development. Stay tuned!',
        type: 'premium',
        duration: 3500
    });
}

function showLoginToast() {
    const isArabic = gameState.currentLang === 'ar';
    showToast({
        icon: '🔐',
        title: isArabic ? 'قريباً!' : 'Coming Soon!',
        message: isArabic ? 'نظام تسجيل الدخول قيد التطوير.' : 'Login system under development.',
        type: 'login',
        duration: 3500
    });
}

// Translation Function
function translatePage() {
    const lang = gameState.currentLang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Translate all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update language toggle
    updateLanguageToggle();
    
    // Re-render buildings with translated names
    renderBuildings();
}

// Initialize
function init() {
    // Initialize Supabase
    initSupabase();
    
    // Get cards after DOM is loaded
    workCards = document.querySelectorAll('.time-card');
    breakCards = document.querySelectorAll('.break-card');
    
    // Set initial collapsed state
    if (buildingsList) {
        buildingsList.classList.add('collapsed');
    }
    
    // Initialize sessions value from slider
    if (sessionsSlider && sessionsValue) {
        gameState.totalSessions = parseInt(sessionsSlider.value);
        sessionsValue.textContent = sessionsSlider.value;
    }
    
    setupEventListeners();
    renderBuildings();
    renderGrid();
    renderTasks();
    updateDisplay();
    updateSessionDisplay();
    updateThemeToggle();
    updateLanguageToggle();
    
    // Initialize Music Player
    initMusicPlayer();
}

// Local Storage Functions
function saveGameState() {
    const stateToSave = {
        cityName: gameState.cityName,
        coins: gameState.coins,
        stars: gameState.stars,
        population: gameState.population,
        grid: gameState.grid,
        tasks: gameState.tasks,
        darkMode: gameState.darkMode,
        currentLang: gameState.currentLang
    };
    localStorage.setItem('umutime_gamestate', JSON.stringify(stateToSave));
}

function loadGameState() {
    const saved = localStorage.getItem('umutime_gamestate');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            gameState.cityName = parsed.cityName || '';
            gameState.coins = parsed.coins || 50;
            gameState.stars = parsed.stars || 0;
            gameState.population = parsed.population || 0;
            gameState.grid = parsed.grid || Array(8).fill(null).map(() => Array(8).fill(null));
            gameState.tasks = parsed.tasks || [];
            gameState.darkMode = parsed.darkMode || false;
            gameState.currentLang = parsed.currentLang || 'en';
            
            // Apply theme
            if (gameState.darkMode) {
                document.body.classList.add('dark-mode');
            }
            
            // Apply language
            translatePage();
        } catch (e) {
            console.error('Error loading game state:', e);
        }
    }
}

// Event Listeners
function setupEventListeners() {
    // Settings buttons
    if (settingsBtn) settingsBtn.addEventListener('click', openSettings);
    if (settingsBtnGame) settingsBtnGame.addEventListener('click', openSettings);
    if (closeSettings) closeSettings.addEventListener('click', closeSettingsModal);
    
    // Tutorial buttons
    if (closeTutorial) closeTutorial.addEventListener('click', closeTutorialModal);
    if (document.getElementById('tutorialSetting')) {
        document.getElementById('tutorialSetting').addEventListener('click', () => {
            closeSettingsModal();
            openTutorial();
        });
    }
    
    // Flashcards buttons
    if (flashcardsBtn) flashcardsBtn.addEventListener('click', openFlashcards);
    if (closeFlashcards) closeFlashcards.addEventListener('click', closeFlashcardsModal);
    
    // End Session & History
    if (endSessionBtn) endSessionBtn.addEventListener('click', openEndSessionModal);
    if (closeEndSession) closeEndSession.addEventListener('click', closeEndSessionModal);
    if (saveSessionBtn) saveSessionBtn.addEventListener('click', handleSaveSession);
    if (deleteSessionBtn) deleteSessionBtn.addEventListener('click', handleDeleteSession);
    if (closeHistory) closeHistory.addEventListener('click', closeHistoryModal);
    if (closeSessionDetails) closeSessionDetails.addEventListener('click', closeSessionDetailsModal);
    
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-option')) {
                toggleTheme();
            }
        });
    }
    
    // Language toggle
    if (langToggle) {
        langToggle.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-option')) {
                toggleLanguage();
            }
        });
    }
    
    // Auth form switching
    if (switchToSignUp) {
        switchToSignUp.addEventListener('click', () => {
            signInForm.classList.add('hidden');
            signUpForm.classList.remove('hidden');
            authTitle.textContent = translations[gameState.currentLang].signUpLink;
        });
    }
    
    if (switchToSignIn) {
        switchToSignIn.addEventListener('click', () => {
            signUpForm.classList.add('hidden');
            signInForm.classList.remove('hidden');
            authTitle.textContent = translations[gameState.currentLang].signIn;
        });
    }
    
    // Auth form submissions (placeholder functionality)
    if (document.getElementById('signInSubmit')) {
        document.getElementById('signInSubmit').addEventListener('click', handleSignIn);
    }
    if (document.getElementById('signUpSubmit')) {
        document.getElementById('signUpSubmit').addEventListener('click', handleSignUp);
    }
    
    // Premium & Sign In - Coming Soon
    if (document.getElementById('premiumBtn')) {
        document.getElementById('premiumBtn').addEventListener('click', () => {
            showPremiumToast();
        });
    }
    
    // Music Button - Coming Soon
    if (document.getElementById('musicBtn')) {
        document.getElementById('musicBtn').addEventListener('click', () => {
            const isArabic = gameState.currentLang === 'ar';
            showToast({
                icon: '🎵',
                title: isArabic ? 'قريباً!' : 'Coming Soon!',
                message: isArabic ? 'مشغل الموسيقى قيد التطوير.' : 'Music player under development.',
                type: 'login',
                duration: 3000
            });
        });
    }
    
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            showLoginToast();
        });
    }
    
    if (signInBtnGame) {
        signInBtnGame.addEventListener('click', () => {
            showLoginToast();
        });
    }
    
    // Close modals on outside click
    settingsModal?.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeSettingsModal();
    });
    signInModal?.addEventListener('click', (e) => {
        if (e.target === signInModal) closeSignInModal();
    });
    
    // Toggle build menu
    if (toggleBuildMenu) {
        toggleBuildMenu.addEventListener('click', () => {
            buildingsList.classList.toggle('collapsed');
            toggleBuildMenu.classList.toggle('collapsed');
            toggleBuildMenu.textContent = buildingsList.classList.contains('collapsed') ? '▼' : '▲';
        });
    }
    
    // Sessions slider
    if (sessionsSlider) {
        sessionsSlider.addEventListener('input', () => {
            if (sessionsValue) {
                sessionsValue.textContent = sessionsSlider.value;
                gameState.totalSessions = parseInt(sessionsSlider.value);
            }
        });
    }
    
    // Custom work card
    if (customWorkCard) {
        customWorkCard.addEventListener('click', () => {
            if (customWorkInput) customWorkInput.classList.toggle('hidden');
        });
    }
    
    // Set custom work
    if (setCustomWork) {
        setCustomWork.addEventListener('click', () => {
            const minutes = parseInt(customMinutes.value);
            if (minutes && minutes > 0 && minutes <= 120) {
                workCards.forEach(c => c.classList.remove('active'));
                customWorkCard.classList.add('active');
                gameState.sessionLength = minutes;
                
                const timeDiv = customWorkCard.querySelector('.card-time');
                if (timeDiv) timeDiv.textContent = minutes;
                
                customWorkInput.classList.add('hidden');
                customMinutes.value = '';
            }
        });
    }
    
    // Custom break card
    if (customBreakCard) {
        customBreakCard.addEventListener('click', () => {
            if (customBreakInput) customBreakInput.classList.toggle('hidden');
        });
    }
    
    // Set custom break
    if (setCustomBreak) {
        setCustomBreak.addEventListener('click', () => {
            const minutes = parseInt(customBreakMinutes.value);
            if (minutes && minutes > 0 && minutes <= 60) {
                breakCards.forEach(c => c.classList.remove('active'));
                customBreakCard.classList.add('active');
                gameState.breakLength = minutes;
                
                const timeDiv = customBreakCard.querySelector('.break-time');
                if (timeDiv) timeDiv.textContent = minutes;
                
                customBreakInput.classList.add('hidden');
                customBreakMinutes.value = '';
            }
        });
    }
    
    // Work cards
    if (workCards) {
        workCards.forEach(card => {
            if (card.id !== 'customWorkCard') {
                card.addEventListener('click', () => {
                    workCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    gameState.sessionLength = parseInt(card.dataset.time);
                });
            }
        });
    }

    // Break cards
    if (breakCards) {
        breakCards.forEach(card => {
            if (card.id !== 'customBreakCard') {
                card.addEventListener('click', () => {
                    breakCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    gameState.breakLength = parseInt(card.dataset.time);
                });
            }
        });
    }

    // Start button
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
    
    if (cityNameInput) {
        cityNameInput.addEventListener('input', () => {
            startBtn.disabled = !cityNameInput.value.trim();
        });
    }

    // Timer controls
    if (playPauseBtn) playPauseBtn.addEventListener('click', toggleTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);
    
    // Complete modal buttons
    if (addMoreTimeBtn) addMoreTimeBtn.addEventListener('click', addMoreTime);
    if (exitSessionBtn) exitSessionBtn.addEventListener('click', exitSession);
    
    // Stop alert when clicking outside modal
    if (completeModal) {
        completeModal.addEventListener('click', (e) => {
            if (e.target === completeModal) {
                stopTimerAlert();
            }
        });
    }
    
    // Tasks
    if (addTaskBtn) addTaskBtn.addEventListener('click', addTask);
    if (taskInput) {
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });
    }
}

// Settings Modal Functions
function openSettings() {
    openModal(settingsModal);
    updateThemeToggle();
    updateLanguageToggle();
}

function closeSettingsModal() {
    closeModal(settingsModal);
}

function updateThemeToggle() {
    const options = themeToggle.querySelectorAll('.toggle-option');
    options.forEach(opt => opt.classList.remove('active'));
    if (gameState.darkMode) {
        options[1].classList.add('active');
    } else {
        options[0].classList.add('active');
    }
}

function updateLanguageToggle() {
    const options = langToggle.querySelectorAll('.toggle-option');
    options.forEach(opt => opt.classList.remove('active'));
    if (gameState.currentLang === 'ar') {
        options[1].classList.add('active');
    } else {
        options[0].classList.add('active');
    }
}

// Sign In Modal Functions
function openSignIn() {
    openModal(signInModal);
    signInForm.classList.remove('hidden');
    signUpForm.classList.add('hidden');
    authTitle.textContent = translations[gameState.currentLang].signIn;
}

function closeSignInModal() {
    closeModal(signInModal);
}

async function handleSignIn() {
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;
    
    if (!username || !password) {
        alert(gameState.currentLang === 'ar' ? 'املأ جميع الحقول!' : 'Please fill in all fields!');
        return;
    }
    
    try {
        const email = `${username}@umutime.local`;
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) {
            alert(gameState.currentLang === 'ar' ? 'خطأ في تسجيل الدخول: اسم المستخدم أو كلمة المرور غير صحيحة' : 'Login error: Invalid username or password');
        } else {
            gameState.user = data.user;
            gameState.isGuest = false;
            alert(gameState.currentLang === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!');
            closeSignInModal();
            await loadUserData();
        }
    } catch (err) {
        console.error('Login error:', err);
        alert(gameState.currentLang === 'ar' ? 'حدث خطأ أثناء تسجيل الدخول' : 'An error occurred during login');
    }
}

async function handleSignUp() {
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;
    
    if (!username || !password) {
        alert(gameState.currentLang === 'ar' ? 'املأ جميع الحقول!' : 'Please fill in all fields!');
        return;
    }
    
    if (password.length < 6) {
        alert(gameState.currentLang === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
        return;
    }
    
    alert(gameState.currentLang === 'ar' ? 'سيتم تفعيل التسجيل قريباً' : 'Sign up will be available soon');
}

function toggleLanguage() {
    gameState.currentLang = gameState.currentLang === 'en' ? 'ar' : 'en';
    translatePage();
    updateLanguageToggle();
    // saveGameState();
}

function toggleTheme() {
    gameState.darkMode = !gameState.darkMode;
    document.body.classList.toggle('dark-mode');
    updateThemeToggle();
    // saveGameState();
}

// Start Game
function startGame() {
    if (cityNameInput.value.trim()) {
        gameState.cityName = cityNameInput.value.trim();
        
        // Show loading screen
        showLoadingScreen();
        
        // Hide welcome, show loading
        welcomeScreen.classList.add('hidden');
        
        // Simulate city building (3-5 seconds)
        const loadingDuration = 3000 + Math.random() * 2000; // 3-5 seconds
        
        setTimeout(() => {
            // Initialize game state
            gameState.isWorkSession = true;
            gameState.timeLeft = gameState.sessionLength * 60;
            gameState.lastMinute = Math.floor(gameState.timeLeft / 60);
            cityNameDisplay.textContent = gameState.cityName;
            
            // Hide loading, show game
            hideLoadingScreen();
            gameScreen.classList.remove('hidden');
            
            updateTimerDisplay();
            updateSessionDisplay();
            updateBuildingLock();
            
            // Start session tracking
            sessionStartTime = new Date();
            totalStudyMinutes = 0;
        }, loadingDuration);
    }
}

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingText = document.getElementById('loadingText');
    
    if (!loadingScreen) return;
    
    loadingScreen.classList.remove('hidden');
    
    const messages = gameState.currentLang === 'ar' ? [
        'جارٍ بناء مدينتك...',
        'تحضير أول مهمة...',
        'ضبط مؤقت التركيز...',
        'استعد للإنجاز! 🚀'
    ] : [
        'Building your city...',
        'Preparing your first task...',
        'Setting up focus timer...',
        'Get ready to achieve! 🚀'
    ];
    
    let messageIndex = 0;
    
    // Change message every 1 second
    const messageInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        if (loadingText) {
            loadingText.textContent = messages[messageIndex];
        }
    }, 1000);
    
    // Store interval to clear later
    loadingScreen.dataset.intervalId = messageInterval;
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (!loadingScreen) return;
    
    // Clear message interval
    const intervalId = loadingScreen.dataset.intervalId;
    if (intervalId) {
        clearInterval(parseInt(intervalId));
    }
    
    loadingScreen.classList.add('hidden');
}

function updateSessionDisplay() {
    currentSessionDisplay.textContent = gameState.currentSession;
    totalSessionsDisplay.textContent = gameState.totalSessions;
}

function updateBuildingLock() {
    if (gameState.isRunning && gameState.isWorkSession) {
        buildingStatus.classList.remove('hidden');
        buildingsList.style.opacity = '0.5';
        buildingsList.style.pointerEvents = 'none';
    } else {
        buildingStatus.classList.add('hidden');
        buildingsList.style.opacity = '1';
        buildingsList.style.pointerEvents = 'auto';
    }
}

// Timer Functions
function toggleTimer() {
    gameState.isRunning = !gameState.isRunning;
    
    if (gameState.isRunning) {
        playIcon.textContent = '⏸';
        playText.textContent = translations[gameState.currentLang].pause;
        startTimer();
    } else {
        playIcon.textContent = '▶';
        playText.textContent = translations[gameState.currentLang].start;
        stopTimer();
    }
    
    updateBuildingLock();
}

function startTimer() {
    gameState.timerInterval = setInterval(() => {
        if (gameState.timeLeft > 0) {
            gameState.timeLeft--;
            
            const totalTime = gameState.isWorkSession ? gameState.sessionLength * 60 : gameState.breakLength * 60;
            const progress = ((totalTime - gameState.timeLeft) / totalTime) * 100;
            if (progressBar) progressBar.style.width = `${progress}%`;
            
            if (gameState.isWorkSession) {
                const currentMinute = Math.floor(gameState.timeLeft / 60);
                if (currentMinute < gameState.lastMinute) {
                    gameState.coins += gameState.coinsPerMinute;
                    gameState.stars += gameState.coinsPerMinute;
                    gameState.lastMinute = currentMinute;
                    totalStudyMinutes++;
                    updateDisplay();
                }
            }
            
            updateTimerDisplay();
        } else {
            completeSession();
        }
    }, 1000);
}

function stopTimer() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
        gameState.timerInterval = null;
    }
}

function resetTimer() {
    gameState.isRunning = false;
    
    if (gameState.isWorkSession) {
        gameState.timeLeft = gameState.sessionLength * 60;
        gameState.lastMinute = Math.floor(gameState.timeLeft / 60);
    } else {
        gameState.timeLeft = gameState.breakLength * 60;
    }
    
    playIcon.textContent = '▶';
    playText.textContent = translations[gameState.currentLang].start;
    stopTimer();
    updateTimerDisplay();
    updateBuildingLock();
}

function completeSession() {
    stopTimer();
    gameState.isRunning = false;
    playIcon.textContent = '▶';
    playText.textContent = translations[gameState.currentLang].start;
    
    // Play timer alert sound
    playTimerAlert();
    
    if (gameState.isWorkSession) {
        const earnedAmount = gameState.sessionLength;
        gameState.coins += earnedAmount;
        gameState.stars += earnedAmount;
        
        completedTime.textContent = gameState.sessionLength;
        completedPop.textContent = gameState.population;
        earnedCoins.textContent = `+${earnedAmount}`;
        
        completeModal.querySelector('h2').textContent = translations[gameState.currentLang].sessionComplete;
        
        completeModal.classList.remove('hidden');
        updateDisplay();
        // saveGameState();
        
        gameState.isWorkSession = false;
        gameState.timeLeft = gameState.breakLength * 60;
        timerLabel.textContent = translations[gameState.currentLang].breakTime;
        timerLabel.style.color = '#22c55e';
        
        gameState.currentSession++;
        if (gameState.currentSession > gameState.totalSessions) {
            gameState.currentSession = 1;
        }
        updateSessionDisplay();
        
    } else {
        completeModal.querySelector('h2').textContent = translations[gameState.currentLang].breakComplete;
        earnedCoins.textContent = '+0';
        completeModal.classList.remove('hidden');
        
        gameState.isWorkSession = true;
        gameState.timeLeft = gameState.sessionLength * 60;
        gameState.lastMinute = Math.floor(gameState.timeLeft / 60);
        timerLabel.textContent = translations[gameState.currentLang].workSession;
        timerLabel.style.color = 'white';
    }
    
    updateTimerDisplay();
    updateBuildingLock();
}

function addMoreTime() {
    stopTimerAlert(); // Stop the alert sound
    completeModal.classList.add('hidden');
    
    if (gameState.isWorkSession) {
        gameState.timeLeft = gameState.sessionLength * 60;
        gameState.lastMinute = Math.floor(gameState.timeLeft / 60);
    } else {
        gameState.timeLeft = gameState.breakLength * 60;
    }
    
    updateTimerDisplay();
}

function exitSession() {
    stopTimerAlert(); // Stop the alert sound
    completeModal.classList.add('hidden');
    gameScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    
    gameState.isWorkSession = true;
    gameState.currentSession = 1;
    gameState.timeLeft = gameState.sessionLength * 60;
    gameState.lastMinute = Math.floor(gameState.timeLeft / 60);
    gameState.isRunning = false;
    playIcon.textContent = '▶';
    playText.textContent = translations[gameState.currentLang].start;
    timerLabel.textContent = translations[gameState.currentLang].workSession;
    timerLabel.style.color = 'white';
    updateTimerDisplay();
    updateSessionDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(gameState.timeLeft / 60);
    const seconds = gameState.timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Render Buildings
function renderBuildings() {
    buildingsList.innerHTML = '';
    const lang = gameState.currentLang;
    
    buildings.forEach(building => {
        const buildingDiv = document.createElement('div');
        buildingDiv.className = 'building-item';
        
        if (gameState.coins < building.cost) {
            buildingDiv.classList.add('disabled');
        }
        
        if (gameState.selectedBuilding === building.id) {
            buildingDiv.classList.add('selected');
        }
        
        buildingDiv.innerHTML = `
            <div class="building-left">
                <div class="building-emoji">${building.emoji}</div>
                <div class="building-name">${translations[lang][building.name]}</div>
            </div>
            <div class="building-cost">
                <span class="cost-icon">💰</span>
                <span class="cost-value">${building.cost}</span>
            </div>
        `;
        
        buildingDiv.addEventListener('click', () => {
            if (gameState.coins >= building.cost) {
                gameState.selectedBuilding = building.id;
                renderBuildings();
                renderGrid();
            }
        });
        
        buildingsList.appendChild(buildingDiv);
    });
}

// Render Grid
function renderGrid() {
    cityGrid.innerHTML = '';
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            
            const cellBuilding = gameState.grid[row][col];
            if (cellBuilding) {
                cell.textContent = cellBuilding.emoji;
            }
            
            if (gameState.selectedBuilding && !cellBuilding) {
                cell.classList.add('selectable');
            }
            
            cell.addEventListener('click', () => handleGridClick(row, col));
            cityGrid.appendChild(cell);
        }
    }
}

// Handle Grid Click
function handleGridClick(row, col) {
    if ((gameState.isRunning && gameState.isWorkSession) || !gameState.selectedBuilding || gameState.grid[row][col]) {
        return;
    }
    
    const building = buildings.find(b => b.id === gameState.selectedBuilding);
    
    if (building && gameState.coins >= building.cost) {
        gameState.grid[row][col] = building;
        gameState.coins -= building.cost;
        gameState.population += building.population;
        gameState.selectedBuilding = null;
        
        const cells = cityGrid.querySelectorAll('.grid-cell');
        const cellIndex = row * 8 + col;
        const cell = cells[cellIndex];
        
        if (cell) {
            const sparkle = document.createElement('div');
            sparkle.className = 'build-sparkle';
            sparkle.textContent = '✨';
            cell.style.position = 'relative';
            cell.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 600);
        }
        
        updateDisplay();
        renderBuildings();
        renderGrid();
        // saveGameState();
    }
}

// Update Display
function updateDisplay() {
    coinsDisplay.textContent = gameState.coins;
    starsDisplay.textContent = gameState.stars;
    populationDisplay.textContent = gameState.population;
}

// Tasks Functions
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        gameState.tasks.push({
            id: Date.now(),
            text: taskText,
            completed: false
        });
        taskInput.value = '';
        renderTasks();
        // saveGameState();
    }
}

function toggleTask(id) {
    const task = gameState.tasks.find(t => t.id === id);
    if (task && !task.completed) {
        task.completed = true;
        
        gameState.coins += 5;
        gameState.stars += 5;
        updateDisplay();
        
        renderTasks();
        // saveGameState();
    }
}

function deleteTask(id) {
    gameState.tasks = gameState.tasks.filter(t => t.id !== id);
    renderTasks();
    // saveGameState();
}

function renderTasks() {
    tasksList.innerHTML = '';
    
    gameState.tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="task-delete">×</button>
        `;
        
        const checkbox = taskDiv.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTask(task.id));
        
        const deleteBtn = taskDiv.querySelector('.task-delete');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        tasksList.appendChild(taskDiv);
    });
}

// ============================================
// TUTORIAL FUNCTIONS
// ============================================

let currentTutorialStep = 1;
const totalTutorialSteps = 10;

function openTutorial() {
    if (tutorialModal) {
        openModal(tutorialModal);
        currentTutorialStep = 1;
        showTutorialStep(1);
        initTutorialDots();
    }
}

function closeTutorialModal() {
    closeModal(tutorialModal);
}

function initTutorialDots() {
    const dotsContainer = document.querySelector('.tutorial-dots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    for (let i = 1; i <= totalTutorialSteps; i++) {
        const dot = document.createElement('div');
        dot.className = `tutorial-dot ${i === 1 ? 'active' : ''}`;
        dot.addEventListener('click', () => showTutorialStep(i));
        dotsContainer.appendChild(dot);
    }
}

function showTutorialStep(step) {
    const steps = document.querySelectorAll('.tutorial-step');
    const dots = document.querySelectorAll('.tutorial-dot');
    const prevBtn = document.getElementById('tutorialPrev');
    const nextBtn = document.getElementById('tutorialNext');
    
    steps.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    const currentStep = document.querySelector(`.tutorial-step[data-step="${step}"]`);
    if (currentStep) {
        currentStep.classList.add('active');
        currentTutorialStep = step;
    }
    
    if (dots[step - 1]) {
        dots[step - 1].classList.add('active');
    }
    
    // Update buttons
    if (prevBtn) {
        prevBtn.disabled = step === 1;
    }
    
    if (nextBtn) {
        const nextText = nextBtn.querySelector('span[data-i18n]');
        if (step === totalTutorialSteps) {
            if (nextText) nextText.textContent = translations[gameState.currentLang].exitReview || 'إنهاء';
        } else {
            if (nextText) nextText.textContent = translations[gameState.currentLang].next;
        }
    }
}

// Tutorial Navigation
if (document.getElementById('tutorialNext')) {
    document.getElementById('tutorialNext').addEventListener('click', () => {
        if (currentTutorialStep < totalTutorialSteps) {
            showTutorialStep(currentTutorialStep + 1);
        } else {
            closeTutorialModal();
        }
    });
}

if (document.getElementById('tutorialPrev')) {
    document.getElementById('tutorialPrev').addEventListener('click', () => {
        if (currentTutorialStep > 1) {
            showTutorialStep(currentTutorialStep - 1);
        }
    });
}

// ============================================
// FLASHCARDS FUNCTIONS
// ============================================

let tempFlashcards = [];
let currentReviewIndex = 0;
let isCardFlipped = false;

function openFlashcards() {
    if (flashcardsModal) {
        openModal(flashcardsModal);
        showCreateFlashcardsView();
        tempFlashcards = [];
        renderFlashcardsList();
    }
}

function closeFlashcardsModal() {
    closeModal(flashcardsModal);
    tempFlashcards = [];
}

function showCreateFlashcardsView() {
    const createView = document.getElementById('createFlashcardsView');
    const reviewView = document.getElementById('reviewFlashcardsView');
    if (createView) createView.classList.remove('hidden');
    if (reviewView) reviewView.classList.add('hidden');
}

function showReviewFlashcardsView() {
    const createView = document.getElementById('createFlashcardsView');
    const reviewView = document.getElementById('reviewFlashcardsView');
    if (createView) createView.classList.add('hidden');
    if (reviewView) reviewView.classList.remove('hidden');
    
    // Shuffle cards for random review
    tempFlashcards = shuffleArray([...tempFlashcards]);
    currentReviewIndex = 0;
    isCardFlipped = false;
    showCurrentCard();
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function renderFlashcardsList() {
    const list = document.getElementById('flashcardsList');
    const startBtn = document.getElementById('startReview');
    
    if (!list) return;
    
    list.innerHTML = '';
    
    tempFlashcards.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'flashcard-item';
        cardDiv.innerHTML = `
            <div class="flashcard-number">${index + 1}</div>
            <div class="flashcard-inputs">
                <input type="text" 
                       class="flashcard-input question-input" 
                       placeholder="${translations[gameState.currentLang].questionPlaceholder}"
                       value="${card.question}"
                       data-index="${index}"
                       data-type="question">
                <input type="text" 
                       class="flashcard-input answer-input" 
                       placeholder="${translations[gameState.currentLang].answerPlaceholder}"
                       value="${card.answer}"
                       data-index="${index}"
                       data-type="answer">
            </div>
            <button class="delete-flashcard-btn" data-index="${index}">×</button>
        `;
        list.appendChild(cardDiv);
    });
    
    // Add event listeners
    document.querySelectorAll('.flashcard-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const index = parseInt(e.target.dataset.index);
            const type = e.target.dataset.type;
            if (tempFlashcards[index]) {
                tempFlashcards[index][type] = e.target.value;
            }
            updateStartButton();
        });
    });
    
    document.querySelectorAll('.delete-flashcard-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            tempFlashcards.splice(index, 1);
            renderFlashcardsList();
        });
    });
    
    updateStartButton();
}

function updateStartButton() {
    const startBtn = document.getElementById('startReview');
    if (!startBtn) return;
    
    const validCards = tempFlashcards.filter(c => c.question.trim() && c.answer.trim());
    startBtn.disabled = validCards.length < 3;
}

function showCurrentCard() {
    if (tempFlashcards.length === 0) return;
    
    const card = tempFlashcards[currentReviewIndex];
    const questionEl = document.getElementById('reviewQuestion');
    const answerEl = document.getElementById('reviewAnswer');
    const currentNum = document.getElementById('currentCardNumber');
    const totalNum = document.getElementById('totalCards');
    const flipContainer = document.querySelector('.flashcard-flip-container');
    
    if (questionEl) questionEl.textContent = card.question;
    if (answerEl) answerEl.textContent = card.answer;
    if (currentNum) currentNum.textContent = currentReviewIndex + 1;
    if (totalNum) totalNum.textContent = tempFlashcards.length;
    
    // Reset flip
    if (flipContainer) {
        flipContainer.classList.remove('flipped');
    }
    isCardFlipped = false;
}

// Flashcard Event Listeners
if (document.getElementById('addFlashcard')) {
    document.getElementById('addFlashcard').addEventListener('click', () => {
        tempFlashcards.push({ question: '', answer: '' });
        renderFlashcardsList();
    });
}

if (document.getElementById('startReview')) {
    document.getElementById('startReview').addEventListener('click', () => {
        const validCards = tempFlashcards.filter(c => c.question.trim() && c.answer.trim());
        if (validCards.length >= 3) {
            tempFlashcards = validCards;
            showReviewFlashcardsView();
        }
    });
}

if (document.getElementById('cancelCreate')) {
    document.getElementById('cancelCreate').addEventListener('click', closeFlashcardsModal);
}

if (document.querySelector('.flashcard-flip-container')) {
    document.querySelector('.flashcard-flip-container').addEventListener('click', () => {
        const container = document.querySelector('.flashcard-flip-container');
        if (container) {
            container.classList.toggle('flipped');
            isCardFlipped = !isCardFlipped;
        }
    });
}

if (document.getElementById('nextCard')) {
    document.getElementById('nextCard').addEventListener('click', () => {
        currentReviewIndex = (currentReviewIndex + 1) % tempFlashcards.length;
        showCurrentCard();
    });
}

if (document.getElementById('exitReview')) {
    document.getElementById('exitReview').addEventListener('click', closeFlashcardsModal);
}

// Close modals on outside click
if (tutorialModal) {
    tutorialModal.addEventListener('click', (e) => {
        if (e.target === tutorialModal) closeTutorialModal();
    });
}

if (flashcardsModal) {
    flashcardsModal.addEventListener('click', (e) => {
        if (e.target === flashcardsModal) closeFlashcardsModal();
    });
}

// Close modals with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Start the app
init();

// ============================================
// SUPABASE DATA FUNCTIONS
// ============================================


// ============================================
// END SESSION & HISTORY FUNCTIONS
// ============================================

function openEndSessionModal() {
    if (summaryTime) summaryTime.textContent = totalStudyMinutes;
    if (summaryCoins) summaryCoins.textContent = gameState.coins;
    
    const completedTasks = gameState.tasks.filter(t => t.completed).length;
    if (summaryTasks) summaryTasks.textContent = completedTasks;
    
    openModal(endSessionModal);
}

function closeEndSessionModal() {
    closeModal(endSessionModal);
}

function handleSaveSession() {
    const isArabic = gameState.currentLang === 'ar';
    showToast({
        icon: '💾',
        title: isArabic ? 'قريباً!' : 'Coming Soon!',
        message: isArabic ? 'ميزة حفظ الجلسات قيد التطوير.' : 'Session saving feature under development.',
        type: 'premium',
        duration: 3000
    });
    closeEndSessionModal();
}

function handleDeleteSession() {
    const isArabic = gameState.currentLang === 'ar';
    
    showToast({
        icon: '✅',
        title: isArabic ? 'تم إنهاء الجلسة' : 'Session Ended',
        message: isArabic ? 'تم إنهاء الجلسة بنجاح.' : 'Session ended successfully.',
        type: 'login',
        duration: 2500
    });
    
    closeEndSessionModal();
    
    setTimeout(() => {
        resetToWelcome();
    }, 500);
}

function resetToWelcome() {
    gameState.coins = 50;
    gameState.stars = 0;
    gameState.population = 0;
    gameState.grid = Array(8).fill(null).map(() => Array(8).fill(null));
    gameState.tasks = [];
    gameState.cityName = '';
    sessionStartTime = null;
    totalStudyMinutes = 0;
    
    gameScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    
    updateDisplay();
    renderGrid();
    renderTasks();
}

function openHistory() {
    // Don't open sign in modal if guest - just show alert
    if (gameState.isGuest) {
        alert(translations[gameState.currentLang].guestSaveWarning || 'سجل دخولك أولاً');
        return; // Return without opening any modal
    }
    
    // Open history modal safely
    openModal(historyModal);
    
    // Show empty state
    if (historyList) historyList.classList.add('hidden');
    if (emptyHistory) emptyHistory.classList.remove('hidden');
}

function closeHistoryModal() {
    closeModal(historyModal);
}

function closeSessionDetailsModal() {
    closeModal(sessionDetailsModal);
}