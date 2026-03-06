import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please add a full name'],
    trim: true
  },
  gender: {
    type: String,
    required: [true, 'Please select a gender'],
    enum: ['male', 'female', 'other']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please add a phone number'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Profile Information
  plan: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free'
  },
  address: {
    type: String,
    default: ''
  },
  // Business Activity Data
  activityName: {
    type: String,
    default: ''
  },
  activityDescription: {
    type: String,
    default: ''
  },
  activityField: {
    type: String,
    default: ''
  },
  // AI Bot Customization
  toneOfVoice: {
    type: String,
    default: 'professional'
  },
  language: {
    type: String,
    default: 'mixed'
  }
});

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
