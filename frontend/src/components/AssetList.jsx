import AssetCard from './AssetCard';

export default function AssetList({ assets, onEdit, onDelete }) {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'badge-success';
      case 'IN_USE':
        return 'badge-info';
      case 'MAINTENANCE':
        return 'badge-warning';
      case 'DAMAGED':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  };

  return (
    <div className="assets-list">
      <div className="assets-grid">
        {assets.map((asset) => (
          <AssetCard
            key={asset._id}
            asset={asset}
            statusBadgeClass={getStatusBadgeClass(asset.status)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
