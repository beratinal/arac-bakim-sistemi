import React, { useState, useEffect } from 'react';
import AddMaintenanceForm from '../Components/AddMaintenanceForm';
import MaintenanceList from '../Components/MaintenanceList';
import EditMaintenanceForm from '../Components/EditMaintenanceForm';
import Dashboard from '../Components/Dashboard';

const Home = ({ darkMode, setDarkMode }) => {
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Araç Bakım ve Teknik Servis Günlüğü
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              darkMode 
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            <span>{darkMode ? '☀️' : '🌙'}</span>
            <span>{darkMode ? 'Gündüz' : 'Gece'}</span>
          </button>
        </div>

        <div className="mb-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Plaka ile sorgula..."
              value={searchPlate}
              onChange={(e) => setSearchPlate(e.target.value)}
              className={`w-full max-w-md border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <AddMaintenanceForm onAdd={addRecord} darkMode={darkMode} />
        </div>

        <Dashboard records={filteredRecords} darkMode={darkMode} />

        {editingRecord && (
          <div className="mb-8">
            <EditMaintenanceForm
              record={editingRecord}
              onUpdate={updateRecord}
              onCancel={() => setEditingRecord(null)}
              darkMode={darkMode}
            />
          </div>
        )}
        
        <MaintenanceList
          records={filteredRecords}
          searchPlate={searchPlate}
          onEdit={setEditingRecord}
          onDelete={deleteRecord}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default Home;