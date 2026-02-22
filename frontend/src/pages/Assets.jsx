import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { assetAPI } from '../services/api';
import AssetForm from '../components/AssetForm';
import AssetList from '../components/AssetList';
import ThemeToggle from '../components/ThemeToggle';
import '../styles/assets.css';

export default function Assets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/');
      return;
    }

    try {
      setUser(userData ? JSON.parse(userData) : { name: 'User' });
    } catch (e) {
      setUser({ name: 'User' });
    }
    fetchAssets('');
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAssets(search);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchAssets = async (searchTerm = '') => {
    try {
      setLoading(true);
      const response = await assetAPI.getAll(searchTerm ? { search: searchTerm } : {});
      if (response.data.success) {
        setAssets(response.data.data);
        setError('');
      }
    } catch (err) {
      setError('Failed to load assets. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAsset = async (formData) => {
    try {
      const response = await assetAPI.create(formData);
      if (response.data.success) {
        setAssets([response.data.data, ...assets]);
        setShowForm(false);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add asset');
    }
  };

  const handleUpdateAsset = async (id, formData) => {
    try {
      const response = await assetAPI.update(id, formData);
      if (response.data.success) {
        setAssets(assets.map((asset) => (asset._id === id ? response.data.data : asset)));
        setEditingAsset(null);
        setShowForm(false);
        setError('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update asset');
    }
  };

  const openDeleteModal = (asset) => {
    setDeleteTarget(asset);
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
  };

  const confirmDeleteAsset = async () => {
    if (!deleteTarget?._id) return;
    try {
      const response = await assetAPI.delete(deleteTarget._id);
      if (response.data.success) {
        setAssets(assets.filter((asset) => asset._id !== deleteTarget._id));
        setError('');
        closeDeleteModal();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete asset');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/', { replace: true });
  };

  const handleEditAsset = (asset) => {
    setEditingAsset(asset);
    setShowForm(true);
  };

  const stats = useMemo(() => {
    const data = {
      total: assets.length,
      available: 0,
      active: 0,
      attention: 0,
    };
    assets.forEach((asset) => {
      if (asset.status === 'AVAILABLE') data.available += 1;
      if (asset.status === 'IN_USE') data.active += 1;
      if (asset.status === 'DAMAGED' || asset.status === 'MAINTENANCE') data.attention += 1;
    });
    return data;
  }, [assets]);

  return (
    <div className="assets-page">
      <ThemeToggle />
      {/* Header */}
      <header className="assets-header">
        <div className="header-content">
          <div>
            <h1>Office Assets</h1>
            <p className="header-subtitle">Manage your office equipment and resources</p>
          </div>
          <div className="header-actions">
            <span className="user-info">Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="btn btn-secondary btn-small">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="assets-main">
        <div className="container">
          {/* Error Alert */}
          {error && <div className="alert alert-error">{error}</div>}

          {/* Actions Bar */}
          <div className="actions-bar">
            <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
              {showForm ? 'Cancel' : '+ Add Asset'}
            </button>
            {assets.length > 0 && <span className="asset-count">Total Assets: {assets.length}</span>}
          </div>

          <div className="stats-grid" aria-label="Asset summary">
            <article className="stat-tile card">
              <p className="stat-label">Total Assets</p>
              <p className="stat-value">{stats.total}</p>
            </article>
            <article className="stat-tile card">
              <p className="stat-label">Available</p>
              <p className="stat-value">{stats.available}</p>
            </article>
            <article className="stat-tile card">
              <p className="stat-label">In Use</p>
              <p className="stat-value">{stats.active}</p>
            </article>
            <article className="stat-tile card">
              <p className="stat-label">Needs Attention</p>
              <p className="stat-value">{stats.attention}</p>
            </article>
          </div>

          {/* Search */}
          <div className="actions-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search by asset name, category, or serial number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Asset Form */}
          {showForm && (
            <div className="form-section">
              <h2>{editingAsset ? 'Edit Asset' : 'Add New Asset'}</h2>
              <AssetForm
                asset={editingAsset}
                onSubmit={editingAsset ? (data) => handleUpdateAsset(editingAsset._id, data) : handleAddAsset}
                onCancel={() => {
                  setShowForm(false);
                  setEditingAsset(null);
                }}
              />
            </div>
          )}

          {/* Assets List */}
          {loading ? (
            <div className="spinner"></div>
          ) : assets.length === 0 ? (
            <div className="empty-state">
              <h3>No assets found</h3>
              <p>Try changing search text or add a new asset</p>
            </div>
          ) : (
            <AssetList
              assets={assets}
              onEdit={handleEditAsset}
              onDelete={(id) => {
                const asset = assets.find((item) => item._id === id);
                openDeleteModal(asset || { _id: id, name: 'this asset' });
              }}
            />
          )}
        </div>
      </main>

      {deleteTarget && (
        <div className="modal-backdrop" role="presentation" onClick={closeDeleteModal}>
          <div
            className="modal-card card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="delete-modal-title">Delete Asset?</h3>
            <p>
              This action cannot be undone. You are deleting <strong>{deleteTarget.name}</strong>.
            </p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDeleteAsset}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
