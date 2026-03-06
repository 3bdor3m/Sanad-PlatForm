import mongoose from 'mongoose';

const RequestDataSchema = new mongoose.Schema({
  formType: {
    type: String,
    required: true,
    enum: ['onboarding', 'login']
  },
  uid: {
    type: String,
    unique: true,
    sparse: true
  },
  // Onboarding Fields - Section 1
  fullName: String,
  gender: String,
  phone: String,
  personalEmail: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: { formType: 'onboarding' }
    }
  },
  
  // Onboarding Fields - Section 2
  businessCategory: String,
  businessName: String,
  businessType: String,
  businessAge: String,
  presence: String,
  businessDescription: String,
  businessAddress: String,
  schedule: [{
    day: String,
    name: String,
    isHoliday: Boolean,
    from: String,
    to: String
  }],
  inventory: String,
  orderSystem: String,
  socialUrl: String,
  businessEmail: String,
  targetAudience: String,
  
  // Onboarding Fields - Section 3
  knowledgeSource: String,
  persona: String,
  language: String,
  targetGroup: String,
  activeChannels: [String],
  
  // Onboarding Fields - Section 4
  fallbackAction: String,
  forbiddenWords: String,
  creativity: Number,
  notifications: [String],

  // Plan
  selectedPlan: String,
  avatar: String,

  // Login Fields
  email: String,
  
  // Note: Storing passwords in plain text is insecure. You should hash it using bcrypt before saving.
  // For the purpose of replacing the n8n webhook which just received it, we will keep it simple here,
  // but it's strongly recommended to hash passwords in a real production environment.
  password: String,
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('RequestData', RequestDataSchema);
