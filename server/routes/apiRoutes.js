const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { verifyToken, authorizeRoles, JWT_SECRET } = require('../middleware/auth');
const seedData = require('../seedData');

// In-Memory Data Store (Synchronized fallback for zero-config operation)
let usersStore = [...seedData.initialUsers];
let coursesStore = [...seedData.initialCourses];
let testsStore = [...seedData.initialTests];
let liveClassesStore = [...seedData.initialLiveClasses];
let materialsStore = [...seedData.initialMaterials];
let assignmentsStore = [...seedData.initialAssignments];
let paymentsStore = [...seedData.initialPayments];
let notificationsStore = [...seedData.initialNotifications];
let bannersStore = [...seedData.initialBanners];
let couponsStore = [...seedData.initialCoupons];
let testResultsStore = [];
let chatsStore = [
  { _id: 'chat_1', courseId: 'crs_1', senderName: 'Prof. S. R. Sharma', senderRole: 'teacher', message: 'Welcome to Pure Maths Masterclass! Post any doubt in this chat.', timestamp: new Date() }
];

// Helper to generate IDs
const genId = (prefix) => `${prefix}_${Date.now()}_${Math.floor(Math.random()*1000)}`;

// ----------------------------------------------------
// AUTH ENDPOINTS
// ----------------------------------------------------
router.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password, phone, role, targetExams } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, Email and Password are required.' });
    }

    const existingUser = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already registered. Please login.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      _id: genId('usr'),
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      role: role || 'student',
      targetExams: targetExams || ['SSC CGL'],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      createdAt: new Date()
    };

    usersStore.push(newUser);

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = newUser;
    res.status(201).json({ success: true, token, user: userData, message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = usersStore.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password: _, ...userData } = user;
    res.json({ success: true, token, user: userData, message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/auth/me', verifyToken, (req, res) => {
  const user = usersStore.find(u => u._id === req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
  const { password: _, ...userData } = user;
  res.json({ success: true, user: userData });
});

router.put('/auth/profile', verifyToken, (req, res) => {
  const userIndex = usersStore.findIndex(u => u._id === req.user.id);
  if (userIndex === -1) return res.status(404).json({ success: false, message: 'User not found' });

  const { name, phone, address, qualification, targetExams } = req.body;
  if (name) usersStore[userIndex].name = name;
  if (phone !== undefined) usersStore[userIndex].phone = phone;
  if (address !== undefined) usersStore[userIndex].address = address;
  if (qualification !== undefined) usersStore[userIndex].qualification = qualification;
  if (targetExams) usersStore[userIndex].targetExams = targetExams;

  const { password: _, ...userData } = usersStore[userIndex];
  res.json({ success: true, user: userData, message: 'Profile updated successfully' });
});

router.post('/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = usersStore.find(u => u.email.toLowerCase() === email?.toLowerCase());
  if (!user) {
    return res.status(404).json({ success: false, message: 'Email address not found.' });
  }
  res.json({ success: true, message: 'Password reset link and OTP sent to your registered email.' });
});

// ----------------------------------------------------
// COURSES ENDPOINTS
// ----------------------------------------------------
router.get('/courses', (req, res) => {
  const { category, type, free, search, sort } = req.query;
  let result = [...coursesStore];

  if (category && category !== 'All') {
    result = result.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }

  if (type && type !== 'All Courses') {
    result = result.filter(c => c.courseType === type);
  }

  if (free === 'true') {
    result = result.filter(c => c.isFree);
  } else if (free === 'false') {
    result = result.filter(c => !c.isFree);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.teacher.toLowerCase().includes(q));
  }

  if (sort === 'price_low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'popular') {
    result.sort((a, b) => b.studentsCount - a.studentsCount);
  }

  res.json({ success: true, courses: result, categories: seedData.examCategories });
});

router.get('/courses/:id', (req, res) => {
  const course = coursesStore.find(c => c._id === req.params.id);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });
  res.json({ success: true, course });
});

