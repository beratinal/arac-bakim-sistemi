import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Save, Car, Wrench, Calendar as CalendarIcon, Gauge, CreditCard, FileText } from 'lucide-react';
import { Button } from './UI/Button';
import { Input } from './UI/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './UI/Card';
import { Badge } from './UI/Badge';

const AddMaintenanceForm = ({ onAdd, darkMode, initialData, externalOpen, setExternalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    plate: '',
    brand: 'volvo',
    part: '',
    date: new Date().toISOString().split('T')[0],
    km: '',
    cost: '',
    type: 'mekanik',
    status: 'tamamlandi',
    invoiceNo: '',
    nextServiceKm: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
    if (externalOpen) {
      setIsOpen(true);
    }
  }, [initialData, externalOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (setExternalOpen) setExternalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.plate || !formData.part || !formData.km || !formData.cost) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    onAdd({
      ...formData,
      id: Date.now(),
      km: Number(formData.km),
      cost: Number(formData.cost),
      nextServiceKm: formData.nextServiceKm ? Number(formData.nextServiceKm) : null
    });

    setFormData({
      plate: '',
      brand: 'volvo',
      part: '',
      date: new Date().toISOString().split('T')[0],
      km: '',
      cost: '',
      type: 'mekanik',
      status: 'tamamlandi',
      invoiceNo: '',
      nextServiceKm: ''
    });
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button 
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto gap-2 py-6 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> Yeni Bakım Kaydı Ekle
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <Card className="shadow-2xl border-primary/20 bg-card/50 backdrop-blur-xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-surface/30 pb-6">
              <div>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <Wrench className="w-6 h-6 text-primary" /> Yeni Servis Kaydı
                </CardTitle>
                <CardDescription>
                  Araca yapılan bakım veya onarım bilgilerini detaylıca girin.
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Araç Bilgileri Section */}
                  <div className="space-y-4 p-4 rounded-xl bg-surface border border-border/50">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Car className="w-4 h-4" /> Araç Bilgileri
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Plaka *</label>
                        <Input 
                          name="plate" 
                          placeholder="34 ABC 123" 
                          value={formData.plate} 
                          onChange={handleChange} 
                          required
                          className="bg-background/50 uppercase font-mono font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Marka</label>
                        <select
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="volvo">Volvo</option>
                          <option value="audi">Audi</option>
                          <option value="volkswagen">Volkswagen</option>
                          <option value="peugeot">Peugeot</option>
                          <option value="skoda">Skoda</option>
                          <option value="other">Diğer</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* İşlem Bilgileri Section */}
                  <div className="space-y-4 p-4 rounded-xl bg-surface border border-border/50">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Wrench className="w-4 h-4" /> İşlem Detayları
                    </h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Parça / İşlem *</label>
                        <Input 
                          name="part" 
                          placeholder="Örn: Yağ Değişimi" 
                          value={formData.part} 
                          onChange={handleChange} 
                          required
                          className="bg-background/50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Tür</label>
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="mekanik">Mekanik</option>
                            <option value="periyodik">Periyodik</option>
                            <option value="elektrik">Elektrik</option>
                            <option value="diger">Diğer</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Durum</label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="tamamlandi">Tamamlandı</option>
                            <option value="islemde">İşlemde</option>
                            <option value="parca_bekliyor">Bekliyor</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Teknik Detaylar Section */}
                  <div className="space-y-4 p-4 rounded-xl bg-surface border border-border/50">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Teknik & Finansal
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Kilometre *</label>
                          <Input 
                            type="number" 
                            name="km" 
                            placeholder="120000" 
                            value={formData.km} 
                            onChange={handleChange} 
                            required
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Maliyet (TL) *</label>
                          <Input 
                            type="number" 
                            name="cost" 
                            placeholder="1500" 
                            value={formData.cost} 
                            onChange={handleChange} 
                            required
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Tarih</label>
                          <Input 
                            type="date" 
                            name="date" 
                            value={formData.date} 
                            onChange={handleChange}
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">İş Emri No</label>
                          <Input 
                            name="invoiceNo" 
                            placeholder="EM-1234" 
                            value={formData.invoiceNo} 
                            onChange={handleChange}
                            className="bg-background/50"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Sonraki Bakım (KM)</label>
                        <Input 
                          type="number" 
                          name="nextServiceKm" 
                          placeholder="135000" 
                          value={formData.nextServiceKm} 
                          onChange={handleChange}
                          className="bg-background/50 border-orange-500/20 focus:border-orange-500/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t">
                  <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                    İptal
                  </Button>
                  <Button type="submit" className="gap-2 px-8">
                    <Save className="w-4 h-4" /> Kaydı Kaydet
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AddMaintenanceForm;
