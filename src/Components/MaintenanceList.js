import React from 'react';
import MaintenanceCard from './MaintenanceCard';

const MaintenanceList = ({ records, searchPlate, onEdit, onDelete }) => {
  const sortedRecords = [...records].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (records.length === 0 && searchPlate) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">Bu plakaya ait geçmiş bakım kaydı bulunamadı.</p>
      </div>
    );
  }

  return (
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
  );
};

export default MaintenanceList;