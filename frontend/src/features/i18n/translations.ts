export type Language = 'en' | 'ta';

export interface SafetySituation {
  id: string;
  title: string;
  title_ta: string;
  icon: string;
  category: 'Immediate Danger' | 'Travel & Transit' | 'Harassment' | 'Medical & Crisis';
  steps: string[];
  steps_ta: string[];
  helpline: string;
}

export const SAFETY_SITUATIONS: SafetySituation[] = [
  {
    id: 'being-followed',
    title: 'Being Followed on Foot',
    title_ta: 'யாரோ உங்களை பின்தொடர்ந்தால்',
    icon: 'Footprints',
    category: 'Immediate Danger',
    steps: [
      'Cross the street immediately to verify if they change course too.',
      'Head straight into a brightly lit store, bank ATM, or crowded restaurant.',
      'Call your emergency contact loudly or pretend to talk to someone waiting right ahead.',
      'Do not take dark alleys or shortcuts towards isolated home entrances.',
      'Press Rakai Safe SOS or call 100 / 112 immediately.'
    ],
    steps_ta: [
      'அவர்கள் உங்களைத்தான் பின்தொடர்கிறார்களா என்பதை அறிய சாலையைக் கடந்து செல்லுங்கள்.',
      'உடனடியாக வெளிச்சமுள்ள கடை, வங்கி ஏடிஎம் அல்லது ஆட்கள் உள்ள உணவகத்திற்குள் செல்லுங்கள்.',
      'அவசரத் தொடர்பாளருக்கு சத்தமாக அழைக்கவும் அல்லது யாரோ முன்னால் காத்திருப்பது போல பேசவும்.',
      'இருண்ட சந்துகள் அல்லது ஆளரவமற்ற வழிகளில் செல்ல வேண்டாம்.',
      'ராக்கை சேஃப் SOS பொத்தானை அழுத்தவும் அல்லது 112 / 100 அழைக்கவும்.'
    ],
    helpline: '112 / 1091'
  },
  {
    id: 'suspicious-cab',
    title: 'Suspicious Cab or Auto Ride',
    title_ta: 'சந்தேகத்திற்கிடமான வாடகை கார் / ஆட்டோ பயணம்',
    icon: 'Car',
    category: 'Travel & Transit',
    steps: [
      'Check if the child-lock is activated on the rear doors before closing them.',
      'Share your live Rakai Safe tracking link with family immediately.',
      'If the driver deviates from the GPS route, speak up firmly and loudly.',
      'If they refuse to stop, open the window and call out to motorists or police at signals.',
      'Press Rakai Silent SOS to dispatch police coordinates without sounding siren.'
    ],
    steps_ta: [
      'பின்புறக் கதவுகளில் சைல்ட் லாக் உள்ளதா என்பதை கதவை மூடுவதற்கு முன் கவனியுங்கள்.',
      'ராக்கை சேஃப் லைவ் டிராக்கிங் இணைப்பை உடனே குடும்பத்தினருடன் பகிருங்கள்.',
      'ஓட்டுநர் வரைபட வழியை மாற்றினால், உடனடியாக சத்தமாகவும் உறுதியாகவும் கேளுங்கள்.',
      'நிறுத்த மறுத்தால், சாளரத்தைத் திறந்து சிக்னல்களில் உள்ள மற்றவர்களிடம் உதவி கேளுங்கள்.',
      'சைலண்ட் SOS அழுத்தி சத்தமின்றி காவல்துறையினருக்கு உங்கள் இருப்பிடத்தை அனுப்புங்கள்.'
    ],
    helpline: '1091 / 112'
  },
  {
    id: 'public-transport-harassment',
    title: 'Harassment in Bus / Train',
    title_ta: 'பேருந்து அல்லது ரயிலில் சீண்டல் / தொல்லை',
    icon: 'Bus',
    category: 'Harassment',
    steps: [
      'Call out the perpetrator clearly and loudly: "Stop touching me, move back!"',
      'Draw the immediate attention of the bus conductor, driver, or fellow passengers.',
      'Move closer to women passengers, ticket counters, or train guards.',
      'Note the vehicle registration number, route number, and driver badge if visible.',
      'File an emergency alert or contact Railway Police (1512 / 139).'
    ],
    steps_ta: [
      'சீண்டுபவரை உரக்க எச்சரிக்கவும்: "என்னை தொடாதீர்கள், தள்ளி நில்லுங்கள்!"',
      'பேருந்து நடத்துனர், ஓட்டுநர் அல்லது பிற பயணிகளின் கவனத்தை ஈர்க்கவும்.',
      'பெண்கள் கூட்டம் அல்லது டிக்கெட் பரிசோதகர் அருகில் செல்லுங்கள்.',
      'வாகனத்தின் எண், வழித்தட எண் ஆகியவற்றை குறித்துக்கொள்ளுங்கள்.',
      'ரயில்வே காவல்துறை உதவி எண் 1512 / 139 அல்லது 112 அழைக்கவும்.'
    ],
    helpline: '1512 (Train) / 1091'
  },
  {
    id: 'isolated-walking',
    title: 'Walking Alone in Dark Corridors',
    title_ta: 'இருண்ட பாதையில் தனியாக நடக்கும்போது',
    icon: 'Moon',
    category: 'Travel & Transit',
    steps: [
      'Open Rakai Safe Safety Map and view Streetlight Safety Ratings for your route.',
      'Keep one ear completely free from earphones to hear surrounding footsteps.',
      'Keep your phone in your palm with finger near the Rakai SOS trigger.',
      'Hold keys firmly between your knuckles as a quick self-defense tool.',
      'Stay in the center of the illuminated road away from hidden bushes and doorways.'
    ],
    steps_ta: [
      'ராக்கை சேஃப் வரைபடத்தில் தெருவிளக்கு பாதுகாப்பு மதிப்பீட்டைப் பாருங்கள்.',
      'சுற்றுப்புற சத்தங்களைக் கேட்க ஒரு காதில் ஹெட்போனை கழற்றி வையுங்கள்.',
      'தொலைபேசியை கையில் வைத்து, SOS பட்டனை எளிதில் அழுத்தும் வகையில் தயாராக இருங்கள்.',
      'தற்காப்புக்காக சாவிகளை விரல்களுக்கிடையில் இறுக்கமாகப் பிடித்துக்கொள்ளுங்கள்.',
      'மறைவிடங்களைத் தவிர்த்து, சாலையின் வெளிச்சமுள்ள நடுப்பகுதியில் நடக்கவும்.'
    ],
    helpline: '112'
  },
  {
    id: 'domestic-distress',
    title: 'Domestic Abuse & Threat at Home',
    title_ta: 'குடும்ப வன்முறை அல்லது அச்சுறுத்தல்',
    icon: 'Home',
    category: 'Immediate Danger',
    steps: [
      'Move immediately to a room with an exit or a window facing the street.',
      'Avoid kitchens, bathrooms, or closets where dangerous items or dead ends exist.',
      'Trigger Rakai Safe Silent SOS — no noise will sound, but police and trusted contacts are alerted.',
      'Keep identification, cash, and essential medications in an accessible grab bag.',
      'Reach out to Women Helpline 181 for emergency protection and counseling.'
    ],
    steps_ta: [
      'வெளியேறும் வழி அல்லது சாளரம் உள்ள அறைக்கு உடனடியாக நகருங்கள்.',
      'சமையலறை மற்றும் குளியலறையைத் தவிருங்கள், அங்கு ஆபத்தான பொருட்கள் இருக்கலாம்.',
      'ராக்கை சேஃப் சைலண்ட் SOS அழுத்துங்கள் - சத்தமின்றி காவல்துறைக்கு எச்சரிக்கை செல்லும்.',
      'அடையாள அட்டை, பணம் ஆகியவற்றை எப்போதும் தயார் நிலையில் வைத்திருங்கள்.',
      'மகளிர் உதவி எண் 181 ஐ அழைத்து பாதுகாப்பு மற்றும் ஆலோசனை பெறுங்கள்.'
    ],
    helpline: '181 (Women Helpline)'
  },
  {
    id: 'stalking-online-offline',
    title: 'Physical & Cyber Stalking',
    title_ta: 'தொடர் கண்காணிப்பு & இணைய அச்சுறுத்தல்',
    icon: 'Eye',
    category: 'Harassment',
    steps: [
      'Document every incident: capture screenshots with timestamps, URLs, and phone numbers.',
      'Do not engage, negotiate, or reply emotionally to threats.',
      'Vary your daily commute times and walking routes frequently.',
      'Check your vehicle and personal belongings for unverified tracking devices.',
      'File an official cyber crime complaint at cybercrime.gov.in or National Cyber Helpline 1930.'
    ],
    steps_ta: [
      'அனைத்து அச்சுறுத்தல்களையும் ஸ்கிரீன்ஷாட் எடுத்து நேரம், தேதி ஆகியவற்றை சேமிக்கவும்.',
      'அச்சுறுத்துபவருடன் வாக்குவாதம் செய்யவோ பதிலளிக்கவோ வேண்டாம்.',
      'உங்கள் தினசரி பயண வழிகளையும் நேரங்களையும் மாற்றுங்கள்.',
      'உங்கள் பைகளில் அல்லது வாகனத்தில் தேவையற்ற ஜிபிஎஸ் கருவிகள் உள்ளதா எனப் பாருங்கள்.',
      'இணைய குற்றப் பிரிவில் 1930 எண்ணிற்கு புகார் அளியுங்கள்.'
    ],
    helpline: '1930 (Cyber Crime)'
  },
  {
    id: 'elevator-trapped',
    title: 'Elevator Trapped with Unknown Person',
    title_ta: 'லிஃப்ட்டில் சந்தேக நபரால் ஆபத்து ஏற்பட்டால்',
    icon: 'Maximize2',
    category: 'Immediate Danger',
    steps: [
      'Stand near the control panel with your back against the side wall.',
      'Press the buttons for all the upcoming floors immediately.',
      'If attacked, strike with elbow towards the solar plexus, eyes, or groin.',
      'Press the yellow Emergency Alarm bell button repeatedly inside the elevator.',
      'Rakai Safe SOS siren can disorient an attacker in closed spaces.'
    ],
    steps_ta: [
      'கட்டுப்பாட்டு பலகை அருகில் நில்லுங்கள், சுவரில் முதுகு படும்படி நில்லுங்கள்.',
      'அனைத்து அடுக்குகளின் பொத்தான்களையும் உடனே அழுத்துங்கள்.',
      'தாக்க முற்பட்டால், முழங்கையால் தாக்கி தற்காத்துக் கொள்ளுங்கள்.',
      'லிஃப்ட்டில் உள்ள அவசர மணி பொத்தானை தொடர்ந்து அழுத்துங்கள்.',
      'ராக்கை சேஃப் அலறல் ஒலியை இயக்கி எதிராளியை நிலைகுலையச் செய்யுங்கள்.'
    ],
    helpline: '112'
  },
  {
    id: 'medical-emergency',
    title: 'Sudden Medical or Injury Emergency',
    title_ta: 'திடீர் மருத்துவ அல்லது உடல்நல அவசரநிலை',
    icon: 'HeartPulse',
    category: 'Medical & Crisis',
    steps: [
      'Call 108 (Ambulance) immediately and state your exact landmark.',
      'Open Rakai Safe Safety Map to view nearest 24/7 Verified Hospitals.',
      'If dizzy or fainting, lie flat with your feet elevated to maintain blood flow.',
      'Do not consume unknown medicines or fluids handed by strangers.',
      'Emergency contacts are automatically messaged with your coordinates via Rakai Safe.'
    ],
    steps_ta: [
      'உடனே 108 ஆம்புலன்ஸை அழைத்து உங்கள் இருப்பிடத்தை தெளிவாகக் கூறுங்கள்.',
      'ராக்கை சேஃப் வரைபடத்தில் அருகிலுள்ள 24 மணிநேர மருத்துவமனைகளைக் காணுங்கள்.',
      'மயக்கம் வந்தால், கால்களை சற்று உயர்த்தி படுத்துக்கொள்ளுங்கள்.',
      'அந்நியர்கள் கொடுக்கும் மாத்திரைகள் அல்லது பானங்களை உட்கொள்ள வேண்டாம்.',
      'உங்கள் அவசர தொடர்பாளர்களுக்கு ராக்கை சேஃப் உங்கள் இருப்பிடத்தை அனுப்பும்.'
    ],
    helpline: '108 (Ambulance)'
  },
  {
    id: 'secret-distress-signals',
    title: 'Universal Secret Distress Hand Signal',
    title_ta: 'சர்வதேச ரகசிய உதவி கை சமிக்ஞை',
    icon: 'Hand',
    category: 'Immediate Danger',
    steps: [
      'Signal 1: Hold hand up with palm facing other person, tuck thumb inward across palm.',
      'Signal 2: Fold the remaining four fingers down over the thumb into a gentle fist.',
      'Repeat smoothly towards security cameras, store cashiers, or motorists at red lights.',
      'Use code phrase: "Can you help me check if Angela / Rakai is on duty today?"',
      'Allows bystanders to recognize domestic captivity or hostage coercion safely.'
    ],
    steps_ta: [
      'சமிக்ஞை 1: உங்கள் உள்ளங்கையை எதிரே உள்ளவரை நோக்கி காட்டி, கட்டைவிரலை உள்ளே மடியுங்கள்.',
      'சமிக்ஞை 2: மற்ற நான்கு விரல்களையும் கட்டைவிரலின் மேல் மூடி கைமுஷ்டியாக்குங்கள்.',
      'கண்காணிப்பு கேமராக்கள் அல்லது பிறரிடம் இதை மெதுவாக மீண்டும் மீண்டும் செய்யுங்கள்.',
      'ரகசிய குறியீடு: "இன்று ராகை அல்லது ஏஞ்சலா பணியில் இருக்கிறார்களா?" எனக் கேட்கவும்.',
      'இது நீங்கள் ஆபத்தில் உள்ளீர்கள் என்பதை பிறருக்கு அமைதியாக உணர்த்தும் சர்வதேச சமிக்ஞை.'
    ],
    helpline: '112 / 1091'
  },
  {
    id: 'workplace-harassment',
    title: 'Workplace Sexual Harassment (PoSH)',
    title_ta: 'பணியிடத்தில் பாலியல் சீண்டல் & தொல்லை',
    icon: 'Briefcase',
    category: 'Harassment',
    steps: [
      'State unambiguously in writing or voice: "Your comment / conduct is unwelcome."',
      'Maintain an independent, personal digital record of emails, chat transcripts, and dates.',
      'Submit a formal written complaint to your company Internal Complaints Committee (ICC).',
      'Under the PoSH Act 2013, the ICC must conclude inquiry within 90 days with strict confidentiality.',
      'Contact Ministry of Women & Child Development She-Box portal if company fails to act.'
    ],
    steps_ta: [
      'உங்கள் எதிர்ப்பை தெளிவாகத் தெரிவியுங்கள்: "இந்த நடத்தை ஏற்றுக்கொள்ள முடியாதது."',
      'மின்னஞ்சல்கள், அரட்டை விவரங்கள் மற்றும் தேதிகளை தனிப்பட்ட முறையில் சேமியுங்கள்.',
      'உங்கள் நிறுவனத்தின் உள் புகார் குழுவிடம் (ICC) எழுத்துப்பூர்வமாக புகார் அளியுங்கள்.',
      'PoSH சட்டம் 2013 படி, 90 நாட்களுக்குள் விசாரணை முடிக்கப்பட வேண்டும்.',
      'மத்திய அரசின் She-Box இணையதளத்தில் ஆன்லைனிலும் புகார் அளிக்கலாம்.'
    ],
    helpline: '1091 / She-Box'
  }
];

