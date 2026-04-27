import React from 'react';
import MaintenanceCard from './MaintenanceCard';

const MaintenanceList = ({ records, searchPlate, onEdit, onDelete, darkMode }) => {
  const sortedRecords = [...records].sort((a, b) => new Date(b.date) - new Date(a.date));

  const totalCost = records.reduce((sum, record) => sum + (record.cost || 0), 0);

  const exportToCSV = () => {
    if (records.length === 0) {
      alert('Dışa aktarılacak kayıt bulunmamaktadır.');
      return;
    }

    const headers = ['Plaka', 'Araç Markası', 'Parça/İşlem', 'Tarih', 'Kilometre', 'Maliyet (TL)', 'İşlem Türü', 'Durum', 'İş Emri No', 'Sonraki Bakım (km)'];
    const rows = sortedRecords.map(record => [
      record.plate,
      getBrandLabel(record.brand),
      record.part,
      record.date,
      record.km,
      record.cost,
      getTypeLabel(record.type),
      getStatusLabel(record.status),
      record.invoiceNo || '-',
      record.nextServiceKm || '-'
    ]);

    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `arac-bakim-kayitlari-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getTypeLabel = (type) => {
    const labels = {
      mekanik: 'Mekanik',
      periyodik: 'Periyodik Bakım',
      elektrik: 'Elektrik',
      diger: 'Diğer'
    };
    return labels[type] || type;
  };

  const getStatusLabel = (status) => {
    const labels = {
      tamamlandi: 'Tamamlandı',
      islemde: 'İşlemde',
      parca_bekliyor: 'Parça Bekliyor'
    };
    return labels[status] || status;
  };

  const getBrandLabel = (brand) => {
    const labels = {
      volvo: 'Volvo',
      audi: 'Audi',
      volkswagen: 'Volkswagen',
      peugeot: 'Peugeot',
      skoda: 'Skoda',
      other: 'Diğer'
    };
    return labels[brand] || brand;
  };

  if (records.length === 0 && searchPlate) {
    return (
      <div className="text-center py-8">
        <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Bu plakaya ait geçmiş bakım kaydı bulunamadı.</p>
      </div>
    );
  }

  return (
    <div>
      {searchPlate && records.length > 0 && (
        <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-700 to-blue-800' : 'from-blue-500 to-blue-600'} text-white p-6 rounded-lg shadow-lg mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
          <button
            onClick={exportToCSV}
            className={`px-4 py-2 rounded text-sm font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-white text-blue-600 hover:bg-gray-100'}`}
          >
            📥 Verileri Dışa Aktar (CSV)
          </button>
        </div>
      )}

      {records.length > 0 && !searchPlate && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={exportToCSV}
            className={`px-4 py-2 rounded text-sm font-medium ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            📥 Verileri Dışa Aktar (CSV)
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedRecords.map(record => (
          <MaintenanceCard
            key={record.id}
            record={record}
            onEdit={onEdit}
            onDelete={onDelete}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default MaintenanceList;