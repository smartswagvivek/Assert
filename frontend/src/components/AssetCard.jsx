export default function AssetCard({ asset, statusBadgeClass, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Electronics: 'EL',
      Furniture: 'FU',
      Tools: 'TL',
      Supplies: 'SP',
      Equipment: 'EQ',
      Other: 'OT',
    };
    return icons[category] || 'OT';
  };

  return (
    <article className="asset-card card" aria-label={`Asset ${asset.name}`}>
      <div className="card-header">
        <div className="card-title">
          <span className="category-icon" aria-hidden="true">
            {getCategoryIcon(asset.category)}
          </span>
          <h3>{asset.name}</h3>
        </div>
        <span className={`badge ${statusBadgeClass}`}>{asset.status}</span>
      </div>

      <div className="card-body">
        <div className="asset-info">
          <div className="info-item">
            <span className="label">Category</span>
            <span className="value">{asset.category}</span>
          </div>
          <div className="info-item">
            <span className="label">Serial Number</span>
            <span className="value">{asset.serialNumber}</span>
          </div>
          <div className="info-item">
            <span className="label">Purchase Date</span>
            <span className="value">{formatDate(asset.purchaseDate)}</span>
          </div>
          {asset.description && (
            <div className="info-item full-width">
              <span className="label">Description</span>
              <span className="value">{asset.description}</span>
            </div>
          )}
        </div>
      </div>

      <div className="card-actions">
        <button onClick={() => onEdit(asset)} className="btn btn-secondary btn-small">
          Edit
        </button>
        <button onClick={() => onDelete(asset._id)} className="btn btn-danger btn-small">
          Delete
        </button>
      </div>
    </article>
  );
}
