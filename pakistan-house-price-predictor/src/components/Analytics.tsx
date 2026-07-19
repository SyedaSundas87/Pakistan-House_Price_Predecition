import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, ZAxis } from 'recharts';
import { TrendingUp, Activity, CheckCircle, ArrowDownRight, BarChart3, PieChart } from 'lucide-react';

const priceByCityData = [
  { name: 'Lahore', price: 3.5 },
  { name: 'Karachi', price: 4.2 },
  { name: 'Islamabad', price: 5.1 },
  { name: 'Rawalpindi', price: 2.8 },
  { name: 'Faisalabad', price: 2.1 },
  { name: 'Multan', price: 1.8 },
];

const areaVsPriceData = [
  { area: 500, price: 0.8 }, { area: 1000, price: 1.5 }, { area: 1200, price: 1.8 }, 
  { area: 1500, price: 2.5 }, { area: 2000, price: 3.2 }, { area: 2500, price: 4.5 },
  { area: 3000, price: 5.0 }, { area: 4000, price: 7.2 }, { area: 4500, price: 8.5 },
  { area: 5000, price: 10.0 }
];

const featureImportanceData = [
  { name: 'Location', importance: 45 },
  { name: 'Area (SqFt)', importance: 30 },
  { name: 'Bedrooms', importance: 10 },
  { name: 'Property Type', importance: 8 },
  { name: 'Condition', importance: 4 },
  { name: 'Amenities', importance: 3 },
];

const priceDistributionData = [
  { range: '0-1Cr', count: 120 },
  { range: '1-2Cr', count: 350 },
  { range: '2-3Cr', count: 480 },
  { range: '3-4Cr', count: 210 },
  { range: '4-5Cr', count: 90 },
  { range: '5Cr+', count: 40 },
];

export function Analytics() {
  const cards = [
    { title: 'Average House Price', value: 'PKR 2.45 Crore', change: '+5.2%', isPositive: true, icon: TrendingUp },
    { title: 'Highest Predicted', value: 'PKR 14.2 Crore', change: 'DHA Phase 8', isPositive: true, icon: Activity },
    { title: 'Lowest Predicted', value: 'PKR 45 Lakh', change: 'Outskirts', isPositive: false, icon: ArrowDownRight },
    { title: 'Model Accuracy', value: '94.2%', change: 'R-Squared Score', isPositive: true, icon: CheckCircle },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Market Analytics</h2>
          <p className="text-slate-500 mt-2">Insights derived from our predictive model database.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${card.title === 'Model Accuracy' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-blue-600'}`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${card.isPositive ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'}`}>
                  {card.change}
                </span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium">{card.title}</h3>
              <p className="text-2xl font-bold text-slate-900 mt-1">{card.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Avg Price by City (Crore PKR)
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priceByCityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <Tooltip 
                    cursor={{ fill: '#F1F5F9' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="price" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                Area vs Price Distribution
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis type="number" dataKey="area" name="Area" unit=" sqft" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis type="number" dataKey="price" name="Price" unit=" Cr" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Scatter name="Properties" data={areaVsPriceData} fill="#6366F1" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-amber-500" />
                Feature Importance (%)
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={featureImportanceData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="importance" fill="#F59E0B" radius={[0, 4, 4, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <AreaChart className="w-5 h-5 text-sky-500" />
                Price Range Distribution
              </h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="count" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
