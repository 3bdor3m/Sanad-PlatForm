import express from 'express';
import RequestData from '../models/RequestData.js';
import crypto from 'crypto';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const router = express.Router();

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;

// Schema for Step 1: Registration
const registerSchema = z.object({
  fullName: z.string().min(1, { message: "الاسم مطلوب" }),
  gender: z.string(),
  phone: z.string().min(5, { message: "رقم الهاتف غير صحيح" }),
  personalEmail: z.string().email({ message: "صيغة البريد الإلكتروني غير صحيحة" }).toLowerCase().trim(),
  password: z.string()
    .min(8, { message: "كلمة المرور يجب أن لا تقل عن 8 أحرف" })
    .regex(passwordRegex, { message: "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، ورقم على الأقل" }),
  selectedPlan: z.string().optional()
});

// Schema for Steps 2, 3, 4: Profile Completion
const completeProfileSchema = z.object({
  uid: z.string().min(1, { message: "معرف المستخدم مطلوب" }),
  
  businessCategory: z.string().optional(),
  businessName: z.string().min(1, { message: "اسم النشاط مطلوب" }),
  businessType: z.string().optional(),
  businessAge: z.string().optional(),
  presence: z.string().optional(),
  businessDescription: z.string().optional(),
  businessAddress: z.string().optional(),
  
  schedule: z.array(z.object({
    day: z.string(),
    name: z.string(),
    isHoliday: z.boolean(),
    from: z.string(),
    to: z.string()
  })).optional(),
  
  inventory: z.string().optional(),
  orderSystem: z.string().optional(),
  socialUrl: z.string().optional(),
  businessEmail: z.string().email({ message: "صيغة بريد العمل غير صحيحة" }).optional().or(z.literal('')),
  targetAudience: z.string().optional(),
  
  knowledgeSource: z.string().optional(),
  persona: z.string().optional(),
  language: z.string().optional(),
  targetGroup: z.string().optional(),
  activeChannels: z.array(z.string()).optional(),
  
  fallbackAction: z.string().optional(),
  forbiddenWords: z.string().optional(),
  creativity: z.number().min(0).max(100).optional(),
  notifications: z.array(z.string()).optional(),
});

router.post('/register', async (req, res) => {
  try {
    const validationResult = registerSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false,
        message: 'بيانات غير صحيحة', 
        errors: validationResult.error.format() 
      });
    }

    const { fullName, gender, phone, personalEmail, password, selectedPlan } = validationResult.data;

    // Check if email exists (only for onboarding)
    const existingUser = await RequestData.findOne({ 
      personalEmail,
      formType: 'onboarding' 
    });

    if (existingUser) {
      return res.status(409).json({ 
        success: false, 
        message: 'هذا البريد الإلكتروني مسجل مسبقاً.'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with basic info and uid
    const uid = crypto.randomUUID();
    const newUser = new RequestData({
      formType: 'onboarding',
      uid,
      fullName,
      gender,
      phone,
      personalEmail,
      password: hashedPassword,
      selectedPlan: selectedPlan || 'free'
    });

    await newUser.save();

    res.status(200).json({ 
      success: true, 
      uid,
      message: 'تم تسجيل الحساب المبدئي بنجاح.' 
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ 
      success: false, 
      message: 'حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.' 
    });
  }
});

router.post('/complete-profile', async (req, res) => {
  try {
    const validationResult = completeProfileSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false,
        message: 'بيانات غير صحيحة', 
        errors: validationResult.error.format() 
      });
    }

    const data = validationResult.data;
    const { uid, ...profileData } = data;

    // Find user by uid and update
    const user = await RequestData.findOneAndUpdate(
      { uid, formType: 'onboarding' },
      { $set: profileData },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'لم يتم العثور على الحساب. يرجى التسجيل أولاً.'
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'شكرًا لك! تم استكمال بياناتك بنجاح.' 
    });
  } catch (error) {
    console.error('Error completing profile:', error);
    res.status(500).json({ 
      success: false, 
      message: 'حدث خطأ أثناء حفظ البيانات. يرجى المحاولة مرة أخرى.' 
    });
  }
});

router.get('/user-profile/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await RequestData.findOne({ uid, formType: 'onboarding' }).select('-password -_id -__v');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }
    
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: 'خطأ في جلب البيانات' });
  }
});

router.post('/update-profile', async (req, res) => {
  try {
    const { uid, password, updateData } = req.body;
    
    if (!uid || !password || !updateData) {
      return res.status(400).json({ success: false, message: 'البيانات غير مكتملة' });
    }

    const user = await RequestData.findOne({ uid, formType: 'onboarding' });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'كلمة المرور غير صحيحة، لا يمكن التعديل' });
    }

    // Only allow updating safe fields (prevent password/uid override here)
    delete updateData.password;
    delete updateData.uid;
    delete updateData._id;

    await RequestData.findOneAndUpdate({ uid }, { $set: updateData });

    res.status(200).json({ success: true, message: 'تم تحديث البيانات بنجاح' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ أثناء التحديث' });
  }
});

const loginSchema = z.object({
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" })
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await RequestData.findOne({ 
      personalEmail: email.toLowerCase().trim(),
      formType: 'onboarding'
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    // Check if the user has completed their profile. We'll simply check if businessName exists.
    const isProfileComplete = !!user.businessName;

    res.status(200).json({
      success: true,
      uid: user.uid,
      isProfileComplete
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'حدث خطأ بالخادم' });
  }
});

export default router;
