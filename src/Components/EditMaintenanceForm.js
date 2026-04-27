import React, { useState, useEffect } from 'react';

const EditMaintenanceForm = ({ record, onUpdate, onCancel }) => {
  const [form, setForm] = useState({
    plate: record.plate,
    part: record.part,
    date: record.date,
    km: record.km.toString(),
    cost: record.cost.toString(),
    type: record.type
  });

  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];
  const minDate = '1950-01-01';

  useEffect(() => {
    setForm({
      plate: record.plate,
      part: record.part,
      date: record.date,
      km: record.km.toString(),
      cost: record.cost.toString(),
      type: record.type
    });
    setErrors({});
  }, [record]);

  const validatePlate = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Plaka boş bırakılamaz';
    if (trimmed.length > 15) return 'Plaka maksimum 15 karakter olabilir';
    return '';
  };

  const validatePart = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'İşlem adı boş bırakılamaz';
    if (trimmed.length > 50) return 'İşlem adı maksimum 50 karakter olabilir';
    return '';
  };

  const validateDate = (value) => {
    if (!value) return 'Tarih seçilmelidir';
    if (value < minDate || value > today) return 'Tarih 1950 ile bugün arasında olmalıdır';
    return '';
  };

  const validateKm = (value) => {
    if (!value) return 'Kilometre girilmelidir';
    const num = parseInt(value);
    if (isNaN(num) || num < 0 || num > 9999999) return 'Lütfen geçerli bir kilometre giriniz (Maks: 9.999.999)';
    return '';
  };

  const validateCost = (value) => {
    if (!value) return 'Maliyet girilmelidir';
    const num = parseFloat(value);
    if (isNaN(num) || num < 0 || num > 5000000) return 'Maliyet 0 ile 5.000.000 TL arasında olmalıdır';
    return '';
  };

  const validateType = (value) => {
    if (!value) return 'Tür seçilmelidir';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'km' || name === 'cost') {
      // Sadece sayı ve nokta (cost için) kabul et
      newValue = value.replace(/[^0-9.]/g, '');
      if (name === 'km') newValue = newValue.replace(/\./g, ''); // km için nokta yok
    }

    setForm({ ...form, [name]: newValue });

    // Validation
    let error = '';
    switch (name) {
      case 'plate':
        error = validatePlate(newValue);
        break;
      case 'part':
        error = validatePart(newValue);
        break;
      case 'date':
        error = validateDate(newValue);
        break;
      case 'km':
        error = validateKm(newValue);
        break;
      case 'cost':
        error = validateCost(newValue);
        break;
      case 'type':
        error = validateType(newValue);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const isFormValid = () => {
    return !Object.values(errors).some(error => error) &&
           form.plate.trim() &&
           form.part.trim() &&
           form.date &&
           form.km &&
           form.cost &&
           form.type;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    onUpdate(record.id, {
      ...form,
      km: parseInt(form.km),
      cost: parseFloat(form.cost)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Bakım Kaydını Düzenle</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="plate"
            placeholder="Araç Plakası"
            value={form.plate}
            onChange={handleChange}
            maxLength="15"
            className="border p-2 rounded w-full"
            required
          />
          {errors.plate && <p className="text-red-500 text-sm mt-1">{errors.plate}</p>}
        </div>
        <div>
          <input
            type="text"
            name="part"
            placeholder="Parça/İşlem Adı"
            value={form.part}
            onChange={handleChange}
            maxLength="50"
            className="border p-2 rounded w-full"
            required
          />
          {errors.part && <p className="text-red-500 text-sm mt-1">{errors.part}</p>}
        </div>
        <div>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={minDate}
            max={today}
            className="border p-2 rounded w-full"
            required
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
        <div>
          <input
            type="text"
            name="km"
            placeholder="Kilometre"
            value={form.km}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          {errors.km && <p className="text-red-500 text-sm mt-1">{errors.km}</p>}
        </div>
        <div>
          <input
            type="text"
            name="cost"
            placeholder="Maliyet (TL)"
            value={form.cost}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
        </div>
        <div>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="mekanik">Mekanik</option>
            <option value="periyodik">Periyodik Bakım</option>
            <option value="elektrik">Elektrik</option>
            <option value="diger">Diğer</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`px-4 py-2 rounded ${isFormValid() ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
        >
          Güncelle
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          İptal
        </button>
      </div>
    </form>
  );
};

export default EditMaintenanceForm;