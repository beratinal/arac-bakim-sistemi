import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Moon, Sun, Car, LayoutDashboard, History, PlusCircle, Wrench, Mail, User, ShieldCheck, HelpCircle, ExternalLink } from 'lucide-react';
import AddMaintenanceForm from '../Components/AddMaintenanceForm';
import MaintenanceList from '../Components/MaintenanceList';
import EditMaintenanceForm from '../Components/EditMaintenanceForm';
import Dashboard from '../Components/Dashboard';
import { Button } from '../Components/UI/Button';
import { Input } from '../Components/UI/Input';
import { Modal } from '../Components/UI/Modal';

const Home = ({ darkMode, setDarkMode }) => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchPlate, setSearchPlate] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [quickData, setQuickData] = useState(null);
  const [isFormForcedOpen, setIsFormForcedOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const handleQuickMaintenance = (part, type) => {
    let lastRecord = null;
    const plateToSearch = searchPlate.toLowerCase();
    
    if (searchPlate && records.some(r => r.plate.toLowerCase().includes(plateToSearch))) {
      lastRecord = [...records]
        .filter(r => r.plate.toLowerCase().includes(plateToSearch))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    } else if (records.length > 0) {
      lastRecord = [...records]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    }

    setQuickData({ 
      part: part || '', 
      type: type || 'mekanik',
      plate: lastRecord?.plate || '',
      brand: lastRecord?.brand || 'volvo'
    });
    setIsFormForcedOpen(true);
  };

  useEffect(() => {
    const stored = localStorage.getItem('maintenanceRecords');
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse records", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('maintenanceRecords', JSON.stringify(records));
  }, [records]);

  const addRecord = (record) => {
    setRecords([...records, record]);
  };

  const updateRecord = (id, updatedRecord) => {
    setRecords(records.map(r => r.id === id ? { ...r, ...updatedRecord } : r));
    setEditingRecord(null);
  };

  const deleteRecord = (id) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const filteredRecords = searchPlate
    ? records.filter(record =>
        record.plate.toLowerCase().includes(searchPlate.toLowerCase())
      )
    : records;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl transition-all">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground transition-transform group-hover:rotate-12">
              <Wrench size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-black tracking-tight sm:text-2xl uppercase">
              INAL<span className="text-primary/50">_SERVIS</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative w-64 lg:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Plaka ile hızlı sorgula..."
                value={searchPlate}
                onChange={(e) => setSearchPlate(e.target.value)}
                className="pl-10 bg-surface border-none ring-offset-background focus-visible:ring-primary/20"
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-full w-10 h-10 hover:bg-surface"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-7xl">
        <div className="flex flex-col gap-10">
          <section className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div className="space-y-2">
                <p className="text-sm font-bold text-primary/60 uppercase tracking-[0.2em]">Sistem Paneli</p>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Servis Günlüğü</h2>
              </div>
              
              <div className="flex bg-surface p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'overview' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <LayoutDashboard size={16} /> Özet
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === 'history' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  <History size={16} /> Kayıtlar
                </button>
              </div>
            </motion.div>
          </section>

          <div className="md:hidden">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Plaka sorgula..."
                value={searchPlate}
                onChange={(e) => setSearchPlate(e.target.value)}
                className="pl-10 bg-surface border-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <Dashboard records={filteredRecords} darkMode={darkMode} />
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-1">
                      <div 
                        className="space-y-1 cursor-pointer group select-none"
                        onClick={() => handleQuickMaintenance('', 'mekanik')}
                      >
                        <h3 className="text-xl font-bold flex items-center gap-2 group-hover:text-primary transition-colors">
                          <PlusCircle className="text-primary transition-transform group-hover:rotate-90 group-active:scale-90" /> Hızlı Kayıt
                        </h3>
                        <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80">Sık yapılan işlemler için şablon kullanın.</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Yağ Değişimi', type: 'periyodik' },
                          { label: 'Fren Bakımı', type: 'mekanik' },
                          { label: 'Genel Kontrol', type: 'periyodik' },
                          { label: 'Akü Değişimi', type: 'elektrik' },
                        ].map((btn, i) => (
                          <Button
                            key={i}
                            variant="secondary"
                            size="sm"
                            onClick={() => handleQuickMaintenance(btn.label, btn.type)}
                            className="text-xs font-semibold h-8"
                          >
                            {btn.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <AddMaintenanceForm 
                      onAdd={addRecord} 
                      darkMode={darkMode} 
                      initialData={quickData}
                      externalOpen={isFormForcedOpen}
                      setExternalOpen={setIsFormForcedOpen}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {editingRecord && (
                    <EditMaintenanceForm
                      record={editingRecord}
                      onUpdate={updateRecord}
                      onCancel={() => setEditingRecord(null)}
                      darkMode={darkMode}
                    />
                  )}
                  
                  <MaintenanceList
                    records={filteredRecords}
                    searchPlate={searchPlate}
                    onEdit={setEditingRecord}
                    onDelete={deleteRecord}
                    darkMode={darkMode}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="border-t py-12 mt-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Car size={18} />
            </div>
            <span className="font-bold tracking-tighter uppercase">INAL TELEMETRI © 2026</span>
          </div>
          <p className="text-sm text-muted-foreground">Araç Bakım ve Teknik Servis Takip Sistemi</p>
          <div className="flex gap-6">
            <button 
              onClick={() => setShowPrivacy(true)}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              GİZLİLİK
            </button>
            <button 
              onClick={() => setShowSupport(true)}
              className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              DESTEK
            </button>
          </div>
        </div>
      </footer>

      <Modal 
        isOpen={showPrivacy} 
        onClose={() => setShowPrivacy(false)} 
        title="Gizlilik Politikası"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck size={20} />
            <span className="font-bold">Veri Güvenliği</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            INAL Servis uygulaması, verilerinizi tamamen yerel cihazınızda (Local Storage) saklar. Sunucularımıza hiçbir kişisel veriniz veya araç kaydınız aktarılmaz.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 pl-2">
            <li>Kayıtlar sadece sizin tarayıcınızda kalır.</li>
            <li>İnternet bağlantısı olmadan çalışabilir.</li>
            <li>Verileri dilediğiniz zaman CSV olarak dışa aktarabilirsiniz.</li>
          </ul>
        </div>
      </Modal>

      <Modal 
        isOpen={showSupport} 
        onClose={() => setShowSupport(false)} 
        title="Destek ve İletişim"
      >
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Sistem ile ilgili herhangi bir sorun veya geliştirme öneriniz için aşağıdaki kanallardan bize ulaşabilirsiniz.
          </p>
          <div className="grid grid-cols-1 gap-3">
            <a 
              href="mailto:brtinal0@gmail.com"
              className="flex items-center justify-between p-4 rounded-xl bg-surface hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-background text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">E-Posta</p>
                  <p className="text-sm font-bold">brtinal0@gmail.com</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary" />
            </a>
            <a 
              href="https://www.linkedin.com/in/berat-inal-2b6bb2218"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl bg-surface hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-background text-[#0A66C2]">
                  <ExternalLink size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase">LinkedIn</p>
                  <p className="text-sm font-bold">Berat İnal</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary" />
            </a>
          </div>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 flex items-start gap-3">
            <HelpCircle size={18} className="text-primary mt-0.5" />
            <p className="text-xs text-primary/80 leading-normal">
              INAL SERVİS, araç sahipleri için geliştirilmiş açık kaynaklı bir takip aracıdır.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
