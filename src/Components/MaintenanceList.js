import React from 'react';
import MaintenanceCard from './MaintenanceCard';

const MaintenanceList = ({ records, searchPlate, onEdit, onDelete }) => {
  const sortedRecords = [...records].sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalCost = records.reduce((sum, record) => sum + (record.cost || 0), 0);

  if (records.length === 0 && searchPlate) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Bu plakaya ait geçmiş bakım kaydı bulunamadı.</p>
      </div>
    );
  }

  return (
    <div>
      {searchPlate && records.length > 0 && (
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm opacity-90">Toplam Kayıt Sayısı</p>
              <p className="text-3xl font-bold">{records.length}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Plaka</p>
              <p className="text-3xl font-bold">{records[0]?.plate}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Toplam Harcanan Maliyet</p>
              <p className="text-3xl font-bold">{totalCost.toLocaleString('tr-TR')} TL</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedRecords.map(record => (
          <MaintenanceCard
            key={record.id}
            record={record}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MaintenanceList;