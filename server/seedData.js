const bcrypt = require('bcryptjs');

const initialUsers = [
  {
    _id: 'usr_student_1',
    name: 'Ajay Kumar',
    email: 'student@ajaytips.com',
    password: '$2a$10$wT0H7N8D/V43105Zk51RuuUu2N/Z51vB87jUjE77aM0.0u4qX4nCe', // password: 'password123'
    role: 'student',
    phone: '+91 9876543210',
    targetExams: ['SSC CGL', 'RRB NTPC', 'AP SI/PC'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    address: 'Hyderabad, Telangana, India',
    qualification: 'B.Tech Graduate'
  },
  {
    _id: 'usr_teacher_1',
    name: 'Prof. S. R. Sharma',
    email: 'teacher@ajaytips.com',
    password: '$2a$10$wT0H7N8D/V43105Zk51RuuUu2N/Z51vB87jUjE77aM0.0u4qX4nCe', // password: 'password123'
    role: 'teacher',
    phone: '+91 9812345678',
    targetExams: ['SSC', 'RRB', 'State Exams'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    qualification: 'M.Sc. Mathematics (12+ Yrs Experience)'
  },
  {
    _id: 'usr_admin_1',
    name: 'Admin Controller',
    email: 'admin@ajaytips.com',
    password: '$2a$10$wT0H7N8D/V43105Zk51RuuUu2N/Z51vB87jUjE77aM0.0u4qX4nCe', // password: 'password123'
    role: 'admin',
    phone: '+91 9999999999',
    targetExams: ['All Exams'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  }
];

const examCategories = [
  { id: 'ssc', name: 'SSC Exams', code: 'SSC CGL / CHSL / GD', icon: 'Award', color: 'bg-blue-500' },
  { id: 'rrb', name: 'RRB Railway', code: 'NTPC / Group D / ALP', icon: 'Train', color: 'bg-red-500' },
  { id: 'banking', name: 'Banking', code: 'IBPS PO / SBI Clerk', icon: 'Landmark', color: 'bg-emerald-500' },
  { id: 'police', name: 'Police Exams', code: 'SI / Constable', icon: 'Shield', color: 'bg-indigo-500' },
  { id: 'sipc', name: 'SI / PC', code: 'Special State Force', icon: 'Zap', color: 'bg-amber-500' },
  { id: 'fbo', name: 'FBO Forest', code: 'Forest Beat Officer', icon: 'Trees', color: 'bg-green-600' },
  { id: 'apgovt', name: 'AP Govt Jobs', code: 'APPSC Group 1, 2, 4', icon: 'Building2', color: 'bg-cyan-600' },
  { id: 'tsgovt', name: 'Telangana Govt', code: 'TSPCS Group 1, 2, 3', icon: 'MapPin', color: 'bg-purple-600' },
  { id: 'railway', name: 'Railway Special', code: 'Technician & JE', icon: 'Compass', color: 'bg-orange-500' },
  { id: 'other', name: 'Other Competitive', code: 'Defense / CSAT', icon: 'BookOpen', color: 'bg-pink-500' }
];

const initialCourses = [
  {
    _id: 'crs_1',
    title: 'Pure Maths for SSC CGL & RRB NTPC Masterclass',
    subtitle: 'Comprehensive Arithmetic, Algebra, Geometry & Trigonometry with Shortcuts',
    description: 'Master Pure Mathematics from basics to advanced problem-solving techniques specifically tailored for SSC CGL Tier 1 & 2, RRB NTPC, and Railway exams. Includes 120+ video lectures, 40 topic tests, and PDF formula notes.',
    category: 'SSC',
    courseType: 'Recorded Courses',
    teacher: 'Prof. S. R. Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    price: 349,
    originalPrice: 1999,
    validity: 'Lifetime Validity',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600',
    rating: 4.9,
    studentsCount: 3840,
    videosCount: 128,
    testsCount: 35,
    materialsCount: 42,
    isLive: false,
    isFree: false,
    syllabus: [
      {
        chapterTitle: 'Chapter 1: Number System & Simplification',
        lessonsCount: 8,
        duration: '6 hrs 20 mins',
        items: [
          { title: 'Unit Digit & Remainder Theorem Shortcuts', type: 'video', duration: '45 mins', isFreePreview: true },
          { title: 'LCM & HCF Advanced Application Problems', type: 'video', duration: '50 mins', isFreePreview: true },
          { title: 'Number System Topic Quiz 1', type: 'test', duration: '20 mins', isFreePreview: false }
        ]
      },
      {
        chapterTitle: 'Chapter 2: Algebra & Quadratic Equations',
        lessonsCount: 12,
        duration: '9 hrs 40 mins',
        items: [
          { title: 'Symmetric Polynomial Identities (a³+b³+c³-3abc)', type: 'video', duration: '55 mins', isFreePreview: false },
          { title: 'Quadratic Equations Roots Trick', type: 'video', duration: '40 mins', isFreePreview: false }
        ]
      },
      {
        chapterTitle: 'Chapter 3: Geometry & Mensuration 2D/3D',
        lessonsCount: 15,
        duration: '14 hrs 10 mins',
        items: [
          { title: 'Circles & Incircle / Circumcircle Theorems', type: 'video', duration: '60 mins', isFreePreview: false },
          { title: '3D Mensuration Pyramids & Cones Formulae', type: 'video', duration: '50 mins', isFreePreview: false }
        ]
      }
    ]
  },
  {
    _id: 'crs_2',
    title: 'AP & Telangana Police SI/PC Target Batch 2026',
    subtitle: 'Full Syllabus Coverage for AP & TS Police Recruitment Prelims & Mains',
    description: 'Specialized intensive batch for AP Police SI, Constable, and TS Police recruitment. Covers General Studies, Telugu/English, Reasoning, and Quantitative Aptitude with Previous Papers analysis.',
    category: 'Police',
    courseType: 'Live Courses',
    teacher: 'Dr. V. K. Reddy',
    teacherAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150',
    price: 699,
    originalPrice: 2999,
    validity: '1 Year Validity',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600',
    rating: 4.8,
    studentsCount: 2450,
    videosCount: 95,
    testsCount: 50,
    materialsCount: 65,
    isLive: true,
    isFree: false,
    syllabus: [
      {
        chapterTitle: 'General Studies: Indian Polity & AP/TS History',
        lessonsCount: 20,
        duration: '18 hrs',
        items: [
          { title: 'Indian Constitution Key Amendments & Articles', type: 'video', duration: '60 mins', isFreePreview: true },
          { title: 'Freedom Movement in Andhra & Telangana', type: 'video', duration: '55 mins', isFreePreview: false }
        ]
      }
    ]
  },
  {
    _id: 'crs_3',
    title: 'RRB NTPC & Group D Complete CBT-1 & CBT-2 Test Series Pack',
    subtitle: '150+ Full Length Mock Tests with All India Rank & Detailed Solutions',
    description: 'Comprehensive Test Series strictly based on latest TCS exam pattern for Railway NTPC, Group D, and ALP. Features live timer, sectional cutoffs, and video solution explanations.',
    category: 'RRB',
    courseType: 'Test Series',
    teacher: 'Ajaytips Exam Experts',
    teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    price: 199,
    originalPrice: 999,
    validity: '6 Months Validity',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
    rating: 4.9,
    studentsCount: 5120,
    videosCount: 25,
    testsCount: 150,
    materialsCount: 30,
    isLive: false,
    isFree: false,
    syllabus: [
      {
        chapterTitle: 'RRB NTPC Full Mocks (100 Questions)',
        lessonsCount: 50,
        duration: '75 hrs',
        items: [
          { title: 'RRB NTPC Grand Mock Test 01', type: 'test', duration: '90 mins', isFreePreview: true },
          { title: 'RRB NTPC Grand Mock Test 02', type: 'test', duration: '90 mins', isFreePreview: false }
        ]
      }
    ]
  },
  {
    _id: 'crs_4',
    title: 'Banking Reasoning & Quantitative Aptitude Foundation',
    subtitle: 'IBPS PO, SBI PO, IBPS Clerk, RRB Officer Scale-I Complete Preparation',
    description: 'Master High Level Puzzles, Seating Arrangement, Data Interpretation (DI), Data Sufficiency, and Speed Math techniques for Bank Exams.',
    category: 'Banking',
    courseType: 'Recorded Courses',
    teacher: 'Ananya Deshmukh',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    price: 499,
    originalPrice: 2499,
    validity: '1 Year Validity',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600',
    rating: 4.7,
    studentsCount: 1890,
    videosCount: 110,
    testsCount: 40,
    materialsCount: 50,
    isLive: false,
    isFree: false,
    syllabus: []
  },
  {
    _id: 'crs_5',
    title: 'FBO Forest Beat Officer & AP PSC General Studies Free Foundation',
    subtitle: 'Complete Environment, Ecology, Forestry & Daily Current Affairs',
    description: 'Free orientation and foundation course for Forest Beat Officer (FBO), APPSC, and Telangana State recruitment exams.',
    category: 'FBO',
    courseType: 'All Courses',
    teacher: 'Prof. S. R. Sharma',
    teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    price: 0,
    originalPrice: 499,
    validity: 'Free Access',
    thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600',
    rating: 4.9,
    studentsCount: 8900,
    videosCount: 20,
    testsCount: 10,
    materialsCount: 15,
    isLive: false,
    isFree: true,
    syllabus: []
  }
];

const initialTests = [
  {
    _id: 'tst_1',
    title: 'SSC CGL Tier-1 All India Grand Mock Test - 01',
    examCategory: 'SSC',
    durationMinutes: 60,
    totalQuestions: 25,
    totalMarks: 50,
    negativeMarking: 0.5,
    price: 0,
    isFree: true,
    questions: [
      {
        id: 1,
        questionText: 'If a sum of money doubles itself in 8 years at simple interest, what is the rate of interest per annum?',
        options: ['10%', '12.5%', '15%', '8.33%'],
        correctAnswer: 1,
        explanation: 'Simple Interest SI = P. Formula SI = (P * R * T)/100 => P = (P * R * 8)/100 => R = 100/8 = 12.5%.',
        subject: 'Quantitative Aptitude'
      },
      {
        id: 2,
        questionText: 'Select the missing number in the series: 4, 9, 25, 49, 121, ?',
        options: ['144', '169', '196', '225'],
        correctAnswer: 1,
        explanation: 'The terms are squares of consecutive prime numbers: 2², 3², 5², 7², 11², 13² = 169.',
        subject: 'General Intelligence & Reasoning'
      },
      {
        id: 3,
        questionText: 'Which fundamental right was removed from the list of Fundamental Rights by the 44th Constitutional Amendment Act, 1978?',
        options: ['Right to Equality', 'Right to Freedom of Speech', 'Right to Property', 'Right to Constitutional Remedies'],
        correctAnswer: 2,
        explanation: 'Right to Property (Article 31) was deleted from Fundamental Rights and made a legal right under Article 300A.',
        subject: 'General Awareness'
      },
      {
        id: 4,
        questionText: 'Two pipes A and B can fill a tank in 20 minutes and 30 minutes respectively. If both pipes are opened together, how long will it take to fill the tank?',
        options: ['10 mins', '12 mins', '15 mins', '18 mins'],
        correctAnswer: 1,
        explanation: 'Combined rate per minute = 1/20 + 1/30 = (3+2)/60 = 5/60 = 1/12. Time taken = 12 minutes.',
        subject: 'Quantitative Aptitude'
      },
      {
        id: 5,
        questionText: 'In a certain code language, "MATHS" is written as "NZUIT". How is "EXAMS" written in that code?',
        options: ['FYBNT', 'FYBNR', 'EZBNT', 'FYCNT'],
        correctAnswer: 0,
        explanation: 'Each letter is shifted forward by +1: E->F, X->Y, A->B, M->N, S->T. Hence FYBNT.',
        subject: 'General Intelligence & Reasoning'
      }
    ]
  },
  {
    _id: 'tst_2',
    title: 'RRB NTPC General Awareness & Science Speed Test',
    examCategory: 'RRB',
    durationMinutes: 40,
    totalQuestions: 20,
    totalMarks: 40,
    negativeMarking: 0.33,
    price: 0,
    isFree: true,
    questions: [
      {
        id: 1,
        questionText: 'What is the chemical name of Vitamin C?',
        options: ['Citric Acid', 'Ascorbic Acid', 'Nitric Acid', 'Lactic Acid'],
        correctAnswer: 1,
        explanation: 'Vitamin C is chemically known as Ascorbic Acid, essential for tissue repair and immune system function.',
        subject: 'General Science'
      }
    ]
  }
];

const initialLiveClasses = [
  {
    _id: 'live_1',
    title: 'SSC CGL 2026 Pure Mathematics Live Doubt & Problem Solving Session',
    subject: 'Pure Mathematics',
    teacher: 'Prof. S. R. Sharma',
    scheduledTime: 'Today at 7:00 PM',
    duration: '90 mins',
    status: 'live',
    streamUrl: 'https://www.youtube.com/embed/live_stream_mock_ssc',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600'
  },
  {
    _id: 'live_2',
    title: 'AP Police SI Prelims 2026 Top 50 Indian Polity Questions Live',
    subject: 'Indian Polity & Constitution',
    teacher: 'Dr. V. K. Reddy',
    scheduledTime: 'Tomorrow at 10:00 AM',
    duration: '60 mins',
    status: 'upcoming',
    streamUrl: 'https://www.youtube.com/embed/live_stream_mock_polity',
    thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600'
  },
  {
    _id: 'live_3',
    title: 'RRB NTPC Speed Math & Mental Calculation Masterclass (Recorded)',
    subject: 'Arithmetic Aptitude',
    teacher: 'Prof. S. R. Sharma',
    scheduledTime: 'Yesterday at 5:00 PM',
    duration: '75 mins',
    status: 'completed',
    streamUrl: 'https://www.youtube.com/embed/live_stream_mock_rrb',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600'
  }
];

const initialMaterials = [
  {
    _id: 'mat_1',
    title: 'SSC CGL Pure Mathematics Complete Quick Formula Sheet PDF',
    subject: 'Mathematics',
    examCategory: 'SSC',
    fileType: 'Formula Sheet',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: true,
    fileSize: '3.2 MB',
    downloadsCount: 14500
  },
  {
    _id: 'mat_2',
    title: 'RRB NTPC Last 5 Years Previous Year Question Papers (PYQ) with Solutions',
    subject: 'All Subjects',
    examCategory: 'RRB',
    fileType: 'PYQ',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: true,
    fileSize: '8.5 MB',
    downloadsCount: 22100
  },
  {
    _id: 'mat_3',
    title: 'AP & TS Police SI General Studies Hand-written Class Notes 2026',
    subject: 'General Studies',
    examCategory: 'Police',
    fileType: 'Notes',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: false,
    fileSize: '12.1 MB',
    downloadsCount: 3800
  },
  {
    _id: 'mat_4',
    title: 'Monthly Current Affairs Capsule 2026 - Comprehensive Coverage',
    subject: 'Current Affairs',
    examCategory: 'All Exams',
    fileType: 'PDF',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    isFree: true,
    fileSize: '4.7 MB',
    downloadsCount: 31200
  }
];

const initialAssignments = [
  {
    _id: 'asg_1',
    title: 'Assignment 01: Geometry Circles & Triangles Proofs',
    courseName: 'Pure Maths for SSC CGL & RRB NTPC Masterclass',
    dueDate: '2026-08-30',
    totalMarks: 50,
    description: 'Solve the 10 attached geometry proof questions on paper, scan as PDF and submit before the deadline.',
    submissionStatus: 'Submitted',
    obtainedMarks: 46,
    feedback: 'Excellent work on cyclic quadrilateral proofs! Minor shortcut missing in Q7.'
  },
  {
    _id: 'asg_2',
    title: 'Assignment 02: High Level Seating Arrangement Puzzles',
    courseName: 'Banking Reasoning & Quantitative Aptitude Foundation',
    dueDate: '2026-09-05',
    totalMarks: 40,
    description: 'Solve 5 circular and linear seating arrangement puzzle sets with step-by-step logic diagrams.',
    submissionStatus: 'Pending',
    obtainedMarks: 0,
    feedback: ''
  }
];

const initialPayments = [
  {
    _id: 'pym_101',
    userId: 'usr_student_1',
    userName: 'Ajay Kumar',
    courseId: 'crs_1',
    courseTitle: 'Pure Maths for SSC CGL & RRB NTPC Masterclass',
    amount: 349,
    paymentDate: '2026-08-15T14:30:00.000Z',
    transactionId: 'pay_RZP981240192',
    status: 'Success',
    paymentMethod: 'UPI (GPay)'
  },
  {
    _id: 'pym_102',
    userId: 'usr_student_1',
    userName: 'Ajay Kumar',
    courseId: 'crs_3',
    courseTitle: 'RRB NTPC & Group D Complete CBT-1 & CBT-2 Test Series Pack',
    amount: 199,
    paymentDate: '2026-08-10T09:15:00.000Z',
    transactionId: 'pay_RZP882319041',
    status: 'Success',
    paymentMethod: 'Debit Card'
  }
];

const initialNotifications = [
  {
    _id: 'notif_1',
    userId: 'usr_student_1',
    title: '🔴 Live Class Alert',
    message: 'Prof. S. R. Sharma is going live at 7:00 PM for Pure Mathematics Doubt Solving Session.',
    type: 'live',
    read: false,
    createdAt: '2026-08-22T08:00:00.000Z'
  },
  {
    _id: 'notif_2',
    userId: 'usr_student_1',
    title: '📝 New Test Uploaded',
    message: 'SSC CGL Tier-1 All India Grand Mock Test - 01 is now live in your test portal.',
    type: 'test',
    read: true,
    createdAt: '2026-08-21T11:20:00.000Z'
  },
  {
    _id: 'notif_3',
    userId: 'usr_student_1',
    title: '🎉 Payment Confirmed',
    message: 'Your payment of ₹349 for Pure Maths Masterclass was verified successfully.',
    type: 'payment',
    read: true,
    createdAt: '2026-08-15T14:31:00.000Z'
  }
];

const initialBanners = [
  {
    _id: 'bnr_1',
    title: 'Target SSC CGL & RRB NTPC 2026',
    subtitle: 'Flat 80% OFF on Pure Maths & Aptitude Foundation Batches',
    badge: 'SPECIAL DISCOUNT OFFER',
    bgGradient: 'from-blue-600 to-indigo-900',
    ctaText: 'Explore Courses',
    link: '/courses',
    active: true
  },
  {
    _id: 'bnr_2',
    title: 'AP & Telangana Police SI/PC Batches',
    subtitle: 'Daily Live Interactive Classes, PYQs & 50+ Mock Tests',
    badge: 'NEW BATCH STARTED',
    bgGradient: 'from-sky-600 to-blue-800',
    ctaText: 'Join Live Batch',
    link: '/live-classes',
    active: true
  },
  {
    _id: 'bnr_3',
    title: 'Free All India CBT Mock Test Series',
    subtitle: 'Instant All India Rank, Percentile & Detailed Video Solutions',
    badge: '100% FREE MOCKS',
    bgGradient: 'from-emerald-600 to-teal-900',
    ctaText: 'Start Test Now',
    link: '/test-series',
    active: true
  }
];

const initialCoupons = [
  { _id: 'cpn_1', code: 'AJAYTIPS50', discountPercent: 50, maxDiscount: 500, minPurchase: 199, active: true },
  { _id: 'cpn_2', code: 'FIRST100', discountPercent: 30, maxDiscount: 300, minPurchase: 149, active: true }
];

module.exports = {
  initialUsers,
  examCategories,
  initialCourses,
  initialTests,
  initialLiveClasses,
  initialMaterials,
  initialAssignments,
  initialPayments,
  initialNotifications,
  initialBanners,
  initialCoupons
};