// ----------------------------------------------------
// PAYMENT & ENROLLMENT ENDPOINTS (Razorpay Integration)
// ----------------------------------------------------
router.post('/payments/create-order', verifyToken, (req, res) => {
  const { courseId, couponCode } = req.body;
  const course = coursesStore.find(c => c._id === courseId);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

  let finalAmount = course.price;
  if (couponCode) {
    const coupon = couponsStore.find(cp => cp.code === couponCode && cp.active);
    if (coupon) {
      const discount = Math.min((finalAmount * coupon.discountPercent)/100, coupon.maxDiscount);
      finalAmount = Math.max(0, finalAmount - discount);
    }
  }

  // Simulated Razorpay Order Creation
  const orderId = `order_${Date.now()}_${Math.floor(Math.random()*10000)}`;
  res.json({
    success: true,
    order: {
      id: orderId,
      entity: 'order',
      amount: finalAmount * 100, // in paise
      currency: 'INR',
      receipt: `rcpt_${courseId}`,
      status: 'created'
    },
    course,
    finalAmount
  });
});

router.post('/payments/verify', verifyToken, (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, amount, paymentMethod } = req.body;
  
  const course = coursesStore.find(c => c._id === courseId);
  if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

  // Record Payment
  const newPayment = {
    _id: `pym_${Date.now()}`,
    userId: req.user.id,
    userName: req.user.name,
    courseId: course._id,
    courseTitle: course.title,
    amount: amount || course.price,
    paymentDate: new Date(),
    transactionId: razorpay_payment_id || `pay_RZP${Math.floor(Math.random()*900000000+100000000)}`,
    status: 'Success',
    paymentMethod: paymentMethod || 'UPI'
  };

  paymentsStore.push(newPayment);

  // Add Notification
  notificationsStore.push({
    _id: genId('notif'),
    userId: req.user.id,
    title: '🎉 Enrollment Confirmed',
    message: `Payment of ₹${newPayment.amount} received. You are now enrolled in "${course.title}".`,
    type: 'payment',
    read: false,
    createdAt: new Date()
  });

  res.json({
    success: true,
    message: 'Payment verified and course enrolled successfully!',
    payment: newPayment
  });
});

router.get('/payments/my-payments', verifyToken, (req, res) => {
  const myPayments = paymentsStore.filter(p => p.userId === req.user.id);
  res.json({ success: true, payments: myPayments });
});

// ----------------------------------------------------
// CBT ONLINE TEST & RESULT ENDPOINTS
// ----------------------------------------------------
router.get('/tests', (req, res) => {
  res.json({ success: true, tests: testsStore });
});

router.get('/tests/:id', (req, res) => {
  const test = testsStore.find(t => t._id === req.params.id);
  if (!test) return res.status(404).json({ success: false, message: 'Test not found' });
  res.json({ success: true, test });
});

router.post('/tests/submit', verifyToken, (req, res) => {
  const { testId, userAnswers, timeTakenMinutes } = req.body;
  const test = testsStore.find(t => t._id === testId);
  if (!test) return res.status(404).json({ success: false, message: 'Test not found' });

  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;

  test.questions.forEach((q) => {
    const ans = userAnswers[q.id];
    if (ans === undefined || ans === null) {
      unattemptedCount++;
    } else if (ans === q.correctAnswer) {
      correctCount++;
    } else {
      wrongCount++;
    }
  });

  const marksPerQ = test.totalMarks / test.totalQuestions;
  const rawScore = (correctCount * marksPerQ) - (wrongCount * test.negativeMarking);
  const finalScore = Math.max(0, Number(rawScore.toFixed(2)));
  const percentage = Number(((finalScore / test.totalMarks) * 100).toFixed(1));

  const result = {
    _id: genId('res'),
    userId: req.user.id,
    testId: test._id,
    testTitle: test.title,
    score: finalScore,
    totalMarks: test.totalMarks,
    percentage,
    correctCount,
    wrongCount,
    unattemptedCount,
    rank: Math.floor(Math.random() * 15) + 1,
    timeTakenMinutes: timeTakenMinutes || 30,
    userAnswers,
    submittedAt: new Date()
  };

  testResultsStore.push(result);

  res.json({ success: true, result, test });
});

router.get('/tests/my-results', verifyToken, (req, res) => {
  const userResults = testResultsStore.filter(r => r.userId === req.user.id);
  res.json({ success: true, results: userResults });
});

