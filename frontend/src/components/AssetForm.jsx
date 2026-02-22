import { useState, useEffect } from 'react';

export default function AssetForm({ asset, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    serialNumber: '',
    purchaseDate: '',
    status: 'AVAILABLE',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name || '',
        category: asset.category || 'Electronics',
        serialNumber: asset.serialNumber || '',
        purchaseDate: asset.purchaseDate ? asset.purchaseDate.split('T')[0] : '',
        status: asset.status || 'AVAILABLE',
        description: asset.description || '',
      });
    }
  }, [asset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.name || !formData.category || !formData.serialNumber || !formData.purchaseDate) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      await onSubmit(formData);
      setFormData({
        name: '',
        category: 'Electronics',
        serialNumber: '',
        purchaseDate: '',
        status: 'AVAILABLE',
        description: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to save asset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="asset-form" onSubmit={handleSubmit}>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="name">Asset Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="e.g., Dell Monitor"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            disabled={loading}
            required
          >
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Tools">Tools</option>
            <option value="Supplies">Supplies</option>
            <option value="Equipment">Equipment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="serialNumber">Serial Number *</label>
          <input
            id="serialNumber"
            type="text"
            name="serialNumber"
            placeholder="e.g., SN-2024001"
            value={formData.serialNumber}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="purchaseDate">Purchase Date *</label>
          <input
            id="purchaseDate"
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="AVAILABLE">Available</option>
            <option value="IN_USE">In Use</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="DAMAGED">Damaged</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Add any notes or details about this asset..."
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            rows="3"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : asset ? 'Update Asset' : 'Add Asset'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      </div>
    </form>
  );
}
