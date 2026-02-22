const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide asset name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide asset category'],
      enum: ['Electronics', 'Furniture', 'Tools', 'Supplies', 'Equipment', 'Other'],
      default: 'Other',
    },
    serialNumber: {
      type: String,
      required: [true, 'Please provide serial number'],
      unique: true,
      trim: true,
    },
    purchaseDate: {
      type: Date,
      required: [true, 'Please provide purchase date'],
    },
    status: {
      type: String,
      enum: ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'DAMAGED'],
      default: 'AVAILABLE',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
  },
  { timestamps: true }
);

// Index for user queries
assetSchema.index({ userId: 1 });

module.exports = mongoose.model('Asset', assetSchema);
