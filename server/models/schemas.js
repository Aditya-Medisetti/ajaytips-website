const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  targetExams: [{ type: String }],
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  address: { type: String, default: '' },
  qualification: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Course Schema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  category: { type: String, required: true }, // SSC, RRB, Banking, Police, etc.
  courseType: { type: String, enum: ['Live Courses', 'Recorded Courses', 'Test Series', 'All Courses'], default: 'Recorded Courses' },
  teacher: { type: String, required: true },
  teacherAvatar: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  validity: { type: String, default: '1 Year' },
  thumbnail: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  studentsCount: { type: Number, default: 1250 },
  videosCount: { type: Number, default: 45 },
  testsCount: { type: Number, default: 15 },
  materialsCount: { type: Number, default: 20 },
  isLive: { type: Boolean, default: false },
  isFree: { type: Boolean, default: false },
  syllabus: [{
    chapterTitle: String,
    lessonsCount: Number,
    duration: String,
    items: [{
      title: String,
      type: { type: String, enum: ['video', 'test', 'pdf'] },
      duration: String,
      isFreePreview: Boolean
    }]
  }],
  createdAt: { type: Date, default: Date.now }
});

// Video Schema
const videoSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  title: { type: String, required: true },
  chapter: { type: String, required: true },
  duration: { type: String, required: true },
  videoUrl: { type: String, required: true },
  isFreePreview: { type: Boolean, default: false },
  order: { type: Number, default: 1 }
});

// Test Schema
const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  examCategory: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  negativeMarking: { type: Number, default: 0.25 },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false },
  questions: [{
    id: Number,
    questionText: String,
    options: [String],
    correctAnswer: Number, // 0, 1, 2, 3
    explanation: String,
    subject: String
  }]
});

// TestResult Schema
const testResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  testId: { type: String, required: true },
  testTitle: { type: String, required: true },
  score: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  percentage: { type: Number, required: true },
  correctCount: { type: Number, required: true },
  wrongCount: { type: Number, required: true },
  unattemptedCount: { type: Number, required: true },
  rank: { type: Number, default: 1 },
  timeTakenMinutes: { type: Number, default: 30 },
  userAnswers: [{
    questionId: Number,
    selectedOption: Number,
    isCorrect: Boolean
  }],
  submittedAt: { type: Date, default: Date.now }
});

// LiveClass Schema
const liveClassSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  teacher: { type: String, required: true },
  scheduledTime: { type: String, required: true },
  duration: { type: String, default: '60 mins' },
  status: { type: String, enum: ['live', 'upcoming', 'completed'], default: 'upcoming' },
  streamUrl: { type: String, default: 'https://www.youtube.com/embed/live_stream_mock' },
  thumbnail: { type: String }
});

// Material Schema
const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  examCategory: { type: String, required: true },
  fileType: { type: String, enum: ['PDF', 'Notes', 'PYQ', 'Formula Sheet', 'Practice Set'], default: 'PDF' },
  fileUrl: { type: String, required: true },
  isFree: { type: Boolean, default: false },
  fileSize: { type: String, default: '2.4 MB' },
  downloadsCount: { type: Number, default: 430 }
});

// Assignment Schema
const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseName: { type: String, required: true },
  dueDate: { type: String, required: true },
  totalMarks: { type: Number, default: 100 },
  description: { type: String },
  submissionStatus: { type: String, enum: ['Submitted', 'Pending', 'Graded'], default: 'Pending' },
  obtainedMarks: { type: Number, default: 0 },
  feedback: { type: String, default: '' }
});

// Payment Schema
const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String },
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  transactionId: { type: String, required: true },
  status: { type: String, enum: ['Success', 'Failed', 'Pending'], default: 'Success' },
  paymentMethod: { type: String, default: 'UPI' }
});

// Notification Schema
const notificationSchema = new mongoose.Schema({
  userId: { type: String },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['course', 'live', 'test', 'assignment', 'payment', 'system'], default: 'system' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Chat Schema
const chatSchema = new mongoose.Schema({
  courseId: { type: String, default: 'general' },
  senderName: { type: String, required: true },
  senderRole: { type: String, default: 'student' },
  avatar: { type: String },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Banner Schema
const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  badge: { type: String, default: 'NEW BATCH' },
  bgGradient: { type: String, default: 'from-blue-600 to-indigo-800' },
  ctaText: { type: String, default: 'Explore Now' },
  link: { type: String, default: '/courses' },
  active: { type: Boolean, default: true }
});

// Coupon Schema
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercent: { type: Number, required: true },
  maxDiscount: { type: Number, default: 500 },
  minPurchase: { type: Number, default: 199 },
  active: { type: Boolean, default: true }
});

module.exports = {
  User: mongoose.models.User || mongoose.model('User', userSchema),
  Course: mongoose.models.Course || mongoose.model('Course', courseSchema),
  Video: mongoose.models.Video || mongoose.model('Video', videoSchema),
  Test: mongoose.models.Test || mongoose.model('Test', testSchema),
  TestResult: mongoose.models.TestResult || mongoose.model('TestResult', testResultSchema),
  LiveClass: mongoose.models.LiveClass || mongoose.model('LiveClass', liveClassSchema),
  Material: mongoose.models.Material || mongoose.model('Material', materialSchema),
  Assignment: mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema),
  Payment: mongoose.models.Payment || mongoose.model('Payment', paymentSchema),
  Notification: mongoose.models.Notification || mongoose.model('Notification', notificationSchema),
  Chat: mongoose.models.Chat || mongoose.model('Chat', chatSchema),
  Banner: mongoose.models.Banner || mongoose.model('Banner', bannerSchema),
  Coupon: mongoose.models.Coupon || mongoose.model('Coupon', couponSchema)
};