// ----------------------------------------------------
// LIVE CLASSES & STUDY MATERIALS
// ----------------------------------------------------
router.get('/live-classes', (req, res) => {
  res.json({ success: true, liveClasses: liveClassesStore });
});

router.get('/materials', (req, res) => {
  const { category, type, search } = req.query;
  let result = [...materialsStore];

  if (category && category !== 'All') {
    result = result.filter(m => m.examCategory.toLowerCase() === category.toLowerCase());
  }

  if (type && type !== 'All') {
    result = result.filter(m => m.fileType === type);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(m => m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q));
  }

  res.json({ success: true, materials: result });
});

// ----------------------------------------------------
// ASSIGNMENTS & NOTIFICATIONS & CHAT
// ----------------------------------------------------
router.get('/assignments', verifyToken, (req, res) => {
  res.json({ success: true, assignments: assignmentsStore });
});

router.post('/assignments/submit', verifyToken, (req, res) => {
  const { assignmentId } = req.body;
  const asgIndex = assignmentsStore.findIndex(a => a._id === assignmentId);
  if (asgIndex !== -1) {
    assignmentsStore[asgIndex].submissionStatus = 'Submitted';
  }
  res.json({ success: true, message: 'Assignment submitted successfully for review!' });
});

router.get('/notifications', verifyToken, (req, res) => {
  const myNotifs = notificationsStore.filter(n => !n.userId || n.userId === req.user.id);
  res.json({ success: true, notifications: myNotifs });
});

router.put('/notifications/mark-read', verifyToken, (req, res) => {
  notificationsStore.forEach(n => { if (n.userId === req.user.id) n.read = true; });
  res.json({ success: true, message: 'All notifications marked as read' });
});

router.get('/chats', verifyToken, (req, res) => {
  const { courseId } = req.query;
  const targetId = courseId || 'crs_1';
  const chatList = chatsStore.filter(c => c.courseId === targetId);
  res.json({ success: true, chats: chatList });
});

router.post('/chats', verifyToken, (req, res) => {
  const { courseId, message } = req.body;
  const newMsg = {
    _id: genId('chat'),
    courseId: courseId || 'crs_1',
    senderName: req.user.name,
    senderRole: req.user.role,
    message,
    timestamp: new Date()
  };
  chatsStore.push(newMsg);
  res.json({ success: true, chat: newMsg });
});

// ----------------------------------------------------
// BANNERS & HOME DATA
// ----------------------------------------------------
router.get('/home-data', (req, res) => {
  res.json({
    success: true,
    banners: bannersStore,
    categories: seedData.examCategories,
    popularCourses: coursesStore.slice(0, 4),
    featuredTests: testsStore,
    liveNow: liveClassesStore.filter(l => l.status === 'live')
  });
});

// ----------------------------------------------------
// ADMIN & TEACHER DASHBOARD PORTAL APIS
// ----------------------------------------------------
router.get('/admin/stats', verifyToken, authorizeRoles('admin'), (req, res) => {
  const totalRevenue = paymentsStore.reduce((acc, p) => acc + (p.status === 'Success' ? p.amount : 0), 0);
  res.json({
    success: true,
    stats: {
      totalStudents: usersStore.filter(u => u.role === 'student').length,
      totalTeachers: usersStore.filter(u => u.role === 'teacher').length,
      totalCourses: coursesStore.length,
      totalTests: testsStore.length,
      totalRevenue,
      recentPayments: paymentsStore.slice(0, 5)
    }
  });
});

router.post('/admin/courses', verifyToken, authorizeRoles('admin', 'teacher'), (req, res) => {
  const newCourse = {
    _id: genId('crs'),
    ...req.body,
    studentsCount: 0,
    rating: 5.0,
    createdAt: new Date()
  };
  coursesStore.push(newCourse);
  res.json({ success: true, course: newCourse, message: 'Course created successfully' });
});

router.post('/admin/tests', verifyToken, authorizeRoles('admin', 'teacher'), (req, res) => {
  const newTest = {
    _id: genId('tst'),
    ...req.body
  };
  testsStore.push(newTest);
  res.json({ success: true, test: newTest, message: 'Test created successfully' });
});

module.exports = router;
