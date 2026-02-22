const Asset = require('../models/Asset');

// @desc    Get all assets for logged-in user
// @route   GET /api/assets
// @access  Private
const getAssets = async (req, res) => {
  try {
    const { search, name, category, serialNumber, status } = req.query;
    const query = { userId: req.user.id };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { serialNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    if (serialNumber) {
      query.serialNumber = { $regex: serialNumber, $options: 'i' };
    }

    if (status) {
      query.status = status;
    }

    const assets = await Asset.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single asset
// @route   GET /api/assets/:id
// @access  Private
const getAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    // Check if user owns this asset
    if (asset.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this asset' });
    }

    res.status(200).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create asset
// @route   POST /api/assets
// @access  Private
const createAsset = async (req, res) => {
  try {
    const { name, category, serialNumber, purchaseDate, status, description } = req.body;

    // Validation
    if (!name || !category || !serialNumber || !purchaseDate) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    // Check if serial number already exists
    const serialExists = await Asset.findOne({ serialNumber });
    if (serialExists) {
      return res.status(400).json({ success: false, message: 'Serial number already exists' });
    }

    const asset = await Asset.create({
      name,
      category,
      serialNumber,
      purchaseDate,
      status: status || 'AVAILABLE',
      description,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update asset
// @route   PUT /api/assets/:id
// @access  Private
const updateAsset = async (req, res) => {
  try {
    let asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    // Check if user owns this asset
    if (asset.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this asset' });
    }

    // Check if serialNumber is being changed to an existing one
    if (req.body.serialNumber && req.body.serialNumber !== asset.serialNumber) {
      const serialExists = await Asset.findOne({ serialNumber: req.body.serialNumber });
      if (serialExists) {
        return res.status(400).json({ success: false, message: 'Serial number already exists' });
      }
    }

    const { name, category, serialNumber, purchaseDate, status, description } = req.body;

    // Update fields if provided
    if (name) asset.name = name;
    if (category) asset.category = category;
    if (serialNumber) asset.serialNumber = serialNumber;
    if (purchaseDate) asset.purchaseDate = purchaseDate;
    if (status) asset.status = status;
    if (description) asset.description = description;

    asset = await asset.save();

    res.status(200).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete asset
// @route   DELETE /api/assets/:id
// @access  Private
const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).json({ success: false, message: 'Asset not found' });
    }

    // Check if user owns this asset
    if (asset.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this asset' });
    }

    await Asset.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Asset deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
};