export const translations = {
  en: {
    appName: 'RAKAI SAFE',
    tagline: 'Enterprise Women Safety, Rapid Dispatch & Infrastructure Protection',
    nav: {
      home: 'SOS Panic',
      map: 'Safety Map',
      contacts: 'Emergency Contacts',
      evidence: 'Evidence Studio',
      fakeCall: 'Fake Call',
      guide: 'Safety Guide',
      policePortal: 'Police Portal',
      adminPortal: 'Admin Console',
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
    },
    sos: {
      heroTitle: 'EMERGENCY ASSISTANCE',
      heroSubtitle: 'Instant police dispatch, live location broadcast & loud deterrence siren.',
      pressSOS: 'PRESS FOR SOS',
      activatingIn: 'ACTIVATING IN',
      cancelCountdown: 'Cancel Distress',
      emergencyActive: 'EMERGENCY ALERT BROADCASTING ACTIVE',
      incidentId: 'Incident ID',
      disableEmergency: 'TERMINATE & STOP EMERGENCY SOS',
      silentSos: 'Silent SOS (No Siren)',
      shakeToAlert: 'Shake device or press Space bar 3 times',
      locationSharing: 'Share Live Location Link',
      copiedLink: 'Location link copied to clipboard!',
    },
    map: {
      title: 'Full-Screen Interactive Safety Map',
      searchPlaceholder: 'Search safe places or streets...',
      allPlaces: 'All Infrastructure',
      police: 'Police Stations',
      hospitals: 'Hospitals (24/7)',
      safeHavens: 'Verified Safe Havens',
      streetlights: 'Streetlight Safety Corridors',
      routePlanner: 'Walk Route Light Analyzer',
      planRoute: 'Analyze Route Lighting',
      lightingScore: 'Corridor Safety Rating',
      wellLit: 'Well Lit (Safe)',
      moderatelyLit: 'Moderately Lit',
      poorlyLit: 'Poor Lighting (Caution)',
      safeHavensNearby: 'Safe Haven Shelters Nearby',
      nearbyPolice: 'Nearby Police Station',
      nearbyHospital: 'Nearby Hospital',
      safestPlace: 'Safest Place',
      nearestTitle: 'Quick Nearest Safe Spots',
      directions: 'Directions',
      callNow: 'Call Now',
      walkRoute: 'Safe Walk Route',
      driveTime: 'drive',
      walkTime: 'walk',
      distanceAway: 'away',
      close: 'Close',
      calculating: 'Calculating...',
    },
    police: {
      dashboardTitle: 'Police Authority Command & Dispatch Console',
      jurisdiction: 'Jurisdiction',
      badge: 'Badge ID',
      activeQueue: 'Active Emergency Queue',
      allIncidents: 'All Incidents',
      filterStatus: 'Filter Status',
      actionAcknowledge: 'Acknowledge',
      actionDispatch: 'Dispatch Patrol Unit',
      actionOnScene: 'Patrol On Scene',
      actionResolve: 'Resolve Incident',
      notesPlaceholder: 'Enter tactical responder log & unit notes...',
      liveLocationSnapshot: 'GPS Accuracy & Location Trace',
      noActiveIncidents: 'No active emergency incidents currently in this jurisdiction.',
    },
    admin: {
      title: 'System Administration & Safe Infrastructure Console',
      metrics: 'System Overview & Metrics',
      userManagement: 'User & Authority Provisioning',
      infrastructure: 'Infrastructure Verification',
      notifications: 'SMS & WhatsApp Delivery Receipts',
      auditLogs: 'Security Audit Trail',
      promotePolice: 'Provision Police Officer',
      verifyLocation: 'Verify Safe Location',
      verifyStreetlight: 'Add Verified Streetlight Segment',
    }
  },
  ta: {
    appName: 'ராக்கை சேஃப் (RAKAI SAFE)',
    tagline: 'மகளிர் பாதுகாப்பு, அவசர உதவி & பாதுகாப்பு வழிகாட்டி',
    nav: {
      home: 'அவசர SOS',
      map: 'பாதுகாப்பு வரைபடம்',
      contacts: 'அவசர தொடர்புகள்',
      evidence: 'ஆதாரப் பதிவுக்கூடம்',
      fakeCall: 'போலி அழைப்பு',
      guide: 'பாதுகாப்பு வழிகாட்டி',
      policePortal: 'காவல்துறை தளம்',
      adminPortal: 'நிர்வாகக் குழு',
      login: 'உள்நுழை',
      logout: 'வெளியேறு',
      register: 'பதிவு செய்',
    },
    sos: {
      heroTitle: 'அவசர கால உதவி மையம்',
      heroSubtitle: 'உடனடி காவல் உதவி, நேரடி இருப்பிடப் பகிர்வு மற்றும் எச்சரிக்கை அலறல் ஒலி.',
      pressSOS: 'அவசர SOS பொத்தான்',
      activatingIn: 'துவங்குகிறது இன்னும்',
      cancelCountdown: 'ரத்து செய்',
      emergencyActive: 'அவசர கால எச்சரிக்கை அனுப்பப்பட்டு வருகிறது',
      incidentId: 'சம்பவ எண்',
      disableEmergency: 'அவசர SOS-ஐ உடனடியாக நிறுத்து',
      silentSos: 'சைலண்ட் SOS (சத்தமின்றி)',
      shakeToAlert: 'தொலைபேசியை குலுக்கவும் அல்லது ஸ்பேஸ்பாரை 3 முறை அழுத்தவும்',
      locationSharing: 'நேரடி இருப்பிட இணைப்பைப் பகிர்க',
      copiedLink: 'இருப்பிட இணைப்பு நகலெடுக்கப்பட்டது!',
    },
    map: {
      title: 'முழுத்திரை பாதுகாப்பு வரைபடம்',
      searchPlaceholder: 'பாதுகாப்பான இடங்களைத் தேடுக...',
      allPlaces: 'அனைத்து இடங்கள்',
      police: 'காவல் நிலையங்கள்',
      hospitals: 'மருத்துவமனைகள் (24/7)',
      safeHavens: 'பாதுகாப்பான புகலிடங்கள்',
      streetlights: 'தெருவிளக்கு பாதுகாப்பு பகுதிகள்',
      routePlanner: 'நடைபாதை வெளிச்ச ஆய்வு',
      planRoute: 'பாதையை ஆய்வு செய்',
      lightingScore: 'வெளிச்சப் பாதுகாப்பு மதிப்பீடு',
      wellLit: 'நல்ல வெளிச்சம் (பாதுகாப்பானது)',
      moderatelyLit: 'மிதமான வெளிச்சம்',
      poorlyLit: 'குறைந்த வெளிச்சம் (எச்சரிக்கை)',
      safeHavensNearby: 'அருகிலுள்ள பாதுகாப்பான புகலிடங்கள்',
      nearbyPolice: 'அருகிலுள்ள காவல் நிலையம்',
      nearbyHospital: 'அருகிலுள்ள மருத்துவமனை',
      safestPlace: 'பாதுகாப்பான இடம்',
      nearestTitle: 'அருகிலுள்ள பாதுகாப்பான இடங்கள்',
      directions: 'திசைகள்',
      callNow: 'உடனே அழைக்க',
      walkRoute: 'பாதுகாப்பான நடைபாதை',
      driveTime: 'பயணம்',
      walkTime: 'நடை',
      distanceAway: 'தொலைவில்',
      close: 'மூடு',
      calculating: 'கணக்கிடப்படுகிறது...',
    },
    police: {
      dashboardTitle: 'காவல்துறை அவசர கால கட்டுப்பாட்டு அறை',
      jurisdiction: 'அதிகார எல்லை',
      badge: 'பேட்ஜ் எண்',
      activeQueue: 'நடப்பு அவசர அழைப்புகள்',
      allIncidents: 'அனைத்து சம்பவங்கள்',
      filterStatus: 'நிலை வடிகட்டி',
      actionAcknowledge: 'ஏற்றுக்கொள்',
      actionDispatch: 'காவல் குழுவை அனுப்புக',
      actionOnScene: 'களத்தில் ரோந்து குழு',
      actionResolve: 'சம்பவத்தை தீர்த்து வை',
      notesPlaceholder: 'ரோந்து நடவடிக்கை குறிப்புகளை உள்ளிடவும்...',
      liveLocationSnapshot: 'ஜிபிஎஸ் துல்லியம் & நேரடி பாதை',
      noActiveIncidents: 'உங்கள் எல்லைக்குள் தற்போது எந்த தீவிர அவசர அழைப்புகளும் இல்லை.',
    },
    admin: {
      title: 'நிர்வாக மற்றும் பாதுகாப்பு உட்கட்டமைப்பு கன்சோல்',
      metrics: 'அமைப்பு மேலோட்டம் மற்றும் அளவீடுகள்',
      userManagement: 'பயனாளர் & காவல்துறை மேலாண்மை',
      infrastructure: 'உட்கட்டமைப்பு சரிபார்ப்பு',
      notifications: 'எஸ்எம்எஸ் மற்றும் வாட்ஸ்அப் விநியோக பதிவுகள்',
      auditLogs: 'பாதுகாப்பு தணிக்கை பதிவு',
      promotePolice: 'காவல்துறை அதிகாரியை நியமிக்க',
      verifyLocation: 'பாதுகாப்பான இடத்தை சரிபார்க்க',
      verifyStreetlight: 'தெருவிளக்கு தகவலை சேர்க்க',
    }
  }
};
