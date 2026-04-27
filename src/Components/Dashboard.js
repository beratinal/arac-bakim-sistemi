import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = ({ records, darkMode }) => {
  const chartData = useMemo(() => {
    const typeStats = {};

    records.forEach(record => {
      const type = record.type || 'Diğer';
      if (!typeStats[type]) {
        typeStats[type] = 0;
      }
      typeStats[type] += record.cost || 0;
    });

    return Object.entries(typeStats).map(([type, cost]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: cost
    }));
  }, [records]);

  const COLORS = ['#ef4444', '#22c55e', '#eab308', '#8b5cf6'];

  const getTypeLabel = (type) => {
    const typeLabels = {
      mekanik: 'Mekanik',
      periyodik: 'Periyodik Bakım',
      elektrik: 'Elektrik',
      diger: 'Diğer'
    };
    return typeLabels[type] || type;
  };

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg mb-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        İşlem Türüne Göre Harcama Dağılımı
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: %${(percent * 100).toFixed(0)}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value.toLocaleString('tr-TR')} TL`}
            contentStyle={{
              backgroundColor: darkMode ? '#1f2937' : '#fff',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              color: darkMode ? '#f3f4f6' : '#000'
            }}
          />
          <Legend
            wrapperStyle={{
              color: darkMode ? '#f3f4f6' : '#000'
            }}
            formatter={(value, entry) => getTypeLabel(entry.payload.name.toLowerCase())}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-6`}>
        {chartData.map((item, index) => (
          <div key={index} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <div className="flex items-center mb-2">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {item.name}
              </p>
            </div>
            <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {item.value.toLocaleString('tr-TR')} TL
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
