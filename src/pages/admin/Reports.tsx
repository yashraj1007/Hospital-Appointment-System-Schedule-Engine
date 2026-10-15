import React from 'react';
import PanelLayout from '../../components/layout/PanelLayout';
import { TrendingUp, Users, Calendar, Activity, ArrowUpRight, ArrowDownRight, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const STATS = [
  { name: 'Total Appointments', value: '1,284', change: '+12.5%', trending: 'up', icon: Calendar },
  { name: 'Active Patients', value: '8,432', change: '+5.2%', trending: 'up', icon: Users },
  { name: 'Avg. Waiting Time', value: '14m', change: '-2.1%', trending: 'down', icon: Activity },
  { name: 'System Revenue', value: '$12,450', change: '+8.4%', trending: 'up', icon: TrendingUp },
];

const CHART_DATA = [
  { name: 'Mon', appointments: 65 },
  { name: 'Tue', appointments: 45 },
  { name: 'Wed', appointments: 80 },
  { name: 'Thu', appointments: 55 },
  { name: 'Fri', appointments: 95 },
  { name: 'Sat', appointments: 70 },
  { name: 'Sun', appointments: 85 },
];

export default function AdminReports() {
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Metric,Value,Change"].join(",") + "\n"
      + STATS.map(s => `${s.name},${s.value},${s.change}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "medicare_system_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PanelLayout role="admin">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-dark mb-1">System Reports & Analytics</h1>
            <p className="text-sm text-secondary-text">Monitor hospital performance, patient growth and appointment metrics.</p>
          </div>
          <button 
            onClick={handleExport}
            className="btn-secondary flex items-center gap-2 self-start"
          >
            <Download className="w-4 h-4" /> Export Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.name} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-medical-cyan p-3 rounded-2xl">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${stat.trending === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trending === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-secondary-text text-xs font-bold uppercase tracking-wider mb-1">{stat.name}</h3>
              <p className="text-2xl font-black text-dark">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Appointment Distribution Chart */}
          <div className="lg:col-span-2 card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-dark">Appointment Distribution</h3>
              <select className="text-xs font-bold border rounded-lg px-2 py-1 bg-white border-border-gray">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#6b7280' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#6b7280' }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f9fafb' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="appointments" radius={[6, 6, 0, 0]}>
                    {CHART_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0ea5e9' : '#0ea5e980'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Performance */}
          <div className="card p-8">
            <h3 className="font-bold text-dark mb-6">Popular Departments</h3>
            <div className="space-y-6">
              {[
                { name: 'Cardiology', count: 432, color: 'bg-primary' },
                { name: 'Pediatrics', count: 321, color: 'bg-primary/80' },
                { name: 'Neurology', count: 212, color: 'bg-primary/60' },
                { name: 'Orthopedics', count: 184, color: 'bg-primary/40' },
                { name: 'Dermatology', count: 156, color: 'bg-primary/20' },
              ].map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-dark">{dept.name}</span>
                    <span className="text-secondary-text">{dept.count} apps</span>
                  </div>
                  <div className="h-2 w-full bg-medical-cyan rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${dept.color} transition-all duration-1000`} 
                      style={{ width: `${(dept.count / 450) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent System Activity */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-border-gray flex items-center justify-between">
            <h3 className="font-bold text-dark">Recent System Activity</h3>
            <button className="text-xs font-bold text-primary hover:underline">View All Logs</button>
          </div>
          <div className="divide-y divide-border-gray">
            {[
              { user: 'Admin Sarah', action: 'Approved appointment request #482', time: '2 mins ago' },
              { user: 'Dr. Michael', action: 'Completed clinical report for Patient John', time: '14 mins ago' },
              { user: 'System', action: 'Backup successfully completed', time: '1 hour ago' },
              { user: 'Patient Elena', action: 'Cancelled appointment #391', time: '3 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-medical-cyan transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-medical-cyan flex items-center justify-center font-bold text-primary text-xs">
                    {activity.user[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark">{activity.action}</p>
                    <p className="text-[10px] font-bold text-secondary-text uppercase tracking-widest">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-secondary-text">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
