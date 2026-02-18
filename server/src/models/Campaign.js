import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      trim: true
    },
    countries: {
      type: [String],
      required: true,
      default: []
    },
    campaignType: {
      type: String,
      required: true,
      trim: true
    },
    goal: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    duration: {
      type: String,
      required: true,
      trim: true
    },
    dailyPacingControl: {
      type: Number,
      required: true,
      min: 0
    },
    revenue: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
