import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Search, Info, BarChart3, CarFront } from 'lucide-react';
import MaintenanceCard from './MaintenanceCard';
import { Button } from './UI/Button';
import { Card, CardContent } from './UI/Card';

const MaintenanceList = ({ records, searchPlate, onEdit, onDelete, darkMode }) => {
  const sortedRecords = [...records].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalCost = records.reduce((sum, record) => sum + (record.cost || 0), 0);

  const exportToCSV = () => {
    if (records.length === 0) return;

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
    link.click();
  };

  const getTypeLabel = (type) => {
    const labels = { mekanik: 'Mekanik', periyodik: 'Periyodik Bakım', elektrik: 'Elektrik', diger: 'Diğer' };
    return labels[type] || type;
  };

  const getStatusLabel = (status) => {
    const labels = { tamamlandi: 'Tamamlandı', islemde: 'İşlemde', parca_bekliyor: 'Parça Bekliyor' };
    return labels[status] || status;
  };

  const getBrandLabel = (brand) => {
    const labels = { volvo: 'Volvo', audi: 'Audi', volkswagen: 'Volkswagen', peugeot: 'Peugeot', skoda: 'Skoda', other: 'Diğer' };
    return labels[brand] || brand;
  };

  if (records.length === 0 && searchPlate) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12 space-y-4"
      >
        <div className="p-4 rounded-full bg-surface">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">Bu plakaya ait geçmiş bakım kaydı bulunamadı.</p>
      </motion.div>
    );
  }

  if (records.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 space-y-6 text-center"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <div className="relative p-6 rounded-full bg-surface border-2 border-dashed border-primary/20">
            <CarFront className="w-12 h-12 text-primary/40" />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">Henüz Kayıt Bulunmuyor</h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Aracınızın bakım geçmişini takip etmek için ilk kaydınızı hemen ekleyebilirsiniz.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {searchPlate && records.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-surface-secondary text-card-foreground border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <CarFront size={120} strokeWidth={1} />
            </div>
            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider opacity-70">Plaka</p>
                  <p className="text-3xl font-bold tracking-tight">{records[0]?.plate}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider opacity-70">Toplam Kayıt</p>
                  <p className="text-3xl font-bold tracking-tight">{records.length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider opacity-70">Toplam Harcama</p>
                  <p className="text-3xl font-bold tracking-tight">{totalCost.toLocaleString('tr-TR')} TL</p>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <Button 
                  variant="secondary" 
                  className="gap-2"
                  onClick={exportToCSV}
                >
                  <Download className="w-4 h-4" /> Dışa Aktar (CSV)
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {records.length > 0 && !searchPlate && (
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BarChart3 className="w-5 h-5" /> Son Kayıtlar
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            className="gap-2"
          >
            <Download className="w-4 h-4" /> Verileri Dışa Aktar
          </Button>
        </div>
      )}

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {sortedRecords.map((record, index) => (
            <MaintenanceCard
              key={record.id}
              record={record}
              onEdit={onEdit}
              onDelete={onDelete}
              darkMode={darkMode}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MaintenanceList;
