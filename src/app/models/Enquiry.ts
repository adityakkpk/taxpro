import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
  },
  query: {
    type: String,
    required: [true, 'Please provide your query'],
  },
  files: [{
    url: String,
    publicId: String
  }],
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);