import React from 'react';

const MaintenanceCard = ({ record, onEdit, onDelete }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'mekanik': return 'bg-red-100 text-red-800';
      case 'periyodik': return 'bg-green-100 text-green-800';
      case 'elektrik': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{record.plate}</h3>
          <p className="text-gray-600">{record.part}</p>
          <p className="text-sm text-gray-500">{record.date} - {record.km} km</p>
          <p className="text-sm font-semibold">{record.cost} TL</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
          {record.type}
        </span>
      </div>
      <div className="mt-4 flex space-x-2">
        <button onClick={() => onEdit(record)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
          Düzenle
        </button>
        <button onClick={() => onDelete(record.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Sil
        </button>
      </div>
    </div>
  );
};

export default MaintenanceCard;