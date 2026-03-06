import mongoose from 'mongoose';

const RequestMetadataSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: false,
  },
  deviceType: {
    type: String,
    required: false,
    enum: ['Mobile', 'Tablet', 'Desktop', 'Unknown'],
    default: 'Unknown'
  },
  headers: {
    type: Object,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

// Create the model
const RequestMetadata = mongoose.model('RequestMetadata', RequestMetadataSchema);

export default RequestMetadata;
