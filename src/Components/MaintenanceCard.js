import React from 'react';

const MaintenanceCard = ({ record, onEdit, onDelete, darkMode }) => {
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
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 rounded-lg shadow-md border`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-lg truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{record.plate}</h3>
          <p className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{getBrandLabel(record.brand)}</p>
          {record.invoiceNo && <p className={`text-xs truncate ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>İş Emri: {record.invoiceNo}</p>}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${getStatusColor(record.status)}`}>
          {getStatusLabel(record.status)}
        </span>
      </div>

      <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-3`}>
        <p className={`font-medium line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{record.part}</p>
        <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{record.date} - {record.km.toLocaleString('tr-TR')} km</p>
        <p className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{record.cost.toLocaleString('tr-TR')} TL</p>
        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'} mt-2`}>Sonraki Bakım: {record.nextServiceKm?.toLocaleString('tr-TR') || '-'} km</p>
      </div>

      <div className="mt-4 flex space-x-2">
        <button onClick={() => onEdit(record)} className={`${darkMode ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white px-3 py-1 rounded text-sm`}>
          Düzenle
        </button>
        <button onClick={() => onDelete(record.id)} className={`${darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'} text-white px-3 py-1 rounded text-sm`}>
          Sil
        </button>
      </div>
    </div>
  );
};

export default MaintenanceCard;