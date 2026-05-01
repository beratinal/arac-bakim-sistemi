import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Zap, MoreHorizontal, Calendar, Gauge, CreditCard, PenLine, Trash2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './UI/Card';
import { Badge } from './UI/Badge';
import { Button } from './UI/Button';

const MaintenanceCard = ({ record, onEdit, onDelete, darkMode }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'tamamlandi': return { label: 'Tamamlandı', variant: 'success' };
      case 'islemde': return { label: 'İşlemde', variant: 'info' };
      case 'parca_bekliyor': return { label: 'Parça Bekliyor', variant: 'warning' };
      default: return { label: status, variant: 'secondary' };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'mekanik': return <Settings className="w-4 h-4" />;
      case 'periyodik': return <Calendar className="w-4 h-4" />;
      case 'elektrik': return <Zap className="w-4 h-4" />;
      default: return <MoreHorizontal className="w-4 h-4" />;
    }
  };

  const getBrandLabel = (brand) => {
    const brands = {
      volvo: 'Volvo',
      audi: 'Audi',
      volkswagen: 'Volkswagen',
      peugeot: 'Peugeot',
      skoda: 'Skoda',
      other: 'Diğer'
    };
    return brands[brand] || brand;
  };

  const statusInfo = getStatusInfo(record.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden h-full flex flex-col group">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight">
              {record.plate}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="font-medium">{getBrandLabel(record.brand)}</span>
              {record.invoiceNo && (
                <>
                  <span className="mx-2 text-border">•</span>
                  <span className="text-xs">#{record.invoiceNo}</span>
                </>
              )}
            </div>
          </div>
          <Badge variant={statusInfo.variant} className="capitalize">
            {statusInfo.label}
          </Badge>
        </CardHeader>
        
        <CardContent className="flex-1 space-y-4 pt-4">
          <div className="flex items-start space-x-3">
            <div className="mt-0.5 p-2 rounded-md bg-surface text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {getTypeIcon(record.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium leading-tight line-clamp-2">
                {record.part}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="mr-1 w-3 h-3" /> Tarih
              </div>
              <p className="text-sm font-semibold">{record.date}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-xs text-muted-foreground">
                <Gauge className="mr-1 w-3 h-3" /> Kilometre
              </div>
              <p className="text-sm font-semibold">{record.km.toLocaleString('tr-TR')} km</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-xs text-muted-foreground">
                <CreditCard className="mr-1 w-3 h-3" /> Maliyet
              </div>
              <p className="text-sm font-bold text-primary">
                {record.cost.toLocaleString('tr-TR')} TL
              </p>
            </div>
            {record.nextServiceKm && (
              <div className="space-y-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Zap className="mr-1 w-3 h-3" /> Sonraki Bakım
                </div>
                <p className="text-sm font-semibold text-orange-500/80">
                  {record.nextServiceKm.toLocaleString('tr-TR')} km
                </p>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-2 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 gap-2"
            onClick={() => onEdit(record)}
          >
            <PenLine className="w-3.5 h-3.5" /> Düzenle
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            className="flex-1 gap-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
            onClick={() => onDelete(record.id)}
          >
            <Trash2 className="w-3.5 h-3.5" /> Sil
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default MaintenanceCard;
