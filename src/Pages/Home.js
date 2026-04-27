import React, { useState, useEffect } from 'react';
import AddMaintenanceForm from '../Components/AddMaintenanceForm';
import MaintenanceList from '../Components/MaintenanceList';
import EditMaintenanceForm from '../Components/EditMaintenanceForm';

const Home = () => {
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchPlate, setSearchPlate] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('maintenanceRecords');
    if (stored) {
      setRecords(JSON.parse(stored));
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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Araç Bakım ve Teknik Servis Günlüğü</h1>
        <div className="mb-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Plaka ile sorgula..."
              value={searchPlate}
              onChange={(e) => setSearchPlate(e.target.value)}
              className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <AddMaintenanceForm onAdd={addRecord} />
        </div>
        {editingRecord && (
          <div className="mb-8">
            <EditMaintenanceForm
              record={editingRecord}
              onUpdate={updateRecord}
              onCancel={() => setEditingRecord(null)}
            />
          </div>
        )}
        <MaintenanceList
          records={filteredRecords}
          searchPlate={searchPlate}
          onEdit={setEditingRecord}
          onDelete={deleteRecord}
        />
      </div>
    </div>
  );
};

export default Home;