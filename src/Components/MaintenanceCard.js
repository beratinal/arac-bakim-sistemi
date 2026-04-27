import React from 'react';

const MaintenanceCard = ({ record, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'tamamlandi': return 'bg-green-500 text-white';
      case 'islemde': return 'bg-blue-500 text-white';
      case 'parca_bekliyor': return 'bg-orange-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'tamamlandi': return 'Tamamlandı';
      case 'islemde': return 'İşlemde';
      case 'parca_bekliyor': return 'Parça Bekliyor';
      default: return status;
    }
  };

  const getBrandLabel = (brand) => {
    switch (brand) {
      case 'volvo': return 'Volvo';
      case 'audi': return 'Audi';
      case 'volkswagen': return 'Volkswagen';
      case 'peugeot': return 'Peugeot';
      case 'skoda': return 'Skoda';
      case 'other': return 'Diğer';
      default: return brand;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg">{record.plate}</h3>
          <p className="text-sm text-gray-600">{getBrandLabel(record.brand)}</p>
          {record.invoiceNo && <p className="text-xs text-gray-500">İş Emri: {record.invoiceNo}</p>}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
          {getStatusLabel(record.status)}
        </span>
      </div>

      <div className="border-t pt-3">
        <p className="text-gray-600 font-medium">{record.part}</p>
        <p className="text-sm text-gray-500">{record.date} - {record.km.toLocaleString('tr-TR')} km</p>
        <p className="text-sm font-semibold text-blue-600">{record.cost.toLocaleString('tr-TR')} TL</p>
        <p className="text-xs text-gray-600 mt-2">Sonraki Bakım: {record.nextServiceKm?.toLocaleString('tr-TR') || '-'} km</p>
      </div>

      <div className="mt-4 flex space-x-2">
        <button onClick={() => onEdit(record)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">
          Düzenle
        </button>
        <button onClick={() => onDelete(record.id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
          Sil
        </button>
      </div>
    </div>
  );
};

export default MaintenanceCard;