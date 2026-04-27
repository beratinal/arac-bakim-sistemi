// Interfaces/MaintenanceRecord.js
export const MaintenanceRecord = {
  id: '',
  plate: '',
  part: '',
  date: '',
  km: 0,
  cost: 0,
  type: '', // e.g., 'mekanik', 'periyodik', etc.
  brand: '', // 'volvo', 'audi', 'volkswagen', 'peugeot', 'skoda', 'other'
  invoiceNo: '', // optional invoice/work order number
  status: '', // 'tamamlandi', 'islemde', 'parca_bekliyor'
  nextServiceKm: 0 // calculated or manually set next service km
};