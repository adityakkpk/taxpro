import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    sparse: true, // Allows null/undefined values
    validate: {
      validator: function(v: string) {
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  phone: {
    type: String,
    sparse: true, // Allows null/undefined values
    validate: {
      validator: function(v: string) {
        return !v || /^\+?[1-9]\d{1,14}$/.test(v);
      },
      message: 'Invalid phone number format'
    }
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure at least one of email or phone is provided
subscriberSchema.pre('save', function(next) {
  if (!this.email && !this.phone) {
    next(new Error('Either email or phone is required'));
  }
  next();
});

const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', subscriberSchema);

export default Subscriber;
