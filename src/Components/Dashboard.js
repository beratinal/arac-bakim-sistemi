import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { LayoutDashboard, TrendingUp, Wrench, Activity, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './UI/Card';

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
      value: cost,
      originalType: type
    }));
  }, [records]);

  const stats = useMemo(() => {
    const total = records.reduce((acc, rec) => acc + rec.cost, 0);
    const avg = records.length ? total / records.length : 0;
    const pending = records.filter(r => r.status === 'parca_bekliyor').length;
    
    return {
      total,
      avg,
      count: records.length,
      pending
    };
  }, [records]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

  const getTypeLabel = (type) => {
    const typeLabels = {
      mekanik: 'Mekanik',
      periyodik: 'Periyodik',
      elektrik: 'Elektrik',
      diger: 'Diğer'
    };
    return typeLabels[type] || type;
  };

  if (records.length === 0) return null;

  return (
    <div className="space-y-6 mb-10">
      {/* Mini Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Toplam Harcama', value: `${stats.total.toLocaleString('tr-TR')} TL`, icon: TrendingUp, color: 'text-blue-500' },
          { label: 'Ortalama Maliyet', value: `${stats.avg.toLocaleString('tr-TR')} TL`, icon: Activity, color: 'text-emerald-500' },
          { label: 'Toplam Kayıt', value: stats.count, icon: LayoutDashboard, color: 'text-purple-500' },
          { label: 'Bekleyen İşlem', value: stats.pending, icon: AlertTriangle, color: 'text-amber-500' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="hover:border-primary/50 transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</p>
                  <p className="text-xl font-bold mt-1">{item.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-muted ${item.color}`}>
                  <item.icon size={20} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Wrench className="w-5 h-5 text-primary" /> Harcama Dağılımı
            </CardTitle>
            <CardDescription>İşlem türlerine göre maliyet analizi.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value.toLocaleString('tr-TR')} TL`}
                  contentStyle={{
                    borderRadius: '12px',
                    border: '1px solid hsl(var(--border))',
                    backgroundColor: 'hsl(var(--card))',
                    color: 'hsl(var(--foreground))'
                  }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span className="text-sm font-medium text-muted-foreground ml-2">
                      {getTypeLabel(entry.payload.originalType)}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Legend Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Özet Detaylar</CardTitle>
            <CardDescription>Kategorik bazda toplamlar.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-muted-foreground">
                      {getTypeLabel(item.originalType)}
                    </span>
                  </div>
                  <span className="text-sm font-bold">
                    {item.value.toLocaleString('tr-TR')} TL
                  </span>
                </div>
              ))}
              {chartData.length === 0 && (
                <p className="text-sm text-center text-muted-foreground py-8">Henüz veri bulunmuyor.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
